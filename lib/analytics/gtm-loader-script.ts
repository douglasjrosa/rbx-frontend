import { GOOGLE_ADS_ID, GTM_CONTAINER_ID } from '@/lib/analytics/config';
import {
  CONSENT_DENIED,
  CONSENT_WAIT_FOR_UPDATE_MS,
  GTM_DEFERRED_LOAD_MS,
} from '@/lib/analytics/consent-mode';

/** Keep in sync with COOKIE_CONSENT_STORAGE_KEY in lib/analytics/config.ts */
const CONSENT_STORAGE_KEY = 'rbx-cookie-consent';

/**
 * Tiny synchronous bootstrap for production HTML:
 * - sets Consent Mode defaults (denied)
 * - captures Ads click IDs (gclid / gbraid / wbraid)
 * - exposes window.__rbxLoadGtm()
 * - auto-loads GTM for Tag Assistant / returning consent / deferred path
 *
 * Deferred path (performance): first engagement OR idle/timeout after load.
 * Consent stays denied until the cookie banner grants it.
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
window.__rbxLoadGtm=function(){
  if(window.__rbxGtmLoaded){return;}
  window.__rbxGtmLoaded=true;
  dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=document.getElementsByTagName('script')[0];
  var j=document.createElement('script');
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}';
  f.parentNode.insertBefore(j,f);
  if(!window.__rbxAdsTagLoaded){
    window.__rbxAdsTagLoaded=true;
    var a=document.createElement('script');
    a.async=true;
    a.src='https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}';
    f.parentNode.insertBefore(a,f);
    gtag('js',new Date());
    gtag('config','${GOOGLE_ADS_ID}');
  }
};
(function(){
  function captureClickIds(){
    try{
      var params=new URLSearchParams(location.search);
      var keys=['gclid','gbraid','wbraid'];
      for(var i=0;i<keys.length;i++){
        var value=params.get(keys[i]);
        if(value){localStorage.setItem('rbx_'+keys[i],value);}
      }
    }catch(e){}
  }
  function isPreview(){
    var query=location.search+location.hash;
    return /[?&#]gtm_debug=|[?&#]gtm_preview=|[?&#]gtm_auth=/.test(query)
      || /tagassistant\\.google\\.com|tagmanager\\.google\\.com/.test(document.referrer)
      || /(?:^|;\\s*)(?:gtm_(?:auth|preview|debug)|__TAG_ASSISTANT)=/.test(document.cookie);
  }
  function hasAcceptedConsent(){
    try{
      return localStorage.getItem('${CONSENT_STORAGE_KEY}')==='accepted';
    }catch(e){return false;}
  }
  function scheduleDeferredLoad(){
    if(window.__rbxGtmLoaded){return;}
    var finished=false;
    function load(){
      if(finished||window.__rbxGtmLoaded){return;}
      finished=true;
      cleanup();
      window.__rbxLoadGtm();
    }
    function cleanup(){
      var events=['pointerdown','keydown','scroll','touchstart'];
      for(var i=0;i<events.length;i++){
        window.removeEventListener(events[i],load,true);
      }
      if(idleId&&typeof cancelIdleCallback==='function'){
        cancelIdleCallback(idleId);
      }
      clearTimeout(timeoutId);
    }
    var opts={capture:true,passive:true};
    var events=['pointerdown','keydown','scroll','touchstart'];
    for(var i=0;i<events.length;i++){
      window.addEventListener(events[i],load,opts);
    }
    var idleId=0;
    var timeoutId=0;
    function armFallback(){
      timeoutId=setTimeout(load,${GTM_DEFERRED_LOAD_MS});
      if(typeof requestIdleCallback==='function'){
        idleId=requestIdleCallback(function(){load();},{timeout:${GTM_DEFERRED_LOAD_MS}});
      }
    }
    if(document.readyState==='complete'){armFallback();}
    else{window.addEventListener('load',armFallback,{once:true});}
  }
  captureClickIds();
  if(isPreview()||hasAcceptedConsent()){
    window.__rbxLoadGtm();
    return;
  }
  var tries=0;
  var timer=setInterval(function(){
    tries+=1;
    if(isPreview()){clearInterval(timer);window.__rbxLoadGtm();}
    if(tries>=25){clearInterval(timer);}
  },100);
  scheduleDeferredLoad();
})();
`.replace(/\n\s*/g, '');
}
