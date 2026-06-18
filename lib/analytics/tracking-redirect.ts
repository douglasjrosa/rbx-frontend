import {
  TRACKING_REDIRECT_COMPANY_ID,
  TRACKING_REDIRECT_TOKEN,
} from '@/lib/analytics/config';
import { REDIRECT_DESTINATION_PARAM } from '@/lib/analytics/redirect-validation';

const TRACKING_REDIRECT_PATH = '/redirects';

/**
 * Builds a same-origin /redirects URL so GTM can fire the Google Ads
 * conversion on click without sending users through ribermax.com.
 */
export function buildTrackingRedirectUrl(
  ctaId: number,
  destination: string,
): string {
  const params = new URLSearchParams({
    token: TRACKING_REDIRECT_TOKEN,
    company: TRACKING_REDIRECT_COMPANY_ID,
    cta: String(ctaId),
    [REDIRECT_DESTINATION_PARAM]: destination,
  });

  return `${TRACKING_REDIRECT_PATH}?${params.toString()}`;
}

export function isValidTrackingRedirectToken(token: string | null): boolean {
  return token === TRACKING_REDIRECT_TOKEN;
}
