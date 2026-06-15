import type { SeoPage } from '@/lib/content/types';
import type { SeoPageImageSlot } from '@/lib/seo/types';
import { SEO_PAGE_IMAGES } from '@/content/seo/page-images';
import { mergeSeoContentBlocks } from '@/lib/seo/split-html-blocks';

export type SeoArticleSegment =
  | { type: 'text'; html: string }
  | { type: 'image'; slot: SeoPageImageSlot; priority: boolean };

export function getSeoPageImageSlots(slug: string): SeoPageImageSlot[] {
  return SEO_PAGE_IMAGES[slug] ?? [];
}

export function buildSeoArticleSegments(
  page: SeoPage,
  images: SeoPageImageSlot[],
): { segments: SeoArticleSegment[]; ctaHtml: string } {
  const { bodyBlocks, ctaBlock } = mergeSeoContentBlocks(
    page.mainContent,
    page.middleContent,
    page.callToAction,
  );

  const imagesByBlock = new Map<number, SeoPageImageSlot[]>();

  for (const image of images) {
    const blockImages = imagesByBlock.get(image.insertAfterBlock) ?? [];
    blockImages.push(image);
    imagesByBlock.set(image.insertAfterBlock, blockImages);
  }

  const segments: SeoArticleSegment[] = [];
  let imageCount = 0;

  bodyBlocks.forEach((block, index) => {
    segments.push({ type: 'text', html: block });

    const blockImages = imagesByBlock.get(index) ?? [];
    for (const slot of blockImages) {
      segments.push({
        type: 'image',
        slot,
        priority: imageCount === 0,
      });
      imageCount += 1;
    }
  });

  return { segments, ctaHtml: ctaBlock };
}
