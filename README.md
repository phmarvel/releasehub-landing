# releasehub-landing

The public landing page for ReleaseHub, in English and Arabic.

## How it is built

- Pages `index.html` (English) and `ar/index.html` (Arabic, RTL) are **generated**. Edit `content/demo.json` (all copy, prices and credits, marked demo) or `tools/render-pages.mjs` (markup), then run `node tools/render-pages.mjs`.
- CSS is Tailwind v4 compiled with the standalone CLI. Download the binary from the Tailwind releases to a temporary folder (never commit it) and run:
  `tailwindcss -i assets/css/input.css -o assets/css/styles.css --minify`
  Only `input.css` and the built `styles.css` are committed. The in-browser Tailwind script is never used.
- `assets/js/main.js` has the language redirect, the sheet menu and `CTA_HREF` (the call-to-action address, still a placeholder).

## Credits

- Layout patterns follow the open-source Tailwind block libraries shadcn/ui blocks (MIT) and HyperUI (MIT); the markup was written for this site and no template code was copied verbatim.
- Icons: Lucide (ISC). Fonts: IBM Plex Sans and IBM Plex Sans Arabic (SIL OFL 1.1, via Fontsource), self-hosted in `assets/fonts/`.
- Photos from Unsplash (Unsplash licence), credited in the page footer: city skyline, code on a laptop, office corridor. The photographers' names are still to be added (see `content/demo.json`).
