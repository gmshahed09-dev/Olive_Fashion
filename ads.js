// Advertising module — paid ad slots that other businesses can book.
// Flow: advertiser books on /#/advertise → status "pending" → admin approves (and marks paid)
// → ad shows in its slot between start and end date → views & clicks are counted.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const SLOTS = {
  hero:      { name_en: 'Home page hero slider',     name_ar: 'شريط العرض الرئيسي',      size: '1600 × 900 px', weekly: 1500 },
  home_wide: { name_en: 'Home page wide banner',     name_ar: 'لافتة عريضة في الرئيسية',  size: '1600 × 500 px', weekly: 900 },
  home_pair: { name_en: 'Home page side banner',     name_ar: 'لافتة جانبية في الرئيسية', size: '900 × 600 px',  weekly: 600 },
  shop_top:  { name_en: 'Shop pages top banner',     name_ar: 'لافتة أعلى صفحات المتجر',  size: '1600 × 360 px', weekly: 500 },
  product:   { name_en: 'Product pages banner',      name_ar: 'لافتة صفحات المنتجات',     size: '900 × 500 px',  weekly: 350 },
};
const DURATIONS = { 1: 0, 2: 0, 4: 0.10, 12: 0.20 }; // weeks → discount
const priceFor = (slot, weeks) => Math.round(SLOTS[slot].weekly * weeks * (1 - DURATIONS[weeks]));

const QA_PHONE = /^(\+?974)?[3-7]\d{7}$/;
const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d, n) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const safeLink = l => {
  l = String(l || '').trim();
  if (/^https?:\/\/[^\s"'<>]+$/i.test(l) || /^#\/[\w\-/]*$/.test(l)) return l;
  return '';
};

module.exports = function ads(app, { db, auth, limit, bad, UPLOAD_DIR }) {
  db.exec(`CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE NOT NULL,
    kind TEXT NOT NULL DEFAULT 'sponsored',      -- 'house' (our own promo) or 'sponsored' (paid by others)
    slot TEXT NOT NULL,
    advertiser TEXT, contact_name TEXT, phone TEXT, email TEXT,
    title_en TEXT NOT NULL, title_ar TEXT, subtitle_en TEXT, subtitle_ar TEXT,
    cta_en TEXT, cta_ar TEXT, link_url TEXT, image_url TEXT, art_sku TEXT,
    theme TEXT DEFAULT 'night',
    start_date TEXT NOT NULL, end_date TEXT NOT NULL, weeks INTEGER,
    price REAL DEFAULT 0, paid INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',      -- pending | approved | paused | rejected
    priority INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0, clicks INTEGER DEFAULT 0,
    admin_note TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  // Seed our own promotions so every slot looks finished on day one
  if (!db.prepare('SELECT COUNT(*) c FROM ads').get().c) {
    const s = today(), e = addDays(s, 365);
    const ins = db.prepare(`INSERT INTO ads (ref,kind,slot,advertiser,title_en,title_ar,subtitle_en,subtitle_ar,cta_en,cta_ar,link_url,art_sku,theme,start_date,end_date,status,paid,priority)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'approved',1,?)`);
    [
      ['hero', 'Oud Al Doha', 'عود الدوحة', 'Our signature oud with amber, saffron and rose. Made for evenings in Doha.', 'عودنا المميز بالعنبر والزعفران والورد، لأمسيات الدوحة.', 'Shop the perfume', 'تسوق العطر', '#/product/5', 'P-001', 'night', 3],
      ['hero', 'Watches for every occasion', 'ساعات لكل مناسبة', 'Steel chronographs, automatics and rose-gold classics, from 690 QAR.', 'كرونوغراف ستيل وأوتوماتيك وكلاسيكيات بالذهب الوردي، ابتداءً من 690 ر.ق.', 'Shop watches', 'تسوق الساعات', '#/shop/watches', 'W-002', 'navy', 2],
      ['hero', 'Ready for National Day', 'استعدوا لليوم الوطني', 'Gifts in maroon and gold for 18 December, delivered anywhere in Qatar.', 'هدايا بالعنابي والذهبي ليوم 18 ديسمبر، نوصلها لكل قطر.', 'Find a gift', 'اختر هدية', '#/shop', 'LA-004', 'maroon', 1],
      ['home_wide', 'Put your brand in front of Qatar’s shoppers', 'اعرض علامتك التجارية أمام المتسوقين في قطر', 'Book a banner on Olive Fashion from 350 QAR a week. We review every ad within one working day.', 'احجز لافتة على أوليف فاشن ابتداءً من 350 ر.ق أسبوعياً. نراجع كل إعلان خلال يوم عمل.', 'Advertise with us', 'أعلن معنا', '#/advertise', 'W-001', 'gold', 0],
      ['home_pair', 'Gifts under 300 QAR', 'هدايا بأقل من 300 ر.ق', 'Earrings, card holders and musk, wrapped and ready.', 'أقراط وحاملات بطاقات ومسك، مغلفة وجاهزة.', 'See gifts', 'شاهد الهدايا', '#/shop/ladies-accessories', 'LA-001', 'pearl', 0],
      ['home_pair', 'Free delivery over 300 QAR', 'توصيل مجاني فوق 300 ر.ق', 'From Al Wakrah to Al Shamal, pay cash or card at the door.', 'من الوكرة إلى الشمال، ادفع نقداً أو بالبطاقة عند الباب.', 'Start shopping', 'ابدأ التسوق', '#/shop', 'MW-001', 'olive', 0],
      ['shop_top', 'Two perfumes, one gift box', 'عطران في علبة هدية واحدة', 'Add any two perfumes and we’ll wrap them together at no charge.', 'أضف أي عطرين وسنغلفهما معاً مجاناً.', 'Shop perfumes', 'تسوق العطور', '#/shop/perfumes', 'P-002', 'night', 0],
      ['product', 'Advertise on this page', 'أعلن في هذه الصفحة', 'Reach shoppers while they decide. From 350 QAR a week.', 'صل إلى المتسوقين لحظة القرار. ابتداءً من 350 ر.ق أسبوعياً.', 'See ad packages', 'باقات الإعلان', '#/advertise', 'P-004', 'gold', 0],
    ].forEach(a => ins.run('HS-' + crypto.randomBytes(3).toString('hex').toUpperCase(), 'house', a[0], 'Olive Fashion', ...a.slice(1, 10), s, e, a[10]));
  }

  const publicAd = (a, lang) => ({
    id: a.id, kind: a.kind, slot: a.slot, advertiser: a.kind === 'sponsored' ? a.advertiser : null,
    title_en: a.title_en, title_ar: a.title_ar, subtitle_en: a.subtitle_en, subtitle_ar: a.subtitle_ar,
    cta_en: a.cta_en, cta_ar: a.cta_ar, image_url: a.image_url, art_sku: a.art_sku, theme: a.theme,
    external: /^https?:/i.test(a.link_url || ''),
    link: /^#\//.test(a.link_url || '') ? a.link_url : null,
  });

  // ---------- Public ----------
  app.get('/api/ads/packages', (req, res) => {
    res.json({ slots: Object.entries(SLOTS).map(([k, v]) => ({ key: k, ...v, prices: Object.keys(DURATIONS).map(w => ({ weeks: +w, price: priceFor(k, +w) })) })), durations: DURATIONS });
  });

  app.get('/api/ads', (req, res) => {
    const d = today();
    const rows = db.prepare(`SELECT * FROM ads WHERE status='approved' AND start_date<=? AND end_date>=?
      ORDER BY (kind='sponsored') DESC, priority DESC, id DESC`).all(d, d);
    const bySlot = {};
    for (const a of rows) (bySlot[a.slot] ||= []).push(publicAd(a));
    res.json(bySlot);
  });

  app.post('/api/ads/seen', (req, res) => {
    const ids = (Array.isArray(req.body?.ids) ? req.body.ids : []).slice(0, 30).map(Number).filter(Boolean);
    const st = db.prepare('UPDATE ads SET impressions=impressions+1 WHERE id=?');
    ids.forEach(id => st.run(id));
    res.json({ ok: true });
  });

  app.post('/api/ads/click/:id', (req, res) => {
    db.prepare('UPDATE ads SET clicks=clicks+1 WHERE id=?').run(req.params.id);
    res.json({ ok: true });
  });

  app.get('/go/ad/:id', (req, res) => {
    const a = db.prepare('SELECT * FROM ads WHERE id=?').get(req.params.id);
    if (!a) return res.redirect('/');
    db.prepare('UPDATE ads SET clicks=clicks+1 WHERE id=?').run(a.id);
    const l = safeLink(a.link_url);
    res.redirect(!l ? '/' : l.startsWith('#') ? '/' + l : l);
  });

  function saveImage(dataUrl, maxMB) {
    if (!dataUrl) return null;
    const m = /^data:image\/(png|jpe?g|webp);base64,(.+)$/.exec(dataUrl);
    if (!m) throw new Error('Upload a PNG, JPG or WEBP image');
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > maxMB * 1024 * 1024) throw new Error(`Image must be under ${maxMB} MB`);
    const name = 'ad-' + crypto.randomBytes(8).toString('hex') + '.' + m[1].replace('jpeg', 'jpg');
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return '/uploads/' + name;
  }

  app.post('/api/ads/book', limit(4, 10 * 60_000), (req, res) => {
    const b = req.body || {};
    if (!SLOTS[b.slot]) return bad(res, 'Choose where your ad should appear');
    const weeks = Number(b.weeks);
    if (!(weeks in DURATIONS)) return bad(res, 'Choose how long your ad should run');
    if (!b.company || !b.contact_name) return bad(res, 'Enter your company and contact name');
    const phone = String(b.phone || '').replace(/[\s-]/g, '');
    if (!QA_PHONE.test(phone)) return bad(res, 'Enter a valid Qatar phone number');
    if (!b.title_en || b.title_en.length > 70) return bad(res, 'Enter a headline of up to 70 characters');
    if (b.subtitle_en && b.subtitle_en.length > 160) return bad(res, 'Keep the description under 160 characters');
    const link = safeLink(b.link_url);
    if (b.link_url && !link) return bad(res, 'The website link must start with https://');
    const start = /^\d{4}-\d{2}-\d{2}$/.test(b.start_date) && b.start_date >= today() ? b.start_date : addDays(today(), 2);
    let image;
    try { image = saveImage(b.image, 3); } catch (e) { return bad(res, e.message); }
    const ref = 'AD-' + crypto.randomBytes(3).toString('hex').toUpperCase();
    const price = priceFor(b.slot, weeks);
    db.prepare(`INSERT INTO ads (ref,kind,slot,advertiser,contact_name,phone,email,title_en,title_ar,subtitle_en,subtitle_ar,cta_en,cta_ar,link_url,image_url,theme,start_date,end_date,weeks,price,status)
      VALUES (?,'sponsored',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'pending')`)
      .run(ref, b.slot, b.company, b.contact_name, '974' + phone.slice(-8), b.email || '', b.title_en, b.title_ar || '', b.subtitle_en || '', b.subtitle_ar || '',
        b.cta_en || 'Learn more', b.cta_ar || 'اعرف المزيد', link, image, ['night','gold','pearl','maroon','navy','olive'].includes(b.theme) ? b.theme : 'night',
        start, addDays(start, weeks * 7 - 1), weeks, price);
    res.json({ ref, price, start_date: start, end_date: addDays(start, weeks * 7 - 1) });
  });

  // ---------- Admin ----------
  app.get('/api/admin/ads', auth, (req, res) => {
    res.json({ slots: SLOTS, ads: db.prepare('SELECT * FROM ads ORDER BY (status=\'pending\') DESC, id DESC').all() });
  });

  const FIELDS = ['kind','slot','advertiser','contact_name','phone','email','title_en','title_ar','subtitle_en','subtitle_ar','cta_en','cta_ar','link_url','image_url','art_sku','theme','start_date','end_date','price','paid','status','priority','admin_note'];
  function vals(b) {
    if (!SLOTS[b.slot]) throw new Error('Choose a slot');
    if (!b.title_en) throw new Error('Headline is required');
    if (!b.start_date || !b.end_date || b.end_date < b.start_date) throw new Error('Check the start and end dates');
    if (b.link_url && !safeLink(b.link_url)) throw new Error('Link must start with https:// or #/');
    return FIELDS.map(f => f === 'paid' ? (b.paid ? 1 : 0) : f === 'price' || f === 'priority' ? Number(b[f]) || 0 : (b[f] ?? ''));
  }
  app.post('/api/admin/ads', auth, (req, res) => {
    try {
      const r = db.prepare(`INSERT INTO ads (ref,${FIELDS.join(',')}) VALUES (?,${FIELDS.map(() => '?').join(',')})`)
        .run((req.body.kind === 'house' ? 'HS-' : 'AD-') + crypto.randomBytes(3).toString('hex').toUpperCase(), ...vals(req.body));
      res.json({ id: r.lastInsertRowid });
    } catch (e) { bad(res, e.message); }
  });
  app.put('/api/admin/ads/:id', auth, (req, res) => {
    try { db.prepare(`UPDATE ads SET ${FIELDS.map(f => f + '=?').join(',')} WHERE id=?`).run(...vals(req.body), req.params.id); res.json({ ok: true }); }
    catch (e) { bad(res, e.message); }
  });
  app.delete('/api/admin/ads/:id', auth, (req, res) => { db.prepare('DELETE FROM ads WHERE id=?').run(req.params.id); res.json({ ok: true }); });
};
