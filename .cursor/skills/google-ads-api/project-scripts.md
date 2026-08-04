# Project Google Ads scripts

Local ops tooling for Ribermax Ads. Not part of the Next.js production runtime.

## Layout

```
scripts/google-ads/
  SETUP.md
  .env.google-ads.example
  auth-oauth.mjs
  list-accounts.mjs
  list-conversion-actions.mjs
  remove-conversion-actions.mjs
  create-whatsapp-click-conversion.mjs
  lib/client.mjs
  lib/load-env.mjs
```

Root env file (gitignored): `.env.google-ads.local`  
Tokens file (gitignored): `scripts/google-ads/.tokens.json`

## npm scripts

| Script | Purpose |
|--------|---------|
| `npm run ads:auth` | OAuth loopback → refresh token |
| `npm run ads:accounts` | List accessible customers |
| `npm run ads:conversions:list` | List conversion actions |
| `npm run ads:conversions:remove-legacy` | Dry-run remove; `--apply` to execute |
| `npm run ads:conversions:whatsapp` | Dry-run create GA4 `whatsapp_click`; `--apply` to create |

## Client usage pattern

```js
import { createAdsCustomer } from "./lib/client.mjs";

const { customer, config } = createAdsCustomer();

const rows = await customer.query(`
  SELECT conversion_action.id, conversion_action.name
  FROM conversion_action
  WHERE conversion_action.status != 'REMOVED'
`);

// Mutate example pattern used in repo:
await customer.conversionActions.create([payload], {
  validate_only: !apply,
});
```

`createAdsCustomer()` wires:

- `GOOGLE_ADS_CLIENT_ID` / `SECRET`
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_CUSTOMER_ID` (digits)
- `GOOGLE_ADS_REFRESH_TOKEN`
- optional `GOOGLE_ADS_LOGIN_CUSTOMER_ID` (MCC)

## Account defaults (from example env)

- Ads customer: `3382955114` (UI `338-295-5114`)
- GA4 property: `474560562`
- GA4 event / conversion name: `whatsapp_click`

Treat as lead-gen contact conversion unless product strategy changes.

## Extending safely

1. Copy patterns from existing scripts (query → log → validate_only → `--apply`).
2. Use `enums` from `google-ads-api`.
3. Use `formatAdsError` from `load-env.mjs` for readable failures.
4. Keep secrets out of logs and git.
5. If developer token is test-only, do not mutate production until Explorer/Basic
   access is approved (see SETUP.md).

## SETUP prerequisites (human)

Documented in `scripts/google-ads/SETUP.md`:

1. Enable Google Ads API in Cloud project
2. OAuth Desktop client + consent screen test user
3. Developer token from Ads API Center
4. User access to the Ads account (MCC login customer if needed)
5. GA4 linked + key event before import-based conversions
