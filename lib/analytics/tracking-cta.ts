export const TRACKING_CTA = {
  HERO_PRIMARY: 1,
  HERO_SECONDARY: 2,
  CTA_SECTION: 3,
  MODELS_BUTTON: 13,
  CUSTOM_PACKAGING: 14,
  CONTACT_ROW: 15,
  FUMIGATED_PAGE: 16,
} as const;

export type TrackingCtaId =
  (typeof TRACKING_CTA)[keyof typeof TRACKING_CTA];
