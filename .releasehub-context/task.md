# RHL-10 (RUN-145): redesign of the whole landing page

## Done
- Rebuilt both pages with Tailwind v4 (standalone CLI, binary kept in /tmp), palette as `@theme` tokens, IBM Plex Sans + IBM Plex Sans Arabic self-hosted.
- Pages are now generated: `content/demo.json` (all copy, demo) + `tools/render-pages.mjs` -> `index.html`, `ar/index.html`. Plan said a `tools/templates/page.html`; the markup is in the renderer instead (simpler, no template slots).
- Sections: navbar + sheet menu (outside `<header>`), split hero with product mock, trust strip, 4 steps, 6 features + photo row, Lead chat + pipeline, Gulf photo split, 3 plans (Team highlighted), FAQ `<details>`, CTA band, 4-column footer with photo credits.
- Kept: section ids/markers, `data-cta` + `CTA_HREF` (still `'#'`), toggle, `i18n.js`, `<head>` meta (RHL-9 untouched; no workflow/sitemap changes).

## Decisions
- No template was downloaded; patterns follow shadcn/ui blocks and HyperUI (both MIT), credited in README as inspiration, no code copied. Say so honestly in reviews.
- Desktop nav starts at `lg` (5 links + toggle + button do not fit at 768 in Arabic).
- The mock is not forced `dir="ltr"` (so Arabic copy mirrors); only the code diff is.
- Unsplash photographer names could not be fetched (bot block): credits say [PLACEHOLDER] photographer, listed in needs.json.

## Failed / worked around
- `@axe-core/cli`: chromedriver 152 vs Chromium 156 mismatch; used axe-core 4.10 injected through CDP instead (0 violations).
- Sheet first rendered inside the header (backdrop-blur creates a containing block for fixed children); fixed by removing the blur and moving the sheet out of `<header>`.
- Arabic 320px overflow: header too wide, then `<pre>` widening a grid; fixed.

## Left
- Real CTA address, prices, claims, privacy/terms pages, photographer names, native Arabic review (see needs.json).
- Lighthouse SEO is 91 (meta description etc. belong to RHL-9).
## Review round fixes
- Step numbers were slate-400 (2.56:1): now slate-600. Font preload removed (Chrome called it unused). Inline data-URI favicon added.
- `.releasehub-context/` is in .git/info/exclude, so screenshots are untracked unless force-added; they are PNG: en-390, en-1440, ar-390, ar-1440.
## Review round 2 fix
- Screenshots/PR were not on the branch: `.releasehub-context/` was in .git/info/exclude and the play-test wipes untracked files. Now the exclude line is removed, files are `git add -f`, and tracked copies live in `docs/screenshots/` and `docs/critique-rounds.md`.
- Never `pkill -f` a pattern that appears in your own command; use `fuser -k 5173/tcp`.
