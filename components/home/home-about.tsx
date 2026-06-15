import Image from '@/components/elements/image';
import type { HomeAbout } from '@/lib/content/types';

interface HomeAboutProps {
  about: HomeAbout;
}

export default function HomeAboutSection({ about }: HomeAboutProps) {
  return (
    <section className="relative py-12 md:py-16">
      <div className="absolute inset-0 bg-rbx-brown-panel" aria-hidden />
      <div
        className={
          'absolute inset-0 bg-repeat-y opacity-[0.19] ' +
          'bg-[length:100%_auto]'
        }
        style={{ backgroundImage: "url('/images/wood-pannel.jpg')" }}
        aria-hidden
      />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              className={
                'mb-6 text-3xl font-extrabold leading-tight text-white ' +
                'md:text-[2.6875rem]'
              }
            >
              {about.title}
            </h2>
            <p className="text-lg leading-relaxed text-white">
              {about.description}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              media={about.image}
              className="h-auto w-full object-cover"
              width={about.image.width}
              height={about.image.height}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
