'use client';

import Image from './image';
import TrackedAnchor from '@/components/analytics/tracked-anchor';
import { GTM_EVENTS } from '@/lib/analytics/data-layer';
import type { MediaAsset } from '@/lib/content/types';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  media: MediaAsset;
  phone: string;
  message: string;
}

export default function WhatsAppButton({
  media,
  phone,
  message,
}: WhatsAppButtonProps) {
  return (
    <div className="z-30">
      <TrackedAnchor
        href={buildWhatsAppUrl(phone, message)}
        className="fixed bottom-24 right-5 block w-[90px]"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Botão Whatsapp"
        eventName={GTM_EVENTS.WHATSAPP_CLICK}
        eventLocation="floating_button"
      >
        <Image
          media={media}
          width={90}
          height={90}
          sizes="90px"
          alternativeText="Ícone do Whatsapp"
        />
      </TrackedAnchor>
    </div>
  );
}
