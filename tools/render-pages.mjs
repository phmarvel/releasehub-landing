// Renders index.html (English) and ar/index.html (Arabic) from content/demo.json.
// Usage: node tools/render-pages.mjs   (no dependencies, no package.json)
// Section markup adapted from open-source Tailwind block patterns (see README).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'content', 'demo.json'), 'utf8'));

// One icon set: Lucide (ISC licence), 24px grid, stroke 1.75.
const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
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
// Direction icons mirror in right-to-left.
const icDir = (n, cls = 'size-5') => ic(n, `${cls} rtl:-scale-x-100`);

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const num = (n, L) => (L.lang === 'ar' ? String(n).replace(/\d/g, (d) => AR_DIGITS[d]) : String(n));

const logo = `<svg class="size-8 text-accent-600" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="8" fill="currentColor"/><path d="M9 16.5l4.5 4.5L23 11" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function header(L) {
  const links = L.nav.links.map(([id, t]) => `<li><a class="nav-link" href="#${id}">${t}</a></li>`).join('');
  const sheetLinks = L.nav.links.map(([id, t]) => `<li><a class="sheet-link" href="#${id}" data-sheet-close>${t}</a></li>`).join('');
  const toggle = (cls) => `<a class="lang-switch ${cls}" href="${L.otherHref}" hreflang="${L.otherLang}" lang="${L.otherLang}" aria-label="${L.otherLabel}" data-lang-switch>${L.otherName}</a>`;
  return `<header class="sticky top-0 z-40 border-b border-slate-200 bg-white">
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
          ${toggle('justify-center ring-1 ring-slate-300')}
        </div>
      </div>
    </div>`;
}

function sectionHead(eyebrow, h, lead, id, extra = '') {
  return `<div class="max-w-2xl ${extra}">
        <p class="eyebrow">${eyebrow}</p>
        <h2 id="${id}-title" class="h2">${h}</h2>
        <p class="lede">${lead}</p>
      </div>`;
}

function hero(L) {
  const h = L.hero, m = h.mock;
  const steps = m.steps.map((s) => `<li class="flex items-start gap-2">${ic('check', 'mt-0.5 size-5 shrink-0 text-success')}<span>${s}</span></li>`).join('');
  const diff = m.diff.map((d) => `<span class="block ${d[0] === '+' ? 'text-emerald-300' : 'text-red-300'}">${d}</span>`).join('');
  return `<!-- section:hero -->
    <section id="hero" aria-labelledby="hero-title" class="bg-white py-12 md:py-20 lg:py-24">
      <div class="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p class="eyebrow">${h.eyebrow}</p>
          <h1 id="hero-title" class="display">${h.h1}</h1>
          <p class="mt-6 max-w-xl text-lg text-slate-700 sm:text-xl">${h.sub}</p>
          <p class="mt-3 max-w-xl text-base text-slate-600">${h.body}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a class="btn btn-primary btn-lg" href="#cta" data-cta>${h.cta}${icDir('arrow')}</a>
            <a class="btn btn-outline btn-lg" href="#how">${h.ghost}</a>
          </div>
        </div>
        <div class="mock" aria-hidden="false" role="group" aria-label="${m.bar}">
          <div class="flex items-center justify-between border-b border-slate-200 bg-surface px-4 py-3">
            <span class="text-sm font-semibold text-slate-700">${m.bar}</span>
            <span class="badge badge-demo">${m.demo}</span>
          </div>
          <div class="grid grid-cols-1 gap-4 p-4 sm:p-6">
            <div class="rounded-xl border border-slate-200 bg-surface p-4">
              <div class="flex items-center gap-2 text-sm text-slate-600">${ic('file', 'size-5')}<span>${m.storyLabel}</span><bdi class="badge badge-neutral" dir="ltr">${m.storyId}</bdi></div>
              <p class="mt-2 font-semibold text-ink">${m.storyTitle}</p>
              <p class="mt-1 text-sm text-slate-600">${m.storyMeta}</p>
              <ul class="mt-3 space-y-2 text-sm text-slate-700">${steps}</ul>
            </div>
            <div class="flex justify-center text-accent-600">${ic('chevron', 'size-6')}</div>
            <div class="rounded-xl border-2 border-accent-600 bg-white p-4 shadow-sm">
              <div class="flex flex-wrap items-center gap-2 text-sm text-slate-600">${ic('pr', 'size-5 text-accent-600')}<span>${m.prLabel}</span><span class="badge badge-ok">${m.prStatus}</span></div>
              <p class="mt-2 font-semibold text-ink">${m.prTitle}</p>
              <p class="mt-1 text-sm text-slate-600">${m.prMeta}</p>
              <pre class="mt-3 whitespace-pre-wrap break-words rounded-lg bg-ink p-3 text-sm leading-6 text-slate-100" dir="ltr"><code>${diff}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /section:hero -->

    <section aria-label="${L.trust.caption}" class="border-y border-slate-200 bg-surface py-8">
      <div class="wrap flex flex-col items-center gap-4 text-center">
        <p class="text-sm text-slate-600">${L.trust.caption}</p>
        <ul class="flex flex-wrap justify-center gap-x-10 gap-y-3 text-lg font-semibold text-slate-700">${L.trust.names.map((n) => `<li><bdi dir="ltr">${n}</bdi></li>`).join('')}</ul>
      </div>
    </section>`;
}

function how(L) {
  const s = L.how;
  const items = s.steps.map((st, i) => `<li class="card relative p-6">
            <div class="flex items-center justify-between">
              <span class="icon-box">${ic(st.icon)}</span>
              <span class="step-num" aria-hidden="true">${num(i + 1, L)}</span>
            </div>
            <h3 class="h3 mt-5">${st.t}</h3>
            <p class="mt-2 text-slate-700">${st.d}</p>
          </li>`).join('');
  return `<!-- section:how-it-works -->
    <section id="how" aria-labelledby="how-title" class="section bg-white">
      <div class="wrap">
        ${sectionHead(s.eyebrow, s.h, s.lead, 'how')}
        <ol class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${items}</ol>
        <p class="mt-10"><a class="btn btn-primary" href="#cta" data-cta>${s.cta}${icDir('arrow')}</a></p>
      </div>
    </section>
    <!-- /section:how-it-works -->`;
}

function photo(ph, key, alt, cls, lazy = true) {
  const p = ph[key];
  return `<img class="${cls}" src="${L_BASE}assets/img/${p.file}" width="${p.w}" height="${p.h}" alt="${alt}" ${lazy ? 'loading="lazy" decoding="async"' : ''}>`;
}
let L_BASE = '';

function features(L) {
  const s = L.features, r = s.row;
  const cards = s.items.map((it) => `<li class="card p-6">
            <span class="icon-box">${ic(it.icon)}</span>
            <h3 class="h3 mt-5">${it.t}</h3>
            <p class="mt-2 text-slate-700">${it.d}</p>
          </li>`).join('');
  const bullets = r.bullets.map((b) => `<li class="flex items-start gap-3">${ic('check', 'mt-1 size-5 shrink-0 text-success')}<span>${b}</span></li>`).join('');
  return `<!-- section:features -->
    <section id="features" aria-labelledby="features-title" class="section bg-surface">
      <div class="wrap">
        ${sectionHead(s.eyebrow, s.h, s.lead, 'features')}
        <ul class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${cards}</ul>
        <div class="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p class="eyebrow">${r.eyebrow}</p>
            <h3 class="h2">${r.h}</h3>
            <p class="lede">${r.d}</p>
            <ul class="mt-6 space-y-3 text-slate-700">${bullets}</ul>
            <p class="mt-8"><a class="btn btn-outline" href="#pricing">${s.cta}</a></p>
          </div>
          ${photo(data.photos, r.credit, r.alt, 'photo')}
        </div>
      </div>
    </section>
    <!-- /section:features -->`;
}

function lead(L) {
  const s = L.lead;
  const msgs = s.chat.map((m) => {
    const list = m.list ? `<ol class="mt-2 list-decimal space-y-1 ps-5">${m.list.map((x) => `<li>${x}</li>`).join('')}</ol>` : '';
    const isLead = m.who === 'lead';
    return `<li class="msg ${isLead ? 'msg-lead' : 'msg-user'}"><span class="msg-who">${isLead ? '<bdi>Lead</bdi>' : m.name}</span><p>${m.text}</p>${list}</li>`;
  }).join('');
  const pipe = s.pipe.map((p) => `<li class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
              <span class="step-dot step-${p.tone}" aria-hidden="true"></span>
              <div class="min-w-0 flex-1"><bdi class="text-sm text-slate-600" dir="ltr">${p.id}</bdi><p class="font-medium text-ink">${p.t}</p></div>
              <span class="badge badge-${p.tone}">${p.s}</span>
            </li>`).join('');
  return `<!-- section:lead-chat -->
    <section id="lead" aria-labelledby="lead-title" class="section bg-white">
      <div class="wrap">
        ${sectionHead(s.eyebrow, s.h, s.lead, 'lead')}
        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <figure class="mock m-0 flex flex-col" role="group" aria-label="${s.chatLabel}">
            <div class="flex items-center gap-2 border-b border-slate-200 bg-surface px-4 py-3">${ic('chat', 'size-5 text-accent-600')}<span class="text-sm font-semibold text-slate-700">${s.chatTitle}</span></div>
            <ol class="flex flex-1 flex-col gap-3 p-4 sm:p-6">${msgs}</ol>
            <figcaption class="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">${s.demo}</figcaption>
          </figure>
          <div class="mock flex flex-col" role="group" aria-label="${s.pipeLabel}">
            <div class="flex items-center gap-2 border-b border-slate-200 bg-surface px-4 py-3">${ic('layers', 'size-5 text-accent-600')}<span class="text-sm font-semibold text-slate-700">${s.pipeTitle}</span></div>
            <ol class="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-6">${pipe}</ol>
            <p class="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">${s.pipeDemo}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- /section:lead-chat -->`;
}

function gulf(L) {
  const s = L.gulf;
  const icons = ['lang', 'globe', 'users'];
  const pts = s.points.map((p, i) => `<li class="flex gap-4"><span class="icon-box shrink-0">${ic(icons[i])}</span><p class="text-slate-700"><strong class="block text-lg text-ink">${p.t}</strong>${p.d}</p></li>`).join('');
  return `<!-- section:audience -->
    <section id="gulf" aria-labelledby="gulf-title" class="section bg-surface">
      <div class="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        ${photo(data.photos, s.credit, s.alt, 'photo')}
        <div>
          <p class="eyebrow">${s.eyebrow}</p>
          <h2 id="gulf-title" class="h2">${s.h}</h2>
          <p class="lede">${s.lead}</p>
          <ul class="mt-8 space-y-6">${pts}</ul>
          <p class="mt-6 rounded-lg border border-dashed border-slate-400 bg-white p-3 text-sm text-slate-700">${s.ph}</p>
          <p class="mt-8"><a class="btn btn-primary" href="#cta" data-cta>${s.cta}</a></p>
        </div>
      </div>
    </section>
    <!-- /section:audience -->`;
}

function pricing(L) {
  const s = L.pricing;
  const plans = s.plans.map((p) => {
    const items = p.items.map((i) => `<li class="flex items-start gap-3">${ic('check', 'mt-1 size-5 shrink-0 text-success')}<span>${i}</span></li>`).join('');
    return `<li class="plan ${p.featured ? 'plan-featured' : ''}">
            ${p.featured ? `<p class="badge badge-accent absolute -top-3 start-6">${s.flag}</p>` : ''}
            <h3 class="h3">${p.name}</h3>
            <p class="mt-1 text-slate-600">${p.desc}</p>
            <p class="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span class="text-4xl font-bold tracking-tight text-ink"><data value="${p.amount}">${p.show}</data> <bdi dir="ltr" class="text-xl">USD</bdi></span><span class="text-slate-600">${s.unit}</span></p>
            <p class="mt-2"><span class="badge badge-ph">${s.tag}</span></p>
            <ul class="mt-6 flex-1 space-y-3 text-slate-700">${items}</ul>
            <a class="btn ${p.featured ? 'btn-primary' : 'btn-outline'} mt-8 w-full" href="#cta" data-cta>${p.cta}</a>
          </li>`;
  }).join('');
  return `<!-- section:pricing -->
    <section id="pricing" aria-labelledby="pricing-title" class="section bg-white">
      <div class="wrap">
        ${sectionHead(s.eyebrow, s.h, s.lead, 'pricing')}
        <p class="mt-4 max-w-2xl rounded-lg border border-dashed border-slate-400 bg-surface p-3 text-sm text-slate-700">${s.note}</p>
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
    <section id="faq" aria-labelledby="faq-title" class="section bg-surface">
      <div class="wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        ${sectionHead(s.eyebrow, s.h, s.lead, 'faq', 'lg:sticky lg:top-24 lg:self-start')}
        <div class="space-y-3">${items}</div>
      </div>
    </section>
    <!-- /section:faq -->`;
}

function cta(L) {
  const s = L.cta;
  const alt = L.footer.creditNames.office;
  return `<!-- section:cta -->
    <section id="cta" aria-labelledby="cta-title" class="on-dark relative isolate overflow-hidden bg-ink py-16 md:py-24">
      <img class="absolute inset-0 -z-10 size-full object-cover opacity-25" src="${L_BASE}assets/img/${data.photos.office.file}" width="${data.photos.office.w}" height="${data.photos.office.h}" alt="${alt}" loading="lazy" decoding="async">
      <div class="wrap text-center">
        <h2 id="cta-title" class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">${s.h}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-slate-200">${s.d}</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a class="btn btn-light btn-lg" href="#" data-cta>${s.btn}${icDir('arrow')}</a>
          <a class="btn btn-ghost-dark btn-lg" href="#faq">${s.ghost}</a>
        </div>
        <p class="mt-6 text-sm text-slate-300">${s.note}</p>
      </div>
    </section>
    <!-- /section:cta -->`;
}

function footer(L) {
  const f = L.footer;
  const cols = f.cols.map((c) => `<div><h2 class="footer-h">${c.h}</h2><ul class="mt-3">${c.links.map(([h, t]) => `<li><a class="footer-link" href="${h}">${t}</a></li>`).join('')}</ul></div>`).join('');
  const credits = Object.keys(data.photos).map((k) => `<li><a class="footer-link" href="${data.photos[k].unsplash}" rel="noopener" target="_blank">${f.creditNames[k]} · ${f.photoAuthor} · Unsplash</a></li>`).join('');
  return `<footer class="on-dark bg-ink pt-16 text-slate-300">
    <div class="wrap">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <span class="brand text-white">${logo}<span>ReleaseHub</span></span>
          <p class="mt-4 max-w-xs">${f.blurb}</p>
          <p class="mt-4"><a class="lang-switch lang-switch-dark" href="${L.otherHref}" hreflang="${L.otherLang}" lang="${L.otherLang}" aria-label="${L.otherLabel}" data-lang-switch>${L.otherName}</a></p>
        </div>
        <nav class="contents" aria-label="${L.ui.footerNav}">${cols}</nav>
        <div><h2 class="footer-h">${f.legalH}</h2><ul class="mt-3">${f.legal.map((x) => `<li class="flex min-h-11 items-center">${x}</li>`).join('')}</ul><p class="mt-2 text-sm">${f.legalNote}</p></div>
      </div>
      <div class="mt-12 border-t border-slate-700 py-8">
        <h2 class="footer-h">${L.ui.credits}</h2>
        <ul class="mt-3 grid gap-x-8 md:grid-cols-3">${credits}</ul>
      </div>
      <div class="flex flex-col gap-2 border-t border-slate-700 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>${f.copy}</p>
        <p><span class="badge badge-demo me-2">${L.ui.demoTag}</span>${f.demoNote}</p>
      </div>
    </div>
  </footer>`;
}

function page(L) {
  L_BASE = L.base;
  const b = L.base;
  return `<!DOCTYPE html>
<html lang="${L.lang}" dir="${L.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${L.title}</title>
  <link rel="preload" href="${b}assets/fonts/${L.lang === 'ar' ? 'ibm-plex-sans-arabic-arabic-400-normal.woff2' : 'ibm-plex-sans-latin-400-normal.woff2'}" as="font" type="font/woff2" crossorigin>
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
