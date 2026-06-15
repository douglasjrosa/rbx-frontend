import HtmlContent from '@/components/html-content';
import SeoContentImage from '@/components/seo/seo-content-image';
import {
  buildSeoArticleSegments,
  getSeoPageImageSlots,
  type SeoArticleSegment,
} from '@/lib/seo/build-article-segments';
import type { SeoPage } from '@/lib/content/types';

interface SeoArticleLayoutProps {
  page: SeoPage;
}

function renderTextSegment(segment: SeoArticleSegment, key: string) {
  if (segment.type !== 'text') {
    return null;
  }

  return (
    <div key={key} className="prose-rbx text-left">
      <HtmlContent html={segment.html} />
    </div>
  );
}

export default function SeoArticleLayout({ page }: SeoArticleLayoutProps) {
  const images = getSeoPageImageSlots(page.slug);
  const { segments, ctaHtml } = buildSeoArticleSegments(page, images);
  const nodes: React.ReactNode[] = [];
  let imagePairIndex = 0;
  let index = 0;

  if (segments[0]?.type === 'text') {
    nodes.push(renderTextSegment(segments[0], 'seo-intro'));
    index = 1;
  }

  while (index < segments.length) {
    const segment = segments[index];

    if (segment.type === 'text') {
      const next = segments[index + 1];
      const hasImagePair = next?.type === 'image';
      const reversed = imagePairIndex % 2 === 1;

      if (hasImagePair && next.type === 'image') {
        nodes.push(
          <div
            key={`seo-pair-${index}`}
            className={
              'grid grid-cols-1 items-center gap-6 md:grid-cols-2 ' +
              (reversed ? 'md:[&>*:first-child]:order-2' : '')
            }
          >
            <div className="prose-rbx text-left">
              <HtmlContent html={segment.html} />
            </div>
            <SeoContentImage
              slot={next.slot}
              priority={next.priority}
            />
          </div>,
        );
        imagePairIndex += 1;
        index += 2;
        continue;
      }

      nodes.push(renderTextSegment(segment, `seo-text-${index}`));
      index += 1;
      continue;
    }

    const reversed = imagePairIndex % 2 === 1;
    nodes.push(
      <div
        key={`seo-image-only-${index}`}
        className={reversed ? 'md:pl-12' : 'md:pr-12'}
      >
        <SeoContentImage slot={segment.slot} priority={segment.priority} />
      </div>,
    );
    imagePairIndex += 1;
    index += 1;
  }

  return (
    <article className="container mx-auto max-w-5xl">
      <div className="seo-article overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="space-y-8 px-6 py-8 md:px-10 md:py-10">{nodes}</div>

        {ctaHtml && (
          <div
            className={
              'seo-article__cta border-t-4 border-rbx-brown px-6 py-8 ' +
              'md:px-10 md:py-10'
            }
          >
            <HtmlContent html={ctaHtml} className="text-left" />
          </div>
        )}
      </div>
    </article>
  );
}
