# VRV Global — Dynamic Content Integrations

Two backend integrations power the **News, Insights & Market Intelligence** section:

1. **LinkedIn company updates** → fetched server-side, stored as drafts, published via an admin approval workflow.
2. **Live commodity prices** → a modular provider system (SGX/SICOM, LME, licensed vendor, or manual) with an indicative fallback.

Everything runs on **mock / indicative sample data out of the box** — no credentials required to see it working. Configure the env vars below to connect real APIs. **No API keys are ever exposed to the browser**: all provider calls happen in server code (`lib/server`, `lib/integrations`, API route handlers) marked with `import "server-only"`.

---

## 1. Setup

```bash
cp .env.example .env.local      # then fill in values you have
npm run dev                     # mock data renders immediately
```

Key env vars (full list in `.env.example`):

| Variable | Purpose |
|---|---|
| `CRON_SECRET` | Protects all sync + admin endpoints. **Required** for cron and the admin console. |
| `LINKEDIN_CLIENT_ID` / `_SECRET` / `_ORGANIZATION_ID` / `_ACCESS_TOKEN` | Official LinkedIn API. If the access token is empty, LinkedIn sync falls back to mock/manual data. |
| `MARKET_DATA_PROVIDER` | `manual` (default) · `sgx` · `lme` · `vendor`. Selects the price provider. |
| `SGX_API_KEY` / `LME_API_KEY` / `MARKET_DATA_VENDOR_API_KEY` (+ `_BASE_URL`) | Licensed market-data feeds. |
| `INTEGRATIONS_ALERT_WEBHOOK` | Optional Slack/Teams webhook for sync-failure alerts. |

---

## 2. Architecture

```
lib/server/            logger · retry/backoff · cache (TTL) · ratelimit · notify · db (file CMS)
lib/integrations/
  linkedin/            types · mock · client (official API) · sync (orchestrator)
  market/              types · mock · disclaimer · sync · providers/{manual,sgx,lme,vendor,index}
  feed.ts              merges editorial articles + approved LinkedIn posts
data/                  news_posts.json · commodity_prices.json   (the "CMS collections")
app/api/
  integrations/linkedin/sync   POST/GET  (CRON_SECRET)   → fetch LinkedIn → drafts
  market-prices                GET       (public, cached, rate-limited)
  market-prices/sync           POST/GET  (CRON_SECRET)   → refresh prices
  news                         GET       (public)         → combined feed
  admin/news                   GET/POST/PATCH (CRON_SECRET) → approve/add posts
  admin/market                 GET/PATCH (CRON_SECRET)      → override/hide prices
app/admin                      Admin console (noindex)
components/market/             MarketSnapshot · Sparkline · MarketDisclaimer
components/news/               NewsExplorer (filters) · LinkedInUpdates
```

**Datastore.** `lib/server/db.ts` is a small file-based JSON store (atomic writes, serialised per collection) standing in for a real database/CMS. It persists on a long-running Node server (`npm start`) and in dev. On read-only/serverless hosting, swap `db.ts` for Prisma/Postgres/Mongo/Supabase/a headless CMS — keep the same async signatures (`getCollection`, `upsert`, `insertMissing`, `patch`, `writeCollection`) and nothing else changes.

---

## 3. LinkedIn integration

- **Do not scrape LinkedIn.** The client uses the official **Community Management API** (`GET /rest/posts?q=author&author=urn:li:organization:{id}`). It needs an approved LinkedIn app, the `r_organization_social` permission, and an org-scoped access token.
- Flow: `syncLinkedIn()` → fetch (or mock) → normalize → `insertMissing` into `news_posts` as **`draft`** (never auto-published, deduped by id) → admin reviews in `/admin` → **publish** → appears on `/news`.
- **Manual fallback** (no API access): in `/admin`, paste a LinkedIn post URL + headline → saved as a draft you can publish. (`POST /api/admin/news`.)
- Post fields: title/headline, excerpt, image, LinkedIn URL, published date, category, tags, `source: "linkedin"`. Each published LinkedIn card shows a **"View on LinkedIn"** CTA.
- To connect the real API: set the four `LINKEDIN_*` vars, then adjust `LinkedIn-Version` and response parsing in `lib/integrations/linkedin/client.ts` to your approved API version (image URNs may need a follow-up asset lookup).

---

## 4. Commodity prices integration

- **Providers** implement one interface (`MarketProvider.fetchPrices()`): `manual` (indicative sample), `sgx` (TSR20/RSS3 rubber — priority as VRV is Singapore-based), `lme` (copper/aluminium/nickel), `vendor` (Refinitiv/LSEG, Bloomberg, Trading Economics, Nasdaq Data Link, etc.). `gatherPrices()` runs the selected provider and backfills uncovered commodities from the indicative set so the snapshot is always complete.
- `syncMarketPrices()` writes to `commodity_prices.json`. **Admin manual overrides are preserved** across syncs (rows with `manualOverride: true` keep their edited price/label), and the `visible` flag always survives.
- Each record carries: name, symbol, category, source, exchange, price, currency, unit, change, change %, timestamp, **data-delay label** (`live` / `delayed` / `indicative` / `manual`), source URL, license note, manual-override flag, visibility, and a `trend[]` sparkline series.
- **UI:** `MarketSnapshot` (client) fetches `/api/market-prices` (keys stay server-side), auto-refreshes, shows a mini trend chart + delayed/live label per card, and degrades gracefully if the feed is down. Placed on Home, Products, Investor Relations, each product detail (filtered by category), and the News "Market Prices" filter.
- **Disclaimer** (`components/market/MarketDisclaimer`, text in `lib/integrations/market/disclaimer.ts`) renders under every price display, plus source attribution + "last updated".
- To connect a real feed: set `MARKET_DATA_PROVIDER` and the matching key, then implement `fetchLive()` in `lib/integrations/market/providers/{sgx,lme,vendor}.ts` (map the vendor response to `CommodityPrice[]`).

> ⚠️ The numbers shipped are **indicative samples**, not live quotes — clearly labelled `indicative`. Do not present them as official market data; connect a licensed feed first.

---

## 5. Admin console — `/admin`

`noindex`. Sign in with `CRON_SECRET`. Two tabs:

- **LinkedIn / News:** list every post with status; **Publish / Draft / Reject**; add a LinkedIn post manually; trigger a LinkedIn sync.
- **Commodity Prices:** show/hide a commodity, change its data-delay label, set a manual price (flags `manualOverride` so syncs won't overwrite it), trigger a price sync.

Put this behind real SSO/auth and IP allow-listing before production — it is intentionally minimal.

---

## 6. Scheduling (cron)

**Vercel** (`vercel.json`, already included): LinkedIn every 12h, prices every 30 min. Set `CRON_SECRET` in project env; Vercel attaches it as the `Authorization` bearer.

**Any other scheduler** (`scripts/cron.mjs`):

```bash
# crontab
0 */12 * * *  cd /app && SITE_URL=https://www.vrvglobal.com CRON_SECRET=xxx node scripts/cron.mjs linkedin
*/30 * * * *  cd /app && SITE_URL=https://www.vrvglobal.com CRON_SECRET=xxx node scripts/cron.mjs market
```

Recommended frequency: rubber/metals every 15–60 min **during market hours** with a licensed feed; otherwise daily or manual. The snapshot always shows a "last updated" timestamp.

---

## 7. Security & resilience checklist

- ✅ API keys in env vars, read **server-side only** (`server-only` guard) — never shipped to the client.
- ✅ Sync + admin routes require `CRON_SECRET` (constant-time compare).
- ✅ Public read routes are **rate-limited** (`lib/server/ratelimit`) and **cached** (`lib/server/cache`, + HTTP `Cache-Control`).
- ✅ **Retry with backoff** + fetch timeouts on upstream calls (`lib/server/retry`).
- ✅ **Graceful fallback** to mock/indicative data when an API is unavailable; UI shows a friendly state.
- ✅ **Error logging** and **admin notification** on sync failure (`lib/server/notify`; optional webhook).
- ✅ Idempotent syncs (dedupe by id; manual overrides preserved).
- ✅ Respect source licensing — endpoints/keys are placeholders you wire to your **approved/licensed** access only.

---

## 8. Quick test (local)

```bash
npm run build && npm start
# public feeds
curl localhost:3000/api/market-prices | jq '.prices[0]'
curl localhost:3000/api/news | jq '.count'
# protected sync (replace SECRET)
curl -X POST localhost:3000/api/market-prices/sync -H "Authorization: Bearer SECRET"
curl -X POST localhost:3000/api/integrations/linkedin/sync -H "Authorization: Bearer SECRET"
# admin console
open http://localhost:3000/admin
```
