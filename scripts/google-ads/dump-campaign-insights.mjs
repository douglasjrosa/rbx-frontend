import { createAdsCustomer } from "./lib/client.mjs";
import { formatAdsError } from "./lib/load-env.mjs";

async function main() {
  const { customer, config } = createAdsCustomer();
  console.log(`Dump for customer ${config.customerId}\n`);

  const campaigns = await customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      campaign.bidding_strategy_type,
      campaign_budget.amount_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC
  `);
  console.log("=== CAMPAIGNS (last 30 days) ===");
  console.log(JSON.stringify(campaigns, null, 2));

  const adGroups = await customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      ad_group.id,
      ad_group.name,
      ad_group.status,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM ad_group
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC
    LIMIT 50
  `);
  console.log("\n=== AD GROUPS (last 30 days) ===");
  console.log(JSON.stringify(adGroups, null, 2));

  const keywords = await customer.query(`
    SELECT
      campaign.name,
      ad_group.name,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.status,
      ad_group_criterion.quality_info.quality_score,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM keyword_view
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC
    LIMIT 80
  `);
  console.log("\n=== KEYWORDS (last 30 days) ===");
  console.log(JSON.stringify(keywords, null, 2));

  const searchTerms = await customer.query(`
    SELECT
      search_term_view.search_term,
      campaign.name,
      ad_group.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC
    LIMIT 80
  `);
  console.log("\n=== SEARCH TERMS (last 30 days) ===");
  console.log(JSON.stringify(searchTerms, null, 2));

  const ads = await customer.query(`
    SELECT
      campaign.name,
      ad_group.name,
      ad_group_ad.ad.id,
      ad_group_ad.status,
      ad_group_ad.ad.type,
      ad_group_ad.ad.final_urls,
      ad_group_ad.ad.responsive_search_ad.headlines,
      ad_group_ad.ad.responsive_search_ad.descriptions,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM ad_group_ad
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.impressions DESC
    LIMIT 30
  `);
  console.log("\n=== ADS (last 30 days) ===");
  console.log(JSON.stringify(ads, null, 2));
}

main().catch((error) => {
  console.error(formatAdsError(error));
  process.exitCode = 1;
});
