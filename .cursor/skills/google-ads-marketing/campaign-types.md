# Campaign types and when to use them

## Search

**Job:** Capture existing intent on Google Search (and optional partners).

**Use when:** High-intent queries, lead gen, brand defense, measurable CPA.

**Structure:** Campaign → Ad groups by theme → RSAs + keywords + assets.

**Network:** `NetworkSettings` can include/exclude Search Partners / Display
expansion — keep Search focused unless you deliberately want partners.

**Bidding:** Maximize Conversions / tCPA or Maximize Conversion Value / tROAS
after clean tracking.

**Creative:** Full RSA asset coverage; sitelinks, callouts, call, structured
snippets.

## Performance Max (PMax)

**Job:** Maximize conversions/value across Search, Shopping, Display, YouTube,
Discover, Gmail, Maps (automated inventory).

**Use when:** Enough conversion volume, strong creative/feed, multi-channel
growth alongside Search.

**Structure:** Campaign → Asset groups (final URL + asset pool + audience
signals). No classic ad groups/ads.

**Controls:** Brand exclusions, account/campaign negatives (where supported),
listing group filters for retail, search themes as hints — not full network
opt-out.

**Bidding:** Maximize Conversions or Maximize Conversion Value only (Smart
Bidding).

**Guardrails:**

- Daily budget ≈ 3× target CPA when learning.
- One consolidated campaign often beats several starved ones.
- Add brand / core Search terms as negatives or brand exclusions so brand
  Search stays attributed to Search campaigns when desired.
- Do not judge on single days; use week-over-week.

## Demand Gen

**Job:** Create demand on YouTube, Discover, Gmail (and related surfaces) with
stronger channel controls than PMax.

**Use when:** Upper/mid funnel creative works (video, visual), remarketing,
product launches.

**Structure:** Hybrid ad-group model with modern assets and channel controls.

## Display

**Job:** Visual reach/remarketing on the Google Display Network.

**Use when:** Remarketing, awareness with clear frequency/audience control —
usually secondary to Search + PMax for direct ROI.

## Shopping / retail feeds

**Job:** Product listing inventory (often inside PMax or Shopping).

**ROI lever:** Merchant Center feed quality — titles, GTIN, price, availability,
images, custom labels (margin, bestsellers).

## Video

**API note:** Broad reporting support; some legacy video campaign types are
**read-only** in the API. For create/manage via API, prefer **Demand Gen** or
**PMax**.

## App / Local / Hotel / Travel / Local Services / Smart

Specialized verticals. Follow the matching AdvertisingChannelType (+ subtype
when required, e.g. PMax `TRAVEL_GOALS`). Do not force Search patterns onto
these.

## Brand vs non-brand

Always separate:

| Bucket | Role |
|--------|------|
| Brand Search | Protect name; efficient; do not use as proof of prospecting ROI |
| Non-brand Search | True acquisition efficiency |
| PMax / Demand Gen | Incremental reach; monitor cannibalization of brand/Search |

## Lead gen vs ecommerce

| | Lead gen | Ecommerce |
|--|----------|-----------|
| Primary KPI | CPA to qualified lead / sale | ROAS / profit |
| Bidding | Max Conv → tCPA | Max Conv Value → tROAS |
| Values | Offline scores / close rates | Revenue or margin |
| Volume fix | Micro-conversions + offline import | Feed + creative + offer |

## Landing and offer (often bigger than bids)

- Message match to query/ad.
- Sub-3s LCP on mobile when possible.
- Single primary CTA (form, WhatsApp, call).
- Trust: proof, policies, clear pricing/scope when relevant.
- Track the CTA that sales actually uses as primary conversion.
