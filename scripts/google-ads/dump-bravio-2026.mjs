import fs from "fs";
import { createAdsCustomer } from "./lib/client.mjs";

const { customer } = createAdsCustomer();
const CAMPAIGN_ID = "21580493972";
const DATE_FROM = "2026-01-01";
const DATE_TO = "2026-08-07";

const camp = await customer.query(`
  SELECT
    campaign.id, campaign.name, campaign.status,
    campaign.advertising_channel_type, campaign.bidding_strategy_type,
    campaign_budget.amount_micros, campaign_budget.name
  FROM campaign WHERE campaign.id = ${CAMPAIGN_ID}
`);

const daily = await customer.query(`
  SELECT
    segments.date,
    metrics.impressions, metrics.clicks, metrics.ctr,
    metrics.average_cpc, metrics.cost_micros, metrics.conversions,
    metrics.conversions_value, metrics.all_conversions,
    metrics.search_impression_share,
    metrics.search_budget_lost_impression_share,
    metrics.search_rank_lost_impression_share,
    metrics.search_absolute_top_impression_share
  FROM campaign
  WHERE campaign.id = ${CAMPAIGN_ID}
    AND segments.date BETWEEN '${DATE_FROM}' AND '${DATE_TO}'
  ORDER BY segments.date
`);

const activeDays = [];
let totalCost = 0;
let totalClicks = 0;
let totalImpr = 0;
let totalConv = 0;
let totalAllConv = 0;
let totalValue = 0;

for (const r of daily) {
  const m = r.metrics;
  const cost = Number(m.cost_micros || 0) / 1e6;
  const clicks = Number(m.clicks || 0);
  const impr = Number(m.impressions || 0);
  const conv = Number(m.conversions || 0);
  if (impr > 0 || clicks > 0 || cost > 0 || conv > 0) {
    activeDays.push({
      date: r.segments.date,
      impr,
      clicks,
      ctr: Number(m.ctr || 0),
      cpc: Number(m.average_cpc || 0) / 1e6,
      cost,
      conv,
      allConv: Number(m.all_conversions || 0),
      value: Number(m.conversions_value || 0),
      is: m.search_impression_share ?? null,
      lostBudget: m.search_budget_lost_impression_share ?? null,
      lostRank: m.search_rank_lost_impression_share ?? null,
      absTop: m.search_absolute_top_impression_share ?? null,
    });
    totalCost += cost;
    totalClicks += clicks;
    totalImpr += impr;
    totalConv += conv;
    totalAllConv += Number(m.all_conversions || 0);
    totalValue += Number(m.conversions_value || 0);
  }
}

const adGroups = await customer.query(`
  SELECT ad_group.id, ad_group.name, ad_group.status,
         metrics.impressions, metrics.clicks, metrics.ctr,
         metrics.average_cpc, metrics.cost_micros, metrics.conversions
  FROM ad_group
  WHERE campaign.id = ${CAMPAIGN_ID}
    AND segments.date BETWEEN '${DATE_FROM}' AND '${DATE_TO}'
`);

const keywords = await customer.query(`
  SELECT ad_group.name, ad_group_criterion.keyword.text,
         ad_group_criterion.keyword.match_type, ad_group_criterion.status,
         ad_group_criterion.quality_info.quality_score,
         metrics.impressions, metrics.clicks, metrics.ctr,
         metrics.average_cpc, metrics.cost_micros, metrics.conversions
  FROM keyword_view
  WHERE campaign.id = ${CAMPAIGN_ID}
    AND segments.date BETWEEN '${DATE_FROM}' AND '${DATE_TO}'
  ORDER BY metrics.cost_micros DESC
  LIMIT 40
`);

const terms = await customer.query(`
  SELECT search_term_view.search_term, metrics.impressions, metrics.clicks,
         metrics.ctr, metrics.average_cpc, metrics.cost_micros, metrics.conversions
  FROM search_term_view
  WHERE campaign.id = ${CAMPAIGN_ID}
    AND segments.date BETWEEN '${DATE_FROM}' AND '${DATE_TO}'
  ORDER BY metrics.cost_micros DESC
  LIMIT 40
`);

const ads = await customer.query(`
  SELECT ad_group.name, ad_group_ad.ad.id, ad_group_ad.status,
         ad_group_ad.ad.final_urls,
         ad_group_ad.ad.responsive_search_ad.headlines,
         ad_group_ad.ad.responsive_search_ad.descriptions,
         metrics.impressions, metrics.clicks, metrics.ctr,
         metrics.average_cpc, metrics.cost_micros, metrics.conversions
  FROM ad_group_ad
  WHERE campaign.id = ${CAMPAIGN_ID}
    AND segments.date BETWEEN '${DATE_FROM}' AND '${DATE_TO}'
`);

const devices = await customer.query(`
  SELECT segments.device, metrics.impressions, metrics.clicks, metrics.ctr,
         metrics.average_cpc, metrics.cost_micros, metrics.conversions
  FROM campaign
  WHERE campaign.id = ${CAMPAIGN_ID}
    AND segments.date BETWEEN '${DATE_FROM}' AND '${DATE_TO}'
`);

const negs = await customer.query(`
  SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
  FROM campaign_criterion
  WHERE campaign.id = ${CAMPAIGN_ID}
    AND campaign_criterion.type = 'KEYWORD'
    AND campaign_criterion.negative = true
`);

const weekly = {};
for (const d of activeDays) {
  const dt = new Date(`${d.date}T12:00:00`);
  const weekStart = new Date(dt);
  weekStart.setDate(dt.getDate() - dt.getDay());
  const key = weekStart.toISOString().slice(0, 10);
  if (!weekly[key]) {
    weekly[key] = { week: key, cost: 0, clicks: 0, impr: 0, conv: 0 };
  }
  weekly[key].cost += d.cost;
  weekly[key].clicks += d.clicks;
  weekly[key].impr += d.impr;
  weekly[key].conv += d.conv;
}

const out = {
  campaign: camp[0],
  period: { from: DATE_FROM, to: DATE_TO },
  activeRange: activeDays.length
    ? { from: activeDays[0].date, to: activeDays[activeDays.length - 1].date }
    : null,
  totals: {
    cost: +totalCost.toFixed(2),
    clicks: totalClicks,
    impr: totalImpr,
    conv: +totalConv.toFixed(2),
    allConv: +totalAllConv.toFixed(2),
    value: +totalValue.toFixed(2),
    ctr: totalImpr ? +((totalClicks / totalImpr) * 100).toFixed(2) : 0,
    cpc: totalClicks ? +(totalCost / totalClicks).toFixed(2) : 0,
    cpa: totalConv > 0 ? +(totalCost / totalConv).toFixed(2) : null,
    activeDays: activeDays.length,
  },
  daily: activeDays,
  weekly: Object.values(weekly),
  adGroups: adGroups.map((r) => ({
    name: r.ad_group.name,
    status: r.ad_group.status,
    impr: Number(r.metrics.impressions || 0),
    clicks: Number(r.metrics.clicks || 0),
    ctr: Number(r.metrics.ctr || 0),
    cpc: Number(r.metrics.average_cpc || 0) / 1e6,
    cost: Number(r.metrics.cost_micros || 0) / 1e6,
    conv: Number(r.metrics.conversions || 0),
  })),
  keywords: keywords.map((r) => ({
    group: r.ad_group.name,
    text: r.ad_group_criterion.keyword.text,
    match: r.ad_group_criterion.keyword.match_type,
    status: r.ad_group_criterion.status,
    qs: r.ad_group_criterion.quality_info?.quality_score ?? null,
    impr: Number(r.metrics.impressions || 0),
    clicks: Number(r.metrics.clicks || 0),
    ctr: Number(r.metrics.ctr || 0),
    cpc: Number(r.metrics.average_cpc || 0) / 1e6,
    cost: Number(r.metrics.cost_micros || 0) / 1e6,
    conv: Number(r.metrics.conversions || 0),
  })),
  terms: terms.map((r) => ({
    term: r.search_term_view.search_term,
    impr: Number(r.metrics.impressions || 0),
    clicks: Number(r.metrics.clicks || 0),
    ctr: Number(r.metrics.ctr || 0),
    cpc: Number(r.metrics.average_cpc || 0) / 1e6,
    cost: Number(r.metrics.cost_micros || 0) / 1e6,
    conv: Number(r.metrics.conversions || 0),
  })),
  ads: ads.map((r) => ({
    group: r.ad_group.name,
    id: String(r.ad_group_ad.ad.id),
    status: r.ad_group_ad.status,
    urls: r.ad_group_ad.ad.final_urls,
    headlines: (r.ad_group_ad.ad.responsive_search_ad?.headlines || []).map(
      (h) => h.text,
    ),
    descriptions: (
      r.ad_group_ad.ad.responsive_search_ad?.descriptions || []
    ).map((d) => d.text),
    impr: Number(r.metrics.impressions || 0),
    clicks: Number(r.metrics.clicks || 0),
    ctr: Number(r.metrics.ctr || 0),
    cost: Number(r.metrics.cost_micros || 0) / 1e6,
    conv: Number(r.metrics.conversions || 0),
  })),
  devices: devices.map((r) => ({
    device: r.segments.device,
    impr: Number(r.metrics.impressions || 0),
    clicks: Number(r.metrics.clicks || 0),
    ctr: Number(r.metrics.ctr || 0),
    cpc: Number(r.metrics.average_cpc || 0) / 1e6,
    cost: Number(r.metrics.cost_micros || 0) / 1e6,
    conv: Number(r.metrics.conversions || 0),
  })),
  negatives: negs.map((r) => r.campaign_criterion.keyword.text),
};

fs.mkdirSync(".tmp", { recursive: true });
fs.writeFileSync(".tmp/bravio-2026.json", JSON.stringify(out, null, 2));
console.log(
  JSON.stringify(
    {
      campaign: out.campaign?.campaign,
      budget: out.campaign?.campaign_budget,
      activeRange: out.activeRange,
      totals: out.totals,
      adGroups: out.adGroups,
      topKeywords: out.keywords.slice(0, 15),
      topTerms: out.terms.slice(0, 20),
      ads: out.ads,
      devices: out.devices,
      negativesCount: out.negatives.length,
      negatives: out.negatives,
      weekly: out.weekly,
    },
    null,
    2,
  ),
);
