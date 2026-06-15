import type { SeoPage } from '@/lib/content/types';
import type { SeoPageImageSlot } from '@/lib/seo/types';
import { SEO_PAGE_IMAGES } from '@/content/seo/page-images';
import { mergeSeoContentBlocks } from '@/lib/seo/split-html-blocks';

export type SeoArticleRow = {
  textHtml: string;
  image: SeoPageImageSlot;
  priority: boolean;
};

export function getSeoPageImageSlots(slug: string): SeoPageImageSlot[] {
  return SEO_PAGE_IMAGES[slug] ?? [];
}

function resolveRowBlockIndex(
  images: SeoPageImageSlot[],
  imageIndex: number,
  blockCount: number,
): number {
  if (blockCount === 0) {
    return 0;
  }

  let blockIndex = images[imageIndex].insertAfterBlock;

  if (imageIndex > 0) {
    const previousIndex = resolveRowBlockIndex(
      images,
      imageIndex - 1,
      blockCount,
    );

    if (blockIndex <= previousIndex) {
      blockIndex = previousIndex + 1;
    }
  }

  return Math.min(blockIndex, blockCount - 1);
}

export function buildSeoArticleRows(
  page: SeoPage,
  images: SeoPageImageSlot[],
): {
  rows: SeoArticleRow[];
  remainderHtml: string;
  ctaHtml: string;
} {
  const { bodyBlocks, ctaBlock } = mergeSeoContentBlocks(
    page.mainContent,
    page.middleContent,
    page.callToAction,
  );

  const rowBlockIndices = images.map((_, imageIndex) =>
    resolveRowBlockIndex(images, imageIndex, bodyBlocks.length),
  );

  const rows = images.map((slot, imageIndex) => ({
    textHtml: bodyBlocks[rowBlockIndices[imageIndex]] ?? '',
    image: slot,
    priority: imageIndex === 0,
  }));

  const usedIndices = new Set(rowBlockIndices);
  const remainderHtml = bodyBlocks
    .filter((_, index) => !usedIndices.has(index))
    .join('\n');

  return {
    rows,
    remainderHtml,
    ctaHtml: ctaBlock,
  };
}
