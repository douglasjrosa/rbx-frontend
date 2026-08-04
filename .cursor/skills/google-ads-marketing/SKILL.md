---
name: google-ads-marketing
description: >-
  Plans, structures, and optimizes Google Ads campaigns for strong ROI using
  Smart Bidding, conversion tracking, Search, Performance Max, Demand Gen, and
  disciplined account operations. Use when the user asks about Google Ads
  marketing strategy, campaign setup, bidding, ROAS/CPA targets, keywords,
  creatives, audiences, negatives, lead gen or ecommerce ads performance, or
  account optimization cadence.
---

# Google Ads Marketing (ROI)

Strategic playbook for building and running Google Ads accounts that maximize
return. Prefer architecture, clean measurement, and constrained AI inputs over
manual micro-management.

For campaign-type details, see [campaign-types.md](campaign-types.md).
For operating cadence and math, see [roi-playbook.md](roi-playbook.md).

## Non-negotiables (do these first)

1. **Define the business KPI** — lead cost, qualified-lead cost, ROAS, or
   profit. Ads targets must map to that KPI, not vanity metrics.
2. **Fix measurement before spend** — primary vs secondary conversions,
   values where possible, Enhanced Conversions, Consent Mode, offline imports
   for post-click sales/leads.
3. **Feed Smart Bidding enough volume** — aim for ~30+ conversions / month /
   campaign (15+ account minimum for value bidding). Consolidate if needed.
4. **One meaningful change per learning window** — avoid daily structural
   resets.

## Account architecture (AI era)

| Do | Don't |
|----|--------|
| Theme-based campaigns / ad groups | SKAGs / extreme fragmentation |
| Broad match + Smart Bidding + negatives | Exact-only "control" as default |
| Portfolio strategies for similar goals | Shared budgets across mismatched campaigns |
| Audience **signals** (hints) | Treating audiences as hard fences on PMax |
| Fill RSA / asset slots with quality | Thin creatives + heavy pinning |

**Power Pack (typical stack):**

- **Search** — high-intent demand capture (brand + non-brand separated).
- **Performance Max** — multi-channel reach; fence brand/core queries with
  negatives / brand exclusions when Search owns them.
- **Demand Gen** — YouTube / Discover / Gmail demand creation when upper funnel
  matters.

## Bidding for ROI

Match strategy to objective:

| Goal | Strategy |
|------|----------|
| Traffic / learning | Maximize Clicks (temporary) |
| Equal-value leads | Maximize Conversions → then Target CPA |
| Revenue / profit | Maximize Conversion Value → then Target ROAS |

**Launch sequence:**

1. Start **without** tCPA/tROAS for 2–4 weeks (or 1–2 conversion cycles).
2. Set initial target from **last ~4 weeks actuals**, not aspirations.
3. Adjust targets by **10–20%** max; wait 1–2 conversion cycles.
4. Keep budgets unconstrained enough for the target (daily budget ≈ **3× CPA**
   when volume is the bottleneck).
5. Do not stack manual CPC limits / heavy bid modifiers on Smart Bidding.

**ROAS target (percent):** historical `conversion_value / cost × 100`.

## Conversion hierarchy

- **Primary (biddable):** purchase, qualified lead, booked call, WhatsApp
  contact if that is the true sales start — only actions worth optimizing.
- **Secondary (observe):** form start, key page view — useful for diagnostics,
  not for Smart Bidding unless volume is too low.
- **Lead gen low volume:** temporarily bid to a high-intent micro-conversion,
  then import offline qualified outcomes so the model learns quality.
- **Values:** prefer real revenue or lead scores; at least two distinct
  non-zero values before value-based bidding.

## Creative and relevance

- RSAs: up to **15 headlines / 4 descriptions**; each line must stand alone.
- Include offer, proof, CTA, and keyword themes across assets.
- Pin only for compliance/brand.
- Landing pages: fast, mobile-first, message-match to ad, clear next step.
- eCommerce: feed quality (titles, images, price, availability, custom labels)
  often beats ad copy tweaks.

## Negatives and query hygiene

Layer negatives:

1. Account — never-relevant (jobs, DIY, wrong industry).
2. Campaign — brand vs non-brand / channel fencing.
3. Ad group — rare fine-tuning only.

Review search terms weekly; expect privacy-redacted terms — cross-check GA4 /
landing analytics.

## Operating cadence

| Frequency | Focus |
|-----------|--------|
| Daily | Spend pacing, conversion dropouts, broken tracking |
| Weekly | Search terms, negatives, asset underperformers |
| Bi-weekly | Bid targets, budget shifts (±15–20%) |
| Monthly | Structure, funnel, competitive, creative refresh |

## Decision rules for recommendations

When advising or changing an account:

1. State the KPI and break-even math.
2. Check measurement health before recommending bid/budget changes.
3. Prefer consolidation + cleaner goals over more campaigns.
4. Prefer gradual target/budget moves over restructure.
5. Call out learning-phase risk when proposing structural edits.
6. Separate brand vs non-brand and Search vs PMax ownership clearly.

## Anti-patterns

- Optimizing to form fills when sales close offline (no quality feedback).
- Aggressive tROAS/tCPA that kills volume.
- Multiple starved PMax campaigns instead of one learning campaign.
- Daily bid/keyword churn.
- Counting all micro-events as primary conversions.
- Ignoring landing page and offer while tuning bids.

## Project context (Ribermax)

This repo is a lead-gen / contact site. Primary conversion work already centers
on GA4 `whatsapp_click` imported into Ads. Prefer contact/qualified-lead KPIs
over ecommerce ROAS unless the business model changes. Coordinate API setup
with the `google-ads-api` skill and `scripts/google-ads/`.
