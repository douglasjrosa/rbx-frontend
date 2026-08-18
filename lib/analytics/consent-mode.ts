export const CONSENT_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
} as const;

export const CONSENT_GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
} as const;

/** Time GTM waits for a consent update before firing gated tags. */
export const CONSENT_WAIT_FOR_UPDATE_MS = 1500;

/**
 * Fallback delay (after window load) before downloading gtm.js when the
 * visitor has not engaged and has not accepted cookies yet.
 * Keeps GTM off the LCP / critical path for Lighthouse.
 */
export const GTM_DEFERRED_LOAD_MS = 3000;
