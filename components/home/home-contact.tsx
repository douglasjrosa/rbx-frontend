import { HOME_SECTIONS } from '@/lib/home-sections';
import { SECTION_SCROLL_MARGIN_CLASS } from '@/lib/navbar-offset';
import type { HomeContact } from '@/lib/content/types';

interface HomeContactProps {
  contact: HomeContact;
}

export default function HomeContactSection({ contact }: HomeContactProps) {
  return (
    <section
      id={HOME_SECTIONS.contato}
      className={`${SECTION_SCROLL_MARGIN_CLASS} bg-rbx-porto bg-fixed bg-cover py-16 md:py-24`}
    >
      <div className="container space-y-12">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {contact.doubtsTitle}
          </h2>
          <p className="text-lg leading-relaxed">
            {contact.doubtsDescription}
          </p>
        </div>

        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {contact.visitTitle}
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            {contact.visitDescription}
          </p>
          <p className="text-lg font-semibold">{contact.address}</p>
        </div>
      </div>
    </section>
  );
}
