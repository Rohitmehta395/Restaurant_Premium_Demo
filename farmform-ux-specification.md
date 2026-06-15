# FARMform® — Complete UX & Design Specification

**Document Type:** Reverse-Engineered Design & UX Audit  
**Source:** https://farmform.be/  
**Prepared:** June 2026  
**Pages Analyzed:** Home, Meeting Spaces, Business Events, Stay the Night, Our Story, Practical Info, Contact  

---

## Table of Contents

1. Strategic Analysis
2. Brand & Personality
3. Visual Language System
4. Typography System
5. Color System
6. Spacing System
7. Grid & Layout System
8. Navigation System
9. Interaction & Animation System
10. Accessibility Patterns
11. Trust-Building Elements
12. CTA Strategy
13. Section Inventory — Homepage
14. Section Inventory — Interior Pages
15. Component Inventory

---

## 1. Strategic Analysis

### 1.1 Site Purpose

FARMform® is a premium boutique business retreat venue located in Londerzeel, Belgium. The website functions as a direct-conversion marketing tool whose entire purpose is to generate booking inquiries via a contact form. There is no online booking engine, no pricing calculator, and no third-party reservation platform — every path ends at personal contact.

The site must simultaneously:
- Communicate a new category ("business stay" that is neither hotel nor co-working space)
- Justify a premium price point (€235–€385/night) for an unfamiliar brand
- Build enough emotional connection that a corporate decision-maker picks up the phone or sends an inquiry email

### 1.2 Business Positioning

FARMform occupies a deliberately constructed white-space position between two existing categories:

| Dimension | Traditional Business Hotel | FARMform |
|---|---|---|
| Scale | Large, impersonal | Intimate, exclusive (max ~40 guests) |
| Setting | Urban / airport | Rural, 20–30 km from business hubs |
| Atmosphere | Functional, transactional | Warm, nature-infused, restorative |
| Pricing model | Per-item | One-Price Concept (all-inclusive) |
| Video conferencing | Standard | Deliberately excluded |
| Ownership story | Corporate chain | Family-built over 14 years |

The "One-Price Concept" is used as a direct competitive differentiator framed as radical transparency — a counter-positioning to the nickel-and-diming culture of traditional conference hotels.

### 1.3 Target Audience

**Primary:** Corporate event planners and executive assistants in Belgium and the broader Brussels/Antwerp/Mechelen business triangle booking off-site meetings, strategic retreats, and team-building days (groups of 4–40).

**Secondary:** Individual business travelers who need a peaceful, productive place to sleep between appointments — professionals who reject impersonal chain hotels and value restorative environments.

**Tertiary:** Tomorrowland festival attendees (explicitly mentioned in the Stay the Night pricing section) — opportunistic leisure overflow during peak weekends.

**Psychographic profile:** The audience is internationally mobile, multilingual, eco-conscious enough for it to be a differentiator, and values experiences over transactions. They are experienced enough travelers to recognize that "standard" is not sufficient.

### 1.4 Conversion Goals

**Primary:** Drive inquiry submissions through the contact form at `/contact/`  
**Secondary:** Email clicks (`info@farmform.be`) and phone calls (`+32 475 910 715`)  
**Tertiary:** Newsletter email captures on the "Join Our Community" form, present on every page  
**Macro funnel:** Awareness → Interest (photos/story) → Desire (services + values) → Inquiry → Personal close (no online booking, deliberate human touchpoint)

The absence of instant booking is a strategic choice — it forces a human conversation, enabling upselling, personalization, and relationship-building that match the brand promise.

---

## 2. Brand & Personality

### 2.1 Brand Personality Axes

**Primary axis:** Professional ↔ Personal  
FARMform positions itself as run by real people (co-founder Andra Delanoye signs the Our Story page by name) rather than a corporate entity. The legal entity name "La Mama BV" (Italian for "The Mother") reinforces the family warmth reading.

**Secondary axis:** Rustic ↔ Contemporary  
The farm origin is preserved as storytelling texture but the experience is described as modern, equipped, and professional. The tension between these two is the brand's defining creative idea.

**Voice characteristics:**
- Second-person, warm and inviting ("we will work with you")
- Em-dash used frequently for rhythm and conversational asides
- Occasional punctuation-free fragment sentences for poetic effect
- No corporate jargon; prefers "meaningful dialogue" over "synergy"
- Genuine, not performative — the origin story is told with vulnerability ("farm life was something completely new for me")

**Tagline:** "Where work meets comfort" — present in the site's `<title>` tag, the browser tab, the pre-loader text, and the footer. This is the brand's single organizing idea, not just a marketing line.

### 2.2 Tonal Register

Written communication reads as intelligent but unpretentious. Sentences are longer and more considered than typical hospitality marketing, suggesting a European sensibility. The brand avoids exclamation marks almost entirely in the body copy, trusting its photography and the weight of its words instead.

---

## 3. Visual Language

### 3.1 Design Philosophy

FARMform's visual identity is built on four observable principles:

**1. Restraint over decoration.** The UI makes no use of illustrated icons in the decorative sense — all iconography appears to be functional (SVG inline icons for room specs like area and capacity). Borders, shadows, and gradients are absent or extremely subtle.

**2. Photography as the primary design medium.** The site's visual power comes almost entirely from professional photography credited to Kwinten Verspeurt. Images are large-format, carefully color-graded with a warm, slightly desaturated palette that reinforces the earthy, natural brand.

**3. Typographic hierarchy as structure.** Because the palette is restrained, visual differentiation between sections is achieved primarily through type size contrast and spacing rhythm, not through color blocks or background patterns.

**4. Content density varies intentionally by section.** The hero is sparse and cinematic. The "Why Choose FARMform?" section is deliberately content-rich to systematically address every possible objection. This reflects a considered information architecture, not inconsistency.

### 3.2 Image Usage

Photography is the most visible design investment on the site. Observable patterns:

- All photography is professional, warm-toned, and high-resolution. The images appear to use a consistent color grade with warm highlights and soft, slightly desaturated midtones to evoke calmness.
- Images are used in three modes: full-bleed hero banners, contained image cards within service blocks, and gallery sliders within room/space detail panels.
- The hero image (`FarmForm-Interieur-4773`) appears to be an interior shot emphasizing natural light, texture, and space — immediately establishing the physical quality of the property.
- The Business Events hero features a portrait-style photo (`FarmForm-Portretten-3729`) — an unusual choice that puts a human face on what could be an abstract service offering, reinforcing the personal brand dimension.
- Gallery sliders allow 7–14 images per room/space, indicating that visual evidence of quality is considered essential for overcoming the uncertainty of an unfamiliar brand.
- Farm animals (pony, dog, cats, chickens, rabbits) are mentioned in copy as a deliberate differentiator and are presumably photographed in the gallery — a unique humanizing element absent from any competitor in this segment.

---

## 4. Typography System

### 4.1 Inferred Typeface Roles

Based on the visual evidence and the custom WordPress theme (`farmform-theme`), the site uses a system consisting of distinct display and body roles:

**Display / Brand Wordmark Treatment:**  
The logo uses a mixed-case rendering where "FARM" appears in uppercase and "form" in lowercase italic — this is a deliberate typographic identity device. The SVG logo file is named `logo-text-black-v2.svg`, indicating it is type-based rather than icon-based.

**Display Headlines (H1, H2 on hero):**  
Large, commanding headlines. The `<h1>` on the homepage reads "Welcome to Farm*Form*" with "Form" in italic — a consistent application of the brand's mixed-case mark.

**Body Copy:**  
Readable, well-spaced prose at a comfortable reading size. No tight tracking or decorative treatment.

**Utility / Labels:**  
Uppercase letter-spaced text is used for room capacity indicators ("4 – 12 GUESTS", "13 – 40 GUESTS"). This is a distinct third typographic register for spec/metadata.

### 4.2 Type Scale (Inferred)

| Role | Context | Estimated Size | Weight | Treatment |
|---|---|---|---|---|
| Hero H1 | Homepage headline | ~56–72px | Bold | Mixed-case brand mark |
| H1 Interior | Page title | ~40–48px | Bold | Sentence case |
| H2 Section | Section headings | ~28–36px | Semi-bold | Sentence case |
| H3 Card | Component titles | ~20–24px | Semi-bold | Sentence case |
| Body | Paragraph text | ~16–18px | Regular | No decoration |
| Label | Capacity/spec tags | ~11–13px | Medium/Bold | Uppercase + letter-spaced |
| Caption | Tech/amenity sub-lines | ~13–14px | Regular | Italic or regular |
| Footer Meta | Copyright, links | ~12–13px | Regular | — |

### 4.3 Notable Typography Behaviors

- The homepage hero displays a pre-headline label ("Where work meets comfort") in a smaller, secondary treatment above the main H1 — a two-tier headline structure that front-loads the brand promise before the name.
- Interior page H1s include a subtitle or descriptor line below them, creating a consistent page-opening pattern.
- The "Our Story" page uses dated section headers ("The Beginning (2011)") suggesting a timeline-style typographic treatment where year context is embedded in the heading.
- The Quick Navigation pattern on interior pages uses an arrow symbol ("→") as a visual separator — a minimal wayfinding device that is typographic rather than graphical.

---

## 5. Color System

### 5.1 Inferred Palette

The palette is derived from observable sections and the overall visual language:

| Token Name | Hex (Inferred) | Role |
|---|---|---|
| White / Surface | `#FFFFFF` or near-white | Primary page background |
| Off-White / Warm | `#F8F6F2` or similar | Alternate section backgrounds |
| Near-Black | `#1A1A1A` or `#111111` | Primary text, headings |
| Mid-Gray | `#6B6B6B` or similar | Secondary text, captions |
| Light Border | `#E5E0D8` or similar | Dividers, card outlines |
| Accent / Brand Warm | `#C8B090` or earthy warm | Potential accent (matching photo grade) |

**Key observation:** The color palette is deliberately neutral and warm. The brand does not use a strong accent color in the UI chrome. Any "color" on the page comes from the photography itself, not from UI elements. This is a sophisticated design decision — it makes the photos feel like windows into a real place rather than stock imagery set against branded UI.

### 5.2 Color Application Rules (Inferred)

- Text on white backgrounds uses near-black for maximum legibility and a refined premium feel.
- Section background alternation (white → light warm gray) creates visual rhythm without introducing new colors.
- Links and CTAs in the body copy appear to use the primary text color with underline, maintaining the understated tone.
- The primary CTA button ("Get in touch") uses a dark/black fill — consistent with the restrained palette.
- No gradient fills, no drop shadows on UI elements, no colored borders in the UI chrome.

---

## 6. Spacing System

### 6.1 Vertical Rhythm

The site uses a generous spacing system that creates breathing room consistent with a premium brand. Observable spacing scales:

| Context | Estimated Value |
|---|---|
| Section vertical padding (desktop) | ~80–120px |
| Section vertical padding (mobile) | ~48–64px |
| Between heading and first body paragraph | ~16–24px |
| Between stacked body paragraphs | ~20–28px |
| Between card grid items | ~32–48px |
| Between icon and heading in feature blocks | ~12–16px |
| Navigation item spacing | ~24–32px horizontal |

### 6.2 Horizontal Rhythm

Content is centered within a constrained max-width container with generous horizontal padding on both sides. This creates a focused reading column even on wide viewports.

| Context | Estimated Value |
|---|---|
| Max content width (estimated) | ~1200–1400px |
| Horizontal page padding (desktop) | ~48–80px |
| Horizontal page padding (mobile) | ~20–24px |

---

## 7. Grid & Layout System

### 7.1 Layout Patterns Observed

**Single Column (Reading):** The body copy sections, "About" blocks, and "Our Story" page use a single-column centered text layout with a constrained line-length (~65–75 characters). This is the workhorse layout for narrative content.

**Two-Column Split:** Used in the hero section where a headline/text block appears alongside or over the primary image. Also inferred for the footer where contact details and navigation split horizontally.

**Three-Column Card Grid:** The "Our Services" section on the homepage presents Meeting Spaces, Business Events, and Stay the Night as three equal-width cards. On mobile, these likely stack vertically.

**Feature Grid (2-across or 3-across):** The "Why Choose FARMform?" section with 7 items, and the "Our Values" section with 5 items, use a grid layout where icon + heading + body text repeat. Estimated 2-across on tablet, 3-across on desktop.

**Technology/Amenity Icon Grid:** The tech specs (Smart TV, Wi-Fi, etc.) use a compact icon-grid pattern — icon above, bold label, italic descriptor below. Estimated 3-across on desktop, 2-across on tablet, possibly 2-across or 1-across on mobile.

**Horizontal Scrolling Gallery (Slider):** Room and meeting space galleries use a lightbox-triggered slider pattern accessible via "Open gallery" trigger.

**Accordion-Style Expanding Panels:** Each room/space on the Meeting Spaces and Stay the Night pages has a card that, when clicked, expands to reveal a full lightbox gallery. The "Close" button is visible in the markup, indicating a modal/overlay pattern.

### 7.2 Responsive Behavior (Inferred)

The site's viewport meta tag confirms standard responsive design (`width=device-width, initial-scale=1`). The custom WordPress theme (`farmform-theme`) handles breakpoints.

**Mobile (< ~768px):**
- Navigation collapses to a hamburger "Menu" button
- The expanded menu reveals a full-screen overlay with contact info, social links, and nav items
- Service cards stack vertically
- Feature grids reduce to single-column
- Hero image likely becomes full-bleed with text overlay

**Tablet (~768px–1024px):**
- Navigation may remain visible or partial
- Cards shift to 2-across grid
- Feature icons grid: 2-across

**Desktop (> ~1024px):**
- Full horizontal navigation displayed
- 3-across service cards
- Feature grid at full density (3-across or auto-fill)

---

## 8. Navigation System

### 8.1 Primary Navigation Structure

**Pre-navigation bar (above the nav):**
A slim top-of-page strip reads the tagline "Where work meets comfort" in small text — functioning as a brand stamp visible before the user even processes the logo.

**Main navigation:**
Horizontal bar containing:
- Logo (SVG text mark, left-aligned or centered)
- Navigation links (right-aligned or center)
- No visible search, no utility icons, no language selector

**Navigation items (7 items):**
1. Home
2. Meeting Spaces
3. Business Events
4. Stay the Night
5. Our Story
6. Practical Info
7. Contact

This navigation is notable for its completeness — no mega-menus, no dropdowns, no nested structure. Every major service and information category is a top-level navigation item, reflecting the relatively shallow site architecture.

**Mobile navigation:**
Triggered by "Menu" text/button. The expanded state reveals a panel that includes not just navigation links but also the company's contact information (address, VAT, email, phone) and social media links — treating the hamburger menu as a mini contact card. This is an unusual and thoughtful UX decision that acknowledges users who open the hamburger seeking contact info.

### 8.2 Active State & Wayfinding

The current page is indicated in the navigation (standard active state). The breadcrumb-equivalent on interior pages uses the `<title>` pattern ("Meeting Spaces — FARMform") to confirm location.

**Quick Navigation within interior pages:**  
Interior pages with multiple sections include an in-page quick-nav element positioned near the top of the content area, styled as an unordered list of anchor links prefixed with "→". This is a distinctive wayfinding device that functions as a page-level table of contents, improving usability on long-scroll pages like Meeting Spaces.

### 8.3 Footer Navigation

The footer duplicates the primary navigation links, enabling users who have scrolled to the bottom to navigate without returning to the top. This is standard practice but well-executed — the footer links appear immediately below the social icons in the second footer column.

---

## 9. Interaction & Animation System

### 9.1 Scroll Behavior

The site appears to use standard vertical scrolling. The long-page architecture means scroll depth is significant — the homepage contains eight or more distinct content sections. No evidence of parallax scrolling or scroll-jacking is present.

**Scroll-triggered reveals:** Based on standard practice for this class of WordPress custom theme and the presence of an image-heavy homepage, content sections likely fade or slide in as they enter the viewport. This would be achieved via an Intersection Observer pattern or a lightweight scroll animation library.

### 9.2 Hero Image Gallery / Slider

The homepage hero contains multiple images (the markup reveals at least 9 lazy-loaded image placeholders in the hero area), suggesting a slideshow or carousel with auto-advance. The images are loaded progressively — one real image URL is visible (`FarmForm-Interieur-4773`) followed by placeholder SVGs that resolve on the client.

**Inferred hero behavior:** Crossfade between 9+ interior/exterior photos, likely timed automatically with no visible controls (a cinematic approach consistent with the brand's luxury positioning).

### 9.3 Room/Space Gallery — Lightbox Pattern

Each accommodation or meeting space has an "Open gallery" trigger that opens a full-screen lightbox slider. Evidence from the markup:

- Slide counter displayed as "01 / 10", "01 / 08", etc.
- Previous/Next navigation arrows (SVG-based)
- "Close" button (×)
- Thumbnail strip of all images shown below the active image
- The gallery panel is toggled visible/hidden via a class change — the "Close" button resets this state

This is a custom-built lightbox, not a standard WordPress plugin modal, given the custom theme architecture.

### 9.4 Hover States (Inferred)

**Navigation links:** Color change or underline transition on hover, consistent with standard typographic navigation treatment.

**Service cards (Our Services section):** Cards likely have a subtle hover elevation or border appearance to indicate interactivity. Given the restrained design language, this would be a gentle box-shadow or border-color transition rather than a dramatic transform.

**CTA buttons:** The "Get in touch" button likely shifts background color on hover — from dark fill to slightly lighter dark, or from dark to an outlined variant.

**Gallery "Open gallery" links:** Likely gain an underline or color shift on hover, matching the body link style.

**Social media icons:** Icon fill or stroke color change on hover.

### 9.5 Form Interactions

**Contact form (`/contact/`):**
- Fields: First name, Last name, Telephone, Email, Request (textarea), Inquiry type (radio: Booking / Other), Contact preference (radio: Email / Phone), File attachment
- File upload with visible "No file chosen" state indicator
- Privacy policy checkbox consent
- Submit button labeled "Send request"

**Newsletter form (repeated on all pages):**
- Single email input
- Privacy policy checkbox
- Submit button
- Loading state text visible ("Loading...") — indicating an asynchronous submission

---

## 10. Accessibility Patterns

### 10.1 Observed Implementations

- **Skip to content link:** `[Skip to content](#content)` present on all pages — correct implementation of a keyboard navigation accessibility pattern
- **Alt attributes:** Image alt text is populated for the primary hero image and named room/space photos (e.g., "FarmForm - Interieur, Bowie's Boardroom")
- **Semantic HTML:** Use of proper heading hierarchy (H1 per page → H2 sections → H3 subsections) is observable throughout
- **`lang` attribute:** Implicit in English-language content; meta og:locale is `en_US`
- **`viewport` meta:** Correctly configured for mobile scaling
- **Structured social links:** Social media links use icon images with alt text labels (Facebook, Instagram, LinkedIn)

### 10.2 Potential Gaps (Inferred)

- SVG icons used for room spec indicators (area, capacity, features) use inline placeholder images — the alt text availability of these depends on implementation
- Form labels: The contact form fields should have explicit `<label>` associations; radio button groups should have `<fieldset>` + `<legend>` wrapping
- Color contrast: The warm palette with light backgrounds and mid-gray secondary text should be tested to confirm WCAG AA compliance (4.5:1 for body text)
- Lightbox focus management: When the gallery opens, keyboard focus should move to the modal container and be trapped within it during use

---

## 11. Trust-Building Elements

The site deploys a layered trust architecture:

**Legal & business legitimacy:**
- Company registered name: "FARMform La Mama BV"
- Full street address: Stuikberg 135, 1840 Londerzeel
- Belgian VAT number: BE 0742576075
- These appear in both the navigation panel and the footer — constant reassurance of a real, legally registered business

**Human identity:**
- Andra Delanoye is named as Co-Founder & Host, signed personally on the Our Story page
- The origin story (founded 2011, built "brick by brick") establishes a 14-year investment, suggesting permanence
- First-person voice ("For me personally...") breaks from the third-person corporate tone common in hospitality marketing

**Professional photography credit:**
- Photos credited to Kwinten Verspeurt (a professional photographer), visible in the filenames — this signals investment in quality presentation

**Social media presence:**
- Facebook, Instagram, and LinkedIn links across the site — third-party validation channels where potential clients can verify the brand independently
- LinkedIn specifically is an unusually prominent channel for this type of venue, correctly targeting the B2B audience

**Location validation:**
- Google Maps link on both the Practical Info and Contact pages
- A registered Google Business profile is implied by the Google Maps presence

**Proximity data:**
- Exact distances to Brussels Airport (25km), Brussels City Center (20km), Antwerp (30km), and Mechelen (20km) function as geographic trust signals — they transform an unknown rural location into a conveniently accessible one

**No-video-conferencing declaration:**
- "We intentionally do not support video conferencing" is stated twice (Meeting Spaces, Practical Info). This is a trust move — deliberately naming a limitation before a visitor discovers it, framing it as a philosophy rather than a deficiency

**Tomorrowland proximity mention:**
- Appearing in room pricing as a special-rate period — this serves as an implicit quality and location credential. Being near one of the world's most prominent music festivals positions FARMform within a recognizable international context

**Privacy Policy:**
- Privacy Policy link appears in the footer, on both forms, and in the contact form submission consent — correct GDPR compliance signaling for a Belgian business

---

## 12. CTA Strategy

### 12.1 Primary CTA

**"Get in touch"** — used as the universal page-closing CTA across all interior pages. The button links to `/contact/`. It appears in a dedicated "Ready to learn more?" section that is the second-to-last element on every page (above the newsletter form). The section includes one line of supporting copy: "Contact us for reservations or additional information. We will work with you to create a truly memorable experience."

This CTA is deliberately non-transactional. It invites conversation, not commitment. This reduces friction by lowering the perceived risk of clicking.

### 12.2 Secondary CTAs

**Service navigation cards (Homepage):** Each of the three service cards ("Meeting Spaces," "Business Events," "Stay the Night") contains inline text CTAs:
- "Step inside our spaces" (Meeting Spaces)
- "Discover what's possible" (Business Events)
- "Experience the stay" (Stay the Night)

These are curiosity-driven micro-copy CTAs designed to draw the user deeper into the funnel rather than immediately converting.

**Quick navigation links (Interior pages):** Anchor links ("The Spaces," "One Price Concept," "Technologies," etc.) act as navigational CTAs that reduce scroll effort, improving engagement with content that supports conversion.

### 12.3 Passive CTAs

**Phone number:** `+32 (0) 475 910 715` is a `tel:` link throughout the site — tappable on mobile.

**Email address:** `info@farmform.be` is a `mailto:` link throughout — accessible in both navigation panel and footer.

**Social links:** Passive CTAs that extend the brand discovery journey without requiring immediate commitment.

### 12.4 Newsletter CTA

The "Join Our Community" newsletter form on every page is a long-game conversion tool — capturing leads who are interested but not ready to inquire, enabling email nurture. The supporting copy ("Be the first to experience FARMform") implies the venue is still establishing its reputation — which as of 2025 it is, given the October 2025 content modification dates.

---

## 13. Section Inventory — Homepage

---

### Section H-1: Pre-Navigation Brand Bar

**Purpose:** Persistent brand statement that primes visitors before any content loads.

**Layout:** Full-width single-line bar, centered text.

**Content:** Tagline text only — "Where work meets comfort"

**Typography:** Small, secondary weight, sentence case. Possibly letter-spaced.

**Desktop behavior:** Always visible at very top of viewport, above navigation.

**Mobile behavior:** Same — persistent slim bar above hamburger navigation.

---

### Section H-2: Primary Navigation Header

**Purpose:** Site wayfinding and identity anchor.

**Layout:** Horizontal bar, likely logo left-aligned, navigation links right-aligned.

**Content structure:**
- Logo SVG text mark (links to homepage)
- 7 navigation text links: Home, Meeting Spaces, Business Events, Stay the Night, Our Story, Practical Info, Contact

**Desktop behavior:** Full navigation visible. Logo at left, links at right or center.

**Mobile behavior:** Logo visible. Navigation replaced by "Menu" text trigger. On activation, overlay panel reveals full contact block + social links + navigation links.

**Interactions:** Hover states on nav links. Active state on current page link.

---

### Section H-3: Hero

**Purpose:** Cinematic first impression. Establish physical quality of the venue and emotional positioning.

**Layout:** Full-width, full-viewport-height or near-full-height image area. Text overlay positioned toward left or center-left.

**Content structure:**
- Rotating/fading gallery of 9+ interior and exterior photos (auto-cycling slideshow)
- Small eyebrow label: "Where work meets comfort" (or similar)
- H1: "Welcome to FarmForm" (with "Form" in italic)
- H2 sub-headline: "Experience a New Way of Business Stay and Events"
- No CTA button in the hero — deliberate, forcing the visitor to scroll

**Images:** Large-format professional photography. First visible image: `FarmForm-Interieur-4773-foto©Kwinten-Verspeurt` (interior space shot). Subsequent images load lazily.

**Interactions:** Auto-advancing crossfade between images. No manual controls visible.

**Desktop behavior:** Full viewport height. Text in a constrained column overlaid on image.

**Mobile behavior:** Image scales to fill mobile viewport. Text remains legible, potentially repositioned.

---

### Section H-4: About / Mission Statement

**Purpose:** Brand introduction and emotional positioning. Convert visual interest into comprehension.

**Layout:** Single-column centered text, constrained width for readability.

**Content structure:**
- H2: "Where work meets comfort"
- Two body paragraphs explaining the venue's origin and proposition
- No image, no button — pure text

**Typography:** Body copy at comfortable reading size. No special treatments.

**Desktop behavior:** Text centered within ~700–800px column on wide viewport.

**Mobile behavior:** Full-width text with horizontal padding.

---

### Section H-5: Our Services

**Purpose:** Navigate visitors to the three primary service pages. Convert broad interest into specific inquiry paths.

**Layout:** Three equal-width cards in a horizontal row.

**Content structure per card:**
- H3 service name (e.g., "Meeting Spaces")
- Supporting tagline describing the service
- Inline text CTA with action language (e.g., "Step inside our spaces")
- Link to the service page

**Images:** Each card likely features an image of the corresponding space, possibly on hover or as a card background.

**Buttons:** Text links styled as CTAs, not contained buttons.

**Desktop behavior:** Three cards in a horizontal row.

**Mobile behavior:** Cards stack vertically, one per row.

**Interactions:** Card hover state (subtle elevation or border).

---

### Section H-6: Why Choose FARMform?

**Purpose:** Systematic objection handling and value proposition articulation. The longest section on the homepage.

**Layout:** Feature grid — estimated 2–3 columns on desktop, stacking on mobile. Each item: icon (SVG) + H3 heading + body paragraph.

**Content structure (7 items):**
1. Freedom to Tailor Your Stay
2. Eco-Friendly and Sustainable
3. Convenient and Connected
4. One-Price Concept
5. Nature-Infused Experience
6. Equipped for Professionals
7. Multilingual Team

**Images:** Small inline SVG icons per feature (not decorative images).

**Typography:** H3 per feature, then 2–4 sentence body paragraph.

**Desktop behavior:** 3-across grid (2–3–2 or 3–4 arrangement).

**Mobile behavior:** Single column, each feature stacks icon → heading → body.

---

### Section H-7: Our Values

**Purpose:** Distill brand philosophy into scannable principles. Reinforce emotional alignment.

**Layout:** Similar icon-grid format to the "Why Choose" section but with shorter, more poetic content.

**Content structure (5 items):**
1. Freedom — "Empowering you to shape your time with us."
2. Sustainability — "Building a greener future with eco-conscious choices."
3. Exclusivity — "Creating tailored, private experiences."
4. Comfort — "Balancing modern luxury with a homely atmosphere."
5. Inspiration — "Encouraging creativity and relaxation through our farm-inspired design."

**Introducing element:** H2 — "Our Values" with subtitle "What drive us at our core"

**Desktop behavior:** 3–5 across grid.

**Mobile behavior:** 2-across or single-column.

---

### Section H-8: Pre-Footer CTA

**Purpose:** Catch the visitor before they exit. Primary conversion moment.

**Layout:** Centered text block, modest vertical padding, single CTA button.

**Content structure:**
- H2: "Ready to learn more?"
- Body sentence: "Contact us for reservations or additional information. We will work with you to create a truly memorable experience."
- Button: "Get in touch" (links to `/contact/`)

**Desktop behavior:** Centered, constrained width, button centered below text.

**Mobile behavior:** Same, stacked vertically.

---

### Section H-9: Newsletter / Community Signup

**Purpose:** Secondary conversion — email capture for visitors not ready to inquire.

**Layout:** Centered form area, single input field + checkbox + submit.

**Content structure:**
- H2: "Join Our Community"
- Sub-copy: "Be the first to experience FARMform – where work meets comfort. Get inspiration, updates and behind-the-scenes stories."
- Email input field (with "Loading..." placeholder indicating async initialization)
- Checkbox: "I agree to the Privacy Policy"
- Submit button
- GDPR notice label

**Desktop behavior:** Form contained within a reasonably narrow column.

**Mobile behavior:** Full-width inputs, stacked form elements.

---

### Section H-10: Footer

**Purpose:** Persistent identity, contact, and navigation anchor. Legal compliance.

**Layout:** Two or three column layout on desktop. Stacked on mobile.

**Content structure:**
- Column 1 (Company Info): Legal name, address, VAT number, email, phone
- Column 2 (Social Media): Facebook, Instagram, LinkedIn icon links
- Column 3 (Navigation): Full site navigation links (mirrors primary nav)
- Bottom bar: "All rights reserved FARMform®" · "Privacy Policy" · "Code & Design · Studio Scale"

**Typography:** Small body text, footer-weight.

**Links:** All navigation links, social links, email mailto, phone tel, Privacy Policy, Studio Scale credit link.

**Notable:** Studio Scale credited as designer/developer — a small Belgian digital studio. This credit is an anchor link with their logo SVG.

**Desktop behavior:** Multi-column horizontal layout.

**Mobile behavior:** Stacked vertically — contact info, then social icons, then nav links, then legal bar.

---

## 14. Section Inventory — Interior Pages

---

### Meeting Spaces Page

#### MS-1: Page Hero / Header

**Purpose:** Orient the visitor to the specific service area.

**Layout:** H1 + subtitle, no full-bleed image (or contained image at top of content).

**Content:**
- H1: "Meeting Spaces"
- Sub-paragraph explaining the three-room offering and philosophy

**Desktop / Mobile:** Standard content-width header section.

---

#### MS-2: Quick Navigation

**Purpose:** Jump-link navigation for the long-scroll page.

**Layout:** Horizontal inline list prefixed with "Quick nav →"

**Links:** "The Spaces," "One Price Concept," "Technologies," "Amenities"

**Interactions:** Smooth scroll to anchor on click.

---

#### MS-3: Room Cards (Repeated × 3)

**Purpose:** Present each meeting room with enough detail for a booking decision.

**Layout:** Card format — image on top or left, metadata and description below/right.

**Content per card:**
- Room name as H3 (e.g., "Bowie's Boardroom")
- Hero image of the room
- Capacity label (e.g., "4 – 12 GUESTS") — uppercase label style
- Spec list with icons: area (m²), layout style, special features (terrace, fireplace)
- Body paragraph description
- "Open gallery" trigger link

**Room 1 — Bowie's Boardroom:** 40m², 4–12 guests, boardroom style, cozy and private
**Room 2 — Amazons' Meadow:** 70m², 13–40 guests, fully adaptable layouts, private terrace
**Room 3 — Tokyo's Lounge:** 45m², up to 20 guests, flexible formal/informal, private terrace, fireplace

**Interactions:** "Open gallery" opens the lightbox/slider panel.

---

#### MS-4: One Price Concept

**Purpose:** Address pricing anxiety and differentiate from competitors.

**Layout:** H2 headline, supporting image, two columns or full-width body.

**Content:**
- Headline explanation of the all-inclusive model
- Sub-section: "Tailored to Your Business Needs" — flexibility pitch

---

#### MS-5: Technologies Grid

**Purpose:** Prove technical adequacy for professional users.

**Layout:** Icon grid (3-across estimated) — each item: icon, label, descriptor.

**6 items:** Screen Smart TV (crisp visuals), High-Quality Sound (immersive audio), Barco ClickShare (wireless presentations), Digital Flipchart (interactive whiteboarding), Super-Fast Wi-Fi (seamless coverage), Power Outlets (stay connected)

**Notable disclaimer below grid:** "We intentionally do not support video conferencing…" — positioned as a philosophy statement.

---

#### MS-6: Amenities Grid

**Purpose:** Communicate the experiential quality of non-technology elements.

**Layout:** Same icon-grid pattern as Technologies.

**5 items:** Coffee Corner, Natural Daylight, Inspiring Views, Outdoor Terrace, The Summer House

---

#### MS-7–9: Gallery Panels (Hidden / Toggled)

**Purpose:** Full-image exploration of each room.

**Layout:** Full-screen lightbox with image carousel, counter (01/10), navigation arrows, thumbnail strip.

**Content:** 7–10 professional photos per room.

**Interactions:** Toggle open/close. Previous/next navigation. Thumbnail click for direct image access.

---

### Business Events Page

#### BE-1: Split Hero

**Purpose:** Create emotional impact for the highest-value service offering.

**Layout:** Large image (portrait-style photo of person/people) alongside or above the H1.

**Notable:** Uses a portrait photo of people, not just the space — unique among all pages. Humanizes the corporate event pitch.

**Content:**
- H1: "Business Events"
- Long body paragraph enumerating event types: networking, team-building, product launch, seminar, workshop, strategic planning, brainstorming, client presentations, training, company celebrations

---

#### BE-2: Image Gallery (Auto-scroll or Slider)

**Purpose:** Visual proof of event possibilities within the space.

**Layout:** Horizontal scrolling or carousel of 15 images.

---

#### BE-3: Pricing Section

**Purpose:** Manage pricing expectations without revealing specific prices (custom quotes only).

**Content:** H2 "Pricing" + copy explaining bespoke pricing on request. Catering billed separately.

---

#### BE-4: Versatile Setup

**Purpose:** Describe the full-property booking model — a key differentiator.

**Layout:** Icon list of 6 capabilities.

**Content (6 points):** Indoor customisation, Breakout zones, Summer House, Terraces, Kitchen access, Tailored proposals

---

#### BE-5: Technologies & Amenities (Shared Component)

**Purpose:** Reassure the event planner of technical and experiential capability.

**Layout:** Same grid pattern as Meeting Spaces page — component is reused across pages.

---

### Stay the Night Page

#### SN-1: Page Header

**Purpose:** Frame the accommodation offering.

**Content:**
- H1: "Stay the Night"
- Intro paragraph covering the full range from short business trips to extended stays

---

#### SN-2: Room Cards (Repeated × 3)

**Content per card:**

**Standard Room** — 2 rooms, 1–2 guests, ~20m², King-size bed, from €235 (single) / €300 (double)

**Deluxe Room** — 4 rooms, 1–2 guests, ~30m², King-size bed, from €265 (single) / €330 (double)

**Executive Suite** — 2 rooms, 1–2 guests, ~35m², King-size bed, Private terrace (Room 1), Bathtub (Room 2), from €320 (single) / €385 (double)

**Notable pricing note on all cards:** "Rates differ during Tomorrowland weekends due to demand and limited availability" — honest, transparency-building copy.

---

#### SN-3: One-Price Concept (Rooms)

**Purpose:** Same concept as Meeting Spaces but applied to accommodation context.

**Content:** Explanation that breakfast, drinks, facilities access are all included. Catering extra.

---

#### SN-4: What's Included Grid

**Layout:** 6-item icon grid.

**Items:** Breakfast Crafted for You, Drinks Your Way (complimentary), Private Bathroom (walk-in shower or bathtub), Modern Amenities (Smart TV with casting), Free High-Speed Wi-Fi, Access to all Facilities (Terraces, Spa: fitness & sauna, Summer House)

---

### Our Story Page

#### OS-1: Page Hero

**Layout:** H1 + subtitle, with a wide landscape image below the heading.

**Content:**
- H1: "Our Story"
- Sub-headline: "From Idea to Reality"
- Full-width panoramic image of the farm/property

---

#### OS-2: Timeline Narrative (4 Chapters)

**Layout:** Alternating or vertical narrative sections. Each section has an H2 with a dated or descriptive title, followed by a body paragraph, and a supporting image (lazy-loaded SVG placeholder in source).

**Chapters:**
1. "The Beginning (2011)" — farm purchase, corporate motivation
2. "A Family Project" — 14-year build, children grew up here
3. "Discovering a New Way of Living" — personal transformation through farm life
4. "FARMform Today" — synthesis and brand story conclusion

**Notable:** Each chapter appears twice in the markup — once likely for desktop, once for mobile (a common pattern for responsive content reordering via CSS).

---

#### OS-3: Personal Note / Founder Signature

**Purpose:** Add a final human face to the brand. Builds maximum trust through personal vulnerability.

**Content:**
- H2: "A Personal Note"
- Personal statement from Andra Delanoye about what welcoming guests means to her
- Signed: "With pride and joy, Andra Delanoye, Co-Founder & Host of FARMform®"

---

### Practical Info Page

#### PI-1: Page Header

**Content:**
- H1: "Practical Information"
- Prominent "Get in touch" CTA button immediately below the headline — unusual placement, suggests this page is visited by people ready to convert

---

#### PI-2: Info Blocks (5 blocks)

Each block has an icon, H2 heading, and content:

1. **Languages Spoken** — English, Dutch, French, German (note: website copy also mentions Romanian; this page lists 4 of the 5)
2. **Location and Accessibility** — full address as a Google Maps link, distance table (Brussels Airport 25km, Brussels Center 20km, Antwerp 30km, Mechelen 20km)
3. **Parking** — Free on-site (10 cars), street parking, EV charging
4. **Technologies** — Text list (same 6 items as Meeting Spaces grid, but list format here)
5. **Amenities** — Text list (6 items including Farm Animals, which is not in the Meeting Spaces amenities grid)

---

#### PI-3: Our Services Quick Links

**Purpose:** Cross-navigation to service pages from a utility page.

**Content:** H2 "Our Services" + 3 text link buttons: Meeting Spaces, Business Events, Stay the Night

---

### Contact Page

#### CT-1: Contact Header Block

**Layout:** H1 + social links + full contact details block.

**Content:**
- H1: "Contact"
- Social icons (Facebook, Instagram, LinkedIn)
- Address, VAT, email, phone
- "View on Google Maps" link

---

#### CT-2: Contact Form

**Layout:** Form with labeled fields, arranged in a logical sequence.

**Content:**
- Pre-form headline: "Ready to explore more? Let's connect."
- Fields: First name, Last name, Telephone, Email, Your request (textarea)
- Radio group "Inquiry": Booking / Other
- Radio group "Contact preference": Email / Phone
- File attachment input (max 10MB)
- GDPR consent text with Privacy Policy link
- Submit button: "Send request"

**Interactions:** Form validation (implicit). File upload state display. Async submission (implied by newsletter form pattern).

---

## 15. Component Inventory

---

### C-01: Site Header / Navigation Bar

**Variants:** Desktop (full horizontal), Mobile (collapsed hamburger)

**Elements:**
- Logo (SVG text mark, link to homepage)
- Navigation links (array of 7 items)
- Active state indicator
- Mobile: Menu toggle button + full-screen overlay panel with contact block + social + nav

**Behavior:** Sticky or fixed positioning (inferred — allows scroll-based interaction with page content while maintaining access to navigation).

---

### C-02: Pre-Header Brand Bar

**Elements:** Single line of brand tagline text
**Behavior:** Static, non-interactive

---

### C-03: Hero Slideshow

**Elements:**
- Background image container
- Auto-cycling images (9+)
- Text overlay block (eyebrow label, H1, sub-headline)
- Crossfade transition between images

**Behavior:** Auto-play, no user controls visible

---

### C-04: Service Card

**Used on:** Homepage "Our Services" section, Practical Info "Our Services" section

**Elements:**
- Optional cover image
- H3 service name
- Supporting description text
- Inline text CTA with action copy and arrow

**Behavior:** Hover state on the card or the CTA link. Click navigates to service page.

---

### C-05: Feature / Value Block

**Used on:** Why Choose FARMform, Our Values, Technologies, Amenities, Versatile Setup (Business Events), What's Included (Stay the Night)

**Elements:**
- Inline SVG icon
- H3 label (bold)
- Optional subtitle text (italic, smaller — used in Technologies: "crisp visuals")
- Optional body paragraph

**Variants:**
- **Icon + H3 only** (Our Values)
- **Icon + H3 + descriptor** (Technologies — compact form)
- **Icon + H3 + body paragraph** (Why Choose, Amenities)

**Behavior:** No interaction; static display component

---

### C-06: Room / Space Card

**Used on:** Meeting Spaces, Stay the Night

**Elements:**
- H3 room name
- Hero image of the room
- Capacity label (uppercase label style)
- Spec list with icon + text (area, layout, features)
- Body description paragraph
- "Open gallery" trigger

**Behavior:** "Open gallery" click opens the lightbox gallery overlay for that room.

---

### C-07: Lightbox Gallery

**Used on:** Each room/space on Meeting Spaces and Stay the Night

**Elements:**
- Full-screen overlay (dark background)
- Active image (large)
- Navigation arrows (left/right, SVG)
- Slide counter ("01 / 10")
- Thumbnail strip of all images
- "Close" button (×)
- Room name + capacity label header

**Behavior:** Opens on "Open gallery" click. Left/right arrows or thumbnail click cycles images. Escape or Close button dismisses. Image count is specific to each room (7–14 images per room/space).

---

### C-08: Quick Navigation Bar

**Used on:** Meeting Spaces, Stay the Night

**Elements:**
- "Quick nav →" label
- Horizontal list of anchor text links

**Behavior:** Click smoothly scrolls to the matching section anchor on the page.

---

### C-09: Pre-Footer CTA Section

**Used on:** All pages (homepage and all interior pages)

**Elements:**
- H2: "Ready to learn more?"
- Body sentence
- "Get in touch" button (links to /contact/)

**Behavior:** Button navigates to contact page.

---

### C-10: Newsletter Signup Section

**Used on:** All pages (below Pre-Footer CTA)

**Elements:**
- H2: "Join Our Community"
- Sub-copy paragraph
- Email input field (async-initialized, shows "Loading…" initially)
- Privacy policy checkbox
- Submit button
- GDPR notice

**Behavior:** Async form submission. Privacy checkbox must be accepted before submission.

---

### C-11: Site Footer

**Elements (top block):**
- Company name, address, VAT
- Email link, phone link
- Social icons (Facebook, Instagram, LinkedIn)

**Elements (divider):**
- Horizontal rule

**Elements (bottom block):**
- Full navigation links (mirrors primary nav)

**Elements (legal bar):**
- "All rights reserved FARMform®"
- Separator dot "·"
- Privacy Policy link
- Separator dot "·"
- "Code & Design" label
- Studio Scale logo + link

**Behavior:** Social icons and all links are active. Legal bar is a single-line baseline element.

---

### C-12: Info Block

**Used on:** Practical Info page

**Elements:**
- Inline SVG icon
- H2 section heading
- Content (paragraph or list)
- Optional link (Google Maps, tel, mailto)

---

### C-13: Contact Form

**Used on:** Contact page

**Elements:**
- Pre-form heading: "Ready to explore more? Let's connect."
- Text input fields (First name, Last name, Telephone, Email)
- Textarea (Your request)
- Radio button group (Inquiry type)
- Radio button group (Contact preference)
- File upload input with state display
- GDPR consent + Privacy Policy link
- Submit button: "Send request"

**Behavior:** Standard HTML form with async submission. File upload limited to 10MB.

---

### C-14: Newsletter / Email Input Component

**Shared elements of the standalone email input block (newsletter form) — distinct from the contact form**

**Elements:**
- Email text input
- Privacy checkbox
- GDPR notice text
- Submit button

---

### C-15: Social Icon Link

**Used on:** Navigation overlay, footer

**Elements:**
- SVG icon for each platform (Facebook, Instagram, LinkedIn)
- Accessible alt text ("Facebook", "Instagram", "LinkedIn")
- External link to social profile

**Behavior:** Opens in new tab (inferred). Hover color/opacity state.

---

### C-16: Breadcrumb / Page Title Module (Implicit)

**Inferred from title patterns:** Each interior page uses a consistent header pattern — H1 page title + descriptor subtitle. This functions as a visual breadcrumb confirming location within the site.

---

### C-17: Timeline Chapter (Our Story page)

**Elements:**
- H2 with chapter title and optional year in parentheses
- Body paragraph
- Supporting image

**Behavior:** Static. Each chapter may have a scroll-in animation reveal.

---

### C-18: Founder Signature Block

**Used on:** Our Story page

**Elements:**
- Heading "A Personal Note"
- Multi-paragraph personal statement body text
- Closing salutation: "With pride and joy,"
- Founder name: "Andra Delanoye"
- Title: "Co-Founder & Host of FARMform®"

**Behavior:** Static. No image of the founder is present in the markup — a notable design choice that preserves the text-forward storytelling.

---

*End of FARMform® UX & Design Specification Document*

---

**Document prepared by:** Reverse-engineering analysis of all publicly accessible pages of https://farmform.be/ as of June 2026.  
**Note:** Visual details not accessible via source inspection (exact typefaces, precise color hex values, exact pixel dimensions, animation easing curves) are marked as "inferred" and represent educated interpretation based on observed design language, industry standards for premium hospitality websites, and the custom WordPress theme architecture.
