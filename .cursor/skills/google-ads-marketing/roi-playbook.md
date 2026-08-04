# ROI playbook

## Break-even math

Define before launching:

```
break_even_cpa = gross_profit_per_sale * close_rate
# or for ecommerce:
break_even_roas = 1 / margin_fraction
# e.g. 40% margin → break-even ROAS = 2.5 (250%)
```

Ads targets should leave room for overhead (tools, creative, failed leads).

Example lead gen:

- Average sale profit: R$ 2_000
- Close rate from WhatsApp chat: 10%
- Max CPA for WhatsApp start ≈ R$ 200 before overhead
- Target CPA might start at historical actual, then move toward profitable CPA

## Learning phase discipline

Triggers that reset or disturb learning:

- Large bid strategy changes
- Big budget swings (>~20%)
- Conversion goal changes
- Heavy creative/structure rewrites

After a change: wait **1–2 conversion cycles** (often 7–14+ days) before
judging. Use bid strategy reports and longer windows; exclude immature recent
days when conversion lag is high.

## Measurement checklist

- [ ] Primary conversions only = business outcomes
- [ ] Enhanced Conversions enabled and verified
- [ ] Consent Mode configured correctly
- [ ] GA4 linked; key events marked; Ads import healthy
- [ ] Duplicate counting avoided (Ads tag + GA4 import overlap)
- [ ] Offline / CRM import for qualified stages (when sales close later)
- [ ] Conversion values non-zero and differentiated for value bidding
- [ ] Diagnostics reviewed after site or tag deploys

## Budget allocation

1. Fund proven brand Search enough to cover query volume.
2. Fund non-brand Search to CPA/ROAS target.
3. Add PMax only when tracking is clean and Search baselines exist (or when
   catalog/feed is the main surface).
4. Scale winners with **gradual** budget increases; cut losers after a full
   learning window, not after one bad day.
5. Prefer portfolio bidding across campaigns with the **same** KPI.

## Weekly optimization loop

1. Confirm tracking (conversions ≈ expected site/CRM events).
2. Pull search terms → add negatives / new themes.
3. Check wasted spend by campaign (high cost, zero conversions).
4. Review asset/RSA coverage and “low” rated assets.
5. Compare actual CPA/ROAS vs target; nudge ±10–20% if stable.
6. Note seasonality / promo calendar for next bid adjustments.

## Monthly strategic review

- Funnel: impression share lost (budget/rank), quality of leads, close rate.
- Structure: merge starved campaigns; split only with clear intent/margin
  differences.
- Creative: refresh fatigued assets; new angles/offers.
- Competitive: auction insights, category CPC shifts.
- Incrementality: brand vs non-brand; Search vs PMax overlap.

## Diagnostics when ROI is poor

| Symptom | Likely cause | First fix |
|---------|--------------|-----------|
| High spend, few conversions | Tracking, offer, landing, irrelevant queries | Verify tags; tighten negatives; fix LP |
| Good CPA, tiny volume | Target too tight / budget low | Lower tCPA or raise budget gradually |
| Volume OK, bad lead quality | Optimizing wrong conversion | Primary = qualified; offline import |
| ROAS volatile | Thin data / over-segmentation | Consolidate; longer eval window |
| PMax eats brand | No fencing | Brand exclusions / negatives; own brand on Search |
| Learning never ends | Constant edits | Freeze structure 2–4 weeks |

## Experimentation

- Prefer Google Ads **experiments** (or draft experiments) over silent mid-flight
  rewrites.
- One hypothesis per test (bid target, creative theme, landing).
- Pre-register success metric and minimum runtime (conversion cycles).
- Do not run overlapping tests on the same budget pool.
