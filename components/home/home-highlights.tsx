import Image from '@/components/elements/image';
import { HOME_SECTIONS } from '@/lib/home-sections';
import type { HomeHighlights, HomeStatCard } from '@/lib/content/types';

interface HomeHighlightsProps {
  highlights: HomeHighlights;
}

function StatCard({ stat }: { stat: HomeStatCard }) {
  const isWood = stat.variant === 'wood';

  const cardClass =
    'flex min-h-[10rem] flex-col items-center justify-center ' +
    'rounded-2xl px-6 py-8 text-center md:min-h-[11rem]';

  const content = (
    <>
      <p
        className={
          'mb-3 text-3xl font-bold leading-none md:text-4xl ' +
          (isWood ? 'text-gray-900' : '')
        }
      >
        {stat.value}
      </p>
      <p
        className="max-w-xs text-sm leading-snug md:text-base text-gray-700"
      >
        {stat.description}
      </p>
    </>
  );

  if (isWood) {
    return (
      <div
        className={`${cardClass} relative overflow-hidden shadow-md`}
      >
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundColor: '#658737',
            backgroundImage: "url('/images/wood-min.webp')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-rbx-brown-deep/59"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-center justify-center">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`${cardClass} bg-[#F3F3F3] text-gray-900`}>
      {content}
    </div>
  );
}

export default function HomeHighlightsSection({
  highlights,
}: HomeHighlightsProps) {
  return (
    <section
      id={HOME_SECTIONS.produtos}
      className="scroll-mt-[72px] w-full bg-white py-16 md:py-24"
    >
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {highlights.stats.map((stat, index) => (
            <StatCard key={`stat-${index}`} stat={stat} />
          ))}
        </div>

        <h2
          className={
            'mb-12 text-center text-3xl font-bold text-gray-900 ' +
            'md:text-4xl'
          }
        >
          {highlights.title}
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            {highlights.features.map((feature, index) => (
              <article
                key={`feature-${index}`}
                className={
                  'flex items-center gap-4 rounded-2xl bg-neutral-100 ' +
                  'p-4 md:gap-6 md:p-6'
                }
              >
                <div className="shrink-0">
                  <Image
                    media={feature.icon}
                    className="h-20 w-20 object-contain md:h-24 md:w-24"
                    width={96}
                    height={96}
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              media={highlights.sideImage}
              className="h-auto w-full object-cover"
              width={840}
              height={896}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
