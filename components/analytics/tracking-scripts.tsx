import Script from 'next/script';
import {
  GA4_SITE_KIT_MEASUREMENT_ID,
  GOOGLE_SITE_KIT_DEVELOPER_ID,
  GTM_CONTAINER_ID,
  TRACKING_LINKER_DOMAINS,
} from '@/lib/analytics/config';
import { isTrackingEnabled } from '@/lib/analytics/is-tracking-enabled';

const GTM_INLINE_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

const SITE_KIT_LINKER_JSON = JSON.stringify(TRACKING_LINKER_DOMAINS);

const SITE_KIT_INLINE_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("set","linker",{"domains":${SITE_KIT_LINKER_JSON}});
gtag("js", new Date());
gtag("set", "developer_id.${GOOGLE_SITE_KIT_DEVELOPER_ID}", true);
gtag("config", "${GA4_SITE_KIT_MEASUREMENT_ID}");
window._googlesitekit = window._googlesitekit || {};
window._googlesitekit.throttledEvents = [];
window._googlesitekit.gtagEvent = (name, data) => {
  const key = JSON.stringify({ name, data });
  if (window._googlesitekit.throttledEvents[key]) {
    return;
  }
  window._googlesitekit.throttledEvents[key] = true;
  setTimeout(() => {
    delete window._googlesitekit.throttledEvents[key];
  }, 5);
  gtag("event", name, { ...data, event_source: "site-kit" });
};`;

export function GoogleTagManagerNoScript() {
  if (!isTrackingEnabled()) {
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
  if (!isTrackingEnabled()) {
    return null;
  }

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {GTM_INLINE_SCRIPT}
      </Script>
      <Script
        id="google_gtagjs-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_SITE_KIT_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google_gtagjs-js-after" strategy="afterInteractive">
        {SITE_KIT_INLINE_SCRIPT}
      </Script>
    </>
  );
}
