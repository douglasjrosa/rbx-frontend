import Image from '@/components/elements/image';
import FeatureBulletList from '@/components/elements/feature-bullet-list';
import type { HomeDifferentials } from '@/lib/content/types';

interface HomeDifferentialsProps {
  differentials: HomeDifferentials;
}

export default function HomeDifferentialsSection({
  differentials,
}: HomeDifferentialsProps) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-2xl">
            <Image
              media={differentials.image}
              className="h-auto w-full object-cover"
              width={differentials.image.width}
              height={differentials.image.height}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2
              className={
                'mb-6 text-2xl font-bold text-rbx-green-primary ' +
                'md:text-3xl'
              }
            >
              {differentials.differentialsTitle}
            </h2>
            <FeatureBulletList items={differentials.differentialsItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
