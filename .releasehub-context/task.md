# RHL-11 / RUN-151: departure-board redesign (notes for the next run)

## Done
- New identity "Departure Board": enamel #12263F, lamp amber #FFB43A, paper #F5F7F9, chalk ink, status green/red. Fonts Barlow Semi Condensed + Barlow Condensed (Latin), IBM Plex Sans Arabic. Plan and review against defaults: docs/design-plan.md. docs/directions.md and docs/SRS.md follow.
- Hero = run board with flipping split-flap plates (CSS + small JS in main.js, static under reduced motion and without JS). Arabic flips whole words (letters join).
- Photos and credits removed; scenes are inline SVG (Lead chat, pull request with diff and checks, bilingual run board). Eyebrows, arrows, six identical cards removed. Sections: split hero, numbered gate route (How), split + plain list (Features), dark band (Lead), board rows (Gulf), ticket plans, FAQ, enamel CTA.
- Checks: 3 critique rounds (docs/critique-rounds.md), Lighthouse 99-100 / 100 / 100 / 90, axe 0 violations, html-validate clean.

## Decisions
- "Keep the palette" from RHL-10 was overridden by the story (AC 2 asks for a different palette).
- Lead pipeline mock and HTML chat were dropped; the hero board covers the statuses and the chat is a drawn scene.
- Board scene is bilingual and the same on both pages; chat and PR scenes follow the page language.
- Lighthouse SEO is 90 because meta description belongs to RHL-9; not added here.

## Left for a person (needs.json)
- Native Arabic review, real CTA address (`CTA_HREF`), real prices and claims.

## Pitfalls hit
- Arabic times need `<bdi dir="ltr">`; SVG scenes need `direction: ltr` in CSS; font preloads fixed CLS.
- The runner can wipe .releasehub-context/screenshots: tracked copies are in docs/screenshots/.
