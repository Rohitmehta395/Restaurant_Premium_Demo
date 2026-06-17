# Reusable Business/Restaurant Template — Content Architecture Specification

**Document Type:** Content Architecture & Data Layer Design  
**Derived From:** GROVEside® UX Specification  
**Purpose:** Define a fully data-driven, CMS-ready template whose entire content, configuration, and personality can be replaced by swapping data files — transforming the same structural template from a Belgian business retreat into a restaurant, café, hotel, or any hospitality/service business.

---

## Guiding Principle

**Structure is permanent. Content is replaceable. Configuration is adjustable.**

Every decision in this architecture maps a piece of the website into one of three immutable categories:

| Category | Definition | Who controls it | How it changes |
|---|---|---|---|
| **Structural** | The layout patterns, component scaffolding, rendering logic, and interaction system | Developer / template author | Only by intentional template modification |
| **Configurable** | Design tokens, feature flags, behavior switches, layout options | Site owner / template administrator | By editing config files without touching structure |
| **Content** | All human-readable text, media references, URLs, and business data | Business owner / content editor | By editing data files with no technical knowledge |

Nothing that a business owner needs to change to make this site theirs should require touching structural files.

---

## Part 1: Project Architecture

### 1.1 Conceptual Layer Stack

```
┌─────────────────────────────────────────────┐
│              RENDERED WEBSITE               │
│         (browser-facing output)             │
└──────────────────┬──────────────────────────┘
                   │ assembled by
┌──────────────────▼──────────────────────────┐
│             TEMPLATE ENGINE                 │
│  (components + layout patterns + routing)   │
└──────┬──────────────────────────┬───────────┘
       │ reads                    │ reads
┌──────▼────────┐      ┌──────────▼──────────┐
│  CONTENT DATA │      │   CONFIGURATION     │
│    LAYER      │      │       LAYER         │
│               │      │                     │
│  /data/       │      │  /config/           │
│  /content/    │      │  /themes/           │
│  /media/      │      │                     │
└───────────────┘      └─────────────────────┘
```

The template engine never contains content. It only contains rendering instructions that consume data. Swapping the data layer produces a completely different business identity.

### 1.2 Architectural Contracts

Three contracts govern how the layers communicate:

**Content Contract:** Every piece of human-readable text, every image reference, every URL, every business fact lives in `/data/` or `/content/`. The template can reference these values but must never hardcode them.

**Configuration Contract:** Every design decision (colors, fonts, spacing scales, feature flags, layout variants) lives in `/config/` or `/themes/`. The template reads these but never makes visual decisions independently.

**Structure Contract:** Component scaffolding, routing logic, rendering functions, and interaction systems live in `/components/`, `/layouts/`, and `/pages/`. These contain no business content and no visual opinions beyond their rendering logic.

---

## Part 2: Folder Structure

```
/
├── config/
│   ├── site.config.json              # Global site settings
│   ├── features.config.json          # Feature flags and toggles
│   ├── navigation.config.json        # Nav structure and behavior
│   └── seo.config.json               # SEO and meta defaults
│
├── themes/
│   ├── default/
│   │   ├── tokens.json               # Design tokens (colors, type, spacing)
│   │   ├── typography.json           # Typeface assignments and scale
│   │   └── layout.json               # Grid, breakpoints, max-widths
│   └── [theme-name]/                 # Additional themes (dark, seasonal, etc.)
│       ├── tokens.json
│       ├── typography.json
│       └── layout.json
│
├── data/
│   ├── business/
│   │   ├── identity.json             # Name, tagline, legal entity, VAT
│   │   ├── contact.json              # Phone, email, address, maps link
│   │   ├── hours.json                # Opening hours per day/service
│   │   ├── social.json               # Social platform links
│   │   └── team.json                 # Team members and founder info
│   │
│   ├── pages/
│   │   ├── home.json                 # Homepage-specific content
│   │   ├── services.json             # Services listing (all service types)
│   │   ├── menu.json                 # Menu/offering items (restaurant mode)
│   │   ├── spaces.json               # Venue spaces (meeting/dining rooms)
│   │   ├── rooms.json                # Accommodation rooms (if applicable)
│   │   ├── events.json               # Events page content
│   │   ├── story.json                # About/Our Story narrative
│   │   ├── practical.json            # Practical info page content
│   │   └── contact.json              # Contact page content and form config
│   │
│   ├── components/
│   │   ├── hero.json                 # Hero section content variants
│   │   ├── cta.json                  # All CTA blocks across the site
│   │   ├── features.json             # "Why choose us" features/reasons
│   │   ├── values.json               # Brand values list
│   │   ├── testimonials.json         # Testimonials / reviews
│   │   ├── faq.json                  # Frequently asked questions
│   │   ├── newsletter.json           # Newsletter section copy
│   │   └── banners.json              # Announcement banners and notices
│   │
│   └── legal/
│       ├── privacy.json              # Privacy policy meta and content
│       ├── terms.json                # Terms of service (if applicable)
│       └── cookies.json              # Cookie consent copy
│
├── content/
│   ├── pages/
│   │   ├── story.md                  # Long-form narrative content (Markdown)
│   │   ├── privacy-policy.md
│   │   └── terms.md
│   └── blog/                         # Blog posts (if feature-flagged on)
│       └── [slug].md
│
├── media/
│   ├── images/
│   │   ├── brand/
│   │   │   ├── logo.svg              # Primary logo (SVG)
│   │   │   ├── logo-dark.svg         # Dark-background variant
│   │   │   ├── logo-icon.svg         # Icon-only mark (favicon source)
│   │   │   └── og-default.jpg        # Default Open Graph image
│   │   │
│   │   ├── hero/
│   │   │   ├── hero-01.jpg           # Hero slideshow images
│   │   │   ├── hero-02.jpg
│   │   │   └── [...]
│   │   │
│   │   ├── spaces/
│   │   │   ├── [space-slug]/
│   │   │   │   ├── cover.jpg         # Card cover image
│   │   │   │   ├── gallery-01.jpg
│   │   │   │   └── [...]
│   │   │   └── [...]
│   │   │
│   │   ├── rooms/
│   │   │   └── [room-slug]/
│   │   │       ├── cover.jpg
│   │   │       └── gallery-[n].jpg
│   │   │
│   │   ├── team/
│   │   │   └── [member-slug].jpg
│   │   │
│   │   └── general/
│   │       └── [filename].jpg        # Shared imagery used across sections
│   │
│   └── icons/
│       ├── features/                 # SVG icons for feature/value blocks
│       │   └── [icon-name].svg
│       └── ui/                       # UI chrome icons (arrows, close, etc.)
│           └── [icon-name].svg
│
├── components/                       # Structural only — no content
├── layouts/                          # Structural only — no content
├── pages/                            # Structural only — routing & assembly
└── public/                           # Static assets (favicons, robots.txt)
```

---

## Part 3: Content Architecture

### 3.1 Content Taxonomy

All content is classified into four types, each with its own editing workflow:

| Type | Location | Format | Edited by | Frequency |
|---|---|---|---|---|
| **Business Facts** | `/data/business/` | JSON | Owner | Rarely (setup + changes) |
| **Page Content** | `/data/pages/` | JSON | Owner / Editor | Occasionally |
| **Component Content** | `/data/components/` | JSON | Owner / Editor | Occasionally |
| **Long-form Narrative** | `/content/pages/` | Markdown | Owner / Editor | Occasionally |

### 3.2 Content Separation Rules

**Rule 1 — Separation of identity from content.**  
Business identity (name, tagline, phone, address) is stored in `/data/business/` and never duplicated in page data files. All page and component files reference business identity via tokens — e.g., `{business.name}`, `{business.contact.phone}` — not by repeating the values.

**Rule 2 — Separation of copy from structure.**  
The presence of a section on a page is controlled by a boolean flag or the presence/absence of a data entry. The section's internal layout never changes based on content — only the data passed into it changes.

**Rule 3 — Separation of media references from media files.**  
Data files contain only paths (strings) to media files. Never embed base64 data or inline image content in data files.

**Rule 4 — Separation of long-form content from structured data.**  
Short strings (headings, CTAs, labels, single sentences) live in JSON. Multi-paragraph narrative text, policy documents, and blog posts live in Markdown files in `/content/`.

**Rule 5 — No presentational decisions in content files.**  
Content files must never specify colors, font sizes, or layout columns. A content item may specify a `variant` (e.g., `"layout": "highlight"`) that maps to a pre-defined visual treatment — but the visual definition lives in config, not in the content.

---

## Part 4: Data Architecture

### 4.1 Business Identity Data

**File:** `/data/business/identity.json`

**Purpose:** Single source of truth for all business identity facts. Referenced across the entire site.

**Editable fields:**

```
business_name              The trading name displayed throughout the site
brand_tagline              The short positioning line ("Where work meets comfort")
brand_description_short    One sentence — used in meta descriptions, og:description
brand_description_long     2–3 sentences — used in About sections
legal_entity_name          Registered company name (e.g., "GROVEside La Mama BV")
vat_number                 VAT / tax registration number
registration_country       Country of registration (ISO 3166-1 alpha-2)
registration_year          Year the business was founded (used in footer copyright)
trademark_symbol           Whether the name carries ® or ™
```

**Structural (never edited):** The schema itself. How these values are surfaced in the UI.

---

**File:** `/data/business/contact.json`

**Purpose:** All contact methods and geographic data.

**Editable fields:**

```
phone                      Telephone number (display format)
phone_uri                  Telephone number (tel: URI format, digits only)
email                      Primary contact email
email_label                Optional display label for the email link
address_line_1             Street address
address_line_2             Suite, unit, etc. (optional)
city                       City name
postcode                   Postal / ZIP code
region                     Province, state, or region (optional)
country                    Country name (display)
country_code               ISO 3166-1 alpha-2
maps_link                  Full Google Maps URL (place link)
maps_embed_url             Embeddable maps URL (if used)
proximity_points           Array of named distances:
  - label                  Name of the reference point (e.g., "Brussels Airport")
  - distance_km            Distance in kilometers
  - distance_text          Optional override text (e.g., "approx. 25 min drive")
```

---

**File:** `/data/business/hours.json`

**Purpose:** Business operating hours per day and per service type.

**Editable fields:**

```
services                   Array of service types (e.g., "Kitchen", "Reception", "Check-in")
  - service_name           Label for this service
  - schedule               Array of day-range entries
      - days               Day label or range ("Monday – Friday", "Saturday")
      - open               Opening time (24h or 12h string)
      - close              Closing time
      - closed             Boolean: is this service closed on these days?
      - note               Optional note (e.g., "By appointment only")
timezone                   IANA timezone string (e.g., "Europe/Brussels")
holiday_note               Optional string: note about holiday hours
```

**Configurable:** Whether to display hours as a table or as prose. Which services to show/hide.

---

**File:** `/data/business/social.json`

**Purpose:** Social media platform links.

**Editable fields:**

```
platforms                  Array of social links
  - platform               Slug identifier (facebook, instagram, linkedin, etc.)
  - display_name           Human label (e.g., "Follow us on Instagram")
  - url                    Full profile URL
  - icon_ref               Reference to icon file in /media/icons/
  - show_in_header         Boolean: display in mobile nav overlay
  - show_in_footer         Boolean: display in footer
  - show_in_contact        Boolean: display on contact page
```

**Configurable:** Rendering style (icon-only, icon + label, text-only). Icon size.

**Structural:** The icon rendering system and link element output.

---

**File:** `/data/business/team.json`

**Purpose:** Team members, founders, and host identities for the About/Story page and any staff sections.

**Editable fields:**

```
members                    Array of team members
  - slug                   URL-safe identifier
  - name                   Full name
  - role                   Job title or role label
  - bio_short              One sentence bio
  - bio_long               Multi-sentence bio (may reference story.md for long-form)
  - image_ref              Path to portrait image
  - signature_name         Name as it appears in a personal signature block
  - signature_title        Title as it appears in a personal signature block
  - show_on_story          Boolean: feature on Our Story / About page
  - show_on_contact        Boolean: feature on Contact page
```

---

### 4.2 Page-Level Content Data

---

**File:** `/data/pages/home.json`

**Purpose:** All content specific to the homepage that is not shared with other pages.

**Editable fields:**

```
meta_title                 Browser tab / SEO title for homepage
meta_description           SEO meta description

hero:
  eyebrow_text             Small label above main headline
  headline                 Main H1 text
  headline_emphasis        The portion of the headline rendered in italic/emphasis
  subheadline              Supporting H2 line
  show_cta                 Boolean: show a CTA button in the hero
  cta_ref                  Reference to a CTA entry in /data/components/cta.json
  slideshow_images         Ordered array of image paths for hero slideshow
    - image_ref            Path to image
    - alt_text             Descriptive alt text for accessibility
    - caption              Optional hidden caption (for screen readers or tooltips)

about_section:
  heading                  Section H2
  body_paragraphs          Array of paragraph strings
  show_section             Boolean feature flag

services_section:
  heading                  Section heading (optional — may be absent)
  intro_text               Optional intro paragraph
  layout_variant           "grid-3" | "grid-2" | "list"
  services                 Array of service card references (from services.json)

features_section:
  heading                  "Why Choose Us" heading text
  intro_text               Optional intro below heading
  features_ref             Reference to subset of features from features.json
  layout_columns           2 | 3 | 4

values_section:
  heading                  "Our Values" heading
  subheading               Supporting line beneath heading
  values_ref               Reference to entries from values.json

cta_section_ref            Reference to a CTA block in cta.json

newsletter_section_ref     Reference to newsletter entry in newsletter.json
```

---

**File:** `/data/pages/services.json`

**Purpose:** Defines all services the business offers. Each entry generates a service card on the homepage and a full dedicated page.

**Schema per service entry:**

```
services                   Array of service objects
  - slug                   URL path segment (e.g., "meeting-spaces")
  - status                 "published" | "draft" | "hidden"
  - nav_label              Label used in navigation (short)
  - page_title             H1 on the service's own page
  - page_subtitle          Descriptor line below the H1
  - card_title             Title shown in service card on homepage
  - card_tagline           Short card description
  - card_cta_text          CTA text on the card (e.g., "Step inside our spaces")
  - card_image_ref         Path to card cover image
  - card_image_alt         Alt text for card image
  - page_intro             Intro paragraph on the service's dedicated page
  - meta_title             SEO title for the service page
  - meta_description       SEO description for the service page
  - quick_nav_items        Array of in-page anchor navigation labels + ids
  - hero_image_ref         Path to page hero image
  - hero_image_alt         Alt text for page hero
  - sections               Array of section keys that appear on this service page
                           (references to sub-sections defined in spaces.json,
                           rooms.json, features.json, etc.)
  - show_one_price_section Boolean: display the One-Price Concept block
  - one_price_content_ref  Reference to one_price entry in this same file
  - show_technologies      Boolean: display technologies grid
  - technologies_ref       Reference to a technologies entry in features.json
  - show_amenities         Boolean: display amenities grid
  - amenities_ref          Reference to an amenities entry in features.json
  - cta_section_ref        Reference to a CTA block in cta.json
  - sort_order             Integer: display order in nav and service grids

one_price_concepts         Array of pricing philosophy entries (one per service type)
  - service_slug           Which service this belongs to
  - headline               Section H2
  - body                   Explanation paragraph
  - inclusions_heading     Sub-section heading (e.g., "Tailored to Your Needs")
  - inclusions_body        Sub-section paragraph
  - catering_note          Optional note about separately-billed items
```

---

**File:** `/data/pages/spaces.json`

**Purpose:** Meeting rooms, dining rooms, event spaces, or any named venue space.

**Schema per space:**

```
spaces                     Array of space objects
  - slug                   URL-safe identifier
  - parent_service_slug    Which service page this space belongs to
  - status                 "published" | "draft"
  - name                   Display name (e.g., "Bowie's Boardroom")
  - capacity_min           Minimum guest count (integer or null)
  - capacity_max           Maximum guest count (integer)
  - capacity_label         Display label (e.g., "4 – 12 GUESTS")
  - area_sqm               Floor area in square meters (integer or null)
  - area_display           Display string (e.g., "~40m²")
  - layout_styles          Array of available layout types
                           (e.g., ["Boardroom", "Theater", "U-Shape"])
  - special_features       Array of feature labels
                           (e.g., ["Private terrace", "Fireplace"])
  - description_short      One-sentence teaser (used in cards)
  - description_long       2–4 sentence full description (used in expanded panel)
  - cover_image_ref        Path to card cover image
  - cover_image_alt        Alt text
  - gallery_images         Ordered array of gallery images
    - image_ref            Path
    - alt_text             Alt text
    - caption              Optional caption
  - gallery_trigger_label  Text for the "Open gallery" link
  - sort_order             Display order within service page
```

---

**File:** `/data/pages/rooms.json`

**Purpose:** Accommodation rooms or suites. Follows the same schema as spaces.json with accommodation-specific extensions.

**Schema per room (additions to space schema):**

```
  - room_type              "standard" | "deluxe" | "suite" | "custom"
  - room_count             How many identical rooms of this type exist
  - max_guests             Maximum occupancy
  - bed_configuration      Description (e.g., "King-size double bed")
  - bathroom_type          "en-suite" | "shared" | "none"
  - bathroom_features      Array (e.g., ["Walk-in shower", "Bathtub"])
  - rate_single            Base price per night for single occupancy
  - rate_double            Base price per night for double occupancy
  - rate_currency          ISO 4217 currency code
  - rate_from_text         "from" prefix toggle (boolean)
  - rate_note              Optional note (e.g., special event pricing)
  - exclusive_features     Room-specific extras (e.g., "Private terrace", "Bathtub")
  - description_short      Teaser copy
  - description_long       Full description paragraph
```

**Configurable:** Whether to show pricing on the card. Currency formatting. "From" prefix visibility.

---

**File:** `/data/pages/events.json`

**Purpose:** Business events or special bookings page.

**Editable fields:**

```
page_title                 H1
page_subtitle              Descriptor below H1
page_intro                 Introductory paragraph(s) — array of strings
hero_image_ref             Path to hero image
hero_image_alt             Alt text

event_types                Array of event type labels — the "for..." list
                           (e.g., "networking event", "product launch", "seminar")

pricing_section:
  heading                  H2 heading
  body                     Body copy (explains custom quote model)
  catering_note            Catering billing note

setup_section:
  heading                  H2 heading
  intro                    Optional intro text
  items                    Array of setup capability bullet items
    - icon_ref             Icon path
    - text                 Capability description

tailored_section:
  heading                  H2 heading
  body                     Supporting paragraph

gallery_images             Array of event gallery images
  - image_ref
  - alt_text
```

---

**File:** `/data/pages/story.json`

**Purpose:** Structured metadata and short-form content for the Our Story / About page. Long-form chapter text lives in `/content/pages/story.md`.

**Editable fields:**

```
page_title                 H1
page_subtitle              Descriptor below H1
hero_image_ref             Hero image path
hero_image_alt             Alt text

chapters                   Array of narrative chapters (references story.md sections)
  - slug                   Anchor ID matching a heading in story.md
  - heading                Chapter H2 display text
  - date_label             Optional year/date in parentheses (e.g., "2011")
  - summary_text           1–2 sentence teaser (for structured display)
  - image_ref              Optional supporting image
  - image_alt              Alt text
  - image_position         "left" | "right" | "below"

founder_note:
  show                     Boolean: display the founder signature block
  heading                  Block heading
  member_ref               Slug reference to team member in team.json
  custom_body              Optional override body text
  closing_salutation       (e.g., "With pride and joy,")
```

---

**File:** `/data/pages/practical.json`

**Purpose:** All structured information for the Practical Info page.

**Editable fields:**

```
page_title                 H1
hero_cta_ref               Optional CTA button at top of page

info_blocks                Array of information blocks (ordered)
  - slug                   Anchor ID for quick-nav
  - icon_ref               Icon path
  - heading                Block H2
  - content_type           "paragraph" | "list" | "distance-table" | "hours"
  - content                String, array, or reference depending on content_type
  - note                   Optional italic note/disclaimer below block

services_quicklinks:
  heading                  Section heading
  intro                    Optional intro text
  services_ref             Array of service slugs to link

```

---

**File:** `/data/pages/contact.json`

**Purpose:** Contact page content, form configuration, and display options.

**Editable fields:**

```
page_title                 H1
page_subtitle              Sub-header (e.g., "Ready to explore more? Let's connect.")
show_social_links          Boolean: display social icons on this page
show_address_block         Boolean: display address
show_maps_link             Boolean: display Google Maps CTA

form_config:
  heading                  Optional heading above form
  fields                   Array of form field definitions
    - name                 Field identifier (programmatic)
    - label                Display label
    - type                 "text" | "email" | "tel" | "textarea" | "radio" | "checkbox" | "file"
    - placeholder          Placeholder text
    - required             Boolean
    - options              Array (for radio/select: [{value, label}])
    - validation_message   Error message text
    - max_file_size_mb     For file fields (integer)
  submit_label             Text on the submit button
  consent_text             GDPR consent copy (may contain markdown link)
  success_heading          Heading shown after successful submission
  success_body             Body text after successful submission
  error_message            Generic error message if submission fails
```

---

### 4.3 Component Content Data

---

**File:** `/data/components/hero.json`

**Purpose:** All hero content variants. Pages reference hero entries by slug.

**Schema per hero entry:**

```
heroes                     Array of hero objects
  - slug                   Identifier referenced by page configs
  - type                   "slideshow" | "single-image" | "video" | "split"
  - eyebrow_text           Small label above headline (optional)
  - headline               Main headline text
  - headline_parts         Array for split italic/normal rendering
    - text                 Portion of headline text
    - emphasis             Boolean: render in italic/emphasis
  - subheadline            Supporting line
  - overlay_opacity        0.0–1.0 decimal (structural rendering, configurable)
  - slideshow_images       Array (used when type = "slideshow")
    - image_ref
    - alt_text
  - single_image_ref       Path (used when type = "single-image")
  - single_image_alt       Alt text
  - show_cta               Boolean
  - cta_ref                Reference to cta.json entry
  - text_position          "left" | "center" | "right"
```

---

**File:** `/data/components/cta.json`

**Purpose:** Every call-to-action block across the site. All sections reference these by slug.

**Schema per CTA entry:**

```
ctas                       Array of CTA objects
  - slug                   Identifier (e.g., "primary-contact", "hero-book")
  - heading                Section heading (e.g., "Ready to learn more?")
  - body                   Supporting sentence(s)
  - button_text            Button label (e.g., "Get in touch")
  - button_url             Destination URL or internal route
  - button_style           "primary" | "secondary" | "outline" | "text"
  - open_in_new_tab        Boolean
  - section_background     "default" | "light" | "dark" | "accent"
  - show_divider_above     Boolean: render horizontal rule before block
```

---

**File:** `/data/components/features.json`

**Purpose:** All icon-driven feature, technology, and amenity blocks. Used in Why Choose, Technologies, Amenities, and What's Included sections.

**Schema:**

```
feature_groups             Array of named groups
  - slug                   Group identifier (e.g., "why-choose", "technologies", "amenities")
  - heading                Optional group heading
  - intro                  Optional intro text
  - display_layout         "icon-grid" | "icon-list" | "card-grid"
  - items                  Array of feature items
    - slug                 Item identifier
    - icon_ref             Path to SVG icon
    - label                Bold title line
    - descriptor           Short italic subtitle (e.g., "crisp visuals")
    - body                 Optional longer explanation paragraph
    - sort_order           Integer
```

**Configurable:** Grid column count. Icon size. Whether descriptor is shown.

---

**File:** `/data/components/values.json`

**Purpose:** Brand values list. Displayed on the homepage and referenced in About sections.

**Schema:**

```
values                     Array of value objects
  - slug                   Identifier
  - label                  Short value name (e.g., "Sustainability")
  - description            One-sentence elaboration
  - icon_ref               Path to SVG icon
  - sort_order             Integer

section_heading            Heading for the values section
section_subheading         Sub-line beneath the heading
```

---

**File:** `/data/components/testimonials.json`

**Purpose:** Customer quotes, reviews, and testimonial content.

**Schema:**

```
testimonials               Array of testimonial objects
  - slug                   Identifier
  - quote                  The testimonial text (without quotation marks — template adds them)
  - author_name            Attribution name
  - author_title           Optional title or company
  - author_image_ref       Optional portrait image path
  - author_image_alt       Alt text
  - rating                 Optional integer 1–5
  - source_platform        Optional: "Google" | "TripAdvisor" | "Direct" | etc.
  - source_url             Optional link to original review
  - date                   ISO 8601 date string
  - featured               Boolean: use in hero/spotlight position
  - show                   Boolean: active/inactive toggle

section_heading            Heading for the testimonials section
section_subheading         Optional subheading
layout_variant             "cards" | "quotes" | "masonry" | "carousel"
```

---

**File:** `/data/components/faq.json`

**Purpose:** Frequently asked questions and answers.

**Schema:**

```
faq_groups                 Array of question groups
  - slug                   Group identifier (e.g., "booking", "facilities")
  - heading                Group heading
  - items                  Array of Q&A pairs
    - question             The question string
    - answer               The answer string (may contain markdown for links)
    - sort_order           Integer

section_heading            Top-level heading for FAQ section
intro_text                 Optional intro paragraph
display_style              "accordion" | "open-list" | "tabbed"
```

---

**File:** `/data/components/newsletter.json`

**Purpose:** Newsletter signup section content. Appears on every page — single source of truth.

**Schema:**

```
heading                    Section heading
subheading                 Supporting copy paragraph
input_placeholder          Placeholder text for email input
submit_label               Submit button text
consent_text               GDPR consent phrase with Privacy Policy link
loading_label              Text shown while form initializes
success_message            Confirmation text after submission
error_message              Error text if submission fails
notice_label               Any additional legal notice text
show_on_all_pages          Boolean: auto-include at the bottom of every page
```

---

**File:** `/data/components/banners.json`

**Purpose:** Site-wide announcement banners, temporary notices, and alerts.

**Schema:**

```
banners                    Array of banner objects
  - slug                   Identifier
  - text                   Banner copy
  - cta_text               Optional inline link text
  - cta_url                Optional link destination
  - type                   "info" | "warning" | "success" | "promotional"
  - start_date             ISO 8601 — when to start showing
  - end_date               ISO 8601 — when to stop showing (null = indefinite)
  - show                   Boolean master toggle
  - position               "top" | "bottom"
  - dismissible            Boolean: can the user close it
```

---

### 4.4 Legal Content Data

**File:** `/data/legal/privacy.json`

```
page_title                 H1 for the Privacy Policy page
last_updated               ISO 8601 date string
content_file               Path to /content/pages/privacy-policy.md
controller_name            Legal entity name (references identity.json or override)
controller_email           Contact email for privacy matters
```

**File:** `/data/legal/cookies.json`

```
banner_heading             Cookie consent banner heading
banner_body                Banner description text
accept_label               "Accept all" button label
reject_label               "Reject non-essential" button label
settings_label             "Manage preferences" link label
policy_link_text           Inline link text to privacy policy
categories                 Array of cookie categories
  - slug                   Identifier
  - label                  Display name
  - description            What this category does
  - required               Boolean: cannot be disabled
  - default_enabled        Boolean
```

---

## Part 5: Configuration Layer

### 5.1 Site Configuration

**File:** `/config/site.config.json`

**Purpose:** Global site behavior and meta settings.

```
site_url                   Canonical base URL (e.g., "https://groveside.be")
locale                     BCP 47 language tag (e.g., "en-BE")
currency                   ISO 4217 (e.g., "EUR")
date_format                Display date format string
time_format                "12h" | "24h"
timezone                   IANA timezone
active_theme               Slug of active theme in /themes/
enable_dark_mode           Boolean
favicon_ref                Path to favicon source
apple_touch_icon_ref       Path to Apple touch icon
og_image_default_ref       Path to default OG image
twitter_card_type          "summary_large_image" | "summary"
analytics_provider         "none" | "gtag" | "plausible" | "fathom"
analytics_id               Tracking ID
cookie_consent_required    Boolean: show cookie consent banner
```

---

**File:** `/config/features.config.json`

**Purpose:** Feature flags that control which site sections and capabilities are enabled.

```
features:
  hero_slideshow            Boolean: auto-cycling hero images
  hero_single_image         Boolean: static hero image (overrides slideshow)
  quick_navigation          Boolean: in-page anchor nav on long pages
  gallery_lightbox          Boolean: expandable image galleries
  newsletter_signup         Boolean: newsletter form on all pages
  testimonials_section      Boolean: show testimonials
  faq_section               Boolean: show FAQ section
  blog                      Boolean: enable blog/news section
  online_booking            Boolean: show booking widget or reservation system
  multilingual              Boolean: enable language switching
  cookie_consent            Boolean: show cookie consent UI
  pre_header_bar            Boolean: show top tagline bar
  announcement_banner       Boolean: show banners from banners.json
  team_section              Boolean: show team members on About page
  hours_section             Boolean: show operating hours on Practical Info
  map_embed                 Boolean: embed interactive map on contact page
  ev_charging_badge          Boolean: show EV charging icon in parking info
  pricing_visible           Boolean: show pricing on room/space cards
```

---

**File:** `/config/navigation.config.json`

**Purpose:** Navigation structure, order, and behavior.

```
primary_navigation:
  items                    Ordered array of nav entries
    - label                Display text
    - url                  Internal route or external URL
    - service_slug         Optional: link to a service page by slug
    - open_in_new_tab      Boolean
    - show                 Boolean: feature flag per item
  max_visible_items        Integer: collapse to "More" after this count (desktop)

mobile_navigation:
  show_contact_in_menu     Boolean: display contact info in mobile overlay
  show_social_in_menu      Boolean: display social icons in mobile overlay
  show_hours_in_menu       Boolean: display hours in mobile overlay
  menu_trigger_label       Text for the hamburger trigger (e.g., "Menu")

footer_navigation:
  duplicate_primary        Boolean: mirror primary nav in footer
  show_legal_links         Boolean: show Privacy Policy, Terms links
  custom_items             Optional additional footer-only links
    - label
    - url

sticky_header              Boolean: header sticks to top on scroll
header_transparency        "always" | "on-hero-only" | "never"
scroll_behavior            "smooth" | "auto"
```

---

### 5.2 Design Token Configuration

**File:** `/themes/[theme-name]/tokens.json`

**Purpose:** All visual design decisions, expressed as named values. No colors, sizes, or font decisions exist anywhere else.

```
color:
  brand_primary              Primary brand color (e.g., button fills, links)
  brand_secondary            Secondary accent color
  surface_default            Page background
  surface_alternate          Alternate section background (subtle shift)
  surface_dark               Dark section/footer background
  text_primary               Primary body text color
  text_secondary             Secondary/muted text color
  text_on_dark               Text color when on dark backgrounds
  text_on_primary            Text color on brand_primary background
  border_subtle              Subtle dividers and borders
  border_strong              Prominent borders
  overlay_dark               Hero/image overlay color with opacity
  status_success             Form success state
  status_error               Form error state
  status_warning             Banner warning state

motion:
  duration_fast              e.g., "150ms"
  duration_base              e.g., "300ms"
  duration_slow              e.g., "600ms"
  easing_default             CSS easing function string
  easing_enter               Enter animation easing
  easing_exit                Exit animation easing
  reduce_motion_respected    Boolean: honor prefers-reduced-motion

radius:
  none                       "0px"
  small                      e.g., "4px"
  base                       e.g., "8px"
  large                      e.g., "16px"
  pill                       e.g., "9999px"
  button                     Reference to one of the above

shadow:
  subtle                     box-shadow value
  base                       box-shadow value
  raised                     box-shadow value
  overlay                    box-shadow for modals/lightboxes
```

---

**File:** `/themes/[theme-name]/typography.json`

**Purpose:** All typeface and type scale decisions.

```
fonts:
  display:
    family                   Font family string
    weights                  Array of loaded weights (e.g., [700])
    source                   "google" | "local" | "adobe" | "variable"
    source_url               URL if google/adobe; path if local
  body:
    family                   Font family string
    weights                  Array (e.g., [400, 500])
    source
    source_url
  utility:
    family                   Optional third face for labels/captions
    weights
    source

scale:
  hero_h1:
    size_desktop             e.g., "64px"
    size_tablet              e.g., "48px"
    size_mobile              e.g., "36px"
    weight                   e.g., 700
    line_height              e.g., 1.1
    letter_spacing           e.g., "-0.02em"
  page_h1:
    [same structure]
  section_h2:
    [same structure]
  card_h3:
    [same structure]
  body_base:
    [same structure]
  body_large:
    [same structure]
  label_caps:
    size_desktop             e.g., "12px"
    weight                   e.g., 600
    letter_spacing           e.g., "0.1em"
    transform                "uppercase"
  caption:
    [same structure]
  footer:
    [same structure]

brand_emphasis_style         "italic" | "bold" | "underline" | "color"
brand_emphasis_color         Color token reference (if style is "color")
```

---

**File:** `/themes/[theme-name]/layout.json`

**Purpose:** Grid system, spacing scale, and breakpoints.

```
breakpoints:
  xs                         e.g., "375px"
  sm                         e.g., "640px"
  md                         e.g., "768px"
  lg                         e.g., "1024px"
  xl                         e.g., "1280px"
  2xl                        e.g., "1536px"

container:
  max_width                  e.g., "1320px"
  padding_desktop            e.g., "64px"
  padding_tablet             e.g., "40px"
  padding_mobile             e.g., "20px"

section_spacing:
  vertical_desktop           e.g., "96px"
  vertical_tablet            e.g., "72px"
  vertical_mobile            e.g., "48px"

grid:
  columns_desktop            12
  columns_tablet             8
  columns_mobile             4
  gap_desktop                e.g., "32px"
  gap_tablet                 e.g., "24px"
  gap_mobile                 e.g., "16px"

reading_line_length          e.g., "72ch"

spacing_scale:
  1                          e.g., "4px"
  2                          e.g., "8px"
  3                          e.g., "12px"
  4                          e.g., "16px"
  6                          e.g., "24px"
  8                          e.g., "32px"
  10                         e.g., "40px"
  12                         e.g., "48px"
  16                         e.g., "64px"
  20                         e.g., "80px"
  24                         e.g., "96px"
```

---

## Part 6: CMS-Style Structure

### 6.1 Content Editing Model

The data layer is designed to work with three different operator profiles:

**Profile A — File-based editing (developer/technical owner)**  
Directly edits JSON and Markdown files. Full control. Requires knowledge of the schema but not the template code.

**Profile B — Headless CMS (content team)**  
A headless CMS (Contentful, Sanity, Prismic, or similar) is configured to match the data schema. Editors use a visual UI that writes to the same JSON shapes. The template consumes data via the CMS API or static export.

**Profile C — Admin panel (future)**  
A lightweight admin UI built on top of the data layer, designed for non-technical business owners to edit their identity, hours, and copy without any file access.

All three profiles write to the same data shape. The template has no knowledge of which profile is operating.

### 6.2 Content Relationships Map

The following diagram shows how data files reference each other:

```
identity.json ──────────────────────────────────────────────┐
contact.json  ──────────────────────────────────────────────┤
hours.json    ──────────────────────────────────────────────┤
social.json   ──────────────────────────────────────────────┤
team.json     ────────────────────────────────────────────► │
                                                             ▼
home.json ─────────► hero.json           ──────────────► RENDERED
                 └─► cta.json            ──────────────►   PAGE
                 └─► features.json       ──────────────►
                 └─► values.json         ──────────────►
                 └─► testimonials.json   ──────────────►
                 └─► newsletter.json     ──────────────►

services.json ─────► spaces.json         ──────────────► SERVICE PAGE
              └────► rooms.json          ──────────────► ROOM PAGE
              └────► features.json       ──────────────►
              └────► cta.json            ──────────────►

story.json ────────► team.json           ──────────────► STORY PAGE
           └───────► story.md            ──────────────►

contact.json ──────► social.json         ──────────────► CONTACT PAGE
             └─────► hours.json          ──────────────►

ALL PAGES ─────────► newsletter.json     ──────────────► FOOTER SECTION
          └────────► cta.json            ──────────────► PRE-FOOTER CTA
          └────────► site.config.json    ──────────────► META / SEO
```

### 6.3 Content Validation Rules

Each data file should enforce schema validation at the application layer:

**Required field enforcement:** Fields marked as required in the schema must be non-empty strings or valid values. The application should surface a build-time warning (or CMS validation error) for any missing required field.

**Reference integrity:** Any `_ref` field (e.g., `image_ref`, `cta_ref`, `member_ref`) must point to a file or entry that exists. A broken reference should produce a clear, labeled error state, never a silent crash.

**Slug uniqueness:** All `slug` fields within the same array must be unique. Cross-file slugs used for references must be consistent.

**Image alt text policy:** Every image reference must include a corresponding `alt_text` field. Empty `alt_text` is permitted only for explicitly decorative images, where it should be an empty string (not absent).

**Boolean defaults:** All Boolean flags must have explicit `true` or `false` values — no absent booleans interpreted as false.

---

## Part 7: Section-by-Section Content Editability Map

This table defines, for every major section of the template, what is editable, what is configurable, and what is structural.

---

### Pre-Header Brand Bar

| Layer | Content |
|---|---|
| **Editable** | Tagline text, visibility toggle (via banners.json or features.config) |
| **Configurable** | Background color (token), font size, padding |
| **Structural** | Single-line bar layout, rendering logic |

---

### Primary Navigation

| Layer | Content |
|---|---|
| **Editable** | Link labels, URLs, order, show/hide per item (navigation.config.json) |
| **Configurable** | Sticky behavior, transparency mode, mobile menu content sections |
| **Structural** | Horizontal layout, mobile overlay pattern, active state logic, keyboard navigation |

---

### Hero Section

| Layer | Content |
|---|---|
| **Editable** | Eyebrow text, headline, headline emphasis portion, subheadline, image array with alt texts, CTA reference, text position preference |
| **Configurable** | Image crossfade timing, overlay opacity, text alignment, CTA button style |
| **Structural** | Slideshow rendering engine, image preloading, accessibility attributes, viewport height behavior |

---

### About / Mission Section

| Layer | Content |
|---|---|
| **Editable** | Section heading, body paragraphs (array), show/hide toggle |
| **Configurable** | Column width of text block, section background |
| **Structural** | Single-column centered reading layout |

---

### Services Card Grid

| Layer | Content |
|---|---|
| **Editable** | Service names, card taglines, CTA text per card, card images with alt text |
| **Configurable** | Grid column count (2 or 3), card image aspect ratio, CTA style |
| **Structural** | Card layout (image → heading → body → CTA), hover state behavior, responsive stacking |

---

### Why Choose / Features Section

| Layer | Content |
|---|---|
| **Editable** | Section heading, intro text, feature labels, descriptors, body text, icon assignments |
| **Configurable** | Grid columns, icon size, whether body text is shown or truncated |
| **Structural** | Icon-grid layout, feature block template (icon → label → descriptor → body) |

---

### Values Section

| Layer | Content |
|---|---|
| **Editable** | Section heading, subheading, value labels, value descriptions, icon assignments |
| **Configurable** | Grid columns, icon display style |
| **Structural** | Same icon-grid component as features, potentially in a visually distinct section style (configurable background token) |

---

### Service Page Hero / Header

| Layer | Content |
|---|---|
| **Editable** | H1, subtitle/descriptor, intro paragraph, hero image with alt |
| **Configurable** | Image overlay opacity, header height variant ("tall" | "standard" | "minimal") |
| **Structural** | Layout pattern (text block over or beside image), heading hierarchy |

---

### Quick Navigation Bar

| Layer | Content |
|---|---|
| **Editable** | Anchor link labels, anchor IDs (defined in page config) |
| **Configurable** | Prefix symbol (e.g., "→"), show/hide per page |
| **Structural** | Horizontal inline list, smooth-scroll behavior |

---

### Space / Room Cards

| Layer | Content |
|---|---|
| **Editable** | Name, capacity label, area display, spec items with icons, description, gallery images with alt texts, gallery trigger label |
| **Configurable** | Card image aspect ratio, spec list icon size, number of specs shown before truncation |
| **Structural** | Card anatomy (image → name → capacity → specs → description → trigger), gallery trigger interaction |

---

### Lightbox Gallery

| Layer | Content |
|---|---|
| **Editable** | All gallery images (paths + alt texts + captions) per space/room |
| **Configurable** | Thumbnail strip on/off, counter format ("01 / 10" or "1 of 10"), animation type |
| **Structural** | Modal overlay, keyboard navigation, slide counter, close behavior, focus trapping |

---

### One-Price Concept Section

| Layer | Content |
|---|---|
| **Editable** | Heading, body explanation, inclusions sub-heading, inclusions body, catering note |
| **Configurable** | Section background variant, optional supporting image |
| **Structural** | Layout (text-dominant, single column or two-column with image) |

---

### Technologies Grid

| Layer | Content |
|---|---|
| **Editable** | Technology labels, sub-descriptors, icons, disclaimer text below grid |
| **Configurable** | Column count, icon size, whether disclaimer note is shown |
| **Structural** | Same Feature Block component with compact variant |

---

### Amenities Grid

| Layer | Content |
|---|---|
| **Editable** | Amenity labels, description body text, icons |
| **Configurable** | Variant: compact (label + descriptor) vs. expanded (label + body paragraph) |
| **Structural** | Same Feature Block component, different variant |

---

### What's Included (Accommodation)

| Layer | Content |
|---|---|
| **Editable** | Section heading, item labels, item descriptions, icons |
| **Configurable** | Number of columns, use compact or expanded variant |
| **Structural** | Feature Block component reused |

---

### Event Setup / Capabilities Section

| Layer | Content |
|---|---|
| **Editable** | Section heading, intro, capability item text, icons |
| **Configurable** | List vs. grid layout, show/hide tailored-proposals sub-section |
| **Structural** | Feature list/grid component |

---

### Story / Timeline Chapters

| Layer | Content |
|---|---|
| **Editable** | Chapter headings with optional year labels, body text (in Markdown file), supporting images with alt texts, chapter order |
| **Configurable** | Image position (left/right/below), animation on scroll-reveal |
| **Structural** | Chapter template, alternating or stacked layout, scroll-in reveal mechanism |

---

### Founder / Team Signature Block

| Layer | Content |
|---|---|
| **Editable** | Heading, body text, name, title, closing salutation — all via team.json |
| **Configurable** | Show/hide portrait image, show/hide on specific pages |
| **Structural** | Signature block layout (body → salutation → name → title) |

---

### Practical Info Blocks

| Layer | Content |
|---|---|
| **Editable** | Block heading, body content (paragraph, list, or distance table), icon, optional note text |
| **Configurable** | Block order, which blocks are shown, icon size |
| **Structural** | Info block layout (icon → heading → content), list formatting |

---

### Pre-Footer CTA Section

| Layer | Content |
|---|---|
| **Editable** | Heading, body sentence, button text, button URL |
| **Configurable** | Section background, button style variant, show/hide divider above |
| **Structural** | Centered single-column layout; appears at a fixed position before the newsletter section on every page |

---

### Newsletter Section

| Layer | Content |
|---|---|
| **Editable** | Heading, subheading, input placeholder, submit label, GDPR consent text, success/error messages |
| **Configurable** | Section background, show/hide per page override |
| **Structural** | Form layout, async submit behavior, loading state, GDPR checkbox logic |

---

### Contact Form

| Layer | Content |
|---|---|
| **Editable** | All field labels, placeholders, radio options, submit label, consent text, success and error messages |
| **Configurable** | Which fields are shown/required, field order, file upload on/off, max file size |
| **Structural** | Form markup, validation logic, submission handler, file upload component |

---

### Footer

| Layer | Content |
|---|---|
| **Editable** | Company name, address, VAT, email, phone, social links (all from identity.json, contact.json, social.json) |
| **Configurable** | Column layout (2-column / 3-column), which social platforms to show, legal bar content |
| **Structural** | Column grid layout, link rendering, copyright year auto-generation, design credit attribution |

---

## Part 8: Template Cloning Workflow

To transform this template into a completely different business, a new operator:

**1. Updates `/data/business/`**
— Sets their own name, tagline, address, phone, email, hours, social links, and team members. Every reference to the business identity across the site updates automatically.

**2. Replaces `/media/images/brand/`**
— Drops in their logo SVG variants and a default OG image. The template's logo component references these by convention (`logo.svg`, `logo-dark.svg`).

**3. Replaces `/media/images/hero/`**
— Uploads their hero slideshow images. Updates `home.json` hero section `slideshow_images` array with the paths and alt texts.

**4. Edits `/data/pages/`**
— Updates page copy, section headings, and intro paragraphs. Adds their service types in `services.json`. Replaces space/room data in `spaces.json` and `rooms.json`.

**5. Edits `/data/components/`**
— Updates feature groups, values, testimonials, CTA blocks, and newsletter copy to match their voice.

**6. Configures `/config/features.config.json`**
— Enables or disables sections irrelevant to their business type (e.g., a restaurant without accommodation turns off `rooms`, turns on `menu`).

**7. Sets their theme in `/themes/`**
— Updates color tokens, typography choices, and spacing to match their visual identity.

**8. Adds `/content/pages/story.md`**
— Writes their own origin narrative in Markdown. The story page template renders it through the same chapter structure automatically.

At the end of this process, the website is a completely different brand. No structural file has been modified. The template engine, interaction system, component scaffolding, accessibility patterns, and responsive behavior are all inherited unchanged.

---

*End of Content Architecture Specification*

---

**Version:** 1.0  
**Derived from:** GROVEside® UX Specification (June 2026)  
**Scope:** All sections, components, and data concerns visible across the full GROVEside website.  
**Out of scope:** Implementation technology selection, build tooling, CMS vendor selection, hosting infrastructure.
