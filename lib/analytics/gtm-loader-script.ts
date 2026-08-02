import { GTM_CONTAINER_ID } from '@/lib/analytics/config';
import {
  CONSENT_DENIED,
  CONSENT_WAIT_FOR_UPDATE_MS,
} from '@/lib/analytics/consent-mode';

/**
 * Tiny synchronous bootstrap for production HTML:
 * - sets Consent Mode defaults (denied)
 * - exposes window.__rbxLoadGtm()
 * - auto-loads GTM only for Tag Assistant / GTM Preview sessions
 *
 * Normal visitors do not download gtm.js until cookie consent is accepted.
 */
export function buildGtmBootstrapScript(): string {
  const denied = JSON.stringify(CONSENT_DENIED);

  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',Object.assign(${denied},{wait_for_update:${CONSENT_WAIT_FOR_UPDATE_MS}}));
window.__rbxLoadGtm=function(){
  if(window.__rbxGtmLoaded){return;}
  window.__rbxGtmLoaded=true;
  dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=document.getElementsByTagName('script')[0];
  var j=document.createElement('script');
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}';
  f.parentNode.insertBefore(j,f);
};
(function(){
  var query=location.search;
  var isPreview=/[?&]gtm_debug=|[?&]gtm_preview=|[?&]gtm_auth=/.test(query)
    || /tagassistant\\.google\\.com|tagmanager\\.google\\.com/.test(document.referrer)
    || /(?:^|;\\s*)gtm_(?:auth|preview|debug)=/.test(document.cookie);
  if(isPreview){window.__rbxLoadGtm();}
})();
`.replace(/\n\s*/g, '');
}
