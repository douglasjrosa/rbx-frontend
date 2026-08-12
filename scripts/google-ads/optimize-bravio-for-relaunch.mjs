import { enums } from "google-ads-api";
import { createAdsCustomer } from "./lib/client.mjs";
import { formatAdsError } from "./lib/load-env.mjs";

/**
 * Applies Bravio reactivation hygiene while keeping the campaign PAUSED.
 * Pass --apply to mutate. Pass --enable to also set campaign ENABLED
 * (requires --apply).
 */
const APPLY = process.argv.includes("--apply");
const ENABLE = process.argv.includes("--enable");

const CUSTOMER = "3382955114";
const CAMPAIGN_ID = "21580493972";
const CAMPAIGN_RN = `customers/${CUSTOMER}/campaigns/${CAMPAIGN_ID}`;
const BUDGET_RN = `customers/${CUSTOMER}/campaignBudgets/13838894590`;

const LANDING_FUMIGADA =
  "https://ribermax.com.br/caixa-madeira-fumigada-exportacao/";
const LANDING_FABRICANTE =
  "https://ribermax.com.br/fabrica-caixas-madeira/";

/** Ads that should keep serving after relaunch. */
const AD_URL_UPDATES = [
  // Grupo 1 — Fabricante
  {
    resource_name: `customers/${CUSTOMER}/ads/708891865913`,
    final_urls: [LANDING_FABRICANTE],
  },
  {
    resource_name: `customers/${CUSTOMER}/ads/754677125270`,
    final_urls: [LANDING_FABRICANTE],
  },
  // Grupo 2 — Fumigada / Exportação
  {
    resource_name: `customers/${CUSTOMER}/ads/708809671084`,
    final_urls: [LANDING_FUMIGADA],
  },
  {
    resource_name: `customers/${CUSTOMER}/ads/754587316498`,
    final_urls: [LANDING_FUMIGADA],
  },
];

/** Pause weak / high-CPA / retail keywords (leave group 3 paused + clean). */
const KEYWORDS_TO_PAUSE = [
  // High CPA / low QS from 2026 dump
  `customers/${CUSTOMER}/adGroupCriteria/169058366634~314001409867`, // caixa de madeira para transporte
  `customers/${CUSTOMER}/adGroupCriteria/169058366634~866138000794`, // engradado…
  `customers/${CUSTOMER}/adGroupCriteria/169058366634~1664699794024`, // caixa grande transporte QS1
  `customers/${CUSTOMER}/adGroupCriteria/169058366634~468530260231`, // caixa de madeira transporte
  `customers/${CUSTOMER}/adGroupCriteria/167439177753~322523266459`, // fabrica… QS2
  // Group 3 Personalizado positives (keep group off)
  `customers/${CUSTOMER}/adGroupCriteria/166859798398~296178897806`,
  `customers/${CUSTOMER}/adGroupCriteria/166859798398~298583530298`,
  `customers/${CUSTOMER}/adGroupCriteria/166859798398~844621754289`,
  `customers/${CUSTOMER}/adGroupCriteria/166859798398~2235048957246`,
  `customers/${CUSTOMER}/adGroupCriteria/166859798398~2236257064479`,
];

const NEW_NEGATIVES = [
  "elopack",
  "vital brasil",
  "mogi mirim",
  "concorrente",
  "usado",
  "usados",
  "doação",
  "gratis",
  "grátis",
  "barato",
  "barata",
  "segunda mão",
  "olx",
  "mercado livre",
  "lembrancinha",
  "padrinho",
  "padrinhos",
  "noiva",
  "noivo",
  "casamento",
  "presente",
  "presentes",
  "mdf",
  "caixinha",
  "personalizada foto",
  "fotos",
  "vinho",
  "hortifruti",
  "feira",
  "frutas",
];

const GOAL_UPDATES = [
  {
    resource_name: `customers/${CUSTOMER}/campaignConversionGoals/${CAMPAIGN_ID}~CONTACT~WEBSITE`,
    biddable: true,
  },
  {
    resource_name: `customers/${CUSTOMER}/campaignConversionGoals/${CAMPAIGN_ID}~SUBMIT_LEAD_FORM~WEBSITE`,
    biddable: false,
  },
  {
    resource_name: `customers/${CUSTOMER}/campaignConversionGoals/${CAMPAIGN_ID}~DEFAULT~WEBSITE`,
    biddable: false,
  },
  {
    resource_name: `customers/${CUSTOMER}/campaignConversionGoals/${CAMPAIGN_ID}~PAGE_VIEW~GOOGLE_HOSTED`,
    biddable: false,
  },
  {
    resource_name: `customers/${CUSTOMER}/campaignConversionGoals/${CAMPAIGN_ID}~GET_DIRECTIONS~GOOGLE_HOSTED`,
    biddable: false,
  },
  {
    resource_name: `customers/${CUSTOMER}/campaignConversionGoals/${CAMPAIGN_ID}~CONTACT~GOOGLE_HOSTED`,
    biddable: false,
  },
  {
    resource_name: `customers/${CUSTOMER}/campaignConversionGoals/${CAMPAIGN_ID}~ENGAGEMENT~GOOGLE_HOSTED`,
    biddable: false,
  },
];

const NEW_DAILY_BUDGET_MICROS = 40_000_000; // R$40/day validation ceiling

async function main() {
  const { customer } = createAdsCustomer();
  const mode = APPLY ? "APPLY" : "VALIDATE_ONLY";
  console.log(`${mode} — prepare Ribermax_Bravio_200km for reactivation`);
  console.log(`enable_campaign=${ENABLE && APPLY}`);

  // 1) Budget down for cautious relaunch
  console.log("\n[1] Budget → R$40/day");
  await customer.campaignBudgets.update(
    [{ resource_name: BUDGET_RN, amount_micros: NEW_DAILY_BUDGET_MICROS }],
    { validate_only: !APPLY },
  );

  // 2) Campaign conversion goals: CONTACT website only
  console.log("\n[2] Campaign goals → CONTACT~WEBSITE only");
  await customer.campaignConversionGoals.update(GOAL_UPDATES, {
    validate_only: !APPLY,
  });

  // 3) Final URLs → SEO landings
  console.log("\n[3] Ad final URLs → SEO landings");
  await customer.ads.update(AD_URL_UPDATES, { validate_only: !APPLY });

  // 4) Pause weak / retail keywords
  console.log(`\n[4] Pause ${KEYWORDS_TO_PAUSE.length} keywords`);
  await customer.adGroupCriteria.update(
    KEYWORDS_TO_PAUSE.map((resource_name) => ({
      resource_name,
      status: enums.AdGroupCriterionStatus.PAUSED,
    })),
    { validate_only: !APPLY },
  );

  // 5) Ensure Personalizado ad group stays paused
  console.log("\n[5] Keep Personalizado ad group paused");
  await customer.adGroups.update(
    [
      {
        resource_name: `customers/${CUSTOMER}/adGroups/166859798398`,
        status: enums.AdGroupStatus.PAUSED,
      },
    ],
    { validate_only: !APPLY },
  );

  // 6) Campaign negatives (skip duplicates via partial failure tolerance)
  console.log(`\n[6] Add ${NEW_NEGATIVES.length} campaign negatives`);
  const existing = await customer.query(`
    SELECT campaign_criterion.keyword.text
    FROM campaign_criterion
    WHERE campaign.id = ${CAMPAIGN_ID}
      AND campaign_criterion.type = 'KEYWORD'
      AND campaign_criterion.negative = true
  `);
  const have = new Set(
    existing.map((r) =>
      String(r.campaign_criterion.keyword.text || "").toLowerCase(),
    ),
  );
  const toAdd = NEW_NEGATIVES.filter((t) => !have.has(t.toLowerCase()));
  console.log(`  new negatives after dedupe: ${toAdd.length}`);
  if (toAdd.length > 0) {
    await customer.campaignCriteria.create(
      toAdd.map((text) => ({
        campaign: CAMPAIGN_RN,
        negative: true,
        keyword: {
          text,
          match_type: enums.KeywordMatchType.BROAD,
        },
      })),
      { validate_only: !APPLY },
    );
  }

  // 7) Campaign status
  if (ENABLE && APPLY) {
    console.log("\n[7] Enable campaign");
    await customer.campaigns.update([
      {
        resource_name: CAMPAIGN_RN,
        status: enums.CampaignStatus.ENABLED,
      },
    ]);
  } else {
    console.log("\n[7] Campaign left PAUSED (pass --apply --enable to go live)");
    if (!APPLY) {
      // still validate that we could enable later
      await customer.campaigns.update(
        [
          {
            resource_name: CAMPAIGN_RN,
            status: enums.CampaignStatus.PAUSED,
          },
        ],
        { validate_only: true },
      );
    }
  }

  console.log("\nDone.");
  if (!APPLY) {
    console.log("Re-run with --apply to mutate. Add --enable to also go live.");
  }
}

main().catch((error) => {
  console.error(formatAdsError(error));
  process.exitCode = 1;
});
