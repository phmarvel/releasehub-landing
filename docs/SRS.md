# ReleaseHub landing page: software requirements specification

Work item RHL-3, part of RHL-1. Version 1.0.

The page is built in the visual and editorial direction **Direction 1: Departure Board** (RHL-11) from [directions.md](directions.md). Where this document says "per direction 1", `directions.md` is the source and wins on colour, type and layout. This document is the source for copy, behaviour and acceptance criteria. Stories RHL-4 to RHL-9 build and verify the page from it.

## 1. Goals and success measures

ReleaseHub is a delivery workspace: AI coding agents plan, code and open pull requests from a team's stories, and a Lead runs delivery in a chat.

Goals of the page:

1. Explain in the first screen that a story becomes a pull request.
2. Convince software teams and agencies in the Gulf to ask for a demo or start a trial.
3. State the per-user price plainly.
4. Work equally well in English and in Arabic (RTL).

Success measures. They are targets, not promises, and are measured after launch.

| Measure | Target |
|---|---|
| Lighthouse (mobile, all four categories) | 90 or more |
| Core Web Vitals on a mid-range phone | LCP 2.5 s or less, CLS 0.1 or less |
| Click-through on the main call to action | 4% or more of visits (target) |
| Share of visits that switch language | tracked only if privacy-friendly analytics is added later (see non-goals) |
| Accessibility | zero serious or critical axe violations |

## 2. Audience

- Primary: software teams (engineering leads, CTOs, product owners) in the Gulf: UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman.
- Primary: software agencies and consultancies in the Gulf that deliver for clients and bill per project.
- Language: many readers prefer Arabic and many work in English. Both are first-class, neither is a translation afterthought.
- Devices: phones are the majority of first visits; desktop is used for evaluation and for sharing with a team.
- Tone (per direction 1): confident and plain. Short sentences, concrete verbs, no hype and no jargon.

## 3. Scope and non-goals

In scope:

- A static, single-page site in English and Arabic, built with HTML, CSS and a small amount of JavaScript.
- The ten sections in chapter 4, a language switch with RTL, and the SEO files in chapter 9.
- Hosting on GitHub Pages.

Non-goals:

- No backend, no database, no server code, no API calls.
- No login, accounts, CMS or payment flow, and no real chat. The Lead chat is a static, illustrated sample.
- No form that stores data. Calls to action link to an external sign-up or contact address (placeholder, see chapter 11).
- No cookies, no third-party scripts, no tracking by default.
- Directions 2 and 3 in `directions.md` are not built.

## 4. Sections and copy

Order, per direction 1: header, hero, how it works, features, Lead chat, Gulf audience, pricing, FAQ, final call to action, footer. Each section has an anchor id (`#how`, `#features`, `#lead`, `#gulf`, `#pricing`, `#faq`) and one `<h2>`; the hero holds the page's only `<h1>`. Copy below is final unless marked as a placeholder. Arabic is written for Gulf readers in Modern Standard Arabic, not translated word for word. Product names (ReleaseHub, Lead, GitHub) stay in Latin script.

### 4.1 Header and language switch

| Element | English | العربية |
|---|---|---|
| Brand | ReleaseHub | ReleaseHub |
| Link: how it works | How it works | كيف يعمل |
| Link: features | Features | المزايا |
| Link: pricing | Pricing | الأسعار |
| Link: FAQ | FAQ | الأسئلة الشائعة |
| Language switch (shows the other language) | العربية | English |
| Language switch accessible name | Switch language to Arabic | التبديل إلى الإنجليزية |
| Button | Book a demo | احجز عرضًا تجريبيًا |

The header is a single sticky bar. On phones the links collapse into a menu button (accessible names: "Menu" / "القائمة"); the language switch and the button stay visible.

### 4.2 Hero

| Element | English | العربية |
|---|---|---|
| Headline (h1) | Plan, code, open the pull request. | خطّط، اكتب الكود، وافتح طلب الدمج. |
| Subline | ReleaseHub turns your stories into pull requests. AI agents do the work and a Lead runs delivery for you. | يحوّل ReleaseHub قصصك إلى طلبات دمج. وكلاء الذكاء الاصطناعي ينفّذون العمل، ويدير المسؤول (Lead) التسليم نيابةً عنك. |
| Body | Your team keeps the decisions. The agents take the routine. | يبقى القرار لفريقك، وتتولّى الوكلاء المهام الروتينية. |
| Primary button | Book a demo | احجز عرضًا تجريبيًا |
| Secondary button | See how it works | شاهد كيف يعمل |
| Run board label | Run board | لوحة التشغيل |
| Status plates | Planned, Coding, In review, Merged | مخطَّط، قيد الكتابة، قيد المراجعة، تم الدمج |

The hero is split: text and buttons beside the run board (RHL-11). The board lists five sample runs (gate, run name, id and time, status). Gates map to the four steps (1 story, 2 plan, 3 code, 4 pull request). Each status plate holds its final text in the HTML and flips once on page load like a split-flap display (Latin: one plate per letter; Arabic: one plate per word, because Arabic letters join). Under `prefers-reduced-motion: reduce` and without JavaScript nothing flips. The rows mirror in Arabic through `dir`; the sample runs are marked as demo.

### 4.3 How it works

| Element | English | العربية |
|---|---|---|
| Headline | From story to pull request in four steps | من القصة إلى طلب الدمج في أربع خطوات |
| Subline | No new process to learn. Write the story as you do today. | لا حاجة لتعلّم عملية جديدة. اكتب القصة كما تفعل اليوم. |
| Step 1 | **Story.** Write what you need in your tracker. | **القصة.** اكتب ما تحتاجه في أداة إدارة العمل. |
| Step 2 | **Plan.** An agent reads the code and writes a plan for you to approve. | **الخطة.** يقرأ الوكيل الكود ويكتب خطة لتوافق عليها. |
| Step 3 | **Code.** The agent writes the change and its tests. | **الكود.** يكتب الوكيل التعديل واختباراته. |
| Step 4 | **Pull request.** The agent opens the pull request and your team reviews it. | **طلب الدمج.** يفتح الوكيل طلب الدمج ويراجعه فريقك. |
| Button | Book a demo | احجز عرضًا تجريبيًا |

### 4.4 Features

An alternating split (text beside the drawn pull request scene: diff and checks) followed by a quiet list of six features without card chrome. In Arabic the split swaps sides through logical properties.

| Element | English | العربية |
|---|---|---|
| Headline | Everything delivery needs, in one workspace | كل ما يحتاجه التسليم في مساحة عمل واحدة |
| Subline | Agents do the work, your team stays in control. | الوكلاء ينفّذون، وفريقك يتحكّم. |
| Feature 1 title | Plans you approve first | خطط توافق عليها أولًا |
| Feature 1 body | Every run starts with a plan. Nothing is coded until you say yes. | كل تشغيل يبدأ بخطة. لا يُكتب أي كود قبل موافقتك. |
| Feature 2 title | Tests before code | الاختبارات قبل الكود |
| Feature 2 body | Agents write the acceptance tests first, then the code that passes them. | يكتب الوكلاء اختبارات القبول أولًا، ثم الكود الذي يجتازها. |
| Feature 3 title | Pull requests your team can review | طلبات دمج يسهل على فريقك مراجعتها |
| Feature 3 body | Small, focused changes with a clear description of what changed and why. | تعديلات صغيرة ومحددة مع وصف واضح لما تغيّر ولماذا. |
| Feature 4 title | Works with your repositories | يعمل مع مستودعاتك |
| Feature 4 body | Connect GitHub and keep your branches, reviews and checks as they are. | اربط GitHub وأبقِ فروعك ومراجعاتك وفحوصاتك كما هي. |
| Button | See pricing | اطّلع على الأسعار |

### 4.5 Lead chat showcase

A dark band with the drawn Lead chat scene (an inline SVG with a title as alt text, replacing the HTML chat window of RHL-6) and three example questions. Chat bubbles follow the page direction; the window frame and any code inside it stay LTR.

| Element | English | العربية |
|---|---|---|
| Headline | Ask the Lead. It runs delivery. | اسأل الـ Lead. هو من يدير التسليم. |
| Subline | Plan the week, check progress and unblock work in a conversation. | خطّط للأسبوع وتابع التقدّم وأزل العوائق عبر محادثة. |
| Chat: user | What is blocking RHL-12? | ما الذي يعطّل RHL-12؟ |
| Chat: Lead | The pull request is waiting for review. I asked Sara and moved the next story to coding. | طلب الدمج بانتظار المراجعة. طلبتُ من سارة مراجعته ونقلتُ القصة التالية إلى مرحلة الكود. |
| Chat: user | Good. Start RHL-14. | جيد. ابدأ RHL-14. |
| Chat: Lead | Started. The plan will be ready in a few minutes. | بدأتُ. ستكون الخطة جاهزة خلال دقائق. |
| Chat window accessible label | Sample conversation with the Lead | محادثة نموذجية مع الـ Lead |
| Note | This is a sample conversation. | هذه محادثة نموذجية. |

### 4.6 Gulf audience

| Element | English | العربية |
|---|---|---|
| Headline | Built for teams and agencies in the Gulf | مصمَّم للفرق والوكالات في الخليج |
| Subline | Work in Arabic or English, in the same workspace. | اعمل بالعربية أو بالإنجليزية في مساحة العمل نفسها. |
| Point 1 | **Arabic and English.** Stories, plans and pull requests in either language. | **عربي وإنجليزي.** القصص والخطط وطلبات الدمج بأي من اللغتين. |
| Point 2 | **Right to left.** The interface mirrors fully in Arabic. | **من اليمين إلى اليسار.** تنعكس الواجهة بالكامل في العربية. |
| Point 3 | **Made for agencies.** Run many client projects with clear, per-user costs. | **مناسب للوكالات.** أدِر مشاريع عملاء متعددة بتكلفة واضحة لكل مستخدم. |
| Point 4 | **Your code stays yours.** Agents work in your repositories and follow your review rules. | **الكود يبقى لك.** يعمل الوكلاء في مستودعاتك ويلتزمون بقواعد المراجعة لديك. |
| Button | Talk to us | تحدّث إلينا |

### 4.7 Pricing per user

One card, because the price is per user. **All amounts and included items below are placeholders** and must be replaced before launch. In the page, each placeholder amount is visibly marked (a "Placeholder" tag next to the price), so it cannot be mistaken for a real price. The currency code stays Latin and unmirrored; in Arabic the number may use Eastern Arabic digits (see 5.5).

| Element | English | العربية |
|---|---|---|
| Headline | One price per user | سعر واحد لكل مستخدم |
| Subline | Pay for the people on your team, not for the number of projects. | ادفع عن أعضاء فريقك، لا عن عدد المشاريع. |
| Price | [PLACEHOLDER] XX USD per user per month | [سعر تجريبي] XX USD لكل مستخدم شهريًا |
| Included 1 | Plans, code and pull requests from your stories | الخطط والكود وطلبات الدمج من قصصك |
| Included 2 | The Lead chat | محادثة الـ Lead |
| Included 3 | Arabic and English | العربية والإنجليزية |
| Included 4 | [PLACEHOLDER] usage limits to be confirmed | [سعر تجريبي] حدود الاستخدام قيد التأكيد |
| Button | Book a demo | احجز عرضًا تجريبيًا |
| Note | Placeholder price. Final pricing to be confirmed. | سعر تجريبي. سيُؤكَّد السعر النهائي لاحقًا. |

### 4.8 FAQ

Each item is a disclosure (`<details>` or an accessible button and panel); the first stays closed by default.

| Element | English | العربية |
|---|---|---|
| Headline | Questions, answered | أسئلتك، وإجاباتها |
| Q1 | Does the agent merge code on its own? | هل يدمج الوكيل الكود بنفسه؟ |
| A1 | No. It opens a pull request and your team reviews and merges it. | لا. يفتح طلب دمج ويراجعه فريقك ويدمجه. |
| Q2 | Can I see the plan before any code is written? | هل أستطيع الاطلاع على الخطة قبل كتابة أي كود؟ |
| A2 | Yes. Every run starts with a plan that you approve. | نعم. كل تشغيل يبدأ بخطة توافق عليها. |
| Q3 | How is it priced? | كيف يُحتسب السعر؟ |
| A3 | Per user, per month. See the pricing section. | لكل مستخدم شهريًا. راجع قسم الأسعار. |
| Q4 | Does it work in Arabic? | هل يعمل بالعربية؟ |
| A4 | Yes. The site and the workspace work in Arabic and English. | نعم. الموقع ومساحة العمل يعملان بالعربية والإنجليزية. |
| Q5 | Where does my code go? | أين يذهب الكود الخاص بي؟ |
| A5 | Agents work in your own repositories. [PLACEHOLDER] Data handling details to be confirmed. | يعمل الوكلاء في مستودعاتك. [نص تجريبي] تفاصيل معالجة البيانات قيد التأكيد. |

The FAQ copy is also the source of the FAQPage structured data (chapter 9).

### 4.9 Final call to action

| Element | English | العربية |
|---|---|---|
| Headline | Ship your next story as a pull request | سلّم قصتك القادمة في صورة طلب دمج |
| Subline | Book a demo and see it on your own backlog. | احجز عرضًا تجريبيًا وشاهده على قائمة مهامك. |
| Primary button | Book a demo | احجز عرضًا تجريبيًا |
| Secondary button | Read the FAQ | اقرأ الأسئلة الشائعة |

### 4.10 Footer

| Element | English | العربية |
|---|---|---|
| Tagline | Plan, code, open the pull request. | خطّط، اكتب الكود، وافتح طلب الدمج. |
| Links | How it works · Features · Pricing · FAQ | كيف يعمل · المزايا · الأسعار · الأسئلة الشائعة |
| Language switch | العربية | English |
| Legal | © 2026 ReleaseHub. All rights reserved. | © 2026 ReleaseHub. جميع الحقوق محفوظة. |
| Legal links | Privacy · Terms ([PLACEHOLDER] pages to be written) | الخصوصية · الشروط ([نص تجريبي] الصفحات قيد الإعداد) |

## 5. Language switch and RTL behaviour

1. English and Arabic have equal status. Each has its own URL: `/` (English) and `/ar/` (Arabic), as static HTML. Content is not generated in the browser, so search engines and no-JavaScript visitors get the full page.
2. A visible toggle in the header and the footer links to the other language's URL. It is a normal link, so it works without JavaScript.
3. On the first visit to `/`, a small script may redirect to `/ar/` when the browser language is Arabic and the visitor has no stored choice. The choice is then stored in `localStorage` under the key `rh.lang` (`en` or `ar`) and wins on later visits. If storage is blocked, the page still works. Crawlers are never redirected.
4. `<html>` carries `lang="en" dir="ltr"` or `lang="ar" dir="rtl"`. Inline English or Arabic fragments in the other language carry their own `lang`, and product and code names are wrapped with `unicode-bidi: isolate`.
5. Numbers: Arabic pages may use Eastern Arabic digits for ordinary numbers (via `Intl.NumberFormat` with `numberingSystem: 'arab'` or written out in the HTML). Currency codes, version numbers and code stay Latin. One style is used on a page.
6. All spacing, alignment and positioning use CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start`, `border-inline`), so the layout mirrors with `dir`. There are no left/right declarations except where noted.
7. Mirrored in RTL: the alternating feature rows, the header order, chevrons and arrows, the step order in how it works, chat bubble sides. Not mirrored: the logo, the scene frames, code, the Lead chat window frame, the currency code.
8. Arabic is never letter-spaced, headings are never clipped by line height, and Arabic text is never set in italics.
9. Fonts per direction 1 (updated in RHL-11): Barlow Semi Condensed (text) and Barlow Condensed (board plates) for English; IBM Plex Sans Arabic for Arabic at the same weights, about 10% larger body size and a line height of 1.7.
10. The language toggle changes the page and the focus is kept on the toggle after the switch.

## 6. Responsiveness

Phone-first CSS: base styles are for phones, wider layouts are added with `min-width` media queries.

| Name | Width | Layout |
|---|---|---|
| Small phone | 320 to 359 px | one column, no horizontal scroll |
| Phone | 360 to 767 px | one column, menu button, stacked steps, features stacked (text above image) |
| Tablet | 768 to 1023 px | two-column steps, features start alternating |
| Desktop | 1024 to 1439 px | 12-column grid, inline header links, alternating rows |
| Wide | 1440 px and up | content centred, maximum content width 1280 px (RHL-10) |

Rules:

- Viewport meta: `width=device-width, initial-scale=1`. Zoom is never disabled.
- Touch targets are at least 44 by 44 CSS px.
- Body text is at least 16 px and the page works at 200% zoom and 400% zoom without losing content (reflow).
- Images and the drawn scenes scale with the container, with `width` and `height` set to avoid layout shift.
- Tested in both languages on a 360 px phone and a 1440 px desktop, and in portrait and landscape on a phone.

## 7. Accessibility

The target is WCAG 2.1 AA (level AA), in both languages.

- **Contrast:** text 4.5:1 or more (3:1 for large text), UI components and focus indicators 3:1 or more. Palette per direction 1 (RHL-11): chalk ink #1C2B3D on #FFFFFF and on paper #F5F7F9; lamp amber #FFB43A as the button fill with enamel #12263F text (never amber text on white); light text on enamel. Status green #1F7A4F and red #B83A2A always come with a text label.
- **Keyboard:** every control (menu, language switch, buttons, FAQ items) works with the keyboard in a logical order that follows the reading order in both directions. No keyboard traps. A skip link ("Skip to content" / "تخطَّ إلى المحتوى") is the first focusable element.
- **Focus:** a visible focus ring on every focusable element, 2 px accent outline with a 2 px offset, never removed. Focus is not hidden by the sticky header (`scroll-padding-top`).
- **Reduced motion:** with `prefers-reduced-motion: reduce`, animations and smooth scrolling are off. The page has no autoplaying motion that lasts longer than 5 seconds.
- **lang and dir:** set on `<html>` for each page, and on inline fragments in the other language (see chapter 5).
- **Structure:** landmarks `header`, `nav` (with a label), `main`, `footer`; one `h1`; headings in order; sections labelled by their headings.
- **Images:** meaningful images have alt text in the page language (see 4.2); decorative images have `alt=""`. The Lead chat is marked as a sample conversation.
- **Menu and FAQ:** use `aria-expanded` and `aria-controls` or native `<details>`; state is not conveyed by colour alone.
- **Content:** link text makes sense out of context, and the page works with a screen reader in English and in Arabic.

## 8. Performance budget

- Lighthouse on mobile: 90 or more in Performance, Accessibility, Best Practices and SEO.
- LCP 2.5 s or less, CLS 0.1 or less, INP 200 ms or less on a throttled mid-range phone.
- No frameworks: plain HTML and CSS, and vanilla JavaScript only for the menu, the language redirect and the FAQ if `<details>` is not enough. JavaScript is 20 KB or less, CSS 30 KB or less (compressed). A static site generator at build time is allowed only if it outputs plain files.
- Images: SVG where possible, otherwise AVIF or WebP with a fallback, at 2x of the displayed size at most. `width` and `height` are set, images below the first screen use `loading="lazy"`, and the hero image is not lazy and is preloaded if it is the LCP element. No single image over 150 KB.
- Fonts: self-hosted fonts only (Barlow Semi Condensed, Barlow Condensed, IBM Plex Sans Arabic; static 400/600/700), in WOFF2, with `font-display: swap`, subset to the needed scripts, preloaded for the above-the-fold weight. System font fallbacks (`system-ui`, `Segoe UI`, `Tahoma`) are in the stack so the page is readable before the fonts load. No Google Fonts request.
- No third-party requests: no analytics, no embeds, no CDN scripts.
- Total transfer for the first load is 300 KB or less, plus fonts at 100 KB or less.
- Static assets are named so they can be cached for a long time; GitHub Pages sets the cache headers.

## 9. SEO

Each language has its own title, description and structured data, written in that language.

| Item | English (`/`) | Arabic (`/ar/`) |
|---|---|---|
| `<title>` (60 characters or fewer) | ReleaseHub: from story to pull request | ReleaseHub: من القصة إلى طلب الدمج |
| Meta description (155 characters or fewer) | AI agents plan, code and open pull requests from your stories, and a Lead runs delivery. Per-user pricing, in English and Arabic. | وكلاء ذكاء اصطناعي يخطّطون ويكتبون الكود ويفتحون طلبات الدمج من قصصك، ويدير الـ Lead التسليم. تسعير لكل مستخدم، بالعربية والإنجليزية. |

Requirements:

- **Open Graph and Twitter:** `og:title`, `og:description`, `og:type=website`, `og:url`, `og:image` (1200 by 630 px, under 200 KB, with the logo and the headline), `og:locale` (`en_US` / `ar_AE`), `og:locale:alternate`, `twitter:card=summary_large_image`.
- **Canonical and hreflang:** each page has a `rel="canonical"` to itself and `rel="alternate" hreflang` links for `en`, `ar` and `x-default` (English), absolute URLs, on both pages.
- **Structured data (JSON-LD):** `Organization`, `SoftwareApplication` (with an `offers` entry marked as placeholder until real pricing exists, or left out until then) and `FAQPage` from section 4.8, matching the visible text.
- **sitemap.xml:** lists `/` and `/ar/` with `xhtml:link` alternates.
- **robots.txt:** allows all and points to the sitemap.
- **Other:** one `h1` per page, descriptive link text, a favicon and a `theme-color` (#12263F), a `404.html`.
- URLs in these files use the production base URL, which is configured in one place and is a placeholder until the domain is decided (chapter 11).

## 10. Hosting on GitHub Pages

- The site is plain static files, published from the repository with GitHub Pages, deployed by a GitHub Actions workflow on every push to `main` (set up in RHL-9).
- Pages are served over HTTPS (enforced).
- The site may be served from a project path (`/releasehub-landing/`) or a custom domain. All internal links, assets, canonical and hreflang URLs are generated from one base setting or are relative, so both work.
- `404.html` is provided in both languages; the root contains `.nojekyll` if files starting with an underscore are used.
- A custom domain is optional and is done by a person (DNS and Pages settings); until then the default `github.io` address is used.
- No server-side features are used: no redirects other than the optional client-side language redirect, no headers beyond what Pages provides.

## 11. Acceptance criteria

Each criterion is numbered and checkable. "Check" says how: a file check or grep, a tool (Lighthouse, axe, a link checker, the Rich Results test) or a manual pass. IDs are stable so stories and pull requests can cite them.

### 11.1 Document and scope

| ID | Criterion | Check |
|---|---|---|
| AC-1 | The page is plain static HTML, CSS and JavaScript with no backend code and no API calls. | Search the repository for server code and `fetch(`/`XMLHttpRequest` to remote hosts: none. |
| AC-2 | All ten sections of chapter 4 exist in this order: header, hero, how it works, features, Lead chat, Gulf audience, pricing, FAQ, final call to action, footer. | Read the page headings in order against chapter 4. |
| AC-3 | Every section has the English and Arabic copy of chapter 4 (headline, subline, body, button labels), with no missing or English-only text on the Arabic page. | Compare both pages against the tables in chapter 4; run a script that checks each string exists. |
| AC-4 | The look follows direction 1: palette enamel #12263F, lamp amber #FFB43A, paper #F5F7F9, chalk ink #1C2B3D and status green/red, Barlow Semi Condensed, Barlow Condensed and IBM Plex Sans Arabic, maximum content width 1280 px (RHL-11). | Inspect the CSS custom properties and the computed styles; compare with `docs/directions.md`. |
| AC-5 | The pricing section is one card with a per-user price. Every amount and every unconfirmed claim is visibly marked as a placeholder, in both languages. | View the pricing section in both languages; grep the HTML for the placeholder marker next to each price. |

### 11.2 Language switch and RTL

| ID | Criterion | Check |
|---|---|---|
| AC-6 | `/` is English with `lang="en" dir="ltr"` and `/ar/` is Arabic with `lang="ar" dir="rtl"` on `<html>`. | Grep the two files for the attributes. |
| AC-7 | The language toggle is in the header and the footer, is a link to the other language's URL and works with JavaScript disabled. | Click it with JavaScript off. |
| AC-8 | The chosen language is stored in `localStorage` key `rh.lang`, is used on the next visit, and a blocked storage does not break the page. | Switch, reload, then block storage and reload. |
| AC-9 | The layout uses CSS logical properties; the CSS has no `margin-left`, `margin-right`, `padding-left`, `padding-right`, `left:` or `right:` except documented exceptions. | Grep the CSS. |
| AC-10 | In Arabic, the header order, the alternating feature rows, the steps, arrows and chat bubbles mirror, and the logo, mockup frame, code and currency code do not. | Compare screenshots of both pages at 360 px and 1440 px. |
| AC-11 | Inline text in the other language has its own `lang`, and product names are isolated with `unicode-bidi: isolate`. | Grep the Arabic page for `lang="en"` fragments; check the headline with the Latin word "Lead". |
| AC-12 | Arabic text has no letter-spacing, and no heading is clipped. | Grep the CSS for `letter-spacing` under `:lang(ar)`; check headings visually. |
| AC-13 | Arabic body text uses IBM Plex Sans Arabic, about 10% larger, with line height 1.7. | Inspect computed styles on `/ar/`. |

### 11.3 Responsiveness

| ID | Criterion | Check |
|---|---|---|
| AC-14 | The page has the viewport meta `width=device-width, initial-scale=1` and zoom is not disabled. | Grep the HTML. |
| AC-15 | There is no horizontal scroll at 320, 360, 768, 1024 and 1440 px, in both languages. | Resize in the browser or run a screenshot script at each width; `scrollWidth <= innerWidth`. |
| AC-16 | The layout changes at the breakpoints of chapter 6: one column on phones, the inline header at 1024 px and up. | Check at 360, 768, 1024 and 1440 px. |
| AC-17 | Touch targets are at least 44 by 44 CSS px on phones. | Measure buttons, links, the toggle and the menu button in the browser. |
| AC-18 | At 200% zoom and at 400% zoom (320 px wide equivalent) no content or function is lost. | Zoom in the browser and use the page. |

### 11.4 Accessibility

| ID | Criterion | Check |
|---|---|---|
| AC-19 | axe (or Lighthouse accessibility) finds no serious or critical violations on `/` and `/ar/`, and Lighthouse Accessibility is 90 or more. | Run axe and Lighthouse on both pages. |
| AC-20 | Text contrast is 4.5:1 or more (3:1 for large text), and UI components and focus rings are 3:1 or more. The green #16A34A is not used for text. | Check the colour pairs with a contrast checker; grep the CSS for the green on text. |
| AC-21 | Every function can be used with the keyboard only, in a logical order in both directions, without traps. | Tab through both pages; open the menu, switch language and open each FAQ item. |
| AC-22 | A skip link is the first focusable element and moves focus to `main`. | Press Tab on page load, then Enter. |
| AC-23 | Every focusable element has a visible focus indicator and it is not hidden by the sticky header. | Tab through the page and look at each stop. |
| AC-24 | With `prefers-reduced-motion: reduce` there are no animations and no smooth scrolling. | Enable the setting in the browser or emulation and use the page; grep the CSS for the media query. |
| AC-25 | The page has the landmarks `header`, `nav`, `main` and `footer`, one `h1`, and headings in order. | Check with the accessibility tree or axe. |
| AC-26 | Meaningful images have alt text in the page language and decorative images have `alt=""`. | Grep the HTML. |
| AC-27 | The FAQ and the menu expose their state (`aria-expanded` or native `<details>`) and are not colour-only. | Check with a screen reader or the accessibility tree. |

### 11.5 Performance

| ID | Criterion | Check |
|---|---|---|
| AC-28 | Lighthouse mobile scores are 90 or more in Performance, Accessibility, Best Practices and SEO on both pages. | Run Lighthouse on the deployed pages. |
| AC-29 | LCP is 2.5 s or less and CLS is 0.1 or less in the Lighthouse mobile run. | Read the Lighthouse report. |
| AC-30 | No JavaScript framework or library is included; JavaScript is 20 KB or less and CSS 30 KB or less (compressed). | Check the file sizes and the dependency list. |
| AC-31 | Images are SVG, AVIF or WebP, have `width` and `height`, are lazy-loaded below the first screen and none is over 150 KB. | Check the files and the HTML. |
| AC-32 | Fonts are self-hosted WOFF2 with `font-display: swap`, and the first load makes no request to another host. | Open the network panel and list the hosts. |

### 11.6 SEO

| ID | Criterion | Check |
|---|---|---|
| AC-33 | Each page has a `<title>` of 60 characters or fewer and a meta description of 155 characters or fewer, in its own language. | Grep the HTML and count the characters. |
| AC-34 | Each page has Open Graph and Twitter tags, including `og:image` (1200 by 630 px). | Grep the HTML; open the image; check with a share debugger. |
| AC-35 | Both pages have a self canonical and `hreflang` alternates for `en`, `ar` and `x-default` with absolute URLs, and they point to each other. | Grep both pages. |
| AC-36 | JSON-LD for `Organization`, `SoftwareApplication` and `FAQPage` is present, valid, and matches the visible text. | Run the Rich Results test or a JSON-LD validator. |
| AC-37 | `sitemap.xml` lists both URLs with alternates, and `robots.txt` allows crawling and points to the sitemap. | Open both files on the deployed site. |

### 11.7 Hosting

| ID | Criterion | Check |
|---|---|---|
| AC-38 | The site is deployed to GitHub Pages by a workflow on every push to `main` and is served over HTTPS. | Check the Actions run and open the site. |
| AC-39 | All internal links and assets work under the project path and under a custom domain with no broken links. | Run a link checker on the deployed site. |
| AC-40 | A `404.html` exists and shows in both languages. | Open a missing URL. |

## 12. Traceability and open items

| Story | Builds from this SRS |
|---|---|
| RHL-4 Static site skeleton with English/Arabic switch and RTL | Chapters 5 and 6, 4.1, 4.10; AC-6 to AC-18 |
| RHL-5 Hero and How it works sections | 4.2, 4.3 |
| RHL-6 Features and Lead chat showcase sections | 4.4, 4.5 |
| RHL-7 Gulf audience and per-user pricing sections | 4.6, 4.7; AC-5 |
| RHL-8 FAQ and final call to action sections | 4.8, 4.9 |
| RHL-9 SEO, accessibility, performance pass and GitHub Pages deploy | Chapters 7 to 10; AC-19 to AC-40 |

Open items, to be decided by a person before launch:

1. The real price, currency and what is included (all marked as placeholders in 4.7).
2. The address of the call to action ("Book a demo": a sign-up page or a contact address) and the contact email.
3. The production domain, used in canonical, hreflang, Open Graph and the sitemap.
4. Privacy and terms pages, and the data-handling answer in FAQ 5.
5. Review of the Arabic copy by a native Gulf reader.
