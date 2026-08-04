import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");

const envCandidates = [
  path.join(repoRoot, ".env.google-ads.local"),
  path.join(__dirname, "../.env.google-ads.local"),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const tokensPath = path.join(__dirname, "../.tokens.json");

/**
 * @returns {{
 *   clientId: string,
 *   clientSecret: string,
 *   developerToken: string,
 *   customerId: string,
 *   loginCustomerId?: string,
 *   refreshToken?: string,
 *   ga4PropertyId: string,
 *   ga4EventName: string,
 *   tokensPath: string,
 *   repoRoot: string,
 * }}
 */
export function loadGoogleAdsConfig() {
  const clientId = required("GOOGLE_ADS_CLIENT_ID");
  const clientSecret = required("GOOGLE_ADS_CLIENT_SECRET");
  const developerToken = required("GOOGLE_ADS_DEVELOPER_TOKEN");
  const customerId = normalizeCustomerId(
    process.env.GOOGLE_ADS_CUSTOMER_ID || "3382955114",
  );
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
    ? normalizeCustomerId(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID)
    : undefined;

  let refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN || undefined;
  if (!refreshToken && fs.existsSync(tokensPath)) {
    const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));
    refreshToken = tokens.refresh_token || undefined;
  }

  return {
    clientId,
    clientSecret,
    developerToken,
    customerId,
    loginCustomerId,
    refreshToken,
    ga4PropertyId: process.env.GOOGLE_ADS_GA4_PROPERTY_ID || "474560562",
    ga4EventName: process.env.GOOGLE_ADS_GA4_EVENT_NAME || "whatsapp_click",
    tokensPath,
    repoRoot,
  };
}

/**
 * @param {string} name
 */
function required(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy scripts/google-ads/.env.google-ads.example to ` +
        `.env.google-ads.local and fill in the values.`,
    );
  }
  return value;
}

/**
 * @param {string} value
 */
export function normalizeCustomerId(value) {
  return String(value).replace(/\D/g, "");
}

/**
 * @param {unknown} error
 */
export function formatAdsError(error) {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const err = /** @type {Record<string, unknown>} */ (error);
  const parts = [err.message || err.toString?.() || "Unknown error"];

  if (Array.isArray(err.errors)) {
    for (const item of err.errors) {
      parts.push(JSON.stringify(item, null, 2));
    }
  }

  return parts.join("\n");
}
