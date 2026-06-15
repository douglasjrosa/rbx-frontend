import FeatureBulletList from '@/components/elements/feature-bullet-list';
import Image from '@/components/elements/image';
import DiversityCarousel from '@/components/home/diversity-carousel';
import { HOME_SECTIONS } from '@/lib/home-sections';
import { SECTION_SCROLL_MARGIN_CLASS } from '@/lib/navbar-offset';
import type { HomeDiversity } from '@/lib/content/types';
import { IMAGE_CARD_SHADOW_CLASS } from '@/lib/image-card-styles';

interface HomeDiversityProps {
  diversity: HomeDiversity;
}

const WHEN_IMAGE_CARD_PADDING_PX = 100;

export default function HomeDiversitySection({
  diversity,
}: HomeDiversityProps) {
  return (
    <>
      <section className="bg-rbx-white bg-auto bg-repeat py-12 md:py-16">
        <div className="container">
          <div className="mb-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2
                className={
                  'mb-6 text-2xl font-bold text-rbx-green-primary ' +
                  'md:text-3xl'
                }
              >
                {diversity.whenTitle}
              </h2>
              <FeatureBulletList
                items={diversity.whenItems}
                variant="danger"
              />
            </div>
            <div
              className={
                `overflow-hidden rounded-2xl bg-white ` +
                `${IMAGE_CARD_SHADOW_CLASS}`
              }
              style={{ padding: WHEN_IMAGE_CARD_PADDING_PX }}
            >
              <Image
                media={diversity.whenImage}
                className="h-auto w-full object-cover"
                width={diversity.whenImage.width}
                height={diversity.whenImage.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div
            id={HOME_SECTIONS.informacoes}
            className={SECTION_SCROLL_MARGIN_CLASS}
            aria-hidden
          />
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundColor: '#D6D6D6',
            backgroundImage: "url('/images/pattern_01.png')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#00000014' }}
          aria-hidden
        />

        <div className="container relative z-10">
          <div className="mx-auto mb-10 max-w-4xl text-center text-white">
            <h2
              className={
                'mb-4 text-3xl font-extrabold leading-tight ' +
                'md:text-5xl'
              }
            >
              {diversity.title}
            </h2>
            <div className="space-y-4">
              {diversity.paragraphs.map((paragraph, index) => (
                <p
                  key={`diversity-paragraph-${index}`}
                  className={
                    'text-xl leading-loose tracking-wide md:text-2xl ' +
                    'md:leading-9'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <DiversityCarousel cards={diversity.cards} />
        </div>
      </section>
    </>
  );
}
