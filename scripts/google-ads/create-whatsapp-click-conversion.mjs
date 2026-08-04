import { enums } from "google-ads-api";
import { createAdsCustomer } from "./lib/client.mjs";
import { formatAdsError } from "./lib/load-env.mjs";

/**
 * Creates a WEBPAGE conversion action for WhatsApp clicks.
 *
 * Note: GA4-imported conversion types cannot be created via the Ads API
 * (CREATION_NOT_SUPPORTED). Use a website conversion + gtag/GTM instead.
 *
 * Default is dry-run / validate_only. Pass --apply to create.
 */
async function main() {
  const apply = process.argv.includes("--apply");
  const { customer, config } = createAdsCustomer();
  const actionName = config.ga4EventName || "whatsapp_click";

  const existing = await customer.query(`
    SELECT
      conversion_action.resource_name,
      conversion_action.id,
      conversion_action.name,
      conversion_action.status,
      conversion_action.type,
      conversion_action.category,
      conversion_action.primary_for_goal,
      conversion_action.include_in_conversions_metric,
      conversion_action.tag_snippets
    FROM conversion_action
    WHERE conversion_action.name = '${actionName}'
      AND conversion_action.status != 'REMOVED'
  `);

  if (existing.length > 0) {
    console.log(`Found existing conversion(s) named "${actionName}":`);
    for (const row of existing) {
      printAction(row.conversion_action || {});
    }
    return;
  }

  const payload = {
    name: actionName,
    type: enums.ConversionActionType.WEBPAGE,
    category: enums.ConversionActionCategory.CONTACT,
    status: enums.ConversionActionStatus.ENABLED,
    primary_for_goal: true,
    counting_type: enums.ConversionActionCountingType.ONE_PER_CLICK,
    click_through_lookback_window_days: 30,
    value_settings: {
      default_value: 0,
      always_use_default_value: true,
    },
  };

  console.log(
    `${apply ? "APPLY" : "VALIDATE_ONLY"} — create conversion on ` +
      `customer ${config.customerId}`,
  );
  console.log(JSON.stringify(payload, null, 2));

  const response = await customer.conversionActions.create([payload], {
    validate_only: !apply,
  });

  console.log("");
  console.log(apply ? "Created:" : "Validation OK (no create):");
  console.log(JSON.stringify(response, null, 2));

  if (!apply) {
    console.log("");
    console.log("Re-run with --apply to create the conversion action.");
    return;
  }

  const created = await customer.query(`
    SELECT
      conversion_action.resource_name,
      conversion_action.id,
      conversion_action.name,
      conversion_action.status,
      conversion_action.type,
      conversion_action.category,
      conversion_action.primary_for_goal,
      conversion_action.include_in_conversions_metric,
      conversion_action.tag_snippets
    FROM conversion_action
    WHERE conversion_action.name = '${actionName}'
      AND conversion_action.status != 'REMOVED'
  `);

  console.log("");
  console.log("Created conversion details (use tag_snippets for AW- id/label):");
  for (const row of created) {
    printAction(row.conversion_action || {});
  }

  console.log("");
  console.log(
    "Next: set NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID and " +
      "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL in the app env, then deploy.",
  );
}

function printAction(action) {
  console.log(
    `- ${action.name} | id=${action.id} | status=${action.status} | ` +
      `type=${action.type} | category=${action.category} | ` +
      `primary=${action.primary_for_goal} | ` +
      `include=${action.include_in_conversions_metric}`,
  );
  const snippets = action.tag_snippets || [];
  for (const snippet of snippets) {
    console.log(
      `  snippet type=${snippet.type} page_format=${snippet.page_format}`,
    );
    if (snippet.event_snippet) {
      console.log(`  event_snippet:\n${snippet.event_snippet}`);
    }
    if (snippet.global_site_tag) {
      console.log(`  global_site_tag:\n${snippet.global_site_tag}`);
    }
  }
}

main().catch((error) => {
  console.error(formatAdsError(error));
  process.exitCode = 1;
});
