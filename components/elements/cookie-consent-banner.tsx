'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import {
  getStoredCookieConsent,
  storeCookieConsent,
  type CookieConsentStatus,
} from '@/lib/cookie-consent';
import type { SiteConfig } from '@/lib/content/types';

type CookieConsentConfig = SiteConfig['cookieConsent'];

interface CookieConsentBannerProps {
  data: CookieConsentConfig;
}

export default function CookieConsentBanner({
  data,
}: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!getStoredCookieConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status: CookieConsentStatus) => {
    storeCookieConsent(status);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="cmplz-cookiebanner-container"
      className={
        'fixed bottom-2.5 right-2.5 z-40 w-[calc(100vw-20px)] ' +
        'max-w-[526px]'
      }
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-message"
        className={
          'rounded-xl border border-[#f2f2f2] bg-white p-5 shadow-xl ' +
          'text-[#222222]'
        }
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2
            id="cookie-consent-title"
            className="flex-1 text-center text-[15px] font-bold leading-snug"
          >
            {data.title}
          </h2>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="shrink-0 text-[#222222] hover:opacity-70"
            aria-label="Fechar diálogo"
          >
            <MdClose className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p
          id="cookie-consent-message"
          className="mb-4 text-left text-[12px] leading-[1.5]"
        >
          {data.message}
        </p>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => handleConsent('accepted')}
            className={
              'flex-1 rounded-md border border-[#1E73BE] bg-[#1E73BE] ' +
              'px-4 py-2.5 text-[15px] font-medium text-white ' +
              'hover:opacity-90'
            }
          >
            {data.acceptLabel}
          </button>
          <button
            type="button"
            onClick={() => handleConsent('denied')}
            className={
              'flex-1 rounded-md border border-[#f2f2f2] bg-[#f9f9f9] ' +
              'px-4 py-2.5 text-[15px] font-medium text-[#222222] ' +
              'hover:bg-[#f2f2f2]'
            }
          >
            {data.denyLabel}
          </button>
        </div>

        <div className="text-center">
          <Link
            href={data.policyUrl}
            className="text-[12px] text-[#1E73BE] underline hover:opacity-80"
          >
            {data.policyLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
