import {
  trackGoogleAdsWhatsAppConversion,
} from '@/lib/analytics/google-ads-conversion';

export const GTM_EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  EMAIL_CLICK: 'email_click',
  MAPS_DIRECTIONS_CLICK: 'maps_directions_click',
  CTA_CLICK: 'cta_click',
  CALCULATOR_TEASER_CLICK: 'calculator_teaser_click',
  SEO_SOLUTION_CARD_CLICK: 'seo_solution_card_click',
  SEO_FAQ_OPEN: 'seo_faq_open',
  COOKIE_CONSENT: 'cookie_consent',
  VIRTUAL_PAGE_VIEW: 'virtual_page_view',
  REPORT_SUBMITTED: 'report_submitted',
} as const;

export type GtmEventName = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS];

export type DataLayerPayload = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    dataLayer?: DataLayerPayload[];
    __rbxLoadGtm?: () => void;
    __rbxGtmLoaded?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

function getPageContext(): {
  page_path?: string;
  page_location?: string;
  page_title?: string;
} {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  };
}

export function pushDataLayer(payload: DataLayerPayload): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackGtmEvent(
  event: GtmEventName,
  params: Omit<DataLayerPayload, 'event'> = {},
): void {
  pushDataLayer({
    event,
    ...getPageContext(),
    ...params,
  });

  if (event === GTM_EVENTS.WHATSAPP_CLICK) {
    trackGoogleAdsWhatsAppConversion();
  }
}
