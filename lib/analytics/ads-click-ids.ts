const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid'] as const;

export type AdsClickIdKey = (typeof CLICK_ID_KEYS)[number];

export type AdsClickIds = Partial<Record<AdsClickIdKey, string>>;

function storageKey(key: AdsClickIdKey): string {
  return `rbx_${key}`;
}

/** Persist Google Ads click IDs from the current URL (first-party). */
export function captureAdsClickIdsFromUrl(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const params = new URLSearchParams(window.location.search);

    for (const key of CLICK_ID_KEYS) {
      const value = params.get(key);
      if (value) {
        localStorage.setItem(storageKey(key), value);
      }
    }
  } catch {
    // Ignore storage / URL errors (private mode, etc.).
  }
}

export function getStoredAdsClickIds(): AdsClickIds {
  if (typeof window === 'undefined') {
    return {};
  }

  const ids: AdsClickIds = {};

  try {
    for (const key of CLICK_ID_KEYS) {
      const value = localStorage.getItem(storageKey(key));
      if (value) {
        ids[key] = value;
      }
    }
  } catch {
    return {};
  }

  return ids;
}
