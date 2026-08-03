export const GTM_EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  EMAIL_CLICK: 'email_click',
  MAPS_DIRECTIONS_CLICK: 'maps_directions_click',
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
    __rbxLoadGtm?: (reason?: string) => void;
    __rbxGtmLoaded?: boolean;
    __rbxDbg?: (
      hypothesisId: string,
      message: string,
      data?: Record<string, unknown>,
    ) => void;
    gtag?: (...args: unknown[]) => void;
  }
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
  pushDataLayer({ event, ...params });
}
