## What changed
- Whole landing page redesigned (English `index.html`, Arabic `ar/index.html`): navbar with a sheet menu on phones, split hero with a product visual, trust strip, four-step cards, six-card feature grid with a photo row, Lead chat and delivery pipeline panels, Gulf section with a photo, three pricing plans (Team highlighted), FAQ accordion, CTA band, four-column footer with photo credits.
- Tailwind v4 built with the standalone CLI (`assets/css/input.css` -> `assets/css/styles.css`, binary not committed); only the Clear Release palette (plus tints) is in `@theme`. IBM Plex Sans + IBM Plex Sans Arabic self-hosted, `font-display: swap`; Arabic about 10% larger, line height 1.6-1.7, no letter-spacing or uppercase.
- Copy lives in `content/demo.json` (demo, en + ar); `node tools/render-pages.mjs` generates both pages. Main files: `tools/render-pages.mjs`, `content/demo.json`, `assets/css/input.css`, `assets/js/main.js` (sheet menu), `assets/fonts/`, `assets/img/`, README, CLAUDE.local.md, docs/directions.md, docs/SRS.md.
- Not touched: RHL-9 work (meta tags, sitemap, workflows), `CTA_HREF`, section ids, `data-cta`.

## Why
RHL-10: redo the look of the whole page at a professional standard (Modern web style), keeping the palette.

## How it was checked
- CDP scripts (headless Chromium) at 320/390/1440 px, both languages: no horizontal scroll, all links/buttons/summaries at least 44x44, menu opens/closes by tap, Escape, X, backdrop and link with focus back on the button, 2px focus ring, fonts loaded, RTL mirrored, 9 `data-cta` links, images load with alt text, text contrast scan clean.
- html-validate: no errors. axe-core 4.10 (injected via CDP; `@axe-core/cli` fails on a chromedriver mismatch): 0 violations. Lighthouse mobile and desktop: 100 / 100 / 96 / 91 (SEO limited by the meta description, RHL-9).
- Screenshots: `.releasehub-context/screenshots/` and a tracked copy in `docs/screenshots/` (`en-390`, `en-1440`, `ar-390`, `ar-1440`, PNG).
- Critique rounds (1-5: composition, type, spacing, imagery, colour, detail, consistency, phone, RTL, credibility), also in `docs/critique-rounds.md`:
  - Round 1: 4,4,3,4,4,3,4,3,4,4 (empty pipeline card, small tap targets, Arabic 320px overflow)
  - Round 2: 4,4,4,4,4,4,4,3,4,4 (fixed; phone menu still inside the header)
  - Round 3: 4,4,4,4,4,4,4,4,4,4 (menu moved out of the header, Arabic list digits, credits grid, review fixes)

## Look closely
- No template was downloaded: patterns follow shadcn/ui blocks and HyperUI (MIT); the README says so.
- Pages are generated; later stories edit `content/demo.json` / the renderer.
- Still demo: all copy, trust names, prices and plan items, chat and pipeline samples, FAQ answers, data-residency claim, legal links, CTA address (`'#'`), Arabic text pending native review, photographer names ([PLACEHOLDER]).
