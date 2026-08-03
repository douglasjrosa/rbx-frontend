'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { GTM_EVENTS, trackGtmEvent } from '@/lib/analytics/data-layer';
import { SEO_SOLUTION_CARDS } from '@/lib/seo/priority-landing';

export default function SeoSolutionCards() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Tipos de embalagem
        </h2>
        <p className="mt-2 max-w-2xl text-white/90">
          Escolha o caminho certo para o seu produto — comparamos proteção e
          custo na cotação.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SEO_SOLUTION_CARDS.map((card) => (
          <li key={card.href + card.title}>
            <Link
              href={card.href}
              className={
                'group flex h-full flex-col overflow-hidden rounded-xl ' +
                'border border-gray-200 bg-white shadow-sm transition ' +
                'hover:border-rbx-brown/40 hover:shadow-md'
              }
              onClick={() => {
                trackGtmEvent(GTM_EVENTS.SEO_SOLUTION_CARD_CLICK, {
                  event_location: 'seo_solution_cards',
                  link_url: card.href,
                  card_title: card.title,
                });
              }}
            >
              <div className="relative aspect-[4/3] bg-gray-50">
                <NextImage
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  className="object-contain p-3 transition group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 px-4 py-3">
                <h3 className="text-lg font-semibold text-rbx-brown">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
