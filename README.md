# Olive Fashion — Online Store
**Powered by United Vision (UV) · Doha, Qatar**

A complete e-commerce website for watches, perfumes, men's wallets and ladies' accessories.

- **Storefront** — English / Arabic (full right-to-left), prices in QAR, category pages, search & sort, product pages, cart, checkout, order tracking, contact form, delivery & returns page, WhatsApp button. Mobile-friendly.
- **Qatar checkout** — Qatar mobile validation (+974, 8 digits), delivery fees by area (Doha, Al Rayyan, Lusail, Al Wakrah, Al Khor, etc.), free delivery over 300 QAR, Cash on delivery / Card on delivery / Online pay-link.
- **Admin panel** (`/admin`) — sales dashboard, orders (status updates, WhatsApp the customer, CSV export), products (add/edit, Arabic + English, sale prices, stock, up to 4 product photos, featured), categories, contact messages, change password.
- **Advertising** — other businesses can book paid banners on the site (see below).
- **Backend** — Node.js + Express with a built-in SQLite database (one file, no separate DB server). Stock is reduced on each order and restored if an order is cancelled.

## Advertising

**Ad spots and weekly prices** (change them in `SLOTS` at the top of `ads.js`):

| Spot | Recommended image | Price / week |
|---|---|---|
| Home page hero slider | 1600 × 900 px | 1,500 QAR |
| Home page wide banner | 1600 × 500 px | 900 QAR |
| Home page side banner | 900 × 600 px | 600 QAR |
| Shop pages top banner | 1600 × 360 px | 500 QAR |
| Product pages banner | 900 × 500 px | 350 QAR |

Bookings of 4 weeks get 10% off and 12 weeks get 20% off (`DURATIONS` in `ads.js`).

**How it works**
1. An advertiser opens **Advertise with us** (`/#/advertise`), picks a spot and dates, writes a headline or uploads a banner, and sees a live preview with the price.
2. The booking arrives in **Admin → Advertising** as *Waiting for review*. WhatsApp the advertiser from there, then send them a bank-transfer or card payment link.
3. Tick **Payment received** and press **Approve**. The ad goes live automatically on its start date and stops after its end date.
4. Views and clicks are counted for every ad, so you can report results to the advertiser.

Ads paid for by others always show a **"Sponsored by …"** label. You can also create your own promotions (no label) from **Create ad**. The site starts with eight of your own promotions so every spot looks finished; edit or pause them anytime.

---

## Run it on your computer

1. Install **Node.js 22 or newer** from https://nodejs.org
2. In this folder run:
   ```
   npm install
   npm start
   ```
3. Open **http://localhost:3000** (store) and **http://localhost:3000/admin** (admin).

**First admin login:** `admin@olivefashion.qa` / `ChangeMe123!` → change it right away under *Account*.
To set your own login before the first start: `ADMIN_EMAIL=you@company.qa ADMIN_PASSWORD=YourStrongPass npm start`

The store starts with 15 sample products — edit or delete them in the admin and upload your own photos.

## Settings to change

| What | Where |
|---|---|
| WhatsApp number | environment variable `WHATSAPP=974XXXXXXXX` |
| Delivery areas & fees, free-delivery threshold | `STORE` block at the top of `server.js` |
| Texts (English & Arabic), shop address | `T` object at the top of `public/app.js` |
| Colours & fonts | `:root` at the top of `public/styles.css` |

## Publish it online

Any host that runs Node.js works. Data (database + uploaded images) lives in the `data/` folder — make sure it's on persistent storage and back it up.

- **VPS (e.g. a Qatar/GCC cloud server, DigitalOcean, AWS Lightsail):** copy the folder, `npm install`, run with `pm2 start npm -- start`, put Nginx in front with a free Let's Encrypt SSL certificate.
- **Docker:** `docker build -t olive-fashion . && docker run -d -p 3000:3000 -v olive-data:/app/data -e WHATSAPP=974XXXXXXXX olive-fashion`
- **Render / Railway:** connect the repo, start command `npm start`, add a persistent disk mounted at `/app/data` (set `DATA_DIR` to it).

Then point your domain (e.g. `olivefashion.qa`) to the server.

## Before going live — checklist
- [ ] Change the admin password
- [ ] Set your real WhatsApp number and shop address
- [ ] Replace sample products and add real photos
- [ ] Confirm delivery fees per area
- [ ] **Online card payments:** the "Online payment" option currently records the order so your team can send a pay link. For automatic card payments, connect a Qatar payment gateway (e.g. QPay, CBQ / QNB merchant gateway, SkipCash, Tap, or MyFatoorah) — the hook point is `POST /api/orders` in `server.js`.
- [ ] Add your Commercial Registration (CR) number and return policy text if required
- [ ] Use HTTPS (SSL) on your domain
