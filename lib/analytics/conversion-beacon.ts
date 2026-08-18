import { getStoredAdsClickIds } from '@/lib/analytics/ads-click-ids';
import {
  COOKIE_CONSENT_STORAGE_KEY,
  WHATSAPP_CLICK_EVENT,
} from '@/lib/analytics/config';
import { isTrackingEnabled } from '@/lib/analytics/is-tracking-enabled';

export const CONVERSION_BEACON_PATH = '/api/analytics/conversion/';

export const CONVERSION_BEACON_WHATSAPP_EVENT = WHATSAPP_CLICK_EVENT;

export type ConversionBeaconEvent = typeof CONVERSION_BEACON_WHATSAPP_EVENT;

type ConversionBeaconPayload = {
  event: ConversionBeaconEvent;
  page_path?: string;
  page_location?: string;
  page_title?: string;
  event_location?: string;
  link_url?: string;
  consent_status: 'accepted' | 'denied' | 'unknown';
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  client_id?: string;
  timestamp_ms: number;
};

function readConsentStatus(): 'accepted' | 'denied' | 'unknown' {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (stored === 'accepted' || stored === 'denied') {
      return stored;
    }
  } catch {
    // Ignore storage errors.
  }

  return 'unknown';
}

function buildClientId(): string | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const key = 'rbx_ga_client_id';
    const existing = localStorage.getItem(key);
    if (existing) {
      return existing;
    }

    const created = `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
    localStorage.setItem(key, created);
    return created;
  } catch {
    return undefined;
  }
}

/**
 * Fire-and-forget backup for critical conversions when browser tags may be
 * blocked, late, or gated by cookie consent.
 */
export function sendConversionBeacon(
  event: ConversionBeaconEvent,
  params: {
    event_location?: string;
    link_url?: string;
  } = {},
): void {
  if (typeof window === 'undefined' || !isTrackingEnabled()) {
    return;
  }

  const clickIds = getStoredAdsClickIds();

  const payload: ConversionBeaconPayload = {
    event,
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
    event_location: params.event_location,
    link_url: params.link_url,
    consent_status: readConsentStatus(),
    gclid: clickIds.gclid,
    gbraid: clickIds.gbraid,
    wbraid: clickIds.wbraid,
    client_id: buildClientId(),
    timestamp_ms: Date.now(),
  };

  const body = JSON.stringify(payload);

  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      const queued = navigator.sendBeacon(CONVERSION_BEACON_PATH, blob);
      if (queued) {
        return;
      }
    }
  } catch {
    // Fall through to fetch.
  }

  void fetch(CONVERSION_BEACON_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Best-effort backup — never block navigation.
  });
}
