---
name: google-ads-api
description: >-
  Builds and operates against the official Google Ads API using resources,
  mutate services, GAQL via GoogleAdsService, conversions, bidding, assets,
  and BatchJobService. Use when writing or debugging google-ads-api Node
  scripts, OAuth/developer token setup, GAQL queries, campaign/ad/conversion
  mutates, validate_only flows, or anything under scripts/google-ads/.
---

# Google Ads API

Official Google Ads API guidance for this repo. Prefer the Node client
`google-ads-api` already in `devDependencies`, and the helpers under
`scripts/google-ads/`.

For service catalog depth, see [resources-services.md](resources-services.md).
For local scripts and env, see [project-scripts.md](project-scripts.md).

Official docs: https://developers.google.com/google-ads/api/docs/start

## When to use the API vs alternatives

| Need | Prefer |
|------|--------|
| Custom automation, inventory sync, conversion ops | **Google Ads API** |
| One-off account tweaks without infra | UI / Editor / bulk upload |
| In-account JS automation | Google Ads Scripts |
| Analytics warehouse pull | BigQuery Data Transfer |

## Core model

```
Customer
  └── Campaign (+ CampaignBudget, CampaignCriterion, assets)
        └── AdGroup (+ AdGroupCriterion)
              └── AdGroupAd
```

**Performance Max** replaces AdGroups with **Asset Groups** + assets + signals.
Do not query `ad_group` / `ad_group_ad` for PMax metrics.

Every entity has a `resource_name`, e.g.
`customers/{customer_id}/campaigns/{campaign_id}`.

Money fields use **micros** (1 unit = 1_000_000 micros).

## Auth (required)

1. Google Cloud OAuth client (Desktop) → Client ID/Secret
2. Ads **developer token** (Explorer+ for production)
3. User with access to the Ads customer; set `login-customer-id` when via MCC
4. Refresh token from OAuth

Never commit tokens. Local files: `.env.google-ads.local`,
`scripts/google-ads/.tokens.json` (gitignored).

## Three service patterns

1. **Mutate** — resource `*Service.Mutate*` (create/update/remove).
2. **Read / report** — `GoogleAdsService` Search / SearchStream + **GAQL**.
3. **Metadata** — `GoogleAdsFieldService` for field compatibility.

Also: `GoogleAdsService.Mutate` for **atomic multi-resource** ops + **temp
resource names** (`.../-1`, `.../-2`, …). `BatchJobService` for async bulk.

Always prefer `validate_only: true` before production mutates.

## Campaign types (`AdvertisingChannelType`)

| Type | Structure | API write notes |
|------|-----------|-----------------|
| SEARCH | Ad groups + RSAs + keywords | Full |
| DISPLAY | Ad groups + ads/assets | Full |
| PERFORMANCE_MAX | Asset groups + assets | Full; no network opt-out |
| DEMAND_GEN | Ad groups + channel controls | Full |
| SHOPPING / TRAVEL / HOTEL / LOCAL / LOCAL_SERVICES / MULTI_CHANNEL / SMART | Specialized | Follow type guides |
| VIDEO | Reporting widely; some legacy types read-only | Prefer PMax / Demand Gen for create |

API has **no UI "objective"** field — assemble type + bidding + conversion goals.

## Bidding (campaign union)

Common strategies: MaximizeClicks, MaximizeConversions (+ optional target CPA),
MaximizeConversionValue (+ optional target ROAS), TargetImpressionShare,
Manual CPC / CPM (where supported), portfolio `BiddingStrategy` resource.

Attach via campaign `campaign_bidding_strategy` oneof or portfolio resource name.

## Criteria and assets

- **CampaignCriterion / AdGroupCriterion**: keywords, locations, languages,
  demographics, audiences, negatives, device, etc.
- **Assets**: sitelinks, callouts, images, logos, videos, call, structured
  snippets — linked at customer / campaign / ad group (or asset group for PMax).
- **SharedSet / SharedCriterion**: shared negatives and lists.
- **UserList / OfflineUserDataJob / UserDataService**: Customer Match & audiences.

## Conversions (critical for ROI automation)

| Task | Service / approach |
|------|--------------------|
| CRUD conversion actions | `ConversionActionService` |
| Upload offline clicks / enhanced leads | `ConversionUploadService` |
| Adjust conversions | `ConversionAdjustmentUploadService` |
| Value rules / custom vars | `ConversionValueRule*` / `ConversionCustomVariableService` |
| Goals | `CustomerConversionGoalService`, `CampaignConversionGoalService`, `CustomConversionGoalService` |
| GA4 import actions | `ConversionAction` type `GOOGLE_ANALYTICS_4_*` |

In this project, WhatsApp contact is a **WEBPAGE** conversion action named
`whatsapp_click` (not GA4-imported — API cannot create GA4 types). See
`scripts/google-ads/create-whatsapp-click-conversion.mjs` and
`lib/analytics/google-ads-conversion.ts`.

## GAQL essentials

```sql
SELECT
  campaign.id,
  campaign.name,
  campaign.status,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE campaign.status != 'REMOVED'
  AND segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
```

Rules:

- Select only needed fields; use `LIMIT` while developing.
- Filter in `WHERE`; segment metrics carefully (`segments.date`, device, …).
- Check field compatibility with `GoogleAdsFieldService` or the fields docs.
- PMax: report via `campaign` / `asset_group` paths — not standard ad groups.

## Mutate workflow (safe)

1. Query current state (GAQL).
2. Build operations (`create` | `update` + `updateMask` | `remove`).
3. Run with `validate_only: true`.
4. Apply; handle partial failure if enabled.
5. Avoid concurrent mutates on the same resource
   (`CONCURRENT_MODIFICATION_ERROR`).

**Temp names** (same `GoogleAdsService.Mutate` request): create budget as
`customers/CID/campaignBudgets/-1`, then reference it on the campaign create.
Order matters: create before reference. Temp names do not persist across
requests.

## Repo conventions

- Client factory: `scripts/google-ads/lib/client.mjs` → `createAdsCustomer()`.
- Env loader: `scripts/google-ads/lib/load-env.mjs`.
- Default mutates are **dry-run**; require `--apply` for real changes.
- npm scripts: `ads:auth`, `ads:accounts`, `ads:conversions:*`.
- Customer ID digits only (example account `3382955114`).

## Agent rules

1. Read `scripts/google-ads/SETUP.md` before new auth work.
2. Never print or commit secrets / refresh tokens.
3. Prefer extending existing scripts over one-off unsafe mutates.
4. Default to `validate_only` / dry-run; ask before `--apply` on production.
5. Align conversion and bidding changes with the `google-ads-marketing` skill.
6. Use official enums from `google-ads-api` (`enums.*`), not magic numbers.
7. Document customer ID, resource names, and dry-run vs apply in outputs.
