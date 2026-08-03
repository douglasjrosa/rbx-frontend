'use client';

import { useId, useState } from 'react';
import { GTM_EVENTS, trackGtmEvent } from '@/lib/analytics/data-layer';
import type { SeoFaqItem } from '@/lib/seo/priority-landing';

interface SeoFaqAccordionProps {
  faqs: SeoFaqItem[];
}

export default function SeoFaqAccordion({ faqs }: SeoFaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white md:text-3xl">
        Perguntas frequentes
      </h2>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div key={faq.question}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={
                    'flex w-full items-center justify-between gap-4 ' +
                    'px-4 py-4 text-left text-base font-semibold ' +
                    'text-rbx-accent transition hover:bg-amber-50/60 ' +
                    'md:px-5 md:text-lg'
                  }
                  onClick={() => {
                    const willOpen = !isOpen;
                    setOpenIndex(willOpen ? index : null);

                    if (willOpen) {
                      trackGtmEvent(GTM_EVENTS.SEO_FAQ_OPEN, {
                        event_location: 'seo_faq',
                        faq_question: faq.question,
                        faq_index: index,
                      });
                    }
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    className={
                      'shrink-0 text-rbx-brown transition ' +
                      (isOpen ? 'rotate-45' : '')
                    }
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={
                  'px-4 pb-4 text-sm leading-relaxed text-gray-700 ' +
                  'md:px-5 md:text-base'
                }
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
