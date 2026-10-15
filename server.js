// Olive Fashion — powered by United Vision (UV)
// Express backend: public store API + admin API.
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { db, hashPassword, verifyPassword } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(process.env.DATA_DIR || path.join(__dirname, 'data'), 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(express.json({ limit: '6mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Store settings (Qatar) ----------
const STORE = {
  currency: 'QAR',
  freeDeliveryOver: 300,
  zones: {
    'Doha': 15, 'Al Rayyan': 15, 'Lusail': 20, 'Al Wakrah': 20, 'Umm Salal': 20,
    'Al Daayen': 20, 'Al Khor': 30, 'Mesaieed': 30, 'Al Shamal': 40, 'Al Shahaniya': 35,
  },
  payments: ['cod', 'card_on_delivery', 'online'],
  whatsapp: process.env.WHATSAPP || '97400000000',
};
const QA_PHONE = /^(\+?974)?[3567]\d{7}$/; // Qatar mobile numbers

// ---------- Helpers ----------
const bad = (res, msg, code = 400) => res.status(code).json({ error: msg });
const productRow = r => r && ({ ...r, featured: !!r.featured, active: !!r.active });

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const s = token && db.prepare('SELECT * FROM sessions WHERE token=?').get(token);
  if (!s || s.expires_at < Date.now()) return bad(res, 'Unauthorized', 401);
  req.adminId = s.admin_id;
  next();
}

// simple in-memory rate limit for login/checkout
const hits = new Map();
function limit(max, windowMs) {
  return (req, res, next) => {
    const key = req.ip + req.path;
    const now = Date.now();
    const arr = (hits.get(key) || []).filter(t => now - t < windowMs);
    if (arr.length >= max) return bad(res, 'Too many requests, try again shortly', 429);
    arr.push(now); hits.set(key, arr); next();
  };
}

// ================= PUBLIC API =================
app.get('/api/settings', (req, res) => res.json(STORE));

app.get('/api/categories', (req, res) => {
  res.json(db.prepare(`SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id=c.id AND p.active=1) AS count
                       FROM categories c ORDER BY sort`).all());
});

app.get('/api/products', (req, res) => {
  const { category, q, featured, sort } = req.query;
  let sql = `SELECT p.*, c.slug AS category FROM products p JOIN categories c ON c.id=p.category_id WHERE p.active=1`;
  const args = [];
  if (category) { sql += ' AND c.slug=?'; args.push(category); }
  if (featured) sql += ' AND p.featured=1';
  if (q) { sql += ' AND (p.name_en LIKE ? OR p.name_ar LIKE ? OR p.brand LIKE ?)'; args.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  sql += {
    price_asc: ' ORDER BY COALESCE(p.sale_price,p.price) ASC',
    price_desc: ' ORDER BY COALESCE(p.sale_price,p.price) DESC',
  }[sort] || ' ORDER BY p.featured DESC, p.id DESC';
  res.json(db.prepare(sql).all(...args).map(productRow));
});

app.get('/api/products/:id', (req, res) => {
  const p = db.prepare(`SELECT p.*, c.slug AS category FROM products p JOIN categories c ON c.id=p.category_id
                        WHERE p.id=? AND p.active=1`).get(req.params.id);
  p ? res.json(productRow(p)) : bad(res, 'Not found', 404);
});

app.post('/api/orders', limit(10, 60_000), (req, res) => {
  const { name, phone, email, zone, address, notes, payment, items } = req.body || {};
  if (!name || !address) return bad(res, 'Name and address are required');
  const rawPhone = String(phone || '').replace(/[\s-]/g, '');
  if (!QA_PHONE.test(rawPhone)) return bad(res, 'Please enter a valid Qatar mobile number');
  const cleanPhone = '974' + rawPhone.slice(-8);
  if (!(zone in STORE.zones)) return bad(res, 'Please choose a delivery area');
  if (!STORE.payments.includes(payment)) return bad(res, 'Invalid payment method');
  if (!Array.isArray(items) || !items.length) return bad(res, 'Your cart is empty');

  try {
    db.exec('BEGIN');
    let subtotal = 0;
    const lines = [];
    for (const it of items) {
      const qty = Math.max(1, Math.min(20, parseInt(it.qty) || 1));
      const p = db.prepare('SELECT * FROM products WHERE id=? AND active=1').get(it.id);
      if (!p) throw new Error('A product in your cart is no longer available');
      if (p.stock < qty) throw new Error(`Only ${p.stock} left of "${p.name_en}"`);
      const price = p.sale_price ?? p.price;
      subtotal += price * qty;
      lines.push({ p, qty, price });
    }
    const fee = subtotal >= STORE.freeDeliveryOver ? 0 : STORE.zones[zone];
    const orderNo = 'OF' + Date.now().toString().slice(-8) + crypto.randomInt(10, 99);
    const r = db.prepare(`INSERT INTO orders (order_no,customer_name,phone,email,zone,address,notes,payment_method,subtotal,delivery_fee,total)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`).run(orderNo, name, cleanPhone, email || null, zone, address, notes || null,
      payment, subtotal, fee, subtotal + fee);
    const oid = r.lastInsertRowid;
    for (const l of lines) {
      db.prepare('INSERT INTO order_items (order_id,product_id,name,price,qty) VALUES (?,?,?,?,?)').run(oid, l.p.id, l.p.name_en, l.price, l.qty);
      db.prepare('UPDATE products SET stock=stock-? WHERE id=?').run(l.qty, l.p.id);
    }
    db.exec('COMMIT');
    res.json({ orderNo, subtotal, deliveryFee: fee, total: subtotal + fee });
  } catch (e) {
    db.exec('ROLLBACK');
    bad(res, e.message);
  }
});

app.get('/api/orders/track/:orderNo', (req, res) => {
  const phone = String(req.query.phone || '').replace(/[\s-]/g, '');
  const o = db.prepare('SELECT order_no,status,total,created_at,phone FROM orders WHERE order_no=?').get(req.params.orderNo);
  if (!o || !o.phone.endsWith(phone.slice(-8))) return bad(res, 'Order not found', 404);
  delete o.phone;
  res.json(o);
});

app.post('/api/contact', limit(5, 60_000), (req, res) => {
  const { name, phone, email, message } = req.body || {};
  if (!name || !message) return bad(res, 'Name and message are required');
  db.prepare('INSERT INTO messages (name,phone,email,message) VALUES (?,?,?,?)').run(name, phone || '', email || '', message);
  res.json({ ok: true });
});

// ================= ADMIN API =================
app.post('/api/admin/login', limit(8, 5 * 60_000), (req, res) => {
  const { email, password } = req.body || {};
  const a = db.prepare('SELECT * FROM admins WHERE email=?').get(email || '');
  if (!a || !verifyPassword(password || '', a.password_hash)) return bad(res, 'Wrong email or password', 401);
  const token = crypto.randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions (token,admin_id,expires_at) VALUES (?,?,?)').run(token, a.id, Date.now() + 12 * 3600_000);
  res.json({ token, email: a.email });
});

app.post('/api/admin/logout', auth, (req, res) => {
  db.prepare('DELETE FROM sessions WHERE token=?').run(req.headers.authorization.replace('Bearer ', ''));
  res.json({ ok: true });
});

app.post('/api/admin/password', auth, (req, res) => {
  const { current, next } = req.body || {};
  const a = db.prepare('SELECT * FROM admins WHERE id=?').get(req.adminId);
  if (!verifyPassword(current || '', a.password_hash)) return bad(res, 'Current password is wrong');
  if (!next || next.length < 8) return bad(res, 'New password must be at least 8 characters');
  db.prepare('UPDATE admins SET password_hash=? WHERE id=?').run(hashPassword(next), a.id);
  res.json({ ok: true });
});

app.get('/api/admin/stats', auth, (req, res) => {
  const one = sql => db.prepare(sql).get();
  res.json({
    revenue: one(`SELECT COALESCE(SUM(total),0) v FROM orders WHERE status!='cancelled'`).v,
    revenue30: one(`SELECT COALESCE(SUM(total),0) v FROM orders WHERE status!='cancelled' AND created_at>=datetime('now','-30 days')`).v,
    orders: one('SELECT COUNT(*) v FROM orders').v,
    pending: one(`SELECT COUNT(*) v FROM orders WHERE status='pending'`).v,
    products: one('SELECT COUNT(*) v FROM products').v,
    lowStock: db.prepare('SELECT id,name_en,stock FROM products WHERE stock<=5 AND active=1 ORDER BY stock').all(),
    byCategory: db.prepare(`SELECT c.name_en name, COALESCE(SUM(oi.price*oi.qty),0) sales
      FROM categories c LEFT JOIN products p ON p.category_id=c.id
      LEFT JOIN order_items oi ON oi.product_id=p.id
      LEFT JOIN orders o ON o.id=oi.order_id AND o.status!='cancelled'
      GROUP BY c.id ORDER BY c.sort`).all(),
    messages: one('SELECT COUNT(*) v FROM messages').v,
  });
});

// Products CRUD
app.get('/api/admin/products', auth, (req, res) => {
  res.json(db.prepare(`SELECT p.*, c.name_en AS category_name FROM products p JOIN categories c ON c.id=p.category_id ORDER BY p.id DESC`).all().map(productRow));
});

const PRODUCT_FIELDS = ['category_id','sku','name_en','name_ar','brand','description_en','description_ar','price','sale_price','stock','image_url','featured','active'];
function productValues(b) {
  if (!b.sku || !b.name_en || !b.category_id || !(Number(b.price) > 0)) throw new Error('SKU, English name, category and price are required');
  return PRODUCT_FIELDS.map(f => {
    let v = b[f];
    if (f === 'featured' || f === 'active') return v ? 1 : 0;
    if (f === 'sale_price') return v === '' || v == null ? null : Number(v);
    if (f === 'price' || f === 'stock' || f === 'category_id') return Number(v) || 0;
    return v ?? '';
  });
}

app.post('/api/admin/products', auth, (req, res) => {
  try {
    const r = db.prepare(`INSERT INTO products (${PRODUCT_FIELDS.join(',')}) VALUES (${PRODUCT_FIELDS.map(() => '?').join(',')})`).run(...productValues(req.body));
    res.json({ id: r.lastInsertRowid });
  } catch (e) { bad(res, e.message.includes('UNIQUE') ? 'That SKU already exists' : e.message); }
});

app.put('/api/admin/products/:id', auth, (req, res) => {
  try {
    db.prepare(`UPDATE products SET ${PRODUCT_FIELDS.map(f => f + '=?').join(',')} WHERE id=?`).run(...productValues(req.body), req.params.id);
    res.json({ ok: true });
  } catch (e) { bad(res, e.message.includes('UNIQUE') ? 'That SKU already exists' : e.message); }
});

app.delete('/api/admin/products/:id', auth, (req, res) => {
  const used = db.prepare('SELECT COUNT(*) c FROM order_items WHERE product_id=?').get(req.params.id).c;
  if (used) { db.prepare('UPDATE products SET active=0 WHERE id=?').run(req.params.id); return res.json({ archived: true }); }
  db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
  res.json({ deleted: true });
});

// Image upload (base64 data URL from the admin form)
app.post('/api/admin/upload', auth, (req, res) => {
  const m = /^data:image\/(png|jpe?g|webp);base64,(.+)$/.exec(req.body?.dataUrl || '');
  if (!m) return bad(res, 'Upload a PNG, JPG or WEBP image');
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 4 * 1024 * 1024) return bad(res, 'Image must be under 4 MB');
  const name = crypto.randomBytes(8).toString('hex') + '.' + m[1].replace('jpeg', 'jpg');
  fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
  res.json({ url: '/uploads/' + name });
});

// Categories
app.get('/api/admin/categories', auth, (req, res) => res.json(db.prepare('SELECT * FROM categories ORDER BY sort').all()));
app.post('/api/admin/categories', auth, (req, res) => {
  const { slug, name_en, name_ar, sort } = req.body || {};
  if (!slug || !name_en || !name_ar) return bad(res, 'Slug, English and Arabic names are required');
  try {
    const r = db.prepare('INSERT INTO categories (slug,name_en,name_ar,sort) VALUES (?,?,?,?)').run(slug, name_en, name_ar, Number(sort) || 0);
    res.json({ id: r.lastInsertRowid });
  } catch { bad(res, 'That slug already exists'); }
});

// Orders
app.get('/api/admin/orders', auth, (req, res) => {
  const { status } = req.query;
  const rows = status
    ? db.prepare('SELECT * FROM orders WHERE status=? ORDER BY id DESC').all(status)
    : db.prepare('SELECT * FROM orders ORDER BY id DESC LIMIT 500').all();
  res.json(rows);
});
app.get('/api/admin/orders/:id', auth, (req, res) => {
  const o = db.prepare('SELECT * FROM orders WHERE id=?').get(req.params.id);
  if (!o) return bad(res, 'Not found', 404);
  o.items = db.prepare('SELECT * FROM order_items WHERE order_id=?').all(o.id);
  res.json(o);
});
const STATUSES = ['pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'];
app.patch('/api/admin/orders/:id', auth, (req, res) => {
  const { status } = req.body || {};
  if (!STATUSES.includes(status)) return bad(res, 'Invalid status');
  const o = db.prepare('SELECT * FROM orders WHERE id=?').get(req.params.id);
  if (!o) return bad(res, 'Not found', 404);
  // return stock if an order is cancelled
  if (status === 'cancelled' && o.status !== 'cancelled') {
    for (const it of db.prepare('SELECT * FROM order_items WHERE order_id=?').all(o.id))
      db.prepare('UPDATE products SET stock=stock+? WHERE id=?').run(it.qty, it.product_id);
  }
  db.prepare('UPDATE orders SET status=? WHERE id=?').run(status, o.id);
  res.json({ ok: true });
});

app.get('/api/admin/messages', auth, (req, res) => res.json(db.prepare('SELECT * FROM messages ORDER BY id DESC').all()));

// Advertising (slots, bookings, tracking)
require('./ads')(app, { db, auth, limit, bad, UPLOAD_DIR });

// SPA fallbacks
app.get('/admin*', (req, res) => res.sendFile(path.join(__dirname, 'public/admin/index.html')));
app.get(/^\/(?!api|uploads).*/, (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`Olive Fashion store running → http://localhost:${PORT}  (admin: /admin)`));
