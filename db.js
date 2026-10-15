// Database layer — uses Node's built-in SQLite (Node 22.5+), no native build needed.
const { DatabaseSync } = require('node:sqlite');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'store.db'));
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  sort INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  sku TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  brand TEXT,
  description_en TEXT,
  description_ar TEXT,
  price REAL NOT NULL,
  sale_price REAL,
  stock INTEGER NOT NULL DEFAULT 0,
  images TEXT DEFAULT '[]',
  featured INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_no TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  zone TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  payment_method TEXT NOT NULL,
  subtotal REAL NOT NULL,
  delivery_fee REAL NOT NULL,
  total REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  qty INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, phone TEXT, email TEXT, message TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
`);

function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(pw, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPassword(pw, stored) {
  const [salt, hash] = stored.split(':');
  const test = crypto.scryptSync(pw, salt, 64);
  return crypto.timingSafeEqual(test, Buffer.from(hash, 'hex'));
}

// ---------- Seed data (only on first run) ----------
function seed() {
  const hasCats = db.prepare('SELECT COUNT(*) c FROM categories').get().c;
  if (!hasCats) {
    const ins = db.prepare('INSERT INTO categories (slug,name_en,name_ar,sort) VALUES (?,?,?,?)');
    [
      ['watches', 'Watches', 'ساعات', 1],
      ['perfumes', 'Perfumes', 'عطور', 2],
      ['mens-wallets', "Men's Wallets", 'محافظ رجالية', 3],
      ['ladies-accessories', "Ladies' Accessories", 'إكسسوارات نسائية', 4],
    ].forEach(r => ins.run(...r));

    const cat = slug => db.prepare('SELECT id FROM categories WHERE slug=?').get(slug).id;
    const p = db.prepare(`INSERT INTO products
      (category_id,sku,name_en,name_ar,brand,description_en,description_ar,price,sale_price,stock,featured)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
    const items = [
      ['watches','W-001','Classic Steel Chronograph','ساعة كرونوغراف ستيل كلاسيك','UV Timepieces','Stainless steel case, sapphire glass, 100m water resistance.','هيكل من الستانلس ستيل، زجاج سافير، مقاومة للماء حتى 100 متر.',1250,1090,12,1],
      ['watches','W-002','Midnight Leather Automatic','ساعة أوتوماتيك جلد ميدنايت','UV Timepieces','Automatic movement with exhibition caseback and Italian leather strap.','حركة أوتوماتيكية مع ظهر شفاف وسوار جلد إيطالي.',1890,null,8,1],
      ['watches','W-003','Rose Gold Ladies Watch','ساعة نسائية ذهبي وردي','Olive','Slim rose-gold case with mother-of-pearl dial.','هيكل نحيف بلون الذهب الوردي مع ميناء من الصدف.',980,null,15,0],
      ['watches','W-004','Desert Sport Diver','ساعة غوص ديزرت سبورت','UV Timepieces','Rotating bezel, luminous hands, rubber strap.','إطار دوار، عقارب مضيئة، سوار مطاطي.',760,690,20,0],
      ['perfumes','P-001','Oud Al Doha 100ml','عود الدوحة 100 مل','Olive Parfums','Rich oud with amber, saffron and rose. Eau de Parfum.','عود فاخر مع العنبر والزعفران والورد. ماء عطر.',420,null,30,1],
      ['perfumes','P-002','Pearl Musk 75ml','مسك اللؤلؤ 75 مل','Olive Parfums','Soft white musk with jasmine and vanilla.','مسك أبيض ناعم مع الياسمين والفانيليا.',310,275,25,1],
      ['perfumes','P-003','Royal Bakhoor Set','طقم بخور ملكي','Olive Parfums','Premium bakhoor with a gold-finish mabkhara.','بخور فاخر مع مبخرة بلمسة ذهبية.',260,null,18,0],
      ['perfumes','P-004','Citrus Breeze for Men 100ml','نسيم الحمضيات للرجال 100 مل','UV Fragrance','Fresh bergamot, vetiver and cedarwood.','برغموت منعش مع نجيل الهند وخشب الأرز.',290,null,22,0],
      ['mens-wallets','MW-001','Slim Bifold Leather Wallet','محفظة جلد رفيعة','UV Leather','Full-grain leather, 6 card slots, RFID protection.','جلد طبيعي، 6 جيوب للبطاقات، حماية RFID.',220,189,40,1],
      ['mens-wallets','MW-002','Carbon Card Holder','حامل بطاقات كربون','UV Leather','Minimal carbon-fibre card holder with money clip.','حامل بطاقات بسيط من ألياف الكربون مع مشبك نقود.',150,null,35,0],
      ['mens-wallets','MW-003','Executive Long Wallet','محفظة طويلة إكزيكيوتيف','UV Leather','Long wallet with zip coin pocket and passport sleeve.','محفظة طويلة مع جيب للعملات وجيب لجواز السفر.',340,null,14,0],
      ['ladies-accessories','LA-001','Pearl Drop Earrings','أقراط لؤلؤ متدلية','Olive','Freshwater pearls on 18k gold-plated hooks.','لؤلؤ طبيعي على خطافات مطلية بالذهب عيار 18.',180,null,26,1],
      ['ladies-accessories','LA-002','Gold Chain Bracelet','سوار سلسلة ذهبي','Olive','Delicate gold-tone chain bracelet with clasp.','سوار سلسلة رقيق بلون ذهبي مع قفل.',140,119,30,0],
      ['ladies-accessories','LA-003','Silk Print Scarf','وشاح حرير مطبوع','Olive','100% silk scarf with olive-branch print.','وشاح من الحرير 100٪ بنقشة غصن الزيتون.',230,null,16,1],
      ['ladies-accessories','LA-004','Mini Crossbody Bag','حقيبة كروس صغيرة','Olive','Structured mini bag with detachable gold chain.','حقيبة صغيرة مع سلسلة ذهبية قابلة للفصل.',490,420,10,0],
    ];
    for (const it of items) p.run(cat(it[0]), ...it.slice(1));
  }

  const hasAdmin = db.prepare('SELECT COUNT(*) c FROM admins').get().c;
  if (!hasAdmin) {
    const email = process.env.ADMIN_EMAIL || 'admin@olivefashion.qa';
    const pw = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
    db.prepare('INSERT INTO admins (email,password_hash) VALUES (?,?)').run(email, hashPassword(pw));
    console.log(`Admin created: ${email}  (change the password after first login)`);
  }
}
seed();

module.exports = { db, hashPassword, verifyPassword };
