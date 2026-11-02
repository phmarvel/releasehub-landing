// Renders index.html (English) and ar/index.html (Arabic) from content/demo.json.
// Usage: node tools/render-pages.mjs   (no dependencies, no package.json)
// Section markup adapted from open-source Tailwind block patterns (see README).
// RHL-11: departure-board identity; the hero board, the ticket plans and the three drawn scenes live here.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'content', 'demo.json'), 'utf8'));

// One icon set: Lucide (ISC licence), 24px grid, stroke 1.75.
const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  pr: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M6 9v12"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  code: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  list: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  lang: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
};
const ic = (n, cls = 'size-6') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[n]}</svg>`;


const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const num = (n, L) => (L.lang === 'ar' ? String(n).replace(/\d/g, (d) => AR_DIGITS[d]) : String(n));

// Logo: two flaps of a split-flap display (enamel plate, amber and paper flap).
const logo = `<svg class="size-8" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="6" class="fill-enamel"/><rect x="7" y="6" width="18" height="9" rx="2" class="fill-amber"/><rect x="7" y="17" width="18" height="9" rx="2" class="fill-paper"/></svg>`;

function header(L) {
  const links = L.nav.links.map(([id, t]) => `<li><a class="nav-link" href="#${id}">${t}</a></li>`).join('');
  const sheetLinks = L.nav.links.map(([id, t]) => `<li><a class="sheet-link" href="#${id}" data-sheet-close>${t}</a></li>`).join('');
  const toggle = (cls) => `<a class="lang-switch ${cls}" href="${L.otherHref}" hreflang="${L.otherLang}" lang="${L.otherLang}" aria-label="${L.otherLabel}" data-lang-switch>${L.otherName}</a>`;
  return `<header class="sticky top-0 z-40 border-b border-line bg-white">
    <div class="wrap flex h-16 items-center gap-2 sm:gap-4">
      <a class="brand" href="#hero" aria-label="ReleaseHub">${logo}<span>ReleaseHub</span></a>
      <nav class="ms-8 hidden lg:block" aria-label="${L.ui.navLabel}"><ul class="flex items-center gap-1">${links}</ul></nav>
      <div class="ms-auto flex items-center gap-2">
        ${toggle('')}
        <a class="btn btn-primary hidden sm:inline-flex" href="#cta" data-cta>${L.nav.cta}</a>
        <button class="icon-btn lg:hidden" type="button" aria-expanded="false" aria-controls="sheet" aria-label="${L.ui.menu}" data-menu-button>${ic('menu')}</button>
      </div>
    </div>
  </header>
    <div id="sheet" class="sheet" hidden>
      <div class="sheet-backdrop" data-sheet-close></div>
      <div class="sheet-panel" role="dialog" aria-modal="true" aria-label="${L.ui.sheetLabel}">
        <div class="flex items-center justify-between">
          <span class="brand">${logo}<span>ReleaseHub</span></span>
          <button class="icon-btn" type="button" aria-label="${L.ui.close}" data-sheet-close>${ic('x')}</button>
        </div>
        <nav class="mt-6" aria-label="${L.ui.sheetLabel}"><ul class="flex flex-col">${sheetLinks}</ul></nav>
        <div class="mt-auto flex flex-col gap-3 pt-6">
          <a class="btn btn-primary w-full" href="#cta" data-cta data-sheet-close>${L.nav.cta}</a>
          ${toggle('justify-center ring-1 ring-muted')}
        </div>
      </div>
    </div>`;
}

function sectionHead(h, lead, id, extra = '') {
  return `<div class="max-w-2xl ${extra}">
        <h2 id="${id}-title" class="h2">${h}</h2>
        <p class="lede">${lead}</p>
      </div>`;
}

// ---- Split-flap plates. Each .ch holds its final text in the HTML (no-JS and reduced
// motion see it as is); main.js swaps in a start character and flips each plate once.
// Arabic joins letters, so an Arabic status is one plate (a word), Latin is one plate per letter.
function plates(L, label, from) {
  if (L.lang === 'ar') return `<span class="ch ch-word" data-from="${from}">${label}</span>`;
  return [...label].map((c) => (c === ' ' ? '<span class="ch-gap"></span>' : `<span class="ch">${c}</span>`)).join('');
}

function board(L) {
  const b = L.hero.board;
  const order = Object.keys(b.st);
  const rows = b.rows.map((r, i) => {
    const label = b.st[r.s];
    const from = b.st[order[(order.indexOf(r.s) + 2) % order.length]];
    return `<li class="board-row">
              <span class="gate-plate"><span class="sr-only">${b.cols.gate} ${num(r.gate, L)}</span><span class="ch" aria-hidden="true">${num(r.gate, L)}</span></span>
              <div class="min-w-0">
                <p class="font-semibold text-white">${r.t}</p>
                <p class="mt-0.5 flex gap-3 text-sm text-enamel-text"><bdi dir="ltr">${r.id}</bdi><bdi dir="ltr"><time>${num(r.time, L)}</time></bdi></p>
              </div>
              <p class="board-status st-${r.s}"><span class="sr-only">${label}</span><span class="flex items-center gap-0.5" aria-hidden="true">${plates(L, label, from)}</span></p>
            </li>`;
  }).join('');
  return `<div class="board" data-flip role="group" aria-label="${b.title}">
          <div class="flex items-center justify-between bg-enamel-deep px-4 py-3 sm:px-6">
            <p class="flex items-center gap-3 font-semibold text-white"><span class="size-3 rounded-[2px] bg-amber" aria-hidden="true"></span>${b.title}</p>
            <span class="badge badge-demo">${b.demo}</span>
          </div>
          <div class="board-cols" aria-hidden="true"><span>${b.cols.gate}</span><span>${b.cols.run}</span><span>${b.cols.status}</span></div>
          <ol class="board-rows">${rows}</ol>
          <p class="px-4 py-3 text-sm text-enamel-text sm:px-6">${b.note}</p>
        </div>`;
}

function hero(L) {
  const h = L.hero;
  return `<!-- section:hero -->
    <section id="hero" aria-labelledby="hero-title" class="bg-paper py-12 md:py-20 lg:py-24">
      <div class="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h1 id="hero-title" class="display">${h.h1}</h1>
          <p class="mt-6 max-w-xl text-xl text-ink">${h.sub}</p>
          <p class="mt-3 max-w-xl text-lg text-muted">${h.body}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a class="btn btn-primary btn-lg" href="#cta" data-cta>${h.cta}</a>
            <a class="btn btn-outline btn-lg" href="#how">${h.ghost}</a>
          </div>
        </div>
        ${board(L)}
      </div>
    </section>
    <!-- /section:hero -->

    <section aria-label="${L.trust.caption}" class="bg-white py-8">
      <div class="wrap flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-10">
        <p class="max-w-xs text-sm text-muted">${L.trust.caption}</p>
        <ul class="flex flex-wrap gap-x-10 gap-y-3 text-xl font-semibold text-muted">${L.trust.names.map((n) => `<li><bdi dir="ltr">${n}</bdi></li>`).join('')}</ul>
      </div>
    </section>`;
}

function how(L) {
  const s = L.how;
  const items = s.steps.map((st, i) => `<li class="gate">
            <span class="gate-num" aria-hidden="true">${num(i + 1, L)}</span>
            <div>
              <h3 class="h3 flex items-center gap-2">${ic(st.icon, 'size-5 text-enamel-raised')}${st.t}</h3>
              <p class="mt-2 text-muted">${st.d}</p>
            </div>
          </li>`).join('');
  return `<!-- section:how-it-works -->
    <section id="how" aria-labelledby="how-title" class="section bg-white">
      <div class="wrap">
        ${sectionHead(s.h, s.lead, 'how')}
        <ol class="gate-list mt-12">${items}</ol>
        <p class="mt-10"><a class="btn btn-outline" href="#cta" data-cta>${s.cta}</a></p>
      </div>
    </section>
    <!-- /section:how-it-works -->`;
}

// ---- Drawn scenes: one style (white panel, 2px enamel outline, enamel title bar, amber lamp,
// flat fills, no gradients). Frames are dir="ltr"; the content is laid out in the page's
// reading direction with logical offsets (x measured from the start edge), so Arabic scenes
// carry real Arabic, right-aligned. Code is never mirrored.
function ctx(L) {
  const ar = L.lang === 'ar';
  const X = (v) => (ar ? 400 - v : v);
  const R = (v, w) => (ar ? 400 - v - w : v); // rect x from a start offset and width
  const dir = ar ? ' direction="rtl"' : '';
  // text at a start offset / at an end offset (offset from the end edge) / centred at a start offset
  const t = (v, y, s, cls, size, wt = 400) => `<text x="${X(v)}" y="${y}"${dir} class="${cls}" font-size="${size}" font-weight="${wt}">${s}</text>`;
  const te = (v, y, s, cls, size, wt = 400) => `<text x="${ar ? v : 400 - v}" y="${y}"${dir} text-anchor="end" class="${cls}" font-size="${size}" font-weight="${wt}">${s}</text>`;
  const tc = (v, y, s, cls, size, wt = 400) => `<text x="${X(v)}" y="${y}"${dir} text-anchor="middle" class="${cls}" font-size="${size}" font-weight="${wt}">${s}</text>`;
  return { ar, X, R, t, te, tc };
}
const SCENE_BAR = 'M1 46V13a12 12 0 0 1 12-12h374a12 12 0 0 1 12 12v33z';
function scene(id, alt, h, body) {
  return `<svg class="scene" dir="ltr" viewBox="0 0 400 ${h}" role="img" aria-labelledby="${id}-t" focusable="false"><title id="${id}-t">${alt}</title>
            <rect x="1" y="1" width="398" height="${h - 2}" rx="12" class="fill-white stroke-enamel" stroke-width="2"/><path d="${SCENE_BAR}" class="fill-enamel"/>${body}</svg>`;
}

function sceneChat(L) {
  const c = L.scenes.chat, { R, t, tc } = ctx(L);
  const steps = c.steps.map((s, i) => `<rect x="${L.lang === 'ar' ? 400 - 100 - 8 : 100}" y="${151 + i * 22}" width="8" height="8" rx="2" class="fill-amber"/>${t(116, 160 + i * 22, s, 'fill-white', 16)}`).join('');
  return scene('sc-chat', c.alt, 378, `
            <rect x="${R(16, 15)}" y="16" width="14" height="14" rx="3" class="fill-amber"/>${t(40, 29, c.label, 'fill-white', 16, 600)}
            <rect x="${R(16, 236)}" y="58" width="236" height="40" rx="10" class="fill-enamel-50 stroke-line" stroke-width="1.5"/>${t(30, 83, c.user1, 'fill-ink', 16)}
            <rect x="${R(84, 300)}" y="110" width="300" height="116" rx="10" class="fill-enamel"/>${t(100, 136, c.lead1, 'fill-white', 16, 600)}${steps}
            <rect x="${R(16, 236)}" y="238" width="236" height="40" rx="10" class="fill-enamel-50 stroke-line" stroke-width="1.5"/>${t(30, 263, c.user2, 'fill-ink', 16)}
            <rect x="${R(84, 300)}" y="290" width="300" height="72" rx="10" class="fill-enamel"/>${t(100, 315, c.lead2, 'fill-white', 16, 600)}
            <rect x="${R(100, 116)}" y="326" width="116" height="26" rx="4" class="fill-amber"/>${tc(158, 344, c.chip, 'fill-enamel', 15, 700)}`);
}

function scenePR(L) {
  const c = L.scenes.pr, { ar, X, R, t, te, tc } = ctx(L);
  const mono = 'font-mono';
  const code = (y, s, fill, bg) => `${bg ? `<rect x="17" y="${y - 16}" width="366" height="22" class="${bg}"/>` : ''}<text x="28" y="${y}" class="${mono} ${fill}" font-size="14">${s}</text>`;
  const checks = c.checks.map(([a, b], i) => {
    const cy = 252 + i * 30;
    return `<circle cx="${X(25)}" cy="${cy}" r="9" class="fill-go"/><path d="M${X(25) - 4} ${cy}l3 3 5-6" fill="none" class="stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${t(44, cy + 5, a, 'fill-ink', 16, 600)}${te(16, cy + 5, b, 'fill-muted', 15)}`;
  }).join('');
  const wy = 342;
  return scene('sc-pr', c.alt, 372, `
            <rect x="${R(16, 15)}" y="16" width="14" height="14" rx="3" class="fill-amber"/>${t(40, 29, c.label, 'fill-white', 16, 600)}
            <rect x="${R(268, 116)}" y="10" width="116" height="26" rx="4" class="fill-amber"/>${tc(326, 28, c.status, 'fill-enamel', 15, 700)}
            ${t(16, 80, c.title, 'fill-ink', 20, 700)}${t(16, 101, c.files, 'fill-muted', 15)}
            <rect x="16" y="114" width="368" height="104" rx="8" class="fill-enamel-deep"/>
            ${code(137, "- root.className = 'light';", 'fill-hold-lit', 'fill-hold/30')}${code(159, '+ const theme = readTheme();', 'fill-go-lit', 'fill-go/30')}${code(181, '+ root.dataset.theme = theme;', 'fill-go-lit', 'fill-go/30')}${code(203, '  render(theme);', 'fill-enamel-text', '')}
            ${checks}
            <circle cx="${X(25)}" cy="${wy}" r="8" class="fill-amber-soft stroke-amber-deep" stroke-width="2"/><path d="M${X(25)} ${wy - 4}v4l3 2" fill="none" class="stroke-enamel" stroke-width="1.75" stroke-linecap="round"/>${t(44, wy + 5, c.wait, 'fill-ink', 16, 600)}`);
}

function sceneBoard(L) {
  const en = data.en.hero.board.st, ar = data.ar.hero.board.st;
  const rows = [
    ['4', 'Invoice export', 'تصدير الفواتير', 'merged', 'fill-go'],
    ['4', 'Arabic reports', 'تقارير عربية', 'review', 'fill-enamel-raised'],
    ['3', 'Dark mode', 'الوضع الداكن', 'coding', 'fill-amber-deep'],
    ['2', 'Team roles', 'أدوار الفريق', 'planned', 'fill-muted'],
  ].map(([g, e, a, s, f], i) => {
    const y = 62 + i * 64;
    return `<rect x="16" y="${y}" width="40" height="40" rx="6" class="fill-enamel"/><rect x="16" y="${y + 19.5}" width="40" height="1.5" class="fill-white/25"/><text x="36" y="${y + 28}" text-anchor="middle" class="fill-amber font-board" font-size="24" font-weight="600">${g}</text>
            <text x="68" y="${y + 17}" class="fill-ink" font-size="16" font-weight="600">${e}</text><text x="68" y="${y + 37}" class="${f}" font-size="15" font-weight="600">${en[s]}</text>
            <text x="384" y="${y + 17}" direction="rtl" class="fill-ink" font-size="16" font-weight="600">${a}</text><text x="384" y="${y + 37}" direction="rtl" class="${f}" font-size="15" font-weight="600">${ar[s]}</text>
            ${i < 3 ? `<line x1="16" y1="${y + 52}" x2="384" y2="${y + 52}" class="stroke-line" stroke-width="1.5" stroke-dasharray="6 6"/>` : ''}`;
  }).join('');
  return scene('sc-board', L.scenes.board.alt, 326, `
            <rect x="16" y="16" width="14" height="14" rx="3" class="fill-amber"/><text x="40" y="29" class="fill-white" font-size="16" font-weight="600">${data.en.ui.board}</text><text x="384" y="29" direction="rtl" class="fill-white" font-size="16" font-weight="600">${data.ar.ui.board}</text>
            ${rows}`);
}

function features(L) {
  const s = L.features, r = s.row;
  const items = s.items.map((it) => `<li class="flex gap-4">
            <span class="feat-icon">${ic(it.icon, 'size-5')}</span>
            <div><h3 class="h3">${it.t}</h3><p class="mt-1 text-muted">${it.d}</p></div>
          </li>`).join('');
  const bullets = r.bullets.map((b) => `<li class="flex items-start gap-3">${ic('check', 'mt-1 size-5 shrink-0 text-go')}<span>${b}</span></li>`).join('');
  return `<!-- section:features -->
    <section id="features" aria-labelledby="features-title" class="section bg-paper">
      <div class="wrap">
        ${sectionHead(s.h, s.lead, 'features')}
        <div class="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 class="h2">${r.h}</h3>
            <p class="lede">${r.d}</p>
            <ul class="mt-6 space-y-3 text-ink">${bullets}</ul>
            <p class="mt-8"><a class="btn btn-outline" href="#pricing">${s.cta}</a></p>
          </div>
          <figure class="m-0">${scenePR(L)}<figcaption class="mt-3 text-sm text-muted">${s.sceneNote}</figcaption></figure>
        </div>
        <ul class="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">${items}</ul>
      </div>
    </section>
    <!-- /section:features -->`;
}

function lead(L) {
  const s = L.lead;
  const asks = s.asks.map((a) => `<li class="flex items-start gap-3"><span class="mt-2.5 size-2 shrink-0 rounded-[2px] bg-amber" aria-hidden="true"></span><span>${a}</span></li>`).join('');
  return `<!-- section:lead-chat -->
    <section id="lead" aria-labelledby="lead-title" class="section on-dark bg-enamel-deep">
      <div class="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="lead-title" class="h2 text-white">${s.h}</h2>
          <p class="lede text-enamel-text">${s.lead}</p>
          <p class="mt-8 font-semibold text-white">${s.asksH}</p>
          <ul class="mt-3 space-y-3 text-lg text-white">${asks}</ul>
        </div>
        <figure class="m-0 lg:order-first">${sceneChat(L)}<figcaption class="mt-3 text-sm text-enamel-text">${s.sceneNote}</figcaption></figure>
      </div>
    </section>
    <!-- /section:lead-chat -->`;
}

function gulf(L) {
  const s = L.gulf;
  const icons = ['lang', 'globe', 'users'];
  const pts = s.points.map((p, i) => `<li class="gulf-row">${ic(icons[i], 'mt-1 size-6 shrink-0 text-enamel-raised')}<p class="text-muted"><strong class="block text-lg text-ink">${p.t}</strong>${p.d}</p></li>`).join('');
  return `<!-- section:audience -->
    <section id="gulf" aria-labelledby="gulf-title" class="section bg-white">
      <div class="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="gulf-title" class="h2">${s.h}</h2>
          <p class="lede">${s.lead}</p>
          <ul class="mt-8 space-y-4">${pts}</ul>
          <p class="note mt-6">${s.ph}</p>
          <p class="mt-8"><a class="btn btn-outline" href="#cta" data-cta>${s.cta}</a></p>
        </div>
        <figure class="m-0">${sceneBoard(L)}<figcaption class="mt-3 text-sm text-muted">${s.sceneNote}</figcaption></figure>
      </div>
    </section>
    <!-- /section:audience -->`;
}

function pricing(L) {
  const s = L.pricing;
  const plans = s.plans.map((p) => {
    const items = p.items.map((i) => `<li class="flex items-start gap-3">${ic('check', 'mt-1 size-5 shrink-0 text-go')}<span>${i}</span></li>`).join('');
    return `<li class="ticket ${p.featured ? 'ticket-featured' : ''}">
            ${p.featured ? `<p class="badge badge-accent absolute -top-3 start-6">${s.flag}</p>` : ''}
            <div class="ticket-head"><h3 class="h3 ${p.featured ? 'text-white' : ''}">${p.name}</h3><p class="mt-1">${p.desc}</p></div>
            <div class="ticket-perf" aria-hidden="true"><span></span></div>
            <div class="flex flex-1 flex-col p-6 pt-4">
              <p class="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span class="text-5xl font-bold tracking-tight text-ink"><data value="${p.amount}">${p.show}</data> <bdi dir="ltr" class="text-xl">USD</bdi></span><span class="text-muted">${s.unit}</span></p>
              <p class="mt-2"><span class="badge badge-ph">${s.tag}</span></p>
              <ul class="mt-6 flex-1 space-y-3 text-ink">${items}</ul>
              <a class="btn ${p.featured ? 'btn-primary' : 'btn-outline'} mt-8 w-full" href="#cta" data-cta>${p.cta}</a>
            </div>
          </li>`;
  }).join('');
  return `<!-- section:pricing -->
    <section id="pricing" aria-labelledby="pricing-title" class="section bg-paper">
      <div class="wrap">
        ${sectionHead(s.h, s.lead, 'pricing')}
        <p class="note mt-4 max-w-2xl">${s.note}</p>
        <!-- Example prices: placeholders, change them in content/demo.json -->
        <ul class="mt-12 grid items-stretch gap-8 md:grid-cols-3">${plans}</ul>
      </div>
    </section>
    <!-- /section:pricing -->`;
}

function faq(L) {
  const s = L.faq;
  const items = s.items.map((it) => `<details class="faq">
          <summary>${it.q}${ic('chevron', 'faq-chevron size-5 shrink-0')}</summary>
          <p>${it.a}</p>
        </details>`).join('');
  return `<!-- section:faq -->
    <section id="faq" aria-labelledby="faq-title" class="section bg-white">
      <div class="wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        ${sectionHead(s.h, s.lead, 'faq', 'lg:sticky lg:top-24 lg:self-start')}
        <div class="space-y-3">${items}</div>
      </div>
    </section>
    <!-- /section:faq -->`;
}

function cta(L) {
  const s = L.cta, b = L.hero.board;
  return `<!-- section:cta -->
    <section id="cta" aria-labelledby="cta-title" class="on-dark bg-enamel py-16 md:py-24">
      <div class="wrap text-center">
        <p class="board-status st-merged mb-8 flex justify-center" aria-hidden="true"><span class="flex items-center gap-0.5">${plates(L, b.st.merged, b.st.planned)}</span></p>
        <h2 id="cta-title" class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">${s.h}</h2>
        <p class="mx-auto mt-4 max-w-xl text-xl text-enamel-text">${s.d}</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a class="btn btn-primary btn-lg" href="#" data-cta>${s.btn}</a>
          <a class="btn btn-outline-dark btn-lg" href="#faq">${s.ghost}</a>
        </div>
        <p class="mt-6 text-sm text-enamel-text">${s.note}</p>
      </div>
    </section>
    <!-- /section:cta -->`;
}

function footer(L) {
  const f = L.footer;
  const cols = f.cols.map((c) => `<div><h2 class="footer-h">${c.h}</h2><ul class="mt-3">${c.links.map(([h, t]) => `<li><a class="footer-link" href="${h}">${t}</a></li>`).join('')}</ul></div>`).join('');
  return `<footer class="on-dark bg-enamel-deep pt-16 text-enamel-text">
    <div class="wrap">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <span class="brand text-white rounded-md [&_svg]:ring-1 [&_svg]:ring-enamel-raised [&_svg]:rounded-md">${logo}<span>ReleaseHub</span></span>
          <p class="mt-4 max-w-xs">${f.blurb}</p>
          <p class="mt-4"><a class="lang-switch lang-switch-dark" href="${L.otherHref}" hreflang="${L.otherLang}" lang="${L.otherLang}" aria-label="${L.otherLabel}" data-lang-switch>${L.otherName}</a></p>
        </div>
        <nav class="contents" aria-label="${L.ui.footerNav}">${cols}</nav>
        <div><h2 class="footer-h">${f.legalH}</h2><ul class="mt-3">${f.legal.map((x) => `<li class="flex min-h-11 items-center">${x}</li>`).join('')}</ul><p class="mt-2 text-sm">${f.legalNote}</p></div>
      </div>
      <div class="mt-12 flex flex-col gap-2 border-t border-enamel-raised py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>${f.copy}</p>
        <p><span class="badge badge-demo me-2">${L.ui.demoTag}</span>${f.demoNote}</p>
      </div>
    </div>
  </footer>`;
}

function page(L) {
  const b = L.base;
  return `<!DOCTYPE html>
<html lang="${L.lang}" dir="${L.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${L.title}</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%2312263f'/%3E%3Crect x='7' y='6' width='18' height='9' rx='2' fill='%23ffb43a'/%3E%3Crect x='7' y='17' width='18' height='9' rx='2' fill='%23f5f7f9'/%3E%3C/svg%3E">
  ${(L.lang === 'ar' ? ['ibm-plex-sans-arabic-arabic-400-normal', 'ibm-plex-sans-arabic-arabic-700-normal'] : ['barlow-semi-condensed-latin-400-normal', 'barlow-semi-condensed-latin-700-normal']).map((f) => `<link rel="preload" href="${b}assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join('\n  ')}
  <link rel="stylesheet" href="${b}assets/css/styles.css">
  <script src="${b}assets/js/i18n.js" defer></script>
  <script src="${b}assets/js/main.js" defer></script>
</head>
<body>
  <!-- GENERATED by tools/render-pages.mjs from content/demo.json (demo content). Do not edit by hand. -->
  <a class="skip-link" href="#main">${L.ui.skip}</a>

  ${header(L)}

  <main id="main">
    ${hero(L)}

    ${how(L)}

    ${features(L)}

    ${lead(L)}

    ${gulf(L)}

    ${pricing(L)}

    ${faq(L)}

    ${cta(L)}
  </main>

  ${footer(L)}
</body>
</html>
`;
}

const tidy = (h) => h.replace(/[ \t]+$/gm, '');
writeFileSync(join(root, 'index.html'), tidy(page(data.en)));
writeFileSync(join(root, 'ar', 'index.html'), tidy(page(data.ar)));
console.log('Rendered index.html and ar/index.html from content/demo.json');
