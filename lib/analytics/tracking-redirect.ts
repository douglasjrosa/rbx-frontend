import {
  TRACKING_REDIRECT_COMPANY_ID,
  TRACKING_REDIRECT_ORIGIN,
  TRACKING_REDIRECT_TOKEN,
} from '@/lib/analytics/config';

const TRACKING_REDIRECT_PATH = '/redirects';

export function buildTrackingRedirectUrl(ctaId: number): string {
  const params = new URLSearchParams({
    token: TRACKING_REDIRECT_TOKEN,
    company: TRACKING_REDIRECT_COMPANY_ID,
    cta: String(ctaId),
  });

  return `${TRACKING_REDIRECT_ORIGIN}${TRACKING_REDIRECT_PATH}?${params.toString()}`;
}

export function isValidTrackingRedirectToken(token: string | null): boolean {
  return token === TRACKING_REDIRECT_TOKEN;
}
