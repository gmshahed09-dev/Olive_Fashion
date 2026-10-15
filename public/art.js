// Illustrated product renders, used until real photos are uploaded in the admin.
// Each product gets its own materials (metal, dial, leather, glass) from its SKU.
(function () {
  let uid = 0;
  const hash = s => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pick = (arr, s) => arr[hash(s) % arr.length];
  const shadow = (rx = 48) => `<ellipse cx="100" cy="188" rx="${rx}" ry="6" fill="#0d1610" opacity=".16"/>`;

  const METAL = {
    steel: ['#f7f8f9', '#a4a9b0', '#eceef1', '#6f757d'],
    gold:  ['#fff1c9', '#c3963d', '#f5da92', '#7f5a1c'],
    rose:  ['#fbe2d7', '#bd826c', '#f3c9b7', '#85503f'],
    black: ['#5a5d63', '#1d1f22', '#44474c', '#0e0f11'],
  };
  const metalGrad = (id, m) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${METAL[m].map((c, i) => `<stop offset="${[0, .42, .68, 1][i]}" stop-color="${c}"/>`).join('')}</linearGradient>`;

  // ---------- Watch ----------
  function watch(o) {
    const u = ++uid, m = `m${u}`, d = `d${u}`, s = `s${u}`;
    const dial = { navy: ['#3a5584', '#14223f'], black: ['#3b3e44', '#0f1012'], white: ['#ffffff', '#e4dfd3'], green: ['#3d6b52', '#13281c'], pearl: ['#ffffff', '#e8dfe6'] }[o.dial];
    const strapCol = { brown: ['#8a5634', '#4b2a17'], black: ['#2b2b2e', '#0f0f10'], rubber: ['#2f3a40', '#151b1f'], olive: ['#56653b', '#2a331c'] }[o.strap];
    const light = o.dial === 'white' || o.dial === 'pearl';
    const mark = light ? '#2a2a2a' : (o.metal === 'steel' ? '#e9ecef' : METAL[o.metal][2]);
    const bracelet = o.strap === 'bracelet';
    const strap = (y0, y1, top) => bracelet
      ? Array.from({ length: 5 }, (_, i) => `<rect x="80" y="${y0 + i * 10.4}" width="40" height="9.4" rx="2" fill="url(#${m})" stroke="${METAL[o.metal][3]}" stroke-opacity=".4"/><path d="M93 ${y0 + i * 10.4}v9.4M107 ${y0 + i * 10.4}v9.4" stroke="${METAL[o.metal][3]}" stroke-opacity=".35"/>`).join('')
      : `<path d="${top ? 'M78 14h44l-3 52h-38z' : 'M81 134h38l3 52h-44z'}" fill="url(#${s})"/>
         <path d="${top ? 'M84 20v40M116 20v40' : 'M85 140v40M115 140v40'}" stroke="#fff" stroke-opacity=".18" stroke-dasharray="2 3"/>`;
    const ticks = Array.from({ length: 12 }, (_, i) => `<rect x="${i % 3 ? 99.2 : 98.5}" y="64" width="${i % 3 ? 1.6 : 3}" height="${i % 3 ? 5 : 9}" rx=".8" fill="${mark}" transform="rotate(${i * 30} 100 100)"/>`).join('');
    const bezel = o.diver
      ? `<circle cx="100" cy="100" r="45" fill="#14191d"/>${Array.from({ length: 12 }, (_, i) => `<rect x="99" y="56.5" width="2" height="${i ? 4 : 6}" fill="${i ? '#cfd4d9' : '#c9a86a'}" transform="rotate(${i * 30} 100 100)"/>`).join('')}`
      : `<circle cx="100" cy="100" r="45" fill="url(#${m})" transform="rotate(180 100 100)"/>`;
    const sub = o.chrono ? [[86, 104], [114, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="none" stroke="${mark}" stroke-opacity=".55"/><path d="M${x} ${y}v-5" stroke="${mark}" stroke-width="1.2"/>`).join('') : '';
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs>${metalGrad(m, o.metal)}
      <radialGradient id="${d}" cx=".38" cy=".32" r=".85"><stop offset="0" stop-color="${dial[0]}"/><stop offset="1" stop-color="${dial[1]}"/></radialGradient>
      <linearGradient id="${s}" x1="0" x2="1"><stop offset="0" stop-color="${strapCol?.[1]}"/><stop offset=".5" stop-color="${strapCol?.[0]}"/><stop offset="1" stop-color="${strapCol?.[1]}"/></linearGradient></defs>
      ${shadow(44)}${strap(14, 0, true)}${strap(136, 0, false)}
      <rect x="146" y="93" width="9" height="14" rx="2.5" fill="url(#${m})"/>
      <circle cx="100" cy="100" r="51" fill="url(#${m})"/>${bezel}
      <circle cx="100" cy="100" r="40" fill="url(#${d})"/>${ticks}${sub}
      <text x="100" y="86" text-anchor="middle" font-family="Bodoni Moda,serif" font-size="7" fill="${mark}" opacity=".85">${o.mark || 'UV'}</text>
      <path d="M100 100 L100 77" stroke="${mark}" stroke-width="3.4" stroke-linecap="round" transform="rotate(-58 100 100)"/>
      <path d="M100 100 L100 67" stroke="${mark}" stroke-width="2.2" stroke-linecap="round" transform="rotate(52 100 100)"/>
      <path d="M100 108 L100 66" stroke="${o.metal === 'steel' ? '#c9a86a' : '#b23a3a'}" stroke-width="1" transform="rotate(158 100 100)"/>
      <circle cx="100" cy="100" r="3" fill="${METAL[o.metal][1]}"/>
      <path d="M68 78a40 40 0 0 1 46-20" stroke="#fff" stroke-opacity=".22" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
  }

  // ---------- Perfume ----------
  function perfume(o) {
    const u = ++uid, g = `g${u}`, c = `c${u}`;
    const L = { amber: ['#f6c46b', '#a4581a', '#5c2a0b'], pearl: ['#fdf1f1', '#e9c3cc', '#b98a96'], blue: ['#bfe2f3', '#3f86b3', '#1b4767'], smoke: ['#d7d2c8', '#6e6458', '#2c2620'] }[o.liquid];
    const defs = `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${L[2]}"/><stop offset=".28" stop-color="${L[1]}"/><stop offset=".55" stop-color="${L[0]}"/><stop offset="1" stop-color="${L[2]}"/></linearGradient>${metalGrad(c, o.cap)}</defs>`;
    let body;
    if (o.shape === 'round') body = `
      <rect x="84" y="28" width="32" height="40" rx="4" fill="url(#${c})"/><rect x="90" y="66" width="20" height="10" fill="url(#${c})"/>
      <circle cx="100" cy="128" r="56" fill="url(#${g})"/><circle cx="100" cy="128" r="56" fill="none" stroke="#fff" stroke-opacity=".35"/>
      <path d="M62 104a46 46 0 0 1 30-28" stroke="#fff" stroke-opacity=".5" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="132" r="20" fill="#fff" fill-opacity=".82"/><text x="100" y="135" text-anchor="middle" font-family="Bodoni Moda,serif" font-size="8" fill="#3a2a30">${o.label}</text>`;
    else if (o.shape === 'tall') body = `
      <rect x="80" y="18" width="40" height="34" rx="3" fill="url(#${c})"/><rect x="92" y="50" width="16" height="10" fill="url(#${c})"/>
      <rect x="62" y="58" width="76" height="126" rx="6" fill="url(#${g})"/><rect x="62" y="58" width="76" height="126" rx="6" fill="none" stroke="#fff" stroke-opacity=".35"/>
      <rect x="70" y="66" width="8" height="110" rx="4" fill="#fff" opacity=".35"/>
      <rect x="78" y="120" width="44" height="22" fill="#fff" fill-opacity=".85"/><text x="100" y="134" text-anchor="middle" font-family="Bodoni Moda,serif" font-size="8" fill="#1b2b3a">${o.label}</text>`;
    else body = `
      <rect x="74" y="20" width="52" height="42" rx="5" fill="url(#${c})"/><path d="M80 32h40M80 50h40" stroke="#fff" stroke-opacity=".35"/>
      <rect x="88" y="60" width="24" height="10" fill="url(#${c})"/>
      <rect x="40" y="68" width="120" height="116" rx="16" fill="url(#${g})"/><rect x="46" y="74" width="108" height="104" rx="12" fill="none" stroke="#fff" stroke-opacity=".3"/>
      <rect x="52" y="80" width="10" height="92" rx="5" fill="#fff" opacity=".38"/>
      <rect x="70" y="112" width="60" height="34" fill="#0f1a14" fill-opacity=".72" stroke="#d9bc7f"/><text x="100" y="133" text-anchor="middle" font-family="Bodoni Moda,serif" font-size="10" fill="#e8cf96" letter-spacing="1">${o.label}</text>`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs}${shadow(o.shape === 'tall' ? 40 : 56)}${body}</svg>`;
  }

  function mabkhara() {
    const u = ++uid, c = `c${u}`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs>${metalGrad(c, 'gold')}</defs>${shadow(46)}
      <path d="M100 52c-10-10 8-16 0-28M112 50c-8-8 6-12 0-22M88 50c-6-8 6-12 0-20" stroke="#8b8174" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M70 70h60l-6-12H76z" fill="url(#${c})"/><rect x="66" y="70" width="68" height="62" rx="3" fill="#1f2a1f"/>
      <rect x="66" y="70" width="68" height="62" rx="3" fill="none" stroke="url(#${c})" stroke-width="5"/>
      ${[0, 1, 2].map(i => `<path d="M${80 + i * 20} 84l6 8-6 8-6-8z" fill="url(#${c})"/>`).join('')}
      <path d="M78 132h44l10 30H68z" fill="url(#${c})"/><rect x="60" y="162" width="80" height="14" rx="3" fill="url(#${c})"/>
      <path d="M78 140h44" stroke="#fff" stroke-opacity=".35"/></svg>`;
  }

  // ---------- Wallets ----------
  function wallet(o) {
    const u = ++uid, l = `l${u}`, p = `p${u}`;
    const C = { brown: ['#9a6239', '#5a341c'], black: ['#3a3a3d', '#121214'], tan: ['#c58f5b', '#7d5230'] }[o.leather || 'black'];
    const defs = `<defs><linearGradient id="${l}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C[0]}"/><stop offset="1" stop-color="${C[1]}"/></linearGradient>
      <pattern id="${p}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#1a1b1e"/><rect width="4" height="8" fill="#2c2e33"/></pattern></defs>`;
    if (o.type === 'card') return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs}${shadow(44)}
      <rect x="62" y="40" width="80" height="50" rx="5" fill="#c9a86a" transform="rotate(-8 100 70)"/>
      <rect x="54" y="62" width="92" height="116" rx="8" fill="url(#${p})"/><rect x="54" y="62" width="92" height="116" rx="8" fill="none" stroke="#fff" stroke-opacity=".12"/>
      <path d="M54 90h92" stroke="#000" stroke-opacity=".5"/><rect x="92" y="150" width="16" height="4" rx="2" fill="#a9adb3"/></svg>`;
    if (o.type === 'long') return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs}${shadow(70)}
      <rect x="22" y="62" width="156" height="92" rx="9" fill="url(#${l})"/>
      <rect x="28" y="68" width="144" height="80" rx="6" fill="none" stroke="#e7cfa0" stroke-opacity=".55" stroke-dasharray="3 3"/>
      <path d="M22 98h156" stroke="#000" stroke-opacity=".25"/><rect x="148" y="94" width="16" height="9" rx="2" fill="#d9bc7f"/>
      <text x="100" y="132" text-anchor="middle" font-family="Bodoni Moda,serif" font-size="11" fill="#000" fill-opacity=".3">UV</text></svg>`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${defs}${shadow(64)}
      <rect x="44" y="44" width="78" height="46" rx="4" fill="#3c6aa0" transform="rotate(-6 80 66)"/><rect x="70" y="42" width="78" height="46" rx="4" fill="#c9a86a" transform="rotate(4 110 64)"/>
      <rect x="30" y="64" width="140" height="102" rx="10" fill="url(#${l})"/>
      <rect x="37" y="71" width="126" height="88" rx="7" fill="none" stroke="#f3dfb6" stroke-opacity=".55" stroke-dasharray="3 3"/>
      <path d="M100 64v102" stroke="#000" stroke-opacity=".18" stroke-width="2"/>
      <text x="134" y="146" text-anchor="middle" font-family="Bodoni Moda,serif" font-size="11" fill="#000" fill-opacity=".28">UV</text></svg>`;
  }

  // ---------- Ladies' accessories ----------
  function earrings() {
    const u = ++uid, pr = `pr${u}`, c = `c${u}`;
    const one = x => `<path d="M${x} 40c-14 0-14 22 0 26" stroke="url(#${c})" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="${x}" cy="72" r="6" fill="url(#${c})"/><path d="M${x} 78v14" stroke="url(#${c})" stroke-width="2.5"/>
      <circle cx="${x}" cy="118" r="26" fill="url(#${pr})"/><circle cx="${x - 9}" cy="108" r="7" fill="#fff" opacity=".85"/>`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs>${metalGrad(c, 'gold')}
      <radialGradient id="${pr}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#efe7e4"/><stop offset=".85" stop-color="#d9cfd8"/><stop offset="1" stop-color="#bfb2b8"/></radialGradient></defs>
      ${shadow(62)}${one(66)}${one(134)}</svg>`;
  }
  function bracelet() {
    const u = ++uid, c = `c${u}`;
    const links = Array.from({ length: 26 }, (_, i) => {
      const a = i / 26 * Math.PI * 2, x = 100 + Math.cos(a) * 62, y = 108 + Math.sin(a) * 38;
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="9" ry="5.5" fill="none" stroke="url(#${c})" stroke-width="3.2" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }).join('');
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs>${metalGrad(c, 'gold')}</defs>${shadow(64)}${links}
      <rect x="152" y="100" width="16" height="10" rx="3" fill="url(#${c})"/></svg>`;
  }
  function scarf() {
    const u = ++uid, s = `s${u}`;
    const leaf = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0c6-6 14-6 18 0-6 6-14 6-18 0z" fill="#56653b"/><path d="M0 0h18" stroke="#c9a86a" stroke-width=".8"/></g>`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8f3e6"/><stop offset="1" stop-color="#e3d6b8"/></linearGradient></defs>${shadow(70)}
      <path d="M100 18L182 100 100 182 18 100z" fill="url(#${s})" stroke="#c9a86a" stroke-width="3"/>
      <path d="M100 30L170 100 100 170 30 100z" fill="none" stroke="#9b2f3e" stroke-width="1.2"/>
      ${leaf(70, 92, -20)}${leaf(96, 72, 30)}${leaf(110, 112, -40)}${leaf(86, 128, 10)}${leaf(124, 88, 60)}
      <path d="M100 100L182 100 100 182z" fill="#000" opacity=".06"/></svg>`;
  }
  function bag(o) {
    const u = ++uid, l = `l${u}`, c = `c${u}`;
    const C = { maroon: ['#a4364a', '#5b1424'], black: ['#3a3a3d', '#121214'], blush: ['#f0c9c4', '#b98580'] }[o.leather];
    const chain = Array.from({ length: 15 }, (_, i) => { const t = i / 14, x = 52 + t * 96, y = 74 - Math.sin(t * Math.PI) * 52; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="3.2" fill="none" stroke="url(#${c})" stroke-width="2.2" transform="rotate(${i % 2 ? 60 : -30} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('');
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs>${metalGrad(c, 'gold')}
      <linearGradient id="${l}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C[0]}"/><stop offset="1" stop-color="${C[1]}"/></linearGradient></defs>${shadow(66)}${chain}
      <path d="M40 80h120l8 96H32z" fill="url(#${l})"/>
      <path d="M40 80h120v40c0 10-8 16-18 16H58c-10 0-18-6-18-16z" fill="${C[0]}" stroke="#000" stroke-opacity=".15"/>
      <path d="M46 86h108" stroke="#fff" stroke-opacity=".25"/>
      <rect x="88" y="124" width="24" height="16" rx="3" fill="url(#${c})"/><circle cx="100" cy="132" r="3" fill="${C[1]}"/></svg>`;
  }

  // ---------- Pick a render for a product ----------
  const PRESETS = {
    'W-001': () => watch({ metal: 'steel', dial: 'navy', strap: 'bracelet', chrono: true }),
    'W-002': () => watch({ metal: 'gold', dial: 'black', strap: 'brown' }),
    'W-003': () => watch({ metal: 'rose', dial: 'pearl', strap: 'bracelet', mark: 'OLIVE' }),
    'W-004': () => watch({ metal: 'steel', dial: 'green', strap: 'rubber', diver: true }),
    'P-001': () => perfume({ shape: 'square', liquid: 'amber', cap: 'gold', label: 'OUD' }),
    'P-002': () => perfume({ shape: 'round', liquid: 'pearl', cap: 'steel', label: 'MUSK' }),
    'P-003': () => mabkhara(),
    'P-004': () => perfume({ shape: 'tall', liquid: 'blue', cap: 'black', label: 'CITRUS' }),
    'MW-001': () => wallet({ type: 'bifold', leather: 'brown' }),
    'MW-002': () => wallet({ type: 'card' }),
    'MW-003': () => wallet({ type: 'long', leather: 'black' }),
    'LA-001': earrings, 'LA-002': bracelet, 'LA-003': scarf,
    'LA-004': () => bag({ leather: 'maroon' }),
  };

  window.productArt = function (p) {
    if (PRESETS[p.sku]) return PRESETS[p.sku]();
    const k = p.sku || p.id || p.name_en || '', n = (p.name_en || '').toLowerCase();
    switch (p.category) {
      case 'watches': return watch({ metal: pick(['steel', 'gold', 'rose'], k), dial: pick(['navy', 'black', 'white', 'green'], k + 'd'), strap: pick(['bracelet', 'brown', 'black', 'rubber'], k + 's'), chrono: hash(k) % 3 === 0 });
      case 'perfumes': return /bakhoor|incense|بخور/.test(n) ? mabkhara() : perfume({ shape: pick(['square', 'round', 'tall'], k), liquid: pick(['amber', 'pearl', 'blue', 'smoke'], k + 'l'), cap: pick(['gold', 'steel', 'black'], k + 'c'), label: (p.brand || 'OLIVE').split(' ')[0].toUpperCase().slice(0, 7) });
      case 'mens-wallets': return wallet({ type: /card/.test(n) ? 'card' : /long/.test(n) ? 'long' : 'bifold', leather: pick(['brown', 'black', 'tan'], k) });
      default:
        if (/earring|pearl/.test(n)) return earrings();
        if (/bracelet|bangle|chain|necklace/.test(n)) return bracelet();
        if (/scarf|shawl|shayla/.test(n)) return scarf();
        return bag({ leather: pick(['maroon', 'black', 'blush'], k) });
    }
  };
  // Category tiles reuse a hero product of each category
  window.categoryArt = slug => ({ watches: PRESETS['W-002'], perfumes: PRESETS['P-001'], 'mens-wallets': PRESETS['MW-001'], 'ladies-accessories': PRESETS['LA-004'] }[slug] || PRESETS['LA-004'])();
})();
