// Olive Fashion storefront — vanilla JS single-page app (English / Arabic)
const T = {
  en: {
    announce: 'Free delivery across Qatar on orders over 300 QAR. Pay cash or card at your door.',
    byUV: 'by United Vision', home: 'Home', all: 'Shop all', langBtn: 'العربية', advertise: 'Advertise with us',
    shopNow: 'Shop the collection', sponsored: 'Sponsored by {n}', ad: 'Sponsored',
    t1: 'Delivery across Qatar', t1s: 'Same or next day in Doha', t2: 'Pay at your door', t2s: 'Cash or card on delivery',
    t3: 'Authentic pieces', t3s: 'Sourced by United Vision', t4: 'Easy exchange', t4s: 'Within 7 days, unused',
    catH: 'Shop by category', catP: 'Four collections, chosen for gifting and for everyday wear.', items: '{n} pieces',
    newH: 'New this season', newP: 'The pieces our Doha customers are choosing right now.', viewAll: 'View all pieces',
    giftH: 'Gifts under 300 QAR', giftP: 'Every one of these qualifies for free delivery when you add a second piece.',
    storyH: 'A United Vision house', storyP: 'Olive Fashion is the retail house of United Vision in Qatar. We choose watches, perfumes and accessories for quality and lasting style, and stand behind every order with a local team.',
    s1: 'Chosen in Doha', s1s: 'Every piece is selected by our team in Qatar.', s2: 'Delivered across Qatar', s2s: 'Same or next day in Doha, 1 to 3 days elsewhere.', s3: 'Supported locally', s3s: 'Call or WhatsApp us about any order.',
    add: 'Add', addToBag: 'Add to bag', sale: 'Sale', save: 'Save {n}', soldOut: 'Sold out', added: 'Added to your bag',
    search: 'Search watches, oud, wallets…', sortDef: 'Recommended', sortLow: 'Price: low to high', sortHigh: 'Price: high to low',
    noProducts: 'Nothing matches that search. Try another word or browse all pieces.', shopP: 'Delivered anywhere in Qatar. Pay when it arrives.',
    inStock: 'In stock, ready to deliver', left: 'Only {n} left', also: 'You may also like',
    perk1: 'Delivery across Qatar in 1 to 3 days', perk2: 'Pay cash or card when it arrives', perk3: 'Exchange within 7 days if unused with tags',
    yourBag: 'Your bag', emptyBag: 'Your bag is empty. Start with our new pieces.', subtotal: 'Subtotal', delivery: 'Delivery', total: 'Total',
    checkout: 'Go to checkout', remove: 'Remove', free: 'Free', atCheckout: 'Calculated at checkout',
    moreFree: 'Add {n} more for free delivery', gotFree: 'Your order has free delivery',
    details: 'Delivery details', fullName: 'Full name', phone: 'Mobile number (+974)', email: 'Email (optional)', zone: 'Area',
    chooseZone: 'Choose your area', address: 'Address: zone, street, building, unit', notes: 'Notes for the driver (optional)',
    payment: 'Payment', cod: 'Cash on delivery', cardDel: 'Card on delivery', online: 'Online payment (we send you a secure link)',
    placeOrder: 'Place order', summary: 'Your order', thanks: 'Thank you for your order',
    thanksP: 'Your order number is <b>{no}</b>. We will message you on WhatsApp to confirm the delivery time.',
    continue: 'Continue shopping', track: 'Track your order', trackP: 'Enter your order number and the mobile number you used.', orderNo: 'Order number', check: 'Check status',
    st_pending: 'Received, waiting for confirmation', st_confirmed: 'Confirmed and being prepared', st_out_for_delivery: 'Out for delivery', st_delivered: 'Delivered', st_cancelled: 'Cancelled',
    contact: 'Contact us', message: 'Message', send: 'Send message', sent: 'Message sent. We will reply within one working day.',
    policies: 'Delivery and returns', shop: 'Shop', help: 'Help', business: 'For business', wholesale: 'Corporate and wholesale',
    address: 'Doha, State of Qatar', footAbout: 'Watches, perfumes, wallets and accessories, chosen by United Vision and delivered across Qatar.',
    qar: 'All prices in Qatari Riyal (QAR)', cur: 'QAR',
    advH: 'Advertise on Olive Fashion', advP: 'Put your brand in front of shoppers across Qatar. Choose a spot, send your ad, and pay only after we approve it.',
    advWhyH: 'Reach people who are ready to buy', advWhyP: 'Our visitors are shopping for watches, perfume and gifts in Qatar. Your banner appears beside the products they are choosing, in English and Arabic.',
    step1: 'Choose a spot and dates', step1s: 'Pick where your ad appears and for how long.', step2: 'Send your ad', step2s: 'Upload a banner, or write a headline and we design it in our style.',
    step3: 'We review and call you', step3s: 'Within one working day, by phone or WhatsApp.', step4: 'Pay and go live', step4s: 'Bank transfer or card link. Your ad runs on the dates you chose.',
    spotsH: 'Ad spots and prices', perWeek: 'a week', from: 'From',
    bookH: 'Book your ad', company: 'Company or brand', contactName: 'Contact person', spot: 'Ad spot', weeksL: 'How long',
    wk: '{n} week', wks: '{n} weeks', off: '{n}% off', startL: 'Start date', headEn: 'Headline in English (up to 70 characters)', headAr: 'Headline in Arabic (optional)',
    subEn: 'Short description in English (optional)', subAr: 'Short description in Arabic (optional)', ctaL: 'Button text', linkL: 'Link to your website or Instagram (https://…)',
    themeL: 'Colour', imgL: 'Banner image (optional, PNG/JPG/WEBP, up to 3 MB)', imgHint: 'Recommended size {s}',
    previewL: 'Live preview, as shoppers will see it', totalL: 'Total', payAfter: 'You pay only after we approve your ad.', submitAd: 'Send for review',
    advDone: 'Your ad is booked for review', advDoneP: 'Reference <b>{ref}</b>. We will call {phone} within one working day. Planned dates: {s} to {e}. Total {p}.',
    sampleHead: 'Your headline here', sampleSub: 'A short line about your offer, shown under the headline.', learnMore: 'Learn more',
  },
  ar: {
    announce: 'توصيل مجاني في جميع أنحاء قطر للطلبات فوق 300 ر.ق. ادفع نقداً أو بالبطاقة عند الاستلام.',
    byUV: 'من يونايتد فيجن', home: 'الرئيسية', all: 'تسوق الكل', langBtn: 'English', advertise: 'أعلن معنا',
    shopNow: 'تسوق المجموعة', sponsored: 'إعلان ممول من {n}', ad: 'إعلان ممول',
    t1: 'توصيل لكل قطر', t1s: 'في نفس اليوم أو التالي بالدوحة', t2: 'ادفع عند الاستلام', t2s: 'نقداً أو بالبطاقة',
    t3: 'منتجات أصلية', t3s: 'بتوريد من يونايتد فيجن', t4: 'استبدال سهل', t4s: 'خلال 7 أيام دون استخدام',
    catH: 'تسوق حسب الفئة', catP: 'أربع مجموعات مختارة للهدايا وللاستخدام اليومي.', items: '{n} قطعة',
    newH: 'جديد الموسم', newP: 'القطع التي يختارها عملاؤنا في الدوحة الآن.', viewAll: 'عرض كل القطع',
    giftH: 'هدايا بأقل من 300 ر.ق', giftP: 'أضف قطعة ثانية واحصل على توصيل مجاني.',
    storyH: 'دار من يونايتد فيجن', storyP: 'أوليف فاشن هي دار البيع بالتجزئة التابعة لـ يونايتد فيجن في قطر. نختار الساعات والعطور والإكسسوارات لجودتها وأناقتها الدائمة، ونقف خلف كل طلب بفريق محلي.',
    s1: 'مختارة في الدوحة', s1s: 'كل قطعة يختارها فريقنا في قطر.', s2: 'توصيل لكل قطر', s2s: 'في نفس اليوم أو التالي بالدوحة، ومن يوم إلى 3 أيام لباقي المناطق.', s3: 'دعم محلي', s3s: 'اتصل بنا أو راسلنا عبر واتساب بخصوص أي طلب.',
    add: 'أضف', addToBag: 'أضف إلى الحقيبة', sale: 'تخفيض', save: 'وفر {n}', soldOut: 'نفدت الكمية', added: 'تمت الإضافة إلى حقيبتك',
    search: 'ابحث عن ساعات، عود، محافظ…', sortDef: 'المقترح', sortLow: 'السعر: من الأقل', sortHigh: 'السعر: من الأعلى',
    noProducts: 'لا توجد نتائج. جرّب كلمة أخرى أو تصفح كل القطع.', shopP: 'نوصل لأي مكان في قطر. ادفع عند الاستلام.',
    inStock: 'متوفر وجاهز للتوصيل', left: 'متبقي {n} فقط', also: 'قد يعجبك أيضاً',
    perk1: 'توصيل لكل قطر خلال 1 إلى 3 أيام', perk2: 'ادفع نقداً أو بالبطاقة عند الاستلام', perk3: 'استبدال خلال 7 أيام للمنتجات غير المستخدمة',
    yourBag: 'حقيبتك', emptyBag: 'حقيبتك فارغة. ابدأ بقطعنا الجديدة.', subtotal: 'المجموع الفرعي', delivery: 'التوصيل', total: 'الإجمالي',
    checkout: 'إتمام الطلب', remove: 'إزالة', free: 'مجاني', atCheckout: 'يحسب عند إتمام الطلب',
    moreFree: 'أضف {n} للحصول على توصيل مجاني', gotFree: 'طلبك يشمل توصيلاً مجانياً',
    details: 'بيانات التوصيل', fullName: 'الاسم الكامل', phone: 'رقم الجوال (+974)', email: 'البريد الإلكتروني (اختياري)', zone: 'المنطقة',
    chooseZone: 'اختر منطقتك', address: 'العنوان: المنطقة، الشارع، المبنى، الوحدة', notes: 'ملاحظات للسائق (اختياري)',
    payment: 'طريقة الدفع', cod: 'الدفع نقداً عند الاستلام', cardDel: 'البطاقة عند الاستلام', online: 'دفع إلكتروني (نرسل لك رابطاً آمناً)',
    placeOrder: 'تأكيد الطلب', summary: 'طلبك', thanks: 'شكراً لطلبك',
    thanksP: 'رقم طلبك هو <b>{no}</b>. سنراسلك عبر واتساب لتأكيد موعد التوصيل.',
    continue: 'متابعة التسوق', track: 'تتبع طلبك', trackP: 'أدخل رقم الطلب ورقم الجوال المستخدم.', orderNo: 'رقم الطلب', check: 'تحقق من الحالة',
    st_pending: 'تم الاستلام، بانتظار التأكيد', st_confirmed: 'مؤكد وقيد التجهيز', st_out_for_delivery: 'خرج للتوصيل', st_delivered: 'تم التوصيل', st_cancelled: 'ملغي',
    contact: 'اتصل بنا', message: 'الرسالة', send: 'إرسال الرسالة', sent: 'تم الإرسال. سنرد خلال يوم عمل.',
    policies: 'التوصيل والإرجاع', shop: 'تسوق', help: 'مساعدة', business: 'للأعمال', wholesale: 'الشركات والجملة',
    address: 'الدوحة، دولة قطر', footAbout: 'ساعات وعطور ومحافظ وإكسسوارات، باختيار يونايتد فيجن وتوصيل لكل قطر.',
    qar: 'جميع الأسعار بالريال القطري', cur: 'ر.ق',
    advH: 'أعلن على أوليف فاشن', advP: 'اعرض علامتك التجارية أمام المتسوقين في قطر. اختر المكان، أرسل إعلانك، وادفع فقط بعد موافقتنا.',
    advWhyH: 'صل إلى من هم مستعدون للشراء', advWhyP: 'زوارنا يتسوقون الساعات والعطور والهدايا في قطر. يظهر إعلانك بجانب المنتجات التي يختارونها، بالعربية والإنجليزية.',
    step1: 'اختر المكان والتواريخ', step1s: 'حدد مكان ظهور إعلانك ومدته.', step2: 'أرسل إعلانك', step2s: 'ارفع تصميمك، أو اكتب العنوان ونصممه بأسلوبنا.',
    step3: 'نراجع ونتصل بك', step3s: 'خلال يوم عمل، هاتفياً أو عبر واتساب.', step4: 'ادفع وانطلق', step4s: 'تحويل بنكي أو رابط دفع. يظهر إعلانك في التواريخ المختارة.',
    spotsH: 'أماكن الإعلان والأسعار', perWeek: 'أسبوعياً', from: 'ابتداءً من',
    bookH: 'احجز إعلانك', company: 'الشركة أو العلامة التجارية', contactName: 'الشخص المسؤول', spot: 'مكان الإعلان', weeksL: 'المدة',
    wk: 'أسبوع {n}', wks: '{n} أسابيع', off: 'خصم {n}٪', startL: 'تاريخ البدء', headEn: 'العنوان بالإنجليزية (حتى 70 حرفاً)', headAr: 'العنوان بالعربية (اختياري)',
    subEn: 'وصف قصير بالإنجليزية (اختياري)', subAr: 'وصف قصير بالعربية (اختياري)', ctaL: 'نص الزر', linkL: 'رابط موقعك أو إنستغرام (https://…)',
    themeL: 'اللون', imgL: 'صورة الإعلان (اختياري، PNG/JPG/WEBP حتى 3 ميغابايت)', imgHint: 'المقاس المقترح {s}',
    previewL: 'معاينة مباشرة كما يراها المتسوقون', totalL: 'الإجمالي', payAfter: 'تدفع فقط بعد موافقتنا على الإعلان.', submitAd: 'إرسال للمراجعة',
    advDone: 'تم استلام إعلانك للمراجعة', advDoneP: 'المرجع <b>{ref}</b>. سنتصل على {phone} خلال يوم عمل. التواريخ: {s} إلى {e}. الإجمالي {p}.',
    sampleHead: 'عنوان إعلانك هنا', sampleSub: 'سطر قصير عن عرضك يظهر تحت العنوان.', learnMore: 'اعرف المزيد',
  },
};
const ZONE_AR = { 'Doha':'الدوحة','Al Rayyan':'الريان','Lusail':'لوسيل','Al Wakrah':'الوكرة','Umm Salal':'أم صلال','Al Daayen':'الضعاين','Al Khor':'الخور','Mesaieed':'مسيعيد','Al Shamal':'الشمال','Al Shahaniya':'الشحانية' };

let lang = localStorage.getItem('lang') || 'en';
let cart = []; try { cart = JSON.parse(localStorage.getItem('cart') || '[]'); } catch {}
let CATS = [], SETTINGS = null, ALL = [], ADS = {}, heroTimer = null;
const $ = s => document.querySelector(s);
const t = (k, v = {}) => (T[lang][k] ?? T.en[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x]);
const nm = o => (lang === 'ar' && o.name_ar) || o.name_en;
const loc = (o, f) => (lang === 'ar' && o[f + '_ar']) || o[f + '_en'] || '';
const fmt = n => Number(n).toLocaleString(lang === 'ar' ? 'ar-QA' : 'en-QA', { maximumFractionDigits: 2 });
const money = n => `${fmt(n)} ${t('cur')}`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

// Safe Art Helpers
const categoryArt = slug => `<div class="cat-art cat-${slug || 'default'}"></div>`;
const productArt = p => `<div class="prod-art"></div>`;

async function api(url, opts = {}) {
  const r = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Something went wrong. Please try again.');
  return j;
}
const ICON = {
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  truck: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 8h16v13H3zM19 13h6l4 4v4h-10"/><circle cx="9" cy="23" r="2.5"/><circle cx="23" cy="23" r="2.5"/></svg>',
  cash: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="9" width="26" height="15" rx="2"/><circle cx="16" cy="16.5" r="3.5"/><path d="M7 13v7M25 13v7"/></svg>',
  shield: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7z"/><path d="m11 16 4 4 7-8"/></svg>',
  swap: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 11h19l-5-5M26 21H7l5 5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10"/></svg>',
};

// ---------- Product imagery ----------
const imgOf = p => {
  // The API may return `images` as an array or as a JSON string.
  // Handle both forms, and fall back to the legacy single-image field.
  let imgs = [];
  const rawImages = p?.images ?? p?.image_urls ?? p?.gallery;
  if (Array.isArray(rawImages)) {
    imgs = rawImages;
  } else if (typeof rawImages === 'string' && rawImages.trim()) {
    try {
      const parsed = JSON.parse(rawImages);
      imgs = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      // Some older records may store one image path as plain text.
      imgs = [rawImages];
    }
  }
  if (!imgs.length) {
    const single = p?.image_url ?? p?.image ?? p?.photo;
    if (Array.isArray(single)) imgs = single;
    else if (typeof single === 'string' && single.trim()) imgs = [single];
  }
  imgs = imgs.filter(x => typeof x === 'string' && x.trim()).map(x => x.trim());
  if (!imgs.length) return `<img src="/uploads/placeholder.jpg" alt="${esc(nm(p))}" loading="lazy">`;

  const mainImgId = `main-img-${String(p.id).replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return `
    <div class="prod-img-box">
      <img id="${mainImgId}" src="${esc(imgs[0])}" alt="${esc(nm(p))}" loading="lazy" onerror="this.onerror=null;this.src='/uploads/placeholder.jpg'">
      ${imgs.length > 1 ? `
        <div class="thumb-list" style="display:flex; gap:4px; margin-top:6px; justify-content:center;">
          ${imgs.map((img) => `
            <img src="${esc(img)}" alt="${esc(nm(p))}" loading="lazy" onclick="const m=document.getElementById('${mainImgId}');if(m)m.src=this.src" style="width:35px;height:35px;object-fit:cover;border-radius:4px;cursor:pointer;border:1px solid #ddd;" onerror="this.style.display='none'">
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
};
const bySku = sku => ALL.find(p => p.sku === sku);

// ---------- Ads ----------
const seen = new Set(JSON.parse(sessionStorage.getItem('adseen') || '[]'));
let pendingSeen = [];
function markSeen(id) { if (!id || seen.has(id)) return; seen.add(id); pendingSeen.push(id); }
function flushSeen() {
  if (!pendingSeen.length) return;
  navigator.sendBeacon?.('/api/ads/seen', new Blob([JSON.stringify({ ids: pendingSeen })], { type: 'application/json' }));
  sessionStorage.setItem('adseen', JSON.stringify([...seen])); pendingSeen = [];
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-adclick]');
  if (a) navigator.sendBeacon?.('/api/ads/click/' + a.dataset.adclick);
});
const adHref = a => a.preview ? '#' : a.external ? `/go/ad/${a.id}` : (a.link || '#/');
const adAttrs = a => a.preview ? 'onclick="return false"' : a.external ? `target="_blank" rel="noopener sponsored"` : `data-adclick="${a.id}"`;
const sponsorTag = a => a.kind === 'sponsored' ? `<span class="sponsor">${a.advertiser ? esc(t('sponsored', { n: a.advertiser })) : t('ad')}</span>` : '';
function adArt(a) {
  if (a.art_sku) { const p = bySku(a.art_sku) || { sku: a.art_sku }; return productArt(p); }
  return '';
}
function bannerHTML(a, variant = '') {
  markSeen(a.id);
  const img = Array.isArray(a.image_url) ? a.image_url[0] : a.image_url;
  const art = img ? '' : adArt(a);
  return `<a class="banner ${variant} ${img ? 'img' : 't-' + (a.theme || 'night')} ${img || art ? '' : 'noart'}" href="${adHref(a)}" ${adAttrs(a)}>
    ${img ? `<div class="photo"><img src="${esc(img)}" alt=""></div>` : '<div class="bgp"></div>'}
    <div class="txt"><div>${sponsorTag(a)}<h3 class="display">${esc(loc(a, 'title'))}</h3>${loc(a, 'subtitle') ? `<p>${esc(loc(a, 'subtitle'))}</p>` : ''}</div>
      <span class="btn ${variant === 'slim' ? 'sm ' : ''}${(a.theme === 'gold' || a.theme === 'pearl') && !img ? '' : 'gold'}">${esc(loc(a, 'cta') || t('learnMore'))}</span></div>
    ${art ? `<div class="art">${art}</div>` : ''}</a>`;
}
const slotBanner = (slot, variant) => { const list = ADS[slot] || []; if (!list.length) return ''; const a = list[Math.floor(Math.random() * list.length)]; return bannerHTML(a, variant); };

// ---------- Chrome ----------
function chrome() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-t]').forEach(el => el.innerHTML = t(el.dataset.t));
  if ($('#langBtn')) $('#langBtn').textContent = t('langBtn');
  if ($('#yr')) $('#yr').textContent = new Date().getFullYear();
  const h = location.hash || '#/';
  const link = (href, label) => `<a href="${href}" class="${h === href ? 'on' : ''}">${label}</a>`;
  if ($('#nav')) $('#nav').innerHTML = link('#/', t('home')) + CATS.map(c => link('#/shop/' + c.slug, esc(nm(c)))).join('') + link('#/advertise', t('advertise'));
  if ($('#footCats')) $('#footCats').innerHTML = CATS.map(c => `<a href="#/shop/${c.slug}">${esc(nm(c))}</a>`).join('');
  if (SETTINGS && $('#wa')) $('#wa').href = `https://wa.me/${SETTINGS.whatsapp}`;
  renderCart();
}

// ---------- Cart ----------
const saveCart = () => { localStorage.setItem('cart', JSON.stringify(cart)); renderCart(); };
function addToCart(p, qty = 1) {
  const ex = cart.find(i => i.id === p.id);
  if (ex) ex.qty = Math.min(p.stock, ex.qty + qty);
  else cart.push({ id: p.id, sku: p.sku, name_en: p.name_en, name_ar: p.name_ar, price: p.sale_price ?? p.price, image_url: p.image_url, images: p.images, category: p.category, qty: Math.min(p.stock, qty), stock: p.stock });
  saveCart(); toast(t('added')); openCart(true);
}
const subtotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
function renderCart() {
  if ($('#cartCount')) $('#cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
  if (!$('#cartItems')) return;
  if (!cart.length) { $('#cartItems').innerHTML = `<div class="empty"><p>${t('emptyBag')}</p><br><a class="btn sm" href="#/shop">${t('shopNow')}</a></div>`; if ($('#cartFoot')) $('#cartFoot').innerHTML = ''; return; }
  $('#cartItems').innerHTML = cart.map(i => `
    <div class="ln"><div class="th st-${i.category}">${imgOf(i)}</div>
      <div><div class="nm">${esc(nm(i))}</div><div class="note">${money(i.price)}</div>
        <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
          <div class="qty sm"><button data-dec="${i.id}" aria-label="−">−</button><input value="${i.qty}" readonly aria-label="qty"><button data-inc="${i.id}" aria-label="+">+</button></div>
          <button class="rm" data-rm="${i.id}">${t('remove')}</button></div></div>
      <b style="font-weight:500">${money(i.price * i.qty)}</b></div>`).join('');
  const st = subtotal(), lim = SETTINGS?.freeDeliveryOver ?? 300, free = st >= lim;
  if ($('#cartFoot')) {
    $('#cartFoot').innerHTML = `
      <div class="note">${free ? t('gotFree') : t('moreFree', { n: money(lim - st) })}</div>
      <div class="meter"><i style="width:${Math.min(100, st / lim * 100)}%"></i></div>
      <div class="row"><span>${t('subtotal')}</span><b style="font-weight:500">${money(st)}</b></div>
      <div class="row"><span>${t('delivery')}</span><span>${free ? t('free') : t('atCheckout')}</span></div>
      <a href="#/checkout" class="btn block" style="margin-top:12px">${t('checkout')}</a>`;
  }
}
document.addEventListener('click', e => {
  const d = e.target.closest('[data-inc],[data-dec],[data-rm],[data-add]')?.dataset;
  if (!d) return;
  if (d.inc) { const i = cart.find(x => x.id == d.inc); i.qty = Math.min(i.stock ?? 20, i.qty + 1); saveCart(); }
  if (d.dec) { const i = cart.find(x => x.id == d.dec); i.qty = Math.max(1, i.qty - 1); saveCart(); }
  if (d.rm) { cart = cart.filter(x => x.id != d.rm); saveCart(); }
  if (d.add) { const p = ALL.find(x => x.id == d.add); if (p) addToCart(p); }
});
function openCart(open) { $('#drawer')?.classList.toggle('open', open); $('#overlay')?.classList.toggle('open', open); }
if ($('#cartBtn')) $('#cartBtn').onclick = () => openCart(true);
if ($('#closeCart')) $('#closeCart').onclick = $('#overlay').onclick = () => openCart(false);
if ($('#menuBtn')) $('#menuBtn').onclick = () => $('#nav').classList.toggle('open');
if ($('#langBtn')) $('#langBtn').onclick = () => { lang = lang === 'en' ? 'ar' : 'en'; localStorage.setItem('lang', lang); route(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); });
let toastTimer;
function toast(msg) { const el = $('#toast'); if (!el) return; el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200); }

// ---------- Components ----------
function card(p) {
  const onSale = p.sale_price != null && p.sale_price < p.price;
  return `<article class="card">
    <div class="img st-${p.category}">
      ${onSale ? `<span class="flag">${t('sale')}</span>` : ''}
      <a class="cover" href="#/product/${p.id}" aria-label="${esc(nm(p))}">${imgOf(p)}</a>
      ${p.stock > 0 ? `<button class="quick" data-add="${p.id}" aria-label="${esc(t('addToBag'))}:${esc(nm(p))}">${ICON.bag}<span>${t('add')}</span></button>` : ''}
    </div>
    <div class="meta"><div class="brand">${esc(p.brand || '')}</div>
      <a href="#/product/${p.id}"><h3>${esc(nm(p))}</h3></a>
      ${p.stock > 0 ? `<div class="price"><b>${money(onSale ? p.sale_price : p.price)}</b>${onSale ? `<s>${money(p.price)}</s>` : ''}</div>` : `<span class="oos">${t('soldOut')}</span>`}
    </div></article>`;
}

// ---------- Pages ----------
const app = $('#app');

function heroHTML() {
  let slides = ADS.hero || [];
  if (!slides.length) slides = [{ id: 0, kind: 'house', title_en: 'Olive Fashion', title_ar: 'أوليف فاشن', subtitle_en: T.en.footAbout, subtitle_ar: T.ar.footAbout, cta_en: T.en.shopNow, cta_ar: T.ar.shopNow, link: '#/shop', art_sku: 'W-002', theme: 'night' }];
  slides.forEach(s => markSeen(s.id));
  return `<section class="hero" id="hero" aria-roledescription="carousel">
    ${slides.map((s, i) => `<div class="slide ${i ? '' : 'on'} t-${s.theme || 'night'} ${s.image_url ? 'has-img' : ''}" aria-hidden="${i ? 'true' : 'false'}">
      ${s.image_url ? `<div class="photo"><img src="${esc(Array.isArray(s.image_url) ? s.image_url[0] : s.image_url)}" alt=""></div>` : '<div class="bgp"></div>'}
      <div class="wrap"><div>${sponsorTag(s)}
        <h1 class="display">${esc(loc(s, 'title'))}</h1>
        <p class="lead">${esc(loc(s, 'subtitle'))}</p>
        <div class="ctas"><a class="btn ${s.theme === 'gold' || s.theme === 'pearl' ? '' : 'gold'}" href="${adHref(s)}" ${s.id ? adAttrs(s) : ''}>${esc(loc(s, 'cta') || t('learnMore'))}</a>${s.kind === 'house' ? `<a class="btn line" href="#/shop">${t('all')}</a>` : ''}</div></div>
        ${s.image_url ? '' : `<div class="arch"><div class="ring"></div><div class="frame"><div class="art">${adArt(s)}</div></div></div>`}
      </div></div>`).join('')}
    ${slides.length > 1 ? `<div class="hero-nav"><div class="wrap">${slides.map((s, i) => `<button class="${i ? '' : 'on'}" data-slide="${i}">${esc(loc(s, 'title'))}<i></i></button>`).join('')}</div></div>` : ''}
  </section>`;
}
function startHero() {
  clearInterval(heroTimer);
  const hero = $('#hero'); if (!hero) return;
  const slides = [...hero.querySelectorAll('.slide')], btns = [...hero.querySelectorAll('[data-slide]')];
  if (slides.length < 2) return;
  let cur = 0, paused = false;
  const go = i => {
    slides[cur].classList.remove('on'); slides[cur].setAttribute('aria-hidden', 'true');
    btns[cur].classList.remove('on'); cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('on'); slides[cur].setAttribute('aria-hidden', 'false');
    void btns[cur].offsetWidth; btns[cur].classList.add('on');
  };
  btns.forEach(b => b.onclick = () => { go(+b.dataset.slide); restart(); });
  const restart = () => { clearInterval(heroTimer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) heroTimer = setInterval(() => !paused && go(cur + 1), 6500); };
  hero.onmouseenter = () => { paused = true; hero.classList.add('paused'); };
  hero.onmouseleave = () => { paused = false; hero.classList.remove('paused'); };
  hero.style.setProperty('--dur', '6.5s');
  restart();
}

function pageHome() {
  const feat = [...ALL.filter(p => p.featured), ...ALL.filter(p => !p.featured && p.stock > 0)].slice(0, 8);
  const gifts = ALL.filter(p => (p.sale_price ?? p.price) <= 300 && p.stock > 0);
  const pair = ADS.home_pair || [];
  app.innerHTML = `${heroHTML()}
  <div class="trust"><div class="wrap">
    ${[['truck', 1], ['cash', 2], ['shield', 3], ['swap', 4]].map(([ic, n]) => `<div>${ICON[ic]}<span><b>${t('t' + n)}</b>${t('t' + n + 's')}</span></div>`).join('')}
  </div></div>
  <section class="block"><div class="wrap">
    <div class="sec-h"><div><h2 class="display">${t('catH')}</h2><p>${t('catP')}</p></div></div>
    <div class="cats">${CATS.map(c => `<a href="#/shop/${c.slug}" class="cat"><div class="a">${categoryArt(c.slug)}</div><h3>${esc(nm(c))}</h3><span>${t('items', { n: c.count })}</span></a>`).join('')}</div>
  </div></section>
  <section class="block" style="padding-top:0"><div class="wrap">
    <div class="sec-h"><div><h2 class="display">${t('newH')}</h2><p>${t('newP')}</p></div><a class="link" href="#/shop">${t('viewAll')}</a></div>
    <div class="grid">${feat.map(card).join('')}</div>
  </div></section>
  ${ADS.home_wide?.length ? `<section style="padding-bottom:88px"><div class="wrap">${slotBanner('home_wide')}</div></section>` : ''}
  ${gifts.length ? `<section class="block" style="padding-top:0"><div class="wrap">
    <div class="sec-h"><div><h2 class="display">${t('giftH')}</h2><p>${t('giftP')}</p></div></div>
    <div class="rail">${gifts.map(card).join('')}</div></div></section>` : ''}
  ${pair.length ? `<section style="padding-bottom:88px"><div class="wrap pair">${pair.slice(0, 2).map(a => bannerHTML(a)).join('')}</div></section>` : ''}
  <section class="block story"><div class="wrap">
    <div><h2 class="display">${t('storyH')}</h2><p>${t('storyP')}</p><br><a class="btn gold" href="#/shop">${t('shopNow')}</a></div>
    <ul>${[1, 2, 3].map(n => `<li><b>${t('s' + n)}</b><span>${t('s' + n + 's')}</span></li>`).join('')}</ul>
  </div></section>`;
  startHero();
}

async function pageShop(slug) {
  const cat = CATS.find(c => c.slug === slug);
  app.innerHTML = `<div class="phead"><div class="wrap"><div><h1 class="display">${cat ? esc(nm(cat)) : t('all')}</h1><p>${t('shopP')}</p></div>
      <div class="mini">${categoryArt(slug || 'watches')}</div></div></div>
    <div class="wrap">
      ${ADS.shop_top?.length ? `<div style="margin-top:36px">${slotBanner('shop_top', 'slim')}</div>` : ''}
      <div class="filters">
        <button class="chip ${!slug ? 'on' : ''}" data-cat="">${t('all')}</button>
        ${CATS.map(c => `<button class="chip ${slug === c.slug ? 'on' : ''}" data-cat="${c.slug}">${esc(nm(c))}</button>`).join('')}
        <span class="grow"></span>
        <input id="q" type="search" placeholder="${t('search')}" aria-label="${t('search')}">
        <select id="sort" aria-label="Sort"><option value="">${t('sortDef')}</option><option value="price_asc">${t('sortLow')}</option><option value="price_desc">${t('sortHigh')}</option></select>
      </div>
      <div class="grid" id="grid"></div><div style="height:90px"></div></div>`;
  const load = async () => {
    const qs = new URLSearchParams({ category: slug || '', q: $('#q').value, sort: $('#sort').value });
    const list = await api('/api/products?' + qs);
    $('#grid').innerHTML = list.length ? list.map(card).join('') : `<p class="empty" style="grid-column:1/-1">${t('noProducts')}</p>`;
  };
  let deb; $('#q').oninput = () => { clearTimeout(deb); deb = setTimeout(load, 250); };
  $('#sort').onchange = load;
  document.querySelectorAll('[data-cat]').forEach(ch => ch.onclick = () => location.hash = '#/shop' + (ch.dataset.cat ? '/' + ch.dataset.cat : ''));
  if (sessionStorage.getItem('focusSearch')) { sessionStorage.removeItem('focusSearch'); $('#q').focus(); }
  load();
}
if ($('#searchBtn')) $('#searchBtn').addEventListener('click', () => sessionStorage.setItem('focusSearch', 1));

async function pageProduct(id) {
  let p;
  try { p = await api('/api/products/' + id); } catch { app.innerHTML = `<p class="empty">${t('noProducts')}</p>`; return; }
  const onSale = p.sale_price != null && p.sale_price < p.price;
  const desc = (lang === 'ar' && p.description_ar) || p.description_en || '';
  const cat = CATS.find(c => c.slug === p.category);
  const related = ALL.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  app.innerHTML = `<div class="wrap"><div class="pdp">
    <div class="stage st-${p.category}">${imgOf(p)}</div>
    <div>
      <div class="crumb"><a href="#/">${t('home')}</a> / <a href="#/shop/${p.category}">${esc(cat ? nm(cat) : '')}</a></div>
      <div class="brand">${esc(p.brand || '')}</div>
      <h1 class="display">${esc(nm(p))}</h1>
      <div class="price"><b>${money(onSale ? p.sale_price : p.price)}</b>${onSale ? `<s>${money(p.price)}</s><span class="save">${t('save', { n: money(p.price - p.sale_price) })}</span>` : ''}</div>
      <p class="desc">${esc(desc)}</p>
      <div class="stock ${p.stock <= 0 ? 'out' : p.stock <= 5 ? 'low' : ''}">${p.stock <= 0 ? t('soldOut') : p.stock <= 5 ? t('left', { n: p.stock }) : t('inStock')}</div>
      ${p.stock > 0 ? `<div class="buy"><div class="qty"><button id="m" aria-label="−">−</button><input id="qn" value="1" readonly aria-label="qty"><button id="pl" aria-label="+">+</button></div>
        <button class="btn" id="addBtn" style="flex:1">${ICON.bag.replace('<svg', '<svg width="18" height="18"')}${t('addToBag')}</button></div>` : '<br>'}
      <ul class="perks"><li>${ICON.truck}${t('perk1')}</li><li>${ICON.cash}${t('perk2')}</li><li>${ICON.swap}${t('perk3')}</li></ul>
      ${ADS.product?.length ? `<div style="margin-top:28px">${slotBanner('product', 'slim')}</div>` : ''}
      <p class="note" style="margin-top:18px">SKU ${esc(p.sku)}</p>
    </div></div>
    ${related.length ? `<div class="sec-h"><h2 class="display">${t('also')}</h2></div><div class="grid">${related.map(card).join('')}</div><div style="height:90px"></div>` : ''}
  </div>`;
  if (p.stock > 0) {
    const q = $('#qn');
    $('#m').onclick = () => q.value = Math.max(1, +q.value - 1);
    $('#pl').onclick = () => q.value = Math.min(p.stock, +q.value + 1);
    $('#addBtn').onclick = () => addToCart(p, +q.value);
  }
}

function pageCheckout() {
  if (!cart.length) { app.innerHTML = `<div class="success"><p>${t('emptyBag')}</p><br><a class="btn" href="#/shop">${t('shopNow')}</a></div>`; return; }
  const zones = Object.keys(SETTINGS.zones);
  app.innerHTML = `<div class="wrap checkout">
    <form class="panel form" id="co" novalidate>
      <h2>${t('details')}</h2><div class="err" id="err" role="alert"></div>
      <label>${t('fullName')}<input name="name" required autocomplete="name"></label>
      <div class="two"><label>${t('phone')}<input name="phone" required inputmode="tel" placeholder="5512 3456" autocomplete="tel"></label>
        <label>${t('email')}<input name="email" type="email" autocomplete="email"></label></div>
      <label>${t('zone')}<select name="zone" id="zone" required><option value="">${t('chooseZone')}</option>
        ${zones.map(z => `<option value="${z}">${lang === 'ar' ? ZONE_AR[z] || z : z}</option>`).join('')}</select></label>
      <label>${t('address')}<textarea name="address" rows="2" required></textarea></label>
      <label>${t('notes')}<input name="notes"></label>
      <h2 style="margin:14px 0 0">${t('payment')}</h2>
      <div class="opts">
        <label><input type="radio" name="payment" value="cod" checked> ${t('cod')}</label>
        <label><input type="radio" name="payment" value="card_on_delivery"> ${t('cardDel')}</label>
        <label><input type="radio" name="payment" value="online"> ${t('online')}</label>
      </div>
      <button class="btn block" id="placeBtn" style="margin-top:10px">${t('placeOrder')}</button>
    </form>
    <aside class="panel">
      <h2>${t('summary')}</h2>
      ${cart.map(i => `<div class="ln" style="grid-template-columns:60px 1fr auto"><div class="th st-${i.category}" style="width:60px;height:64px">${imgOf(i)}</div><div class="nm">${esc(nm(i))}<div class="note">× ${i.qty}</div></div><span>${money(i.price * i.qty)}</span></div>`).join('')}
      <div style="margin-top:16px"><div class="row"><span>${t('subtotal')}</span><span>${money(subtotal())}</span></div>
      <div class="row"><span>${t('delivery')}</span><span id="fee">—</span></div>
      <div class="row total"><span>${t('total')}</span><span id="tot">${money(subtotal())}</span></div></div>
    </aside></div>`;
  const updFee = () => {
    const z = $('#zone').value, st = subtotal();
    if (!z) { $('#fee').textContent = '—'; $('#tot').textContent = money(st); return; }
    const fee = st >= SETTINGS.freeDeliveryOver ? 0 : SETTINGS.zones[z];
    $('#fee').textContent = fee ? money(fee) : t('free'); $('#tot').textContent = money(st + fee);
  };
  $('#zone').onchange = updFee;
  $('#co').onsubmit = async e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    $('#placeBtn').disabled = true; $('#err').classList.remove('show');
    try {
      const r = await api('/api/orders', { method: 'POST', body: JSON.stringify({ ...f, items: cart.map(i => ({ id: i.id, qty: i.qty })) }) });
      cart = []; saveCart(); location.hash = '#/thanks/' + r.orderNo;
    } catch (err) {
      $('#err').textContent = err.message; $('#err').classList.add('show'); $('#placeBtn').disabled = false;
      $('#err').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
}

const pageThanks = no => app.innerHTML = `<div class="success"><div class="seal">${ICON.check}</div><h1 class="display">${t('thanks')}</h1>
  <p class="muted" style="margin:16px 0 30px">${t('thanksP', { no: esc(no) })}</p>
  <a class="btn" href="#/shop">${t('continue')}</a> <a class="btn line" href="#/track">${t('track')}</a></div>`;

function pageTrack() {
  app.innerHTML = `<div class="wrap" style="max-width:600px;padding:64px 24px 96px">
    <div class="panel form"><h2>${t('track')}</h2><p class="muted">${t('trackP')}</p>
    <label>${t('orderNo')}<input id="ono" placeholder="OF…"></label>
    <label>${t('phone')}<input id="oph" inputmode="tel"></label>
    <button class="btn" id="tbtn">${t('check')}</button><div id="tres"></div></div></div>`;
  $('#tbtn').onclick = async () => {
    try {
      const o = await api(`/api/orders/track/${encodeURIComponent($('#ono').value.trim())}?phone=${encodeURIComponent($('#oph').value)}`);
      $('#tres').innerHTML = `<div class="okmsg"><b>${esc(o.order_no)}</b>: ${t('st_' + o.status)}<br><span class="note">${money(o.total)}, ${new Date(o.created_at + 'Z').toLocaleDateString(lang === 'ar' ? 'ar-QA' : 'en-GB')}</span></div>`;
    } catch (e) { $('#tres').innerHTML = `<div class="err show">${esc(e.message)}</div>`; }
  };
}

function pageContact() {
  app.innerHTML = `<div class="wrap" style="max-width:660px;padding:64px 24px 96px">
    <form class="panel form" id="cf"><h2>${t('contact')}</h2>
    <label>${t('fullName')}<input name="name" required></label>
    <div class="two"><label>${t('phone')}<input name="phone" inputmode="tel"></label><label>${t('email')}<input name="email" type="email"></label></div>
    <label>${t('message')}<textarea name="message" rows="5" required></textarea></label>
    <button class="btn">${t('send')}</button><div id="cres"></div></form></div>`;
  $('#cf').onsubmit = async e => {
    e.preventDefault();
    try { await api('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(e.target))) }); e.target.reset(); $('#cres').innerHTML = `<div class="okmsg">${t('sent')}</div>`; }
    catch (err) { $('#cres').innerHTML = `<div class="err show">${esc(err.message)}</div>`; }
  };
}

function pagePolicies() {
  const z = Object.entries(SETTINGS.zones).map(([k, v]) => `<div class="row" style="padding:10px 0;border-bottom:1px solid var(--line);margin:0"><span>${lang === 'ar' ? ZONE_AR[k] || k : k}</span><span>${money(v)}</span></div>`).join('');
  app.innerHTML = `<div class="wrap" style="max-width:760px;padding:64px 24px 96px"><div class="panel"><h2>${t('policies')}</h2>
    <p class="muted" style="margin-bottom:18px">${t('announce')}</p>${z}
    <ul class="perks" style="margin-top:22px"><li>${ICON.truck}${t('perk1')}</li><li>${ICON.cash}${t('perk2')}</li><li>${ICON.swap}${t('perk3')}</li></ul></div></div>`;
}

// ---------- Advertise ----------
function whereSVG(slot) {
  const R = (x, y, w, h, on) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" class="${on ? 'hl' : ''}"/>`;
  const page = {
    hero: R(4, 12, 112, 34, 1) + R(4, 50, 26, 16) + R(32, 50, 26, 16) + R(60, 50, 26, 16) + R(88, 50, 28, 16) + R(4, 70, 112, 14),
    home_wide: R(4, 12, 112, 24) + R(4, 40, 26, 14) + R(32, 40, 26, 14) + R(60, 40, 26, 14) + R(88, 40, 28, 14) + R(4, 58, 112, 26, 1),
    home_pair: R(4, 12, 112, 24) + R(4, 40, 26, 14) + R(32, 40, 26, 14) + R(60, 40, 26, 14) + R(88, 40, 28, 14) + R(4, 58, 55, 26, 1) + R(61, 58, 55, 26, 1),
    shop_top: R(4, 12, 112, 14) + R(4, 30, 112, 12, 1) + R(4, 46, 26, 18) + R(32, 46, 26, 18) + R(60, 46, 26, 18) + R(88, 46, 28, 18) + R(4, 68, 26, 16) + R(32, 68, 26, 16) + R(60, 68, 26, 16) + R(88, 68, 28, 16),
    product: R(4, 12, 60, 72) + R(70, 14, 46, 6) + R(70, 24, 30, 4) + R(70, 32, 46, 14) + R(70, 50, 46, 8) + R(70, 62, 46, 22, 1),
  }[slot];
  return `<svg class="where" viewBox="0 0 120 88" aria-hidden="true"><rect x="0" y="0" width="120" height="8" style="fill:#0F1A14"/>${page}</svg>`;
}

async function pageAdvertise() {
  const pk = await api('/api/ads/packages');
  const slots = pk.slots;
  let slot = sessionStorage.getItem('adSlot') || 'home_wide';
  const minDate = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
  const themes = { night: '#0F1A14', navy: '#0F1A2E', maroon: '#5A1426', olive: '#3C4F2E', gold: '#C9A86A', pearl: '#ECE8E1' };
  app.innerHTML = `
  <div class="phead"><div class="wrap"><div><h1 class="display">${t('advH')}</h1><p>${t('advP')}</p></div>
    <div class="mini">${categoryArt('perfumes')}</div></div></div>
  <div class="wrap">
    <div class="ad-intro">
      <div><h2 class="display">${t('advWhyH')}</h2><p>${t('advWhyP')}</p></div>
      <ol class="steps">${[1, 2, 3, 4].map(n => `<li><div><b>${t('step' + n)}</b><span>${t('step' + n + 's')}</span></div></li>`).join('')}</ol>
    </div>
    <div class="sec-h" style="margin:40px 0 0"><h2 class="display" style="font-size:36px">${t('spotsH')}</h2></div>
    <div class="packs">${slots.map(s => `<button type="button" class="pack ${s.key === slot ? 'on' : ''}" data-pack="${s.key}">${whereSVG(s.key)}
      <h4>${esc(lang === 'ar' ? s.name_ar : s.name_en)}</h4><div class="from">${t('from')} <b>${money(s.weekly)}</b>${t('perWeek')}</div><span class="note">${s.size}</span></button>`).join('')}</div>
    <div class="book">
      <form class="panel form" id="adf" novalidate>
        <h2>${t('bookH')}</h2><div class="err" id="aerr" role="alert"></div>
        <div class="two"><label>${t('company')}<input name="company" required></label><label>${t('contactName')}<input name="contact_name" required></label></div>
        <div class="two"><label>${t('phone')}<input name="phone" required inputmode="tel"></label><label>${t('email')}<input name="email" type="email"></label></div>
        <label>${t('spot')}<select name="slot" id="aslot">${slots.map(s => `<option value="${s.key}" ${s.key === slot ? 'selected' : ''}>${esc(lang === 'ar' ? s.name_ar : s.name_en)}</option>`).join('')}</select></label>
        <div><div style="font-size:14px;color:var(--muted);margin-bottom:7px">${t('weeksL')}</div>
          <div class="weeks">${Object.entries(pk.durations).map(([w, d], i) => `<label><input type="radio" name="weeks" value="${w}" ${i === 2 ? 'checked' : ''}>${t(+w === 1 ? 'wk' : 'wks', { n: w })}${d ? `<small>${t('off', { n: d * 100 })}</small>` : '<small>&nbsp;</small>'}</label>`).join('')}</div></div>
        <label>${t('startL')}<input type="date" name="start_date" min="${minDate}" value="${minDate}"></label>
        <label>${t('headEn')}<input name="title_en" maxlength="70" required></label>
        <label>${t('headAr')}<input name="title_ar" maxlength="70" dir="rtl"></label>
        <div class="two"><label>${t('subEn')}<input name="subtitle_en" maxlength="160"></label><label>${t('subAr')}<input name="subtitle_ar" maxlength="160" dir="rtl"></label></div>
        <div class="two"><label>${t('ctaL')}<input name="cta_en" maxlength="24" value="Learn more"></label><label>${t('linkL')}<input name="link_url" type="url" placeholder="https://"></label></div>
        <div><div style="font-size:14px;color:var(--muted);margin-bottom:7px">${t('themeL')}</div>
          <div class="swatches">${Object.entries(themes).map(([k, c], i) => `<label style="background:${c}" title="${k}"><input type="radio" name="theme" value="${k}" ${i ? '' : 'checked'}><span class="sr">${k}</span></label>`).join('')}</div></div>
        <label>${t('imgL')}</label><input type="file" id="aimg" accept="image/png,image/jpeg,image/webp" multiple><span class="note"> (Up to 4)</span>
        <div class="quote"><span>${t('totalL')}</span><b id="aquote"></b></div>
        <p class="note">${t('payAfter')}</p>
        <button class="btn block" id="abtn">${t('submitAd')}</button>
      </form>
      <div class="preview-wrap"><p class="note">${t('previewL')}</p><div id="apreview"></div></div>
    </div>
  </div>`;
  const form = $('#adf');
  let imgData = [];
  
  const val = () => Object.fromEntries(new FormData(form));
  const update = () => {
    const v = val(); slot = v.slot; sessionStorage.setItem('adSlot', slot);
    document.querySelectorAll('[data-pack]').forEach(b => b.classList.toggle('on', b.dataset.pack === slot));
    const s = slots.find(x => x.key === slot);
    if ($('#aquote') && s) $('#aquote').textContent = money(s.prices.find(p => p.weeks == v.weeks).price);
    const ad = { preview: true, kind: 'sponsored', advertiser: v.company || '…', theme: v.theme, image_url: imgData,
      title_en: v.title_en || T.en.sampleHead, title_ar: v.title_ar || (lang === 'ar' ? T.ar.sampleHead : ''), subtitle_en: v.subtitle_en || T.en.sampleSub, subtitle_ar: v.subtitle_ar || (lang === 'ar' ? T.ar.sampleSub : ''),
      cta_en: v.cta_en || T.en.learnMore, cta_ar: lang === 'ar' ? T.ar.learnMore : '' };
    if ($('#apreview')) $('#apreview').innerHTML = bannerHTML(ad, slot === 'shop_top' || slot === 'product' ? 'slim' : '');
  };
  
  form.oninput = form.onchange = update;
  document.querySelectorAll('[data-pack]').forEach(b => b.onclick = () => { $('#aslot').value = b.dataset.pack; update(); $('#adf').scrollIntoView({ behavior: 'smooth' }); });
  
  const aimgEl = $('#aimg');
  if (aimgEl) {
    aimgEl.onchange = async e => {
      const files = Array.from(e.target.files).slice(0, 4);
      if (!files.length) { imgData = []; return update(); }
      for (let f of files) {
        if (f.size > 3 * 1024 * 1024) { e.target.value = ''; toast('Each image must be under 3 MB'); return; }
      }
      imgData = await Promise.all(files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }));
      update();
    };
  }

  form.onsubmit = async e => {
    e.preventDefault();
    $('#abtn').disabled = true; $('#aerr').classList.remove('show');
    try {
      const v = val(); if (v.cta_en) v.cta_ar = v.cta_en === 'Learn more' ? 'اعرف المزيد' : v.cta_en;
      const r = await api('/api/ads/book', { method: 'POST', body: JSON.stringify({ ...v, image: imgData }) });
      app.innerHTML = `<div class="success"><div class="seal">${ICON.check}</div><h1 class="display">${t('advDone')}</h1>
        <p class="muted" style="margin:16px 0 30px">${t('advDoneP', { ref: esc(r.ref), phone: esc(v.phone), s: r.start_date, e: r.end_date, p: money(r.price) })}</p>
        <a class="btn" href="#/">${t('home')}</a></div>`;
      window.scrollTo(0, 0);
    } catch (err) {
      $('#aerr').textContent = err.message; $('#aerr').classList.add('show'); $('#abtn').disabled = false;
      $('#aerr').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  update();
}

// ---------- Router & App Initialization ----------
async function route() {
  if (typeof heroTimer !== 'undefined' && heroTimer) clearInterval(heroTimer);
  const [page, arg] = location.hash.replace(/^#\/?/, '').split('/');
  chrome(); 
  openCart(false); 
  $('#nav')?.classList.remove('open'); 
  window.scrollTo(0, 0);
  
  const pages = { 
    shop: () => pageShop(arg), 
    product: () => pageProduct(arg), 
    checkout: pageCheckout, 
    thanks: () => pageThanks(arg), 
    track: pageTrack, 
    contact: pageContact, 
    policies: pagePolicies, 
    advertise: pageAdvertise 
  };
  
  await (pages[page] || pageHome)();
  flushSeen();
}

window.addEventListener('hashchange', route);

// Safe Initialization
(async () => {
  try {
    const [c, s, p, a] = await Promise.all([
      api('/api/categories').catch(() => []),
      api('/api/settings').catch(() => ({ zones: {} })),
      api('/api/products').catch(() => []),
      api('/api/ads').catch(() => ({}))
    ]);
    CATS = Array.isArray(c) ? c : [];
    SETTINGS = s || { zones: {} };
    ALL = Array.isArray(p) ? p : [];
    ADS = a || {};
    route();
  } catch (e) {
    console.error("Initialization error:", e);
    route();
  }
})();