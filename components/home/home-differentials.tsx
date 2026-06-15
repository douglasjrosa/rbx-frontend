import { MdCheck } from 'react-icons/md';
import Image from '@/components/elements/image';
import type { HomeDifferentials } from '@/lib/content/types';

interface HomeDifferentialsProps {
  differentials: HomeDifferentials;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`item-${index}`}
          className={
            'flex items-start gap-3 rounded-xl border border-gray-100 ' +
            'bg-gray-50 px-4 py-3 transition-colors hover:bg-emerald-50/60'
          }
        >
          <span
            className={
              'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center ' +
              'rounded-full bg-rbx-green/15 text-rbx-green-dark'
            }
          >
            <MdCheck className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base leading-relaxed text-rbx-accent md:text-lg">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
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
            <BulletList items={differentials.differentialsItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
