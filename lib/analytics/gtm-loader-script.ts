import { GTM_CONTAINER_ID } from '@/lib/analytics/config';
import {
  CONSENT_DENIED,
  CONSENT_WAIT_FOR_UPDATE_MS,
} from '@/lib/analytics/consent-mode';

/**
 * Tiny synchronous bootstrap for production HTML:
 * - sets Consent Mode defaults (denied)
 * - exposes window.__rbxLoadGtm()
 * - auto-loads GTM for Tag Assistant / GTM Preview sessions
 *
 * Normal visitors do not download gtm.js until cookie consent is accepted.
 *
 * Tag Assistant signals (see Simo Ahava / Google docs):
 * - URL params: gtm_debug, gtm_preview, gtm_auth
 * - referrer: tagassistant.google.com / tagmanager.google.com
 * - first-party cookie: __TAG_ASSISTANT (current) or legacy gtm_* cookies
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
  function isPreview(){
    var query=location.search+location.hash;
    return /[?&#]gtm_debug=|[?&#]gtm_preview=|[?&#]gtm_auth=/.test(query)
      || /tagassistant\\.google\\.com|tagmanager\\.google\\.com/.test(document.referrer)
      || /(?:^|;\\s*)(?:gtm_(?:auth|preview|debug)|__TAG_ASSISTANT)=/.test(document.cookie);
  }
  if(isPreview()){window.__rbxLoadGtm();return;}
  // Tag Assistant may set __TAG_ASSISTANT shortly after the debug window opens.
  var tries=0;
  var timer=setInterval(function(){
    tries+=1;
    if(isPreview()){clearInterval(timer);window.__rbxLoadGtm();}
    if(tries>=25){clearInterval(timer);}
  },100);
})();
`.replace(/\n\s*/g, '');
}
