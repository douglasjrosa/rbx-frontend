# Google Ads API tooling (ops scripts)

Local scripts to authenticate and manage Google Ads conversion actions for
Ribermax (`338-295-5114`). Not used by the Next.js production app.

## Prerequisites (manual — only you can do these)

### 1. Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Enable **Google Ads API**:
   https://console.cloud.google.com/apis/library/googleads.googleapis.com
4. Create OAuth credentials:
   - APIs & Services → Credentials → Create credentials → OAuth client ID
   - Application type: **Desktop app**
   - Copy Client ID + Client Secret
5. Configure the OAuth consent screen (External is fine for testing).
   Add your Google user as a **Test user** while the app is in Testing.

### 2. Google Ads developer token

1. Sign in to Google Ads as an admin on the Ribermax account (or MCC).
2. Tools → API Center (or Admin → API Center).
3. Apply for / copy the **Developer token**.
4. New tokens often start as **test-account only**. Request at least
   **Explorer** access for production account `338-295-5114`.

Docs: https://developers.google.com/google-ads/api/docs/get-started/dev-token

### 3. Account access

The Google user used in OAuth must have access to Ads account
`338-295-5114`. If access is via an MCC, set `GOOGLE_ADS_LOGIN_CUSTOMER_ID`
to the manager customer ID (digits only).

### 4. Conversion tracking (`whatsapp_click`)

GA4-imported conversion actions **cannot** be created via the Ads API
(`CREATION_NOT_SUPPORTED`). This project uses a **WEBPAGE** conversion
action named `whatsapp_click` (CONTACT category) and fires it from the
site with `gtag('event', 'conversion', …)` on WhatsApp clicks.

Account goal `CONTACT~WEBSITE` should be biddable so the action is
included in the Conversions column for Smart Bidding.

## Local setup

```bash
cp scripts/google-ads/.env.google-ads.example .env.google-ads.local
# fill CLIENT_ID, CLIENT_SECRET, DEVELOPER_TOKEN
```

OAuth redirect used by the auth script:

`http://127.0.0.1:3333/oauth2callback`

Add that URI under the Desktop OAuth client if Cloud Console asks for it
(Desktop clients usually allow loopback automatically).

## Commands

```bash
npm run ads:auth
npm run ads:accounts
npm run ads:conversions:list

# dry-run first
npm run ads:conversions:remove-legacy
npm run ads:conversions:remove-legacy -- --apply

npm run ads:conversions:whatsapp
npm run ads:conversions:whatsapp -- --apply
```

## Notes

- `.env.google-ads.local` and `scripts/google-ads/.tokens.json` are gitignored.
- Never commit developer tokens or refresh tokens.
- If API calls fail with "developer token is only approved for test accounts",
  finish Explorer/Basic approval in API Center before mutating production.
