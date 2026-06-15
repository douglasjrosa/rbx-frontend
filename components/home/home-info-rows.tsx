import ButtonLink from '@/components/elements/button-link';
import Image from '@/components/elements/image';
import { HOME_SECTIONS } from '@/lib/home-sections';
import type { HomeInfoRow, HomeInfoRows } from '@/lib/content/types';

interface HomeInfoRowsProps {
  infoRows: HomeInfoRows;
}

function InfoRow({ row }: { row: HomeInfoRow }) {
  const imageBlock = (
    <div className="overflow-hidden rounded-2xl">
      <Image
        media={row.image}
        className="h-auto w-full object-cover"
        width={row.image.width}
        height={row.image.height}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center gap-4 md:gap-6">
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        {row.title}
      </h2>
      <div className="space-y-4 pl-6 md:pl-10">
        {row.paragraphs.map((paragraph, index) => (
          <p
            key={`info-row-paragraph-${index}`}
            className={
              'text-lg leading-loose tracking-wide text-white ' +
              'md:text-xl md:leading-8'
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
      <div className="pt-2">
        <ButtonLink
          button={row.button}
          appearance={
            row.buttonVariant === 'secondary'
              ? 'rbx-secondary-on-green'
              : 'rbx-primary-on-green'
          }
          large
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div
        className={
          row.imagePosition === 'right'
            ? 'order-2 lg:order-2'
            : 'order-1 lg:order-1'
        }
      >
        {imageBlock}
      </div>
      <div
        className={
          row.imagePosition === 'right'
            ? 'order-1 lg:order-1'
            : 'order-2 lg:order-2'
        }
      >
        {textBlock}
      </div>
    </div>
  );
}

export default function HomeInfoRowsSection({ infoRows }: HomeInfoRowsProps) {
  return (
    <section className="relative z-10 -mt-[60px] pt-[153px] pb-16 md:pb-24">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundColor: '#568633',
          backgroundImage: "url('/images/fuyndo_verdeclaro_02.png')",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#00000080' }}
        aria-hidden
      />
      <div className="container relative z-10 space-y-16 md:space-y-20">
        <InfoRow row={infoRows.rows[0]} />
        <div
          id={HOME_SECTIONS.aribermax}
          className="scroll-mt-[72px]"
          aria-hidden
        />
        {infoRows.rows.slice(1).map((row, index) => (
          <InfoRow key={`info-row-${index + 1}`} row={row} />
        ))}
      </div>
    </section>
  );
}
