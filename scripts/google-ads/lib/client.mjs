import { GoogleAdsApi } from "google-ads-api";
import { loadGoogleAdsConfig } from "./load-env.mjs";

/**
 * @param {{ requireRefreshToken?: boolean }} [options]
 */
export function createAdsClient(options = {}) {
  const config = loadGoogleAdsConfig();
  const requireRefreshToken = options.requireRefreshToken !== false;

  if (requireRefreshToken && !config.refreshToken) {
    throw new Error(
      "Missing refresh token. Run: npm run ads:auth",
    );
  }

  const client = new GoogleAdsApi({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    developer_token: config.developerToken,
  });

  return { client, config };
}

/**
 * @param {{ requireRefreshToken?: boolean }} [options]
 */
export function createAdsCustomer(options = {}) {
  const { client, config } = createAdsClient(options);

  // Prefer direct client access when the OAuth user already has it.
  // Only send login-customer-id when forced (true MCC-only access paths).
  const forceLoginCustomerId =
    process.env.GOOGLE_ADS_FORCE_LOGIN_CUSTOMER_ID === "true";

  const customer = client.Customer({
    customer_id: config.customerId,
    refresh_token: /** @type {string} */ (config.refreshToken),
    ...(forceLoginCustomerId && config.loginCustomerId
      ? { login_customer_id: config.loginCustomerId }
      : {}),
  });

  return { client, customer, config };
}
