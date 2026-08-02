import { GTM_EVENTS, trackGtmEvent } from '@/lib/analytics/data-layer';

export const COOKIE_CONSENT_STORAGE_KEY = 'rbx-cookie-consent';

export const COOKIE_CONSENT_CHANGED_EVENT = 'rbx-cookie-consent-changed';

export type CookieConsentStatus = 'accepted' | 'denied';

export function getStoredCookieConsent(): CookieConsentStatus | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (stored === 'accepted' || stored === 'denied') {
    return stored;
  }

  return null;
}

export function storeCookieConsent(status: CookieConsentStatus): void {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status);

  if (typeof window !== 'undefined') {
    trackGtmEvent(GTM_EVENTS.COOKIE_CONSENT, {
      consent_status: status,
    });

    window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGED_EVENT));
  }
}
