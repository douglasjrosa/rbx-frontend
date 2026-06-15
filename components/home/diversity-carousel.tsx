'use client';

import { useCallback, useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Image from '@/components/elements/image';
import CustomLink from '@/components/elements/custom-link';
import type { HomeDiversityCard } from '@/lib/content/types';

const AUTOPLAY_INTERVAL_MS = 3500;
const SLIDE_TRANSITION_MS = 300;
const SLIDE_GAP_CLASS = 'px-3 md:px-4';

interface DiversityCarouselProps {
  cards: HomeDiversityCard[];
}

function CarouselSlide({ card }: { card: HomeDiversityCard }) {
  return (
    <article
      className={
        'grid min-h-[320px] grid-cols-1 overflow-hidden ' +
        'rounded-[21px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] ' +
        'md:min-h-[300px] md:grid-cols-2'
      }
    >
      <div
        className={
          'flex flex-col justify-center gap-4 bg-white p-8 ' +
          'md:rounded-l-[21px] md:p-10'
        }
      >
        <h3
          className={
            'text-2xl font-bold leading-tight text-rbx-green-primary ' +
            'md:text-[2rem]'
          }
        >
          {card.title}
        </h3>
        <p className="text-base leading-relaxed text-rbx-accent">
          {card.description}
        </p>
        <div className="pt-2 md:text-right">
          <CustomLink link={card.link}>
            <span
              className={
                'inline-flex items-center gap-3 rounded-[20px] ' +
                'bg-rbx-green-secondary px-4 py-2.5 text-sm font-semibold ' +
                'text-white transition-colors hover:bg-[#FFD983] ' +
                'hover:text-rbx-accent md:px-5 md:py-3 md:text-base'
              }
            >
              <MdChevronRight className="h-5 w-5 shrink-0" aria-hidden />
              {card.link.text}
            </span>
          </CustomLink>
        </div>
      </div>

      <div className="relative min-h-[220px] md:min-h-full">
        <Image
          media={card.image}
          className="h-full w-full object-cover md:rounded-r-[21px]"
          width={card.image.width}
          height={card.image.height}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </article>
  );
}

export default function DiversityCarousel({ cards }: DiversityCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      const total = cards.length;
      setActiveIndex(((index % total) + total) % total);
    },
    [cards.length],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || cards.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, goNext, cards.length]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrossel de embalagens"
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="overflow-hidden px-10 md:px-14">
        <div
          className="flex"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: `transform ${SLIDE_TRANSITION_MS}ms ease-in-out`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={`diversity-slide-${index}`}
              className={`w-full shrink-0 ${SLIDE_GAP_CLASS}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${cards.length}`}
              aria-hidden={index !== activeIndex}
            >
              <CarouselSlide card={card} />
            </div>
          ))}
        </div>
      </div>

      {cards.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className={
              'absolute left-0 top-1/2 z-10 -translate-y-1/2 ' +
              'rounded-full p-1 text-white transition-opacity hover:opacity-80'
            }
            aria-label="Anterior"
          >
            <MdChevronLeft className="h-10 w-10" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className={
              'absolute right-0 top-1/2 z-10 -translate-y-1/2 ' +
              'rounded-full p-1 text-white transition-opacity hover:opacity-80'
            }
            aria-label="Próximo"
          >
            <MdChevronRight className="h-10 w-10" aria-hidden />
          </button>

          <div
            className="mt-6 flex justify-center gap-2"
            role="tablist"
            aria-label="Paginação do carrossel"
          >
            {cards.map((_, index) => (
              <button
                key={`diversity-dot-${index}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Ir para slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={
                  'h-2.5 w-2.5 rounded-full transition-colors ' +
                  (index === activeIndex
                    ? 'bg-rbx-accent'
                    : 'bg-white/50 hover:bg-white/70')
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
