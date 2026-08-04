# Google Ads API — resources and services

Reference map of what the official API can manage. Prefer the current API
version used by the installed `google-ads-api` package (see package.json).

Authoritative lists:
https://developers.google.com/google-ads/api/reference/rpc/latest/overview

## Hierarchy and identity

| Object | Uniqueness notes |
|--------|------------------|
| Campaign / Budget / AdGroup / Asset / UserList IDs | Globally unique (typical) |
| Ad ID | Unique within ad group; pair with AdGroupId is global |
| Criterion IDs | Scoped to campaign or ad group |

Resource name pattern: `customers/{cid}/{collection}/{id}`.

## Read / write primitives

| Capability | API surface |
|------------|-------------|
| Query entities + metrics | `GoogleAdsService.Search` / `SearchStream` (GAQL) |
| Atomic multi-type mutate | `GoogleAdsService.Mutate` + temp resource names |
| Per-type mutate | `CampaignService`, `AdGroupService`, … |
| Async bulk | `BatchJobService` |
| Field metadata | `GoogleAdsFieldService` |
| Validate without apply | `validate_only` on mutate requests |
| Partial success | `partial_failure` where supported |

## Campaign management

| Service | Role |
|---------|------|
| `CampaignService` | Create/update/remove campaigns |
| `CampaignBudgetService` | Daily/shared budgets (micros) |
| `CampaignCriterionService` | Location, language, device, audiences, negatives, … |
| `CampaignAssetService` / `CampaignAssetSetService` | Campaign-level assets |
| `CampaignGroupService` | Portfolio grouping |
| `CampaignDraftService` / `ExperimentService` / `ExperimentArmService` | Drafts & experiments |
| `CampaignSharedSetService` | Attach shared sets |
| `CampaignConversionGoalService` / `CampaignGoalConfigService` / `CampaignLifecycleGoalService` | Goals |
| `CampaignBidModifierService` / `CampaignCustomizerService` / `CampaignLabelService` | Modifiers, customizers, labels |

## Ad groups, ads, keywords

| Service | Role |
|---------|------|
| `AdGroupService` | Ad groups (Search/Display/Demand Gen, etc.) |
| `AdGroupCriterionService` | Keywords, audiences, demographics, … |
| `AdGroupAdService` / `AdService` | Ads in ad groups |
| `AdGroupAssetService` / `AdGroupAssetSetService` | Ad group assets |
| `AdParameterService` | Ad parameter substitution |
| `AdGroupBidModifierService` | Bid modifiers |
| Label services | `AdGroupLabel`, `AdGroupAdLabel`, `AdGroupCriterionLabel` |

## Performance Max / assets

| Service | Role |
|---------|------|
| `AssetGroupService` | PMax asset groups |
| `AssetGroupAssetService` | Link assets into groups |
| `AssetGroupSignalService` | Audience / search theme signals |
| `AssetGroupListingGroupFilterService` | Retail listing filters |
| `AssetService` | Image / video / media bundle assets (text often inline) |
| `AssetSetService` / `AssetSetAssetService` | Asset sets |
| `AssetGenerationService` | Generative asset helpers (where available) |
| `ShareablePreviewService` | Previews (PMax asset groups; limited ad types) |
| `AutomaticallyCreatedAssetRemovalService` | Remove auto-created assets |

## Bidding

| Service | Role |
|---------|------|
| `BiddingStrategyService` | Portfolio strategies |
| Campaign bidding oneof | Standard strategies embedded on campaign |
| `BiddingSeasonalityAdjustmentService` | Seasonality adjustments |
| `BiddingDataExclusionService` | Exclude bad data windows |

## Audiences and remarketing

| Service | Role |
|---------|------|
| `AudienceService` | Audiences |
| `UserListService` | Remarketing / Customer Match lists |
| `UserDataService` / `OfflineUserDataJobService` | Upload members |
| `UserListCustomerTypeService` | Customer types on lists |
| `CustomAudienceService` / `CustomInterestService` | Custom segments |
| `RemarketingActionService` | Remarketing actions |
| `AudienceInsightsService` | Insights (allowlisted) |

## Conversions and values

| Service | Role |
|---------|------|
| `ConversionActionService` | Conversion actions CRUD |
| `ConversionUploadService` | Offline / enhanced uploads |
| `ConversionAdjustmentUploadService` | Restatements / enhancements |
| `ConversionCustomVariableService` | Custom variables on uploads |
| `ConversionValueRuleService` / `ConversionValueRuleSetService` | Value rules |
| `CustomConversionGoalService` | Custom goals |
| `CustomerConversionGoalService` | Account goals |
| `ConversionGoalCampaignConfigService` | Campaign goal config |

## Shared negatives, labels, planning

| Service | Role |
|---------|------|
| `SharedSetService` / `SharedCriterionService` | Shared keyword/placement lists |
| `CustomerNegativeCriterionService` | Account-level negatives |
| `LabelService` + customer/campaign label links | Organization |
| `KeywordPlan*` / `KeywordPlanIdeaService` | Keyword planning & ideas |
| `ReachPlanService` | YouTube reach forecasts |
| `RecommendationService` / `RecommendationSubscriptionService` | Recommendations apply/dismiss |

## Account, billing, links, access

| Service | Role |
|---------|------|
| `CustomerService` | Customer settings |
| `CustomerClientLinkService` / `CustomerManagerLinkService` | MCC links |
| `CustomerUserAccessService` / `CustomerUserAccessInvitationService` | User access |
| `AccountBudgetProposalService` / `BillingSetupService` / `PaymentsAccountService` / `InvoiceService` | Billing |
| `AccountLinkService` / `ProductLinkService` / `ProductLinkInvitationService` / `DataLinkService` | Product links (GA4, Merchant, …) |
| `IdentityVerificationService` | Identity verification |

## Vertical / specialized

| Service | Role |
|---------|------|
| `SmartCampaignSettingService` / `SmartCampaignSuggestService` / `KeywordThemeConstantService` | Smart campaigns |
| `TravelAssetSuggestionService` | Travel assets |
| `LocalServicesLeadService` | Local Services leads |
| `GeoTargetConstantService` | Geo constants lookup |
| `BrandSuggestionService` | Brand suggestions |
| `YouTubeVideoUploadService` | Video upload |
| `ContentCreatorInsightsService` / `BenchmarksService` | Allowlisted insights |

## Common GAQL resources (non-exhaustive)

`customer`, `campaign`, `campaign_budget`, `ad_group`, `ad_group_ad`,
`ad_group_criterion`, `campaign_criterion`, `asset`, `campaign_asset`,
`asset_group`, `asset_group_asset`, `conversion_action`, `bidding_strategy`,
`search_term_view`, `keyword_view`, `change_event`, `recommendation`,
`geographic_view`, `user_location_view`, …

Metrics live under `metrics.*`; time/device breakdowns under `segments.*`.

## Limitations to remember

- Concurrent mutates on the same object → error; serialize writes.
- Some video campaign subtypes: report OK, mutate limited — use PMax/Demand Gen.
- PMax cannot opt out of networks the way Search `NetworkSettings` can.
- Cross-account mutate only in allowed manager/client relationships.
- Developer token access level gates production vs test accounts.
