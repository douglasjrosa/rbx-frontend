import {
  GOOGLE_ADS_ID,
  GOOGLE_ADS_WHATSAPP_SEND_TO,
} from '@/lib/analytics/config';

declare global {
  interface Window {
    __rbxAdsTagLoaded?: boolean;
  }
}

/**
 * Loads the Google Ads gtag.js config after analytics consent.
 * Safe to call multiple times.
 */
export function ensureGoogleAdsTagLoaded(): void {
  if (typeof window === 'undefined' || window.__rbxAdsTagLoaded) {
    return;
  }

  window.__rbxAdsTagLoaded = true;
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === 'function') {
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
  }

  const existing = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}"]`,
  );
  if (existing) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(script);
}

/** Fires the Ads conversion event used for Smart Bidding. */
export function trackGoogleAdsWhatsAppConversion(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  ensureGoogleAdsTagLoaded();
  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_WHATSAPP_SEND_TO,
  });
}
