import ButtonLink from '@/components/elements/button-link';
import Image from '@/components/elements/image';
import type { HomeCustomPackaging } from '@/lib/content/types';

interface HomeCustomPackagingProps {
  customPackaging: HomeCustomPackaging;
}

const SECTION_HEIGHT_CLASS = 'h-[530px]';
const CARD_HEIGHT_CLASS = 'h-[550px]';
const CARD_SHADOW_CLASS = 'shadow-[0_10px_28px_rgba(0,0,0,0.38)]';

export default function HomeCustomPackagingSection({
  customPackaging,
}: HomeCustomPackagingProps) {
  return (
    <section
      className={
        `relative z-20 overflow-visible bg-white pt-8 pb-0 ` +
        SECTION_HEIGHT_CLASS
      }
    >
      <div
        className={
          'container absolute left-1/2 top-8 z-10 w-[80%] ' +
          `-translate-x-1/2 !max-w-none px-4 sm:px-6 ${CARD_HEIGHT_CLASS}`
        }
      >
        <div
          className={
            'grid h-full grid-cols-1 items-stretch gap-8 ' +
            'rounded-[20px] bg-[#F3F3F3] p-[22px] ' +
            `${CARD_SHADOW_CLASS} md:grid-cols-2 md:gap-10`
          }
        >
          <div className="overflow-y-auto">
            <h2
              className={
                'mb-4 text-2xl font-bold leading-tight ' +
                'text-rbx-green-primary md:mb-6 md:text-[2.5rem]'
              }
            >
              {customPackaging.title}
            </h2>
            <div className="space-y-3 text-base leading-relaxed text-rbx-accent">
              {customPackaging.paragraphs.map((paragraph, index) => (
                <p key={`paragraph-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-col gap-4">
            <div className="min-h-0 flex-1 overflow-hidden rounded-[20px]">
              <Image
                media={customPackaging.image}
                className="h-full w-full object-cover"
                width={customPackaging.image.width}
                height={customPackaging.image.height}
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
            <div className="flex shrink-0 justify-center md:justify-end">
              <ButtonLink
                button={customPackaging.button}
                appearance="rbx-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
