## What changed
- The whole page is redesigned as a departure board for software (English and Arabic). The hero shows a board of five sample runs with the statuses Planned, Coding, In review and Merged; the status plates flip once on load like a split-flap display (static with `prefers-reduced-motion` and without JS; Arabic flips whole words).
- New palette (enamel blue, lamp amber, cool paper, status green/red) and fonts (Barlow Semi Condensed and Barlow Condensed, IBM Plex Sans Arabic for Arabic). One radius logic and one shadow (the board).
- Layouts vary: split hero, numbered gate route for the four steps, split plus quiet list for features, dark band for the Lead, board rows for the Gulf section, ticket-style plans, accordion FAQ, enamel call-to-action band. No eyebrows, no arrows on buttons.
- Unsplash photos and credits are gone. The Lead chat, the pull request (diff and checks) and a bilingual run board are drawn inline SVG scenes in one style, with titles as alt text; Arabic scenes carry real Arabic.
- Files: `content/demo.json`, `tools/render-pages.mjs`, `assets/css/input.css` and built `styles.css`, `assets/js/main.js`, `assets/fonts/`, the two generated pages, `docs/design-plan.md`, `docs/directions.md`, `docs/SRS.md`, `docs/critique-rounds.md`, `docs/screenshots/`, `README.md`.

## Why
RHL-11: one design run owns the look of the page with the decisions Departure board, drawn product scenes, IBM Plex Sans Arabic and Modern web components.

## How it was checked
- Three render, screenshot and critique rounds at 390 and 1440 px in both languages (scores in `docs/critique-rounds.md`; all 4 or more). Final screenshots in `docs/screenshots/`.
- Lighthouse (performance / accessibility / best practices / SEO): English mobile 100/100/100/90, English desktop 99/100/100/90, Arabic mobile 100/100/100/90, Arabic desktop 100/100/100/90. SEO is 90 because the meta description is RHL-9's.
- axe-core: 0 violations at 320, 390 and 1440 px in both languages. html-validate: no errors.
- Scripted browser checks: no horizontal scroll at 320/390/1440; no target under 44px; 2px focus ring; the sheet menu opens by tap, takes focus and closes with Escape; plates change 350 ms after load and settle on the final text; with reduced motion nothing flips (both languages); RTL mirrors the board, the steps and the sheet.
- The repository has no test tooling, so criteria were checked with throwaway scripts, not committed tests.

## Look closely
- Everything is still demo: prices, plan limits, the Gulf data claim, the sample runs and the call-to-action address (`CTA_HREF` is `#`) keep their visible placeholder marks. Native Arabic review is still needed (see needs.json).
- Phone: the Arabic board is tall because each status sits under its run title.
