import { createAdsClient } from "./lib/client.mjs";
import { formatAdsError } from "./lib/load-env.mjs";

async function main() {
  const { client, config } = createAdsClient();
  const result = await client.listAccessibleCustomers(
    /** @type {string} */ (config.refreshToken),
  );
  const resourceNames = Array.isArray(result)
    ? result
    : result?.resource_names || [];

  console.log("Accessible customer resource names:");
  for (const name of resourceNames) {
    const id = String(name).split("/").pop();
    const marker = id === config.customerId ? " ← configured customer" : "";
    const mccMarker =
      config.loginCustomerId && id === config.loginCustomerId
        ? " ← configured MCC"
        : "";
    console.log(`- ${name}${marker}${mccMarker}`);
  }

  if (!resourceNames.some((name) => String(name).endsWith(config.customerId))) {
    console.log("");
    console.log(
      `Warning: configured GOOGLE_ADS_CUSTOMER_ID=${config.customerId} ` +
        "was not in the accessible list. Check account access or " +
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID.",
    );
  }
}

main().catch((error) => {
  console.error(formatAdsError(error));
  process.exitCode = 1;
});
