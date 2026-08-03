'use client';

import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import {
  CALCULATOR_LAUNCH_ISO,
  CALCULATOR_LAUNCH_LABEL,
} from '@/lib/seo/calculator-launch';

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdownParts(nowMs: number): CountdownParts | null {
  const diff = new Date(CALCULATOR_LAUNCH_ISO).getTime() - nowMs;

  if (diff <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

const TEASER_IMAGES = [
  {
    src: '/images/calculadora/caixa_estruturada.webp',
    alt: 'Modelo de caixa estruturada',
  },
  {
    src: '/images/calculadora/engradado_reforcado.webp',
    alt: 'Modelo de engradado reforçado',
  },
  {
    src: '/images/calculadora/caixa_reforcada.webp',
    alt: 'Modelo de caixa reforçada',
  },
  {
    src: '/images/calculadora/stamp-export.webp',
    alt: 'Marcação HT para exportação',
  },
] as const;

function CountdownCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-[4.5rem] rounded-lg bg-white/15 px-3 py-2 text-center">
      <div className="text-2xl font-bold tabular-nums md:text-3xl">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs uppercase tracking-wide text-white/80">
        {label}
      </div>
    </div>
  );
}

function CountdownSkeleton() {
  return (
    <div className="flex flex-wrap gap-2" aria-hidden>
      {['Dias', 'Horas', 'Min', 'Seg'].map((label) => (
        <CountdownCell key={label} label={label} value={0} />
      ))}
    </div>
  );
}

export default function SeoCalculatorLaunchTeaser() {
  // Null until mount so SSR and hydration markup stay identical (React #418).
  const [parts, setParts] = useState<CountdownParts | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const tick = () => setParts(getCountdownParts(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="calculadora-lancamento"
      className={
        'overflow-hidden rounded-2xl bg-gradient-to-br from-rbx-brown ' +
        'to-rbx-brown-deep text-white shadow-lg'
      }
    >
      <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Em breve
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            Calculadora de embalagem — lançamento em{' '}
            {CALCULATOR_LAUNCH_LABEL}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/95 md:text-base">
            Em breve você escolhe o tipo (caixa, engradado ou palete), informa
            medidas e peso, indica se precisa de exportação HT e recebe
            indicação de modelo com preço e política de descontos — no próprio
            fluxo online.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/90 md:text-base">
            Enquanto isso, orçamento pelo WhatsApp com a mesma lógica técnica
            da fábrica.
          </p>

          <div className="mt-6" aria-live="polite">
            {!hasMounted ? (
              <CountdownSkeleton />
            ) : parts ? (
              <div className="flex flex-wrap gap-2">
                <CountdownCell label="Dias" value={parts.days} />
                <CountdownCell label="Horas" value={parts.hours} />
                <CountdownCell label="Min" value={parts.minutes} />
                <CountdownCell label="Seg" value={parts.seconds} />
              </div>
            ) : (
              <p className="rounded-lg bg-white/15 px-4 py-3 text-sm font-semibold">
                Lançamento disponível em breve no site institucional.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {TEASER_IMAGES.map((image) => (
            <div
              key={image.src}
              className="relative aspect-square overflow-hidden rounded-xl bg-white/10"
            >
              <NextImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 40vw, 20vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
