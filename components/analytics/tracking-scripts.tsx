'use client';

import { useEffect, useState } from 'react';
import { GTM_CONTAINER_ID } from '@/lib/analytics/config';
import { CONSENT_GRANTED } from '@/lib/analytics/consent-mode';
import { isTrackingEnabled } from '@/lib/analytics/is-tracking-enabled';
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  getStoredCookieConsent,
} from '@/lib/cookie-consent';

function hasAnalyticsConsent(): boolean {
  return getStoredCookieConsent() === 'accepted';
}

function updateConsentGranted(): void {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { ...CONSENT_GRANTED });
  }
}

function loadGtmIfNeeded(): void {
  window.__rbxLoadGtm?.();
}

export function GoogleTagManagerNoScript() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isTrackingEnabled()) {
      return;
    }

    const sync = () => {
      setShouldRender(hasAnalyticsConsent());
    };

    sync();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
    };
  }, []);

  if (!isTrackingEnabled() || !shouldRender) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

export default function TrackingScripts() {
  useEffect(() => {
    if (!isTrackingEnabled()) {
      // #region agent log
      fetch('http://127.0.0.1:7692/ingest/ab94cee0-84cd-4479-a918-2856d96f6bdc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': 'adcb21',
        },
        body: JSON.stringify({
          sessionId: 'adcb21',
          runId: 'ta-pre',
          hypothesisId: 'E',
          location: 'tracking-scripts.tsx:mount',
          message: 'tracking disabled (non-production)',
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      return;
    }

    const syncConsentAndLoader = () => {
      const consented = hasAnalyticsConsent();
      // #region agent log
      fetch('http://127.0.0.1:7692/ingest/ab94cee0-84cd-4479-a918-2856d96f6bdc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': 'adcb21',
        },
        body: JSON.stringify({
          sessionId: 'adcb21',
          runId: 'ta-pre',
          hypothesisId: 'B',
          location: 'tracking-scripts.tsx:sync',
          message: 'consent sync',
          data: {
            consented,
            gtmLoadedFlag: Boolean(window.__rbxGtmLoaded),
            gtmScriptCount: document.querySelectorAll(
              'script[src*="googletagmanager.com/gtm.js"]',
            ).length,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      if (!consented) {
        return;
      }

      updateConsentGranted();
      loadGtmIfNeeded();
      updateConsentGranted();
    };

    syncConsentAndLoader();
    window.addEventListener(
      COOKIE_CONSENT_CHANGED_EVENT,
      syncConsentAndLoader,
    );

    const lateProbe = window.setTimeout(() => {
      // #region agent log
      fetch('http://127.0.0.1:7692/ingest/ab94cee0-84cd-4479-a918-2856d96f6bdc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': 'adcb21',
        },
        body: JSON.stringify({
          sessionId: 'adcb21',
          runId: 'ta-pre',
          hypothesisId: 'C',
          location: 'tracking-scripts.tsx:late-probe',
          message: '3s probe for Tag Assistant window',
          data: {
            consented: hasAnalyticsConsent(),
            gtmLoadedFlag: Boolean(window.__rbxGtmLoaded),
            gtmScriptCount: document.querySelectorAll(
              'script[src*="googletagmanager.com/gtm.js"]',
            ).length,
            hasGtmGlobal: typeof window.google_tag_manager !== 'undefined',
            dataLayerLen: Array.isArray(window.dataLayer)
              ? window.dataLayer.length
              : -1,
            href: window.location.href,
            referrer: document.referrer,
            cookieHasTagAssistant: document.cookie.includes('__TAG_ASSISTANT'),
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    }, 3000);

    return () => {
      window.clearTimeout(lateProbe);
      window.removeEventListener(
        COOKIE_CONSENT_CHANGED_EVENT,
        syncConsentAndLoader,
      );
    };
  }, []);

  return null;
}
