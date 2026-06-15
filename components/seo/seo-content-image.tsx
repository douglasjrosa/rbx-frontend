import Image from '@/components/elements/image';
import { mediaAsset } from '@/lib/images';
import type { SeoPageImageSlot } from '@/lib/seo/types';

const SEO_IMAGE_SIZES =
  '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px';

interface SeoContentImageProps {
  slot: SeoPageImageSlot;
  priority?: boolean;
}

export default function SeoContentImage({
  slot,
  priority = false,
}: SeoContentImageProps) {
  const media = mediaAsset(
    slot.filename,
    slot.alt,
    slot.width,
    slot.height,
  );

  return (
    <figure
      className={
        'seo-article__figure overflow-hidden rounded-2xl bg-white shadow-md'
      }
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          media={media}
          className="h-full w-full object-cover"
          width={slot.width}
          height={slot.height}
          priority={priority}
          sizes={SEO_IMAGE_SIZES}
        />
      </div>
      {slot.caption && (
        <figcaption className="px-4 py-3 text-sm leading-relaxed text-gray-600">
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
