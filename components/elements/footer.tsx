import Image from './image';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { siteConfig } from '@/content/site';
import type { FooterSocialIcon } from '@/lib/content/types';

const SOCIAL_ICON_COMPONENTS = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
} as const satisfies Record<
  FooterSocialIcon,
  typeof FaFacebookF | typeof FaLinkedinIn | typeof FaInstagram
>;

const FOOTER_HEADING_CLASS = 'text-lg font-medium text-[#b5d08a]';

export default function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="bg-[#1f1f1f] text-white">
      <div className="container py-12 md:py-14">
        <div
          className={
            'grid grid-cols-1 gap-10 md:grid-cols-3 md:justify-around ' +
            'md:gap-8 lg:gap-12'
          }
        >
          <div className="flex flex-col items-center gap-2.5 text-center">
            <Image
              media={footer.logo}
              className="h-auto w-[45%] md:w-[62%]"
              width={footer.logo.width}
              height={footer.logo.height}
              sizes="(max-width: 768px) 45vw, 192px"
            />
            <p
              className={
                'max-w-sm text-[15px] leading-relaxed text-white'
              }
            >
              {footer.tagline}
            </p>
            <ul className="flex items-center justify-center gap-3.5 pt-1">
              {footer.socialLinks.map((social) => {
                const Icon = SOCIAL_ICON_COMPONENTS[social.icon];

                return (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={
                        'flex h-10 w-10 items-center justify-center ' +
                        'rounded-full bg-rbx-green-secondary text-rbx-accent ' +
                        'transition-opacity hover:opacity-90'
                      }
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className={`${FOOTER_HEADING_CLASS} mb-4`}>
              {footer.contactsTitle}
            </h2>
            <div className="space-y-5">
              {footer.contacts.map((contact) => (
                <div
                  key={contact.email}
                  className="text-base leading-relaxed"
                >
                  <p>{contact.label}</p>
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className={
                        contact.trackWhatsappConversion
                          ? 'buttonizer hover:underline'
                          : 'hover:underline'
                      }
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={FOOTER_HEADING_CLASS}>
              {footer.certificationTitle}
            </h2>
            <p className="text-base leading-relaxed">
              <a
                href={footer.certificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {footer.certificationLabel}
              </a>
            </p>
            <a
              href={footer.certificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block w-[70%] max-w-xs"
            >
              <Image
                media={footer.certificationImage}
                className="h-auto w-full"
                width={footer.certificationImage.width}
                height={footer.certificationImage.height}
                sizes="(max-width: 768px) 70vw, 233px"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
