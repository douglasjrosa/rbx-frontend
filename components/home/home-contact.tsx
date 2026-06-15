import Sections from '@/components/sections/sections';
import { HOME_SECTIONS } from '@/lib/home-sections';
import type { ContentSection } from '@/lib/content/types';

interface HomeContactProps {
  sections: ContentSection[];
}

export default function HomeContactSection({ sections }: HomeContactProps) {
  return (
    <section
      id={HOME_SECTIONS.contato}
      className="scroll-mt-[72px] bg-rbx-porto bg-fixed bg-cover py-16 md:py-24"
    >
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
          Contato
        </h2>
        <Sections sections={sections} />
      </div>
    </section>
  );
}
