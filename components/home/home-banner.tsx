import type { HomeBanner } from '@/lib/content/types';

interface HomeBannerProps {
  banner: HomeBanner;
}

export default function HomeBannerSection({ banner }: HomeBannerProps) {
  return (
    <section className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-rbx-porto bg-fixed bg-cover bg-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      <div
        className={
          'relative z-10 flex min-h-screen items-center ' +
          'justify-center px-4'
        }
      >
        <h2
          className={
            'max-w-4xl text-center text-3xl font-semibold leading-tight ' +
            'text-white whitespace-pre-line md:text-5xl'
          }
        >
          {banner.title}
        </h2>
      </div>
    </section>
  );
}
