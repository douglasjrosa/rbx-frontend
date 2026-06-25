import GoogleMapEmbed from '@/components/elements/google-map-embed';
import Image from '@/components/elements/image';
import { siteConfig } from '@/content/site';
import { HOME_SECTIONS } from '@/lib/home-sections';
import {
  getRibermaxDirectionsUrl,
  getRibermaxMapEmbedUrl,
  RIBERMAX_LOCATION,
} from '@/lib/contact-location';
import { SECTION_SCROLL_MARGIN_CLASS } from '@/lib/navbar-offset';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { HomeContact } from '@/lib/content/types';
import { FaWhatsapp } from 'react-icons/fa';

interface HomeContactProps {
  contact: HomeContact;
}

const SPECIALIST_CARD_SHADOW_CLASS =
  'shadow-[0_8px_24px_rgba(0,0,0,0.12)]';

export default function HomeContactSection({ contact }: HomeContactProps) {
  const mapEmbedUrl = getRibermaxMapEmbedUrl();
  const directionsUrl = getRibermaxDirectionsUrl();
  const { whatsappPhone, whatsappMsg } = siteConfig;
  const whatsappUrl = buildWhatsAppUrl(whatsappPhone, whatsappMsg);

  return (
    <section
      id={HOME_SECTIONS.contato}
      className={`${SECTION_SCROLL_MARGIN_CLASS} bg-[#e8eef3] py-12 md:py-16`}
    >
      <div className="container">
        <h2
          className={
            'mb-8 text-3xl font-bold text-rbx-accent md:text-4xl'
          }
        >
          {contact.doubtsTitle}
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <article
            className={
              'rounded-2xl bg-[#d5dde6] px-8 py-10 md:px-10 md:py-12 ' +
              SPECIALIST_CARD_SHADOW_CLASS
            }
          >
            <h3
              className={
                'mb-4 text-2xl font-bold text-rbx-accent md:text-3xl'
              }
            >
              {contact.specialistTitle}
            </h3>
            <p
              className={
                'text-lg leading-relaxed text-rbx-accent md:text-xl ' +
                'md:leading-8'
              }
            >
              {contact.doubtsDescription}
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl bg-white">
              <Image
                media={contact.specialistImage}
                className="h-auto w-full object-cover"
                width={contact.specialistImage.width}
                height={contact.specialistImage.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                'mt-6 inline-flex w-full items-center ' +
                'justify-center gap-2 rounded-md bg-rbx-green-primary ' +
                'px-6 py-3 text-lg font-semibold text-white ' +
                'transition-colors hover:bg-rbx-green-secondary'
              }
            >
              <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden />
              {contact.whatsappButtonLabel}
            </a>
          </article>

          <div>
            <h3
              className={
                'mb-4 text-2xl font-bold text-rbx-accent md:text-3xl'
              }
            >
              {contact.visitTitle}
            </h3>
            <p
              className={
                'mb-6 text-lg leading-relaxed text-rbx-accent ' +
                'md:text-xl md:leading-8'
              }
            >
              {contact.visitDescription}
            </p>

            <GoogleMapEmbed
              title={`Mapa de localização da ${RIBERMAX_LOCATION.businessName}`}
              src={mapEmbedUrl}
              className="shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            />

            <p className="mt-4 text-lg leading-relaxed text-rbx-accent">
              <strong>Endereço:</strong> {contact.address}
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                'mt-2 inline-block text-base font-semibold ' +
                'text-rbx-green-dark underline hover:text-rbx-green'
              }
            >
              Como chegar no Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
