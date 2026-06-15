import Image from '@/components/elements/image';
import { mediaAsset } from '@/lib/images';
import type { SeoPageImageSlot } from '@/lib/seo/types';

const DEFAULT_SEO_IMAGE_MAX_WIDTH_PX = 500;

interface SeoContentImageProps {
  slot: SeoPageImageSlot;
  priority?: boolean;
  maxWidth?: number;
}

export default function SeoContentImage({
  slot,
  priority = false,
  maxWidth = DEFAULT_SEO_IMAGE_MAX_WIDTH_PX,
}: SeoContentImageProps) {
  const media = mediaAsset(
    slot.filename,
    slot.alt,
    slot.width,
    slot.height,
  );

  const sizes = `(max-width: 768px) 100vw, ${maxWidth}px`;

  return (
    <figure
      className="seo-article__figure overflow-hidden rounded-2xl bg-white shadow-md"
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <Image
        media={media}
        className="h-auto w-full object-contain"
        width={slot.width}
        height={slot.height}
        priority={priority}
        sizes={sizes}
      />
      {slot.caption && (
        <figcaption className="px-4 py-3 text-sm leading-relaxed text-gray-600">
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
