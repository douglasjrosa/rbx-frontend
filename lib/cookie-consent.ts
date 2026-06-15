export const COOKIE_CONSENT_STORAGE_KEY = 'rbx-cookie-consent';

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
}
