import { enums } from "google-ads-api";
import { createAdsCustomer } from "./lib/client.mjs";
import { formatAdsError } from "./lib/load-env.mjs";

/**
 * Soft-removes legacy conversion actions that should not drive bidding.
 * Default is dry-run. Pass --apply to mutate.
 *
 * Optional: --ids=123,456 to target specific conversion action IDs.
 * Optional: --all-enabled to remove every ENABLED action (dangerous).
 */
async function main() {
  const apply = process.argv.includes("--apply");
  const allEnabled = process.argv.includes("--all-enabled");
  const idsArg = process.argv.find((arg) => arg.startsWith("--ids="));
  const explicitIds = idsArg
    ? idsArg
        .slice("--ids=".length)
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : [];

  const { customer, config } = createAdsCustomer();

  const rows = await customer.query(`
    SELECT
      conversion_action.resource_name,
      conversion_action.id,
      conversion_action.name,
      conversion_action.status,
      conversion_action.type,
      conversion_action.primary_for_goal,
      conversion_action.include_in_conversions_metric
    FROM conversion_action
  `);

  const legacyNameHints = [
    "envio de mensagem",
    "popup whatsapp",
    "whatsapp - site",
    "local actions",
  ];

  const targets = rows
    .map((row) => row.conversion_action)
    .filter(Boolean)
    .filter((action) => {
      if (String(action.status) === String(enums.ConversionActionStatus.REMOVED)) {
        return false;
      }
      if (explicitIds.length > 0) {
        return explicitIds.includes(String(action.id));
      }
      if (allEnabled) {
        return true;
      }
      const name = String(action.name || "").toLowerCase();
      return legacyNameHints.some((hint) => name.includes(hint));
    });

  if (targets.length === 0) {
    console.log("No matching conversion actions to remove.");
    return;
  }

  console.log(
    `${apply ? "APPLY" : "DRY-RUN"} — customer ${config.customerId}`,
  );
  for (const action of targets) {
    console.log(
      `- ${action.name} (id=${action.id}, status=${action.status})`,
    );
  }

  if (!apply) {
    console.log("");
    console.log("No changes made. Re-run with --apply to remove them.");
    return;
  }

  const response = await customer.conversionActions.update(
    targets.map((action) => ({
      resource_name: action.resource_name,
      status: enums.ConversionActionStatus.REMOVED,
    })),
  );

  console.log("");
  console.log("Update response:");
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(formatAdsError(error));
  process.exitCode = 1;
});
