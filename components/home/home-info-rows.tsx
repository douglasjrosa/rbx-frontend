import ButtonLink from '@/components/elements/button-link';
import Image from '@/components/elements/image';
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
      <h2 className="text-2xl font-bold text-white md:text-3xl">
        {row.title}
      </h2>
      <p className="text-base leading-relaxed text-white">{row.description}</p>
      <div className="pt-2">
        <ButtonLink
          button={row.button}
          appearance={
            row.buttonVariant === 'secondary'
              ? 'rbx-secondary'
              : 'rbx-primary'
          }
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
    <section className="relative -mt-[60px] py-16 md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundColor: '#568633',
          backgroundImage: "url('/images/fuyndo_verdeclaro_02.png')",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-rbx-green-secondary/58"
        aria-hidden
      />
      <div className="container relative z-10 space-y-16 md:space-y-20">
        {infoRows.rows.map((row, index) => (
          <InfoRow key={`info-row-${index}`} row={row} />
        ))}
      </div>
    </section>
  );
}
