# Design plan: Departure Board (RHL-11)

Written before the code, then reviewed against the generated defaults (see the end). It replaces the "Clear Release" look of RHL-10. Decisions given by the story: Modern web (Tailwind v4 tokens, shadcn-style states), IBM Plex Sans Arabic, aesthetic direction Departure board, drawn product scenes.

## Subject, audience, job
ReleaseHub turns stories into pull requests with AI agents and a Lead that runs delivery. The audience is software teams and agencies in the Gulf (English and Arabic). The page's job: make a visitor see in one glance that runs move through steps with clear statuses, then book a demo.

The subject's own world is a departure board: runs are flights, the four steps are gates, and status is what the board says (Planned, Coding, In review, Merged).

## Colour (5 named tokens, all in `@theme`; `--color-*: initial` removes every default)
| Name | Hex | Role | Contrast checked |
|---|---|---|---|
| Enamel | #12263F | Board, dark bands, featured plan stub (variants: deep #0B1829, raised #24476F, tint #EEF3F8, text #B9C8DA) | white on enamel 15.3, text-on-enamel 9.0 |
| Lamp amber | #FFB43A | Lit characters and the one primary button (enamel text, 8.6); lamp mark. Dark amber #7A4400 on #FFF0CF (7.0) for placeholder tags | amber on deep enamel 10.1 |
| Boarding-pass paper | #F5F7F9 with #FFFFFF | Page ground, ticket bodies. Cool, deliberately not cream | ink on paper 13.4 |
| Chalk ink | #1C2B3D (muted #4A5B70, line #CFD8E3) | Text | muted on white 7.0 |
| Go green / hold red | #1F7A4F (lit #5FD08F) / #B83A2A (lit #FF9D8F) | Status only: Merged, removed diff lines. Always with a text label | go on white 5.3 |

## Type
- Barlow Semi Condensed 400/600/700: headings and text. A signage-grade, slightly condensed grotesque (road and transport signage heritage), so headings are tight and strong without a serif. Headings use tracking-tight, body 16 to 20px, lines under 70 characters.
- Barlow Condensed 600: board plates only (gates, status letters, step numbers).
- IBM Plex Sans Arabic 400/600/700: all Arabic text and the Arabic plates. Its even, humanist strokes sit well beside Barlow's narrow forms. Arabic root +10% (17.6px), line height 1.7, no letter-spacing, no uppercase.
- No monospace for labels (code in the drawn pull request uses the system monospace because it is code).

## Layout (all text start-aligned; only the final call to action is centred)
Hero, split: text and one primary button beside the board.
```
+--------------------------------------------------------------+
| [mark] ReleaseHub   How  Features  Gulf  Pricing  FAQ  AR [Book]|
+--------------------------------------------------------------+
| Plan, code, open        +--------------------------------+   |
| the pull request.       | Run board               [Demo] |   |
| sub line                | Gate  Run                Status|   |
| [Book a demo] [How]     | [4]  Export invoices   Merged  |   |
|                         | [4]  Arabic labels   In review |   |
|                         | [3]  Dark mode          Coding |   |
|                         | [2]  Team roles        Planned |   |
|                         +--------------------------------+   |
+--------------------------------------------------------------+
```
How it works (a real sequence, so numbered gates joined by a dashed route; vertical on phones):
```
[1]- - - - - -[2]- - - - - -[3]- - - - - -[4]
Story         Plan          Code          Pull request
```
Features: split (text | drawn pull request), then a quiet 3-column list with no cards.
Lead chat: dark enamel band, drawn chat scene at the start side, text and example questions at the end side.
Gulf: text and three board-like rows (amber start edge) beside a drawn bilingual run board.
Pricing: three ticket plans (stub, dashed perforation with notches, body); the middle one has an enamel stub.
FAQ: sticky heading beside a native `<details>` accordion. Final call to action: enamel band with a "Merged" plate row, one amber button.

Rhythm: paper hero, white, paper, deep enamel, white, paper, white, enamel, deep enamel footer. Section padding 64px on phones and 96px on desktop; container 1280px.

## Radius, shadow, motion
- Radius by hierarchy: sm (plates, badges), md (buttons, inputs), xl (board, scenes, tickets, accordion).
- One shadow (xl): the hero board (and the phone sheet that floats over the page). Everything else uses borders or rings.
- One motion moment: on load each plate of the hero board flips once (CSS keyframes, JS swaps the character halfway). It is static under `prefers-reduced-motion` and without JS; the text is in the HTML. Hover and focus transitions are 150ms and answer a person's action.

## Imagery: drawn scenes (inline SVG, one style)
White panel, 2px enamel outline, enamel title bar with an amber lamp, flat fills from the palette, no gradients. Three scenes: Lead chat, pull request (diff plus checks), run board (English and Arabic rows). Frames are `dir="ltr"`; content is laid out in the reading direction of the page with real Arabic text on the Arabic page; code is never mirrored. Each has a `<title>` as alt text. No photographs, no credits.

## Principles
1. One memorable element (the board), everything else quiet.
2. Structure carries meaning: numbers only on the real sequence, labels only where informative (Demo, placeholder), perforations on tickets because tickets are cut.
3. Status is never colour alone.
4. Mirrors by `dir` and logical properties, not by separate artwork.

## Review against the generated defaults (and what changed)
| Default | First draft | Revision |
|---|---|---|
| Cream plus terracotta | Paper #F5F7F9 is cool grey-white; accent is amber on enamel blue | Kept; ruled out any warm cream |
| Near-black plus one acid accent | Enamel board plus amber would read as "dark plus one bright accent" if dark were the base | Dark is limited to the board and three bands; the page ground is paper; green and red have status jobs |
| Broadsheet hairlines | Dashed row separators on the board | Kept only inside the board and tickets where they are the real device (rows, perforation); no hairline rules between sections |
| Identical rounded cards, one shadow | Features as six cards | Replaced by split rows, a plain list, board rows, tickets, and a single shadow |
| Eyebrow above every heading | Every section had one | Removed all; the only labels are Demo and placeholder tags |
| Middle dots, arrows on buttons, spaced em dashes | Meta strings and arrows on buttons | Run id and time are separate spans with a gap; no arrows; no dashes |
| Mono for small data labels | Board in mono | Barlow Condensed plates instead |
| Gradients, fade-in on every section | none planned | None used; one load sequence only |
