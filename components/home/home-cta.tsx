import ButtonLink from '@/components/elements/button-link';
import type { HomeCta } from '@/lib/content/types';

interface HomeCtaProps {
  cta: HomeCta;
}

export default function HomeCtaSection({ cta }: HomeCtaProps) {
  return (
    <section className="bg-rbx-green-primary py-12 md:py-16">
      <div className="container max-w-4xl text-center">
        <p className="mb-8 text-lg leading-relaxed text-white md:text-xl">
          {cta.text}
        </p>
        <ButtonLink button={cta.button} appearance="white-outline" />
      </div>
    </section>
  );
}
