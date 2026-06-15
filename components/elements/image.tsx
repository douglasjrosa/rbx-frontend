import type { MediaAsset } from '@/lib/content/types';
import NextImage from 'next/image';

interface ImageProps {
  media: MediaAsset | null;
  className?: string;
  alternativeText?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  sizes?: string;
}

export default function Image({
  media,
  className = '',
  alternativeText,
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: ImageProps) {
  if (!media) {
    return null;
  }

  const imageWidth = Number(width) || media.width;
  const imageHeight = Number(height) || media.height;
  const alt = alternativeText || media.alternativeText || '';

  return (
    <NextImage
      src={media.src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
