# ReleaseHub landing page: three directions

ReleaseHub is a delivery workspace. AI coding agents plan, code and open pull requests from a team's stories, and a Lead runs delivery in a chat. The page is for software teams and agencies in the Gulf, the product is priced per user, and the page ships in English and Arabic (RTL).

Below are three directions that differ in layout, tone and colour. The recommendation at the end picks one to implement. The other stories of RHL-1 (RHL-4 to RHL-8) take their palette, fonts and section order from the direction chosen here.

## Direction 1: Clear Release (to implement)

### Concept
A clean, light, product-led page. The product mockup does the selling: the visitor sees a story become a pull request within the first screen. Nothing decorative gets in the way of the product.

### Tone of voice
Confident and plain. Short sentences, concrete verbs ("Plan, code, open the PR"), no hype and no jargon. The page says what ReleaseHub does and what it costs.

### Colour palette
| Role | Hex | Use |
|---|---|---|
| Background | #FFFFFF | Page background |
| Surface | #F5F7FA | Alternate sections, cards |
| Ink | #0F172A | Headings and body text |
| Accent | #2563EB | Buttons, links, focus ring |
| Success | #16A34A | Check marks and "PR opened" badges (icons only, never text on white) |

### Typography
Inter for English (headings 600 to 700, body 400). IBM Plex Sans Arabic for Arabic, at the same weights and about 10% larger body size and 1.7 line height. Both are self-hosted variable fonts, so the static site needs no third-party request.

### Layout
Centred hero with a large product mockup under the headline. A 12-column grid, a maximum content width of 1120 px, and generous vertical rhythm. Features are alternating text-and-image rows. The Lead chat is shown as a framed chat window. Pricing is a single card because the price is per user. Single sticky header with the language switch.

### Sections
1. Header and language switch: brand, anchor links, English/Arabic toggle, main call to action.
2. Hero: one-line promise, sub-line, call to action, product mockup.
3. How it works: story, plan, code, pull request, in four steps.
4. Features: what the agents and the workspace do, as alternating rows.
5. Lead chat showcase: a sample conversation where the Lead runs delivery.
6. Gulf audience: why it fits teams and agencies in the Gulf, including Arabic support.
7. Pricing per user: one card with the per-user price and what is included.
8. FAQ: answers to the usual objections.
9. Final call to action: one last prompt to start.
10. Footer: links, language switch and legal.

### RTL / Arabic
`dir="rtl"` and `lang="ar"` on `<html>`, set by the switch and remembered. All spacing uses CSS logical properties, so the layout mirrors by itself: the alternating rows swap sides, and arrows and chevrons are mirrored. Code, logos, the product mockup frame and the price number's currency code stay unmirrored. Numbers may use Eastern Arabic digits in Arabic. Headings are not clipped by line height, and Arabic is never letter-spaced.

## Direction 2: Pull Request

### Concept
A dark, technical page that looks like the place developers already work: a terminal and a pull request. The page itself reads like a PR: a timeline, a diff, a review.

### Tone of voice
Terse and developer to developer. Commands, status lines and facts, with dry humour at most ("Merged. Next story."). No marketing adjectives.

### Colour palette
| Role | Hex | Use |
|---|---|---|
| Background | #0B0F14 | Page background |
| Panel | #111821 | Terminal and diff panels |
| Text | #E6EDF3 | Body text and headings |
| Added | #3FB950 | Diff additions, success states |
| Warning | #D29922 | Review-needed states |
| Highlight | #A371F7 | Merged state, links |

### Typography
JetBrains Mono for headings, labels and code. Inter at light weights for longer prose. For Arabic, Noto Sans Arabic is used for prose and headings; Arabic is never set in the mono face.

### Layout
Full-width dark page with a split-pane hero: a terminal on one side showing a story turning into a PR, and a live-looking PR timeline on the other. Content is in a left-aligned single column with a thin vertical timeline rail. Features are diff-style lists with `+` and `-` lines. The page has a sticky command-bar header.

### Sections
1. Command bar: brand, links and language switch as a prompt-like bar.
2. Hero: a split terminal and PR timeline showing the promise.
3. Pipeline: story, plan, code, PR as a vertical timeline.
4. Diff features: capabilities as lines added to the team's workflow.
5. Chat transcript: the Lead running delivery, shown as a log.
6. Pricing: per-user price as a one-line config block.
7. FAQ: answers as short commit-message style entries.
8. Call to action: a final command to copy or click.

### RTL / Arabic
Prose and layout mirror under `dir="rtl"`, but terminals, diffs and code blocks are `dir="ltr"` islands, so commands stay readable. The timeline rail moves to the right side. Labels in the command bar are translated, while commands themselves are not. Mixed Arabic and Latin text uses `unicode-bidi: isolate` around product and command names.

## Direction 3: The Delivery Story

### Concept
A warm, editorial long-scroll page that tells the story of a delivery from brief to shipped, in illustrated chapters. It sells the feeling of a team that finally gets its time back.

### Tone of voice
Warm, human and story-driven. Second person, full sentences, a little wit. It talks about teams and outcomes before it talks about features.

### Colour palette
| Role | Hex | Use |
|---|---|---|
| Paper | #FBF4E8 | Page background |
| Terracotta | #D9653B | Illustration fills and large display accents |
| Deep teal | #1F4E5A | Chapter backgrounds and headings |
| Mustard | #E8B33F | Highlights and illustration details |
| Brown ink | #2B2118 | Body text |
| Clay | #9A3F1C | Links and small accent text (AA on paper) |

### Typography
Fraunces, a soft serif, for display headings. Source Sans 3 for body text. For Arabic, Amiri for display headings and Noto Naskh Arabic for body text, keeping the editorial, bookish feel.

### Layout
Narrative scroll in full-bleed chapters. Each chapter pairs a large hand-drawn style illustration with a short text block, and the sides alternate. Pull quotes break up the page. There is a thin progress line on the edge of the page instead of a sticky navigation, and a small header with the language switch.

### Sections
1. Opening story: a short illustrated scene of a team with a full backlog.
2. Chapter 1, the brief: how a story is written and handed over.
3. Chapter 2, the agents: how agents plan, code and open pull requests.
4. Chapter 3, the Lead: how the Lead runs delivery in a chat.
5. Teams in the Gulf: short stories from teams and agencies.
6. Pricing: the per-user price, told plainly.
7. FAQ: questions in the voice of a conversation.
8. Closing call to action: the last page of the story.

### RTL / Arabic
Illustrations are mirrored on purpose where direction matters: the journey from brief to shipped runs right to left, and the chapters swap sides. Directional arrows flip, while faces, text inside the artwork and logos do not. Artwork with Latin text inside it has an Arabic variant. Body text is set larger and with a more open line height, as Naskh needs it.

## Comparison

| | Direction 1: Clear Release | Direction 2: Pull Request | Direction 3: The Delivery Story |
|---|---|---|---|
| Look | Light, neutral, one blue accent | Dark, terminal, status colours | Warm paper, earthy, illustrated |
| Layout | Centred hero, 12-column grid, alternating rows, single price card | Split-pane hero, left-aligned timeline, diff lists | Long scroll of full-bleed illustrated chapters |
| Tone | Confident, plain | Terse, technical | Warm, story-driven |
| Type | Sans serif (Inter) | Monospace plus sans | Serif plus humanist sans |
| Arabic/RTL effort | Lowest: mirrors with logical properties | Medium: LTR islands inside RTL | Highest: mirrored art and Arabic variants |

## Recommendation

Direction 1 is the one to implement. It is the cheapest to make truly bilingual, because a clean grid mirrors with CSS logical properties and needs no separate artwork. It states the per-user price most clearly in a single card, it is the easiest to make accessible with strong contrast, and it needs no illustration work, so the later stories (RHL-4 to RHL-8) can build it as a fast static site on GitHub Pages. Directions 2 and 3 stay on file as options for a later campaign page.
