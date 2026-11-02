# RHL-10 design critique rounds

Rubric scores 1-5: composition, typography, spacing, imagery, colour, detail, consistency, phone, right-to-left, credibility. Final screenshots: `docs/screenshots/` (same files in `.releasehub-context/screenshots/`): en-390, en-1440, ar-390, ar-1440.

| Round | Scores | What was fixed next |
|---|---|---|
| 1 | 4,4,3,4,4,3,4,3,4,4 | Empty pipeline card, tap targets under 44px, Arabic header overflow at 320px |
| 2 | 4,4,4,4,4,4,4,3,4,4 | Phone menu was drawn inside the sticky header (moved out), Arabic-Indic list numbers, `<pre>` focus issue, credits grid |
| 3 | 4,4,4,4,4,4,4,4,4,4 | Review fixes: step numbers slate-600, unused font preload removed, inline favicon |

Checks: html-validate no errors; axe-core 4.10 (injected) 0 violations at 390/1440 in both languages; Lighthouse mobile and desktop 100 / 100 / 96 / 91 (performance, accessibility, best practices, SEO; the meta description is RHL-9).
