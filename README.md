# VRV Global — Corporate Website

A premium, **sustainability-led, investor-ready** marketing website for **VRV Global** (VRV Global Pte. Ltd.) — *a sustainable global supply chain integrator connecting agro commodities, industrial metals, recycled materials and circular economy products with traceability, responsible sourcing, ESG and long-term value creation.*

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. White/off-white premium base with a forest-**green** primary, ocean-**blue** secondary and warm **amber/orange** accents.

---

## 1. Run locally

```bash
cd vrv-global
npm install        # already installed in this workspace
npm run dev        # http://localhost:3000  (development)
# or a production build:
npm run build && npm run start
```

Requires Node 18.18+ (tested on Node 24). No environment variables are needed to run — the **dynamic integrations run on mock/indicative data out of the box**.

### Dynamic integrations (LinkedIn auto-fetch + live commodity prices)
The **News, Insights & Market Intelligence** section is powered by two backend integrations — a LinkedIn company-post sync with an admin approval workflow, and a modular commodity-price provider system (SGX/SICOM, LME, licensed vendor, or manual). Admin console at **`/admin`** (noindex; sign in with `CRON_SECRET`). Copy `.env.example` → `.env.local` to connect real APIs. **Full guide: [INTEGRATIONS.md](INTEGRATIONS.md).**

---

## 2. Site map (pages)

| Route | Page |
|---|---|
| `/` | Home (9-section flow: hero → pillars → product ecosystem → impact & innovation → case study → investor highlights → technology → news → CTA) |
| `/about` | About Us — mission, vision, story, values, **Leadership** (`#leadership`), **Milestones** (`#milestones`) |
| `/products` | Products landing — Agro (`#agro`), Metals (`#metals`), Circular Economy (`#circular`) + testimonials |
| `/products/[slug]` | 11 product detail pages (grades sliders, use cases, sustainability angle, sourcing, specs) |
| `/sustainability` | ESG strategy, **E/S/G pillars** (`#environment` `#social` `#governance`), framework, circular loop, **Reports** (`#reports`), supplier code, FAQ |
| `/technology` | Technology & Traceability — capabilities, architecture diagram, roadmap |
| `/investors` | Investor Relations — highlights, market opportunity, growth, **Governance** (`#governance`), downloads, **Request form** (`#request`) |
| `/news` + `/news/[slug]` | News & Insights listing + 8 article pages |
| `/careers` | Careers — culture, openings, résumé form |
| `/contact` | Contact — office details, department-routed form, map placeholder |
| `/privacy`, `/terms` | Legal pages |
| `/sitemap.xml`, `/robots.txt` | Auto-generated SEO infra |

Navigation is a sticky header with a grouped **mega-menu** (Company · Products · Sustainability · Technology · Investor Relations · News · Contact) and two CTAs (**Investor Relations**, **Contact Us**). Fully responsive with a mobile drawer.

---

## 3. Project structure

```
app/                 # routes (server components + per-page SEO metadata)
components/
  layout/            # Header (mega-menu), Footer, Logo, Breadcrumbs
  sections/          # EcoHero, ProductEcosystem, ESGPillars, CircularLoop,
                     # TraceabilityFlow, Timeline, PageHero
  ui/                # Section, Button, Card, FeatureCard/KPIGrid, Icon,
                     # Media, TickList, Reveal (Framer Motion), Container
  forms/             # Fields, ContactForm, InvestorRequestForm, ResumeForm,
                     # NewsletterForm   (all client components with validation)
lib/                 # single source of truth for all content & config
  site.ts            # company facts, contact, keywords, hero trust points
  products.ts        # 11 products in 3 categories + category metadata
  leadership.ts      # leaders, milestones, values
  esg.ts             # ESG pillars, metrics, framework, reports, supplier code
  investors.ts       # highlights, KPIs, market, governance topics, documents
  news.ts            # articles + categories
  images.ts          # curated royalty-free image registry (Unsplash)
  nav.ts             # mega-menu + footer navigation
  seo.ts             # pageMeta() helper + Organization JSON-LD
```

### Design system
Tokens are **semantic** and live in [`tailwind.config.ts`](tailwind.config.ts): `brand` (green), `ocean` (blue), `gold`/`amber`, `flame` (orange CTA), `ink`, `paper`, `line`. **Re-theme the entire site by editing those hex values** — every component references the tokens, not raw colours.

---

## 4. SEO

- Per-page `title` / `description` / canonical / OpenGraph / Twitter via `pageMeta()`.
- Semantic HTML, H1/H2/H3 hierarchy, breadcrumbs with **BreadcrumbList** schema.
- JSON-LD: **Organization** (site-wide), **Product** + **Brand** (product pages), **BlogPosting** (articles), **FAQPage** (sustainability), **ContactPoint** (investors/contact), **ItemList** (listings).
- `sitemap.xml`, `robots.txt`, lazy-loaded images, mobile-first responsive layout, `prefers-reduced-motion` respected.
- Target keywords (sustainable supply chain, responsible sourcing, material traceability, circular economy, recycled metals, ESG investing…) are woven into copy and metadata; the bank lives in `lib/site.ts`.

---

## 5. ⚠️ Replace before publishing (placeholders)

All placeholders are **visible on purpose** so editors can find them. Search the repo for `[Editable`, `[Upload`, `[Replace`, `[Roadmap`.

| What | Where |
|---|---|
| Company metrics / KPI numbers | `lib/site.ts` (`proofPoints`), `lib/esg.ts` (`esgMetrics`), `lib/investors.ts` (`investorKpis`) — shown as `[Editable: …]` |
| Leadership — bios & some titles | `data/leadershipTeam.ts` (`founder` + `leadershipTeam`) — real **names & titles** from the VRV team page; **bios are `[Approved bio to be added]`**. Image TODOs: Yasuswini → mapped to the "Wini" photo (confirm); Raghu (Projects) & "Sathiya" (Director) have no photo → initials fallback (confirm if duplicate) |
| Journey milestones | `data/journey.ts` (`journeyMilestones`) — the real 2012→2025 milestones (order-book figures as provided) |
| Company stats | `data/companyStats.ts` — 2012 / 15+ / 200k+ / 20% (used on Home globe + About) |
| Product divisions | `data/productDivisions.ts` — division copy + product lists; natural-rubber grades are editable |
| Milestones (2014+ details) | `lib/leadership.ts` (`milestones`) |
| Product specs / certifications / packaging | `lib/products.ts` — `[Editable: …]` grade-level details |
| ESG / Sustainability / Governance report PDFs | `lib/esg.ts` (`reports`), `lib/investors.ts` (`investorDocs`) — wire the “Download” buttons to real PDFs |
| Client testimonials | `app/products/page.tsx` — `[Replace with approved client testimonial]` |
| News article bodies | `app/news/[slug]/page.tsx` — on-topic scaffolding marked `[Editable: replace with the full approved article.]` |
| Contact / phone / address | `lib/site.ts` (`address`, `phone`, `email`, `investorEmail`) — **verify** |
| Map embed | `app/contact/page.tsx` — replace the placeholder box with a Google Maps iframe |
| Privacy / Terms text | `app/privacy/page.tsx`, `app/terms/page.tsx` — **have legal counsel review** |
| Images | `lib/images.ts` — swap Unsplash URLs for VRV’s own licensed photography (keep the keys) |
| Logo | `components/layout/Logo.tsx` — replace the wordmark with a supplied SVG |

### Local team & journey photography
The **About** page uses VRV Global's **own approved photos**, not stock:
- Source originals live in `pictures/` (git-ignored — too large to commit). They were optimised with `sips` into web-sized JPEGs under **`public/pictures/`**: `team/` (one portrait per person, ~50–90 KB), `about/` (group photos), `journey/` (`2023.jpg`, `2024.jpg`).
- The image→section map and all editable text live in **`data/companyImages.ts`** (`leadershipImages`, `journeyImages`, `aboutGroupImages`). Used by `components/sections/LeadershipCard.tsx` (premium profile cards with initials fallback — e.g. *Raghu*, who had no photo) and `JourneyGallery.tsx`.
- **Names are real** (from the photo folders); **designations & bios are `[Editable]`** placeholders — do not publish without approved profiles. To add a portrait, drop a web-sized JPEG in `public/pictures/team/` and point its `image` field there.
- Re-optimise originals anytime: `sips -Z 1100 -s format jpeg -s formatOptions 78 input.jpg --out public/pictures/team/name.jpg`.

### Global trade maps (two WebGL experiences)
Two distinct, premium maps share one data source (**`data/commodityNetwork.ts`** — the exact `commodityCountries` + `temporaryCommodityRoutes`). Both show **every country as an individual marker** (no hubs), keep Singapore as the **HQ marker, not the mandatory routing hub**, show only a **few temporary links at a time**, and carry the illustrative-routes disclaimer.

- **Homepage — cinematic 3D globe** (`react-globe.gl` / three.js). Slow auto-rotation, soft country points, a gold **Singapore HQ with a pulse ring**, and **3–5 temporary arcs** that cycle (dash-animated, ~4.5s). Hover a country for a name/role label; click to focus its related arcs. Rendered on a dark section for an emotional, premium feel. `components/map/globe/`.
- **Commodities page** (`#footprint`) **— analytical 2D map** (`deck.gl` **ArcLayer** + **MapLibre GL**, CARTO Positron basemap, no token). All markers shown; **Agro / Metals / Combined Network** tabs; clean default (a few cycling arcs); **hover tooltip**; **click a country (or a list item) → only its related routes**; a side panel with business copy, the country list and a country-detail view. `components/map/deck/`.
- Both load via `next/dynamic({ ssr: false })` (WebGL needs the browser), so the page shells stay light (~140 kB first load) and the map chunks load on demand. **`prefers-reduced-motion`** disables the globe's auto-rotation and arc animation. Shared bits: `useRouteCycle` (route cycler), `MapFilters`. Colours: green = agro, blue = metals, gold = HQ, purple = multiple roles.
- **Network at runtime**: the globe fetches earth textures from the three-globe CDN and MapLibre fetches the CARTO style/tiles — both free and keyless. Swap the globe `globeImageUrl`/CARTO `MAP_STYLE` for self-hosted assets, or add a Mapbox token, if you prefer no third-party calls.

### Notes
- **Forms are demo-only.** `ContactForm`, `InvestorRequestForm`, `ResumeForm`, `NewsletterForm` validate client-side and show success states but do **not** send anything — connect them to your CRM / email service / ATS / ESP before launch.
- The InvestorRequestForm warns (non-blocking) when a **free email domain** is used and requires a **consent** checkbox.
- **Capital-markets language:** any public-market ambition is intentionally phrased only as *“future listing readiness / capital-markets roadmap”* with an offer/solicitation disclaimer. Do not change to firm listing claims without approved wording.
- Image hosts are allow-listed in `next.config.mjs` (`images.remotePatterns`); add your CDN there if you move images.

## Design Feedback tracker (`/design-feedback`)

Internal tool for logging website design feedback (Pending / Completed). Storage
is **Vercel KV (Upstash Redis)** so changes persist across requests and
deployments — filesystem writes are **not** durable on serverless.

- Data lives in KV under the key `vrv:design-feedback` (a JSON array).
- API: `GET`/`POST /api/design-feedback`, `PATCH /api/design-feedback/[id]`.
- **Export as Markdown** generates the Markdown in the browser for download
  (nothing is written to the deployed filesystem).
- Optional gate: set `DESIGN_FEEDBACK_PASSWORD` to require a password; leave
  empty for open access (local dev is never blocked).

### Enable KV on Vercel
1. Vercel project dashboard → **Storage**.
2. **Create Database** → **KV**.
3. **Connect** it to this project.
4. Vercel injects `KV_REST_API_URL` / `KV_REST_API_TOKEN` automatically.
5. **Redeploy**.

Locally, if no KV env vars are set, an in-memory fallback is used (resets on dev
server restart) so the page still works without external setup.
