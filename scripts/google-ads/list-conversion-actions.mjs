import { createAdsCustomer } from "./lib/client.mjs";
import { formatAdsError } from "./lib/load-env.mjs";

async function main() {
  const { customer, config } = createAdsCustomer();

  const rows = await customer.query(`
    SELECT
      conversion_action.resource_name,
      conversion_action.id,
      conversion_action.name,
      conversion_action.status,
      conversion_action.type,
      conversion_action.category,
      conversion_action.primary_for_goal,
      conversion_action.include_in_conversions_metric,
      conversion_action.origin,
      conversion_action.google_analytics_4_settings.event_name,
      conversion_action.google_analytics_4_settings.property_id
    FROM conversion_action
    ORDER BY conversion_action.name
  `);

  console.log(`Customer ${config.customerId} — ${rows.length} conversion action(s)\n`);

  for (const row of rows) {
    const action = row.conversion_action || {};
    const ga4 = action.google_analytics_4_settings || {};
    console.log(
      [
        action.name,
        `id=${action.id}`,
        `status=${action.status}`,
        `type=${action.type}`,
        `category=${action.category}`,
        `primary_for_goal=${action.primary_for_goal}`,
        `include_in_conversions=${action.include_in_conversions_metric}`,
        ga4.event_name ? `ga4_event=${ga4.event_name}` : null,
        ga4.property_id ? `ga4_property=${ga4.property_id}` : null,
        action.resource_name,
      ]
        .filter(Boolean)
        .join(" | "),
    );
  }
}

main().catch((error) => {
  console.error(formatAdsError(error));
  process.exitCode = 1;
});
