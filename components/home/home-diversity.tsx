import Image from '@/components/elements/image';
import CustomLink from '@/components/elements/custom-link';
import { HOME_SECTIONS } from '@/lib/home-sections';
import type { HomeDiversity, HomeDiversityCard } from '@/lib/content/types';

interface HomeDiversityProps {
  diversity: HomeDiversity;
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

function DiversityCard({ card }: { card: HomeDiversityCard }) {
  return (
    <article className="card-rbx flex h-full flex-col text-left">
      <div className="mb-4 overflow-hidden rounded-lg">
        <Image
          media={card.image}
          className="h-auto w-full object-cover"
          width={card.image.width}
          height={card.image.height}
        />
      </div>
      <h3 className="mb-3 text-xl font-bold text-rbx-green-primary">
        {card.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700">
        {card.description}
      </p>
      <CustomLink link={card.link}>
        <span className="text-sm font-semibold text-sky-600 hover:underline">
          {card.link.text}
        </span>
      </CustomLink>
    </article>
  );
}

export default function HomeDiversitySection({
  diversity,
}: HomeDiversityProps) {
  return (
    <section className="bg-rbx-white bg-cover py-12 md:py-16">
      <div className="container">
        <div className="mb-10">
          <h2
            className={
              'mb-4 text-2xl font-bold text-rbx-green-primary ' +
              'md:text-3xl'
            }
          >
            {diversity.whenTitle}
          </h2>
          <BulletList items={diversity.whenItems} />
        </div>

        <div
          id={HOME_SECTIONS.informacoes}
          className="scroll-mt-[72px]"
          aria-hidden
        />

        <div className="mb-10 text-center">
          <h2
            className={
              'mb-4 text-3xl font-bold text-rbx-green-primary md:text-4xl'
            }
          >
            {diversity.title}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-700 md:text-lg">
            {diversity.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {diversity.cards.map((card, index) => (
            <DiversityCard key={`diversity-${index}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
