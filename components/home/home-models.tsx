import ButtonLink from '@/components/elements/button-link';
import Image from '@/components/elements/image';
import { HOME_SECTIONS } from '@/lib/home-sections';
import type { HomeModels, HomeProductModel } from '@/lib/content/types';

interface HomeModelsProps {
  models: HomeModels;
}

function SectionDivider() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="relative block h-12 w-full md:h-16"
        aria-hidden
      >
        <path
          d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"
          className="fill-white"
        />
      </svg>
    </div>
  );
}

function ModelCard({ model }: { model: HomeProductModel }) {
  return (
    <article
      className={
        'flex h-full flex-col overflow-hidden rounded-[20px] ' +
        'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
      }
    >
      <div className="px-2 pt-5">
        <Image
          media={model.image}
          className="mx-auto h-auto w-full max-w-[300px] object-contain"
          width={300}
          height={273}
        />
      </div>
      <h3
        className={
          'px-5 text-xl font-extrabold leading-tight ' +
          'text-rbx-green-primary'
        }
      >
        {model.title}
      </h3>
      <div className="mx-5 my-3 border-t border-gray-300" />
      <ul
        className={
          'space-y-1 px-5 pb-5 text-[15px] leading-snug ' +
          'text-gray-900'
        }
      >
        {model.specs.map((spec, index) => (
          <li key={`spec-${index}`}>
            <strong>{spec.label}:</strong> {spec.value}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function HomeModelsSection({ models }: HomeModelsProps) {
  return (
    <section
      id={HOME_SECTIONS.produtos}
      className="scroll-mt-[72px] relative pb-16 pt-10 md:pb-20 md:pt-12"
    >
      <div
        className="absolute inset-0 bg-fixed bg-center bg-repeat-y"
        style={{
          backgroundImage: "url('/images/wood-pannel.jpg')",
          backgroundSize: '100% auto',
        }}
        aria-hidden
      />

      <div className="container relative z-10 flex flex-col items-center gap-5">
        <div
          className={
            'relative w-full overflow-hidden rounded-lg bg-white ' +
            'px-6 py-6 md:px-8 md:py-7'
          }
        >
          <div
            className={
              'pointer-events-none absolute inset-y-0 left-0 w-40 ' +
              'bg-left bg-no-repeat md:w-52'
            }
            style={{
              backgroundImage: "url('/images/green-wallpaper.webp')",
              backgroundSize: 'auto 100%',
            }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col items-center">
            <h2
              className={
                'text-center text-3xl font-extrabold leading-tight ' +
                'text-rbx-green-primary md:text-[2.8125rem]'
              }
            >
              {models.title}
            </h2>
            <p
              className={
                'mt-4 max-w-[74%] rounded-lg bg-white/80 px-2.5 py-2.5 ' +
                'text-center text-base leading-relaxed text-[#4B1E04] ' +
                'md:text-lg'
              }
            >
              {models.description}
            </p>
          </div>
        </div>

        <div
          className={
            'grid w-full grid-cols-1 gap-5 sm:grid-cols-2 ' +
            'xl:grid-cols-4'
          }
        >
          {models.models.map((model, index) => (
            <ModelCard key={`model-${index}`} model={model} />
          ))}
        </div>

        <div className="pt-2 text-center">
          <ButtonLink
            button={models.button}
            appearance="rbx-primary"
          />
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
