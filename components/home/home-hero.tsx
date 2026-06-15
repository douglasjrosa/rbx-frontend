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
          'relative z-10 flex min-h-screen w-full items-center ' +
          'px-4 pt-24 pb-16 sm:px-6 lg:px-8'
        }
      >
        <div
          className={
            'ml-8 w-full max-w-xs text-white sm:ml-12 sm:max-w-sm ' +
            'md:ml-20 md:max-w-md lg:ml-28 lg:max-w-[26rem]'
          }
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            {hero.title}
          </h1>
          <p className="mb-8 text-base leading-relaxed md:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-col gap-4">
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
