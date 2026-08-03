'use client';

import TrackedAnchor from '@/components/analytics/tracked-anchor';
import { GTM_EVENTS } from '@/lib/analytics/data-layer';
import type { PriorityLandingConfig } from '@/lib/seo/priority-landing';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { siteConfig } from '@/content/site';

interface SeoConversionHeroProps {
  title: string;
  config: PriorityLandingConfig;
}

export default function SeoConversionHero({
  title,
  config,
}: SeoConversionHeroProps) {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappPhone,
    siteConfig.whatsappMsg,
  );

  return (
    <section
      className={
        'rounded-2xl bg-gradient-to-br from-rbx-green-primary ' +
        'to-rbx-green-dark px-6 py-8 text-white shadow-lg md:px-10 md:py-12'
      }
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
        Ribermax Embalagens
      </p>
      <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg">
        {config.heroLead}
      </p>
      <ul className="mt-6 space-y-2 text-sm md:text-base">
        {config.heroBullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedAnchor
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          eventName={GTM_EVENTS.WHATSAPP_CLICK}
          eventLocation="seo_hero"
          className={
            'inline-flex items-center justify-center rounded-md ' +
            'bg-white px-6 py-3 text-sm font-semibold uppercase ' +
            'tracking-wide text-rbx-green-primary transition ' +
            'hover:bg-amber-50'
          }
        >
          Orçar no WhatsApp
        </TrackedAnchor>
        <TrackedAnchor
          href="#calculadora-lancamento"
          eventName={GTM_EVENTS.CALCULATOR_TEASER_CLICK}
          eventLocation="seo_hero"
          className={
            'inline-flex items-center justify-center rounded-md ' +
            'border-2 border-white px-6 py-3 text-sm font-semibold ' +
            'uppercase tracking-wide text-white transition ' +
            'hover:bg-white/10'
          }
        >
          Calculadora em breve
        </TrackedAnchor>
      </div>
    </section>
  );
}
