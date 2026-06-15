import ButtonLink from '@/components/elements/button-link';
import type { HomeHero } from '@/lib/content/types';

interface HomeHeroProps {
  hero: HomeHero;
}

export default function HomeHeroSection({ hero }: HomeHeroProps) {
  return (
    <section
      id="home-hero"
      className="scroll-mt-[72px] relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
    >
      <div
        className={
          'container relative z-10 flex min-h-screen items-center ' +
          'pt-24 pb-16'
        }
      >
        <div className="max-w-xl text-white">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            {hero.title}
          </h1>
          <p className="mb-8 text-base leading-relaxed md:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink
              button={hero.primaryButton}
              appearance="white-outline"
            />
            <ButtonLink
              button={hero.secondaryButton}
              appearance="white-outline"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
