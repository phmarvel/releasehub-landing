# RHL-11 design critique rounds (Departure Board)

Rubric scores 1-5, in this order: composition, typography, spacing, imagery, colour, detail, consistency, phone, right-to-left, credibility, distinctiveness. Final screenshots: `docs/screenshots/` (same files in `.releasehub-context/screenshots/`): en-390, en-1440, ar-390, ar-1440 (full page, taken after the board has settled).

Each round: render with `node tools/render-pages.mjs`, build the CSS, take screenshots at 390 and 1440 in English and Arabic, look at the pictures, score, fix the weakest points.

| Round | Scores | What was found and fixed next |
|---|---|---|
| 1 (first render) | 4,4,4,4,4,3,4,4,3,4,4 | Arabic: the run times garbled their digit order inside the board row (wrapped in `bdi dir="ltr"`); the Arabic pull request scene clipped the code because the SVG inherited `direction: rtl` (`.scene { direction: ltr }`); status plates looked over-spaced (narrower plate); mobile CLS 0.126 from the font swap (preloaded the 400 and 700 faces, CLS 0) |
| 2 | 4,4,4,4,5,4,4,4,4,4,4 | Scene text was about 12px on a 390px phone (all scene text sizes raised by 1px); footer mark vanished on the deep enamel (ring added); checked the ticket notches, the gate route and the sheet menu in Arabic |
| 3 (final) | 4,4,4,4,5,4,4,4,4,4,5 | Nothing below 4. Left as is on purpose: five rows make the Arabic board tall on phones (each status sits under its title), the hero scenes are small on phones but readable |

Final scores: every criterion is 4 or more at 390 and 1440 px, in English and Arabic (the page is one design in both languages, so the scores are shared; right-to-left was judged on the Arabic shots).

## Checks (final build)
- Lighthouse (headless Chromium, mobile and desktop): English mobile 100 / 100 / 100 / 90, English desktop 99 / 100 / 100 / 90, Arabic mobile 100 / 100 / 100 / 90, Arabic desktop 100 / 100 / 100 / 90 (performance, accessibility, best practices, SEO). SEO is 90 only because the meta description is RHL-9's job.
- axe-core 4.x injected through CDP (wcag2a, wcag2aa, wcag21aa, wcag22aa, best-practice): 0 violations at 320, 390 and 1440 px in both languages.
- html-validate: no errors on both pages.
- No horizontal scroll at 320, 390 and 1440 px; no interactive element under 44px; focus ring 2px solid (enamel on light, amber on dark).
- Board: plates differ 350 ms after load and settle on the final text; with `prefers-reduced-motion: reduce` they show the final text at once and no flip class is added (English and Arabic). Menu opens by tap, moves focus into the sheet and closes with Escape, returning focus to the button.
