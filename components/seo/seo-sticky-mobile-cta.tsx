'use client';

import TrackedAnchor from '@/components/analytics/tracked-anchor';
import { GTM_EVENTS } from '@/lib/analytics/data-layer';
import { siteConfig } from '@/content/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface SeoStickyMobileCtaProps {
  label: string;
}

export default function SeoStickyMobileCta({
  label,
}: SeoStickyMobileCtaProps) {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappPhone,
    siteConfig.whatsappMsg,
  );

  return (
    <div
      className={
        'fixed inset-x-0 bottom-0 z-40 border-t border-rbx-brown/30 ' +
        'bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] ' +
        'backdrop-blur md:hidden'
      }
    >
      <TrackedAnchor
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        eventName={GTM_EVENTS.WHATSAPP_CLICK}
        eventLocation="seo_sticky_mobile"
        className={
          'flex w-full items-center justify-center rounded-md ' +
          'bg-rbx-brown px-4 py-3 text-sm font-semibold uppercase ' +
          'tracking-wide text-white'
        }
      >
        {label}
      </TrackedAnchor>
    </div>
  );
}
