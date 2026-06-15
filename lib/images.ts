import type { MediaAsset } from '@/lib/content/types';

export function imagePath(filename: string): string {
  return `/images/${filename}`;
}

export function mediaAsset(
  filename: string,
  alternativeText: string,
  width: number,
  height: number,
): MediaAsset {
  return {
    name: filename,
    alternativeText,
    width,
    height,
    src: imagePath(filename),
  };
}

export function normalizeInternalLinks(html: string): string {
  return html.replace(
    /https:\/\/ribermax\.com\.br\/([^/"'\s]+)\/?/g,
    '/$1',
  );
}
