'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { GTM_CONTAINER_ID } from '@/lib/analytics/config';
import { isTrackingEnabled } from '@/lib/analytics/is-tracking-enabled';
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  getStoredCookieConsent,
} from '@/lib/cookie-consent';

const GTM_INLINE_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

function hasAnalyticsConsent(): boolean {
  return getStoredCookieConsent() === 'accepted';
}

export function GoogleTagManagerNoScript() {
  const [consentAccepted, setConsentAccepted] = useState(false);

  useEffect(() => {
    if (!isTrackingEnabled()) {
      return;
    }

    const syncConsent = () => {
      setConsentAccepted(hasAnalyticsConsent());
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
    };
  }, []);

  if (!isTrackingEnabled() || !consentAccepted) {
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
  const [consentAccepted, setConsentAccepted] = useState(false);

  useEffect(() => {
    if (!isTrackingEnabled()) {
      return;
    }

    const syncConsent = () => {
      setConsentAccepted(hasAnalyticsConsent());
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
    };
  }, []);

  if (!isTrackingEnabled() || !consentAccepted) {
    return null;
  }

  return (
    <Script id="google-tag-manager" strategy="lazyOnload">
      {GTM_INLINE_SCRIPT}
    </Script>
  );
}
