import Image from './image';
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
      <a
        href={buildWhatsAppUrl(phone, message)}
        className="buttonizer fixed bottom-24 right-5 block w-[90px]"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Botão Whatsapp"
      >
        <Image
          media={media}
          width={90}
          height={90}
          alternativeText="Ícone do Whatsapp"
        />
      </a>
    </div>
  );
}
