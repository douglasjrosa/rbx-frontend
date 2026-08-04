'use client';

import { useEffect, useState } from 'react';
import { GTM_CONTAINER_ID } from '@/lib/analytics/config';
import { CONSENT_GRANTED } from '@/lib/analytics/consent-mode';
import { ensureGoogleAdsTagLoaded } from '@/lib/analytics/google-ads-conversion';
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
      return;
    }

    const syncConsentAndLoader = () => {
      if (!hasAnalyticsConsent()) {
        return;
      }

      updateConsentGranted();
      loadGtmIfNeeded();
      ensureGoogleAdsTagLoaded();
      updateConsentGranted();
    };

    syncConsentAndLoader();
    window.addEventListener(
      COOKIE_CONSENT_CHANGED_EVENT,
      syncConsentAndLoader,
    );

    return () => {
      window.removeEventListener(
        COOKIE_CONSENT_CHANGED_EVENT,
        syncConsentAndLoader,
      );
    };
  }, []);

  return null;
}
