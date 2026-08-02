'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GTM_EVENTS, trackGtmEvent } from '@/lib/analytics/data-layer';
import { isTrackingEnabled } from '@/lib/analytics/is-tracking-enabled';
import { getStoredCookieConsent } from '@/lib/cookie-consent';

/**
 * Pushes SPA navigations to the dataLayer after the first page load.
 * Initial page_view is handled by the GA4 Configuration tag in GTM.
 */
export default function AnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isTrackingEnabled() || getStoredCookieConsent() !== 'accepted') {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    trackGtmEvent(GTM_EVENTS.VIRTUAL_PAGE_VIEW, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
