import Image from '@/components/elements/image';
import { HOME_SECTIONS } from '@/lib/home-sections';
import type { HomeDifferentials } from '@/lib/content/types';

interface HomeDifferentialsProps {
  differentials: HomeDifferentials;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-rbx-accent">
      {items.map((item, index) => (
        <li key={`item-${index}`} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function HomeDifferentialsSection({
  differentials,
}: HomeDifferentialsProps) {
  return (
    <section
      id={HOME_SECTIONS.informacoes}
      className="scroll-mt-[72px] bg-white py-12 md:py-16"
    >
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
          <div className="space-y-8">
            <div>
              <h2
                className={
                  'mb-4 text-2xl font-bold text-rbx-green-primary ' +
                  'md:text-3xl'
                }
              >
                {differentials.differentialsTitle}
              </h2>
              <BulletList items={differentials.differentialsItems} />
            </div>
            <div>
              <h2
                className={
                  'mb-4 text-2xl font-bold text-rbx-green-primary ' +
                  'md:text-3xl'
                }
              >
                {differentials.whenTitle}
              </h2>
              <BulletList items={differentials.whenItems} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
