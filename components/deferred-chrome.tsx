'use client';

import dynamic from 'next/dynamic';
import { siteConfig } from '@/content/site';

const WhatsAppButton = dynamic(
  () => import('@/components/elements/whatsapp-button'),
  { ssr: false },
);

const CookieConsentBanner = dynamic(
  () => import('@/components/elements/cookie-consent-banner'),
  { ssr: false },
);

export default function DeferredChrome() {
  const { cookieConsent, whatsappImage, whatsappPhone, whatsappMsg } =
    siteConfig;

  return (
    <>
      {whatsappImage && whatsappPhone && (
        <WhatsAppButton
          media={whatsappImage}
          phone={whatsappPhone}
          message={whatsappMsg}
        />
      )}
      {cookieConsent && <CookieConsentBanner data={cookieConsent} />}
    </>
  );
}
