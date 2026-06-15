export const TRACKING_CTA = {
  HERO_PRIMARY: 1,
  HERO_SECONDARY: 2,
  CTA_SECTION: 3,
  CAROUSEL_FIRST: 4,
  CAROUSEL_LAST: 12,
  MODELS_BUTTON: 13,
  CUSTOM_PACKAGING: 14,
  CONTACT_ROW: 15,
  FUMIGATED_PAGE: 16,
} as const;

export type TrackingCtaId =
  (typeof TRACKING_CTA)[keyof typeof TRACKING_CTA];

export function getCarouselTrackingCtaId(cardIndex: number): number {
  const ctaId = TRACKING_CTA.CAROUSEL_FIRST + cardIndex;

  if (ctaId > TRACKING_CTA.CAROUSEL_LAST) {
    return TRACKING_CTA.CAROUSEL_LAST;
  }

  return ctaId;
}
