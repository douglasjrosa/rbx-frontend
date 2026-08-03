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
 * IMPORTANT: never use // line comments inside the returned script string.
 * Newlines are stripped, so // would comment out the rest of the script.
 */
export function buildGtmBootstrapScript(): string {
  const denied = JSON.stringify(CONSENT_DENIED);

  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',Object.assign(${denied},{wait_for_update:${CONSENT_WAIT_FOR_UPDATE_MS}}));
window.__rbxDbg=function(hypothesisId,message,data){
  try{
    fetch('http://127.0.0.1:7692/ingest/ab94cee0-84cd-4479-a918-2856d96f6bdc',{
      method:'POST',
      headers:{'Content-Type':'application/json','X-Debug-Session-Id':'adcb21'},
      body:JSON.stringify({
        sessionId:'adcb21',
        runId:'ta-post',
        hypothesisId:hypothesisId,
        location:'gtm-loader-script.ts',
        message:message,
        data:data||{},
        timestamp:Date.now()
      })
    }).catch(function(){});
  }catch(e){}
};
window.__rbxLoadGtm=function(reason){
  if(window.__rbxGtmLoaded){
    window.__rbxDbg('A','loadGtm skipped already loaded',{reason:reason||'unknown'});
    return;
  }
  window.__rbxGtmLoaded=true;
  dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=document.getElementsByTagName('script')[0];
  var j=document.createElement('script');
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}';
  j.onload=function(){
    window.__rbxDbg('A','gtm.js onload fired',{reason:reason||'unknown',src:j.src});
  };
  j.onerror=function(){
    window.__rbxDbg('D','gtm.js onerror',{reason:reason||'unknown',src:j.src});
  };
  f.parentNode.insertBefore(j,f);
  window.__rbxDbg('A','gtm.js script injected',{reason:reason||'unknown',src:j.src});
};
(function(){
  function previewSignals(){
    var query=location.search+location.hash;
    var hasQuery=/[?&#]gtm_debug=|[?&#]gtm_preview=|[?&#]gtm_auth=/.test(query);
    var hasReferrer=/tagassistant\\.google\\.com|tagmanager\\.google\\.com/.test(document.referrer);
    var hasCookie=/(?:^|;\\s*)(?:gtm_(?:auth|preview|debug)|__TAG_ASSISTANT)=/.test(document.cookie);
    return {
      hasQuery:hasQuery,
      hasReferrer:hasReferrer,
      hasCookie:hasCookie,
      isPreview:hasQuery||hasReferrer||hasCookie,
      search:location.search,
      hash:location.hash,
      referrer:document.referrer||'',
      cookieHasTagAssistant:document.cookie.indexOf('__TAG_ASSISTANT')!==-1,
      cookieLen:document.cookie.length
    };
  }
  function isPreview(){return previewSignals().isPreview;}
  var initial=previewSignals();
  window.__rbxDbg('A','bootstrap preview check',initial);
  window.__rbxDbg('B','consent default denied set',{waitForUpdate:${CONSENT_WAIT_FOR_UPDATE_MS}});
  if(initial.isPreview){window.__rbxLoadGtm('initial-preview');return;}
  var tries=0;
  var timer=setInterval(function(){
    tries+=1;
    var signals=previewSignals();
    if(signals.isPreview){
      clearInterval(timer);
      window.__rbxDbg('A','preview detected on poll',Object.assign({tries:tries},signals));
      window.__rbxLoadGtm('poll-preview');
    }
    if(tries>=25){
      clearInterval(timer);
      window.__rbxDbg('A','preview poll exhausted without GTM',Object.assign({tries:tries},signals));
      window.__rbxDbg('E','final DOM probe after poll',{
        gtmScriptCount:document.querySelectorAll('script[src*="gtm.js"]').length,
        dataLayerLen:Array.isArray(window.dataLayer)?window.dataLayer.length:-1,
        hasGtmGlobal:typeof window.google_tag_manager!=='undefined',
        gtmLoadedFlag:!!window.__rbxGtmLoaded
      });
    }
  },100);
})();
`.replace(/\n\s*/g, '');
}
