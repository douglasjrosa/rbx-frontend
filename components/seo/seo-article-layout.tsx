import HtmlContent from '@/components/html-content';
import SeoContentImage, {
  SEO_CONTENT_IMAGE_MAX_WIDTH_PX,
} from '@/components/seo/seo-content-image';
import {
  buildSeoArticleRows,
  getSeoPageImageSlots,
} from '@/lib/seo/build-article-segments';
import type { SeoPage } from '@/lib/content/types';

interface SeoArticleLayoutProps {
  page: SeoPage;
}

export default function SeoArticleLayout({ page }: SeoArticleLayoutProps) {
  const images = getSeoPageImageSlots(page.slug);
  const { rows, remainderHtml, ctaHtml } = buildSeoArticleRows(page, images);
  const imageWidth = `${SEO_CONTENT_IMAGE_MAX_WIDTH_PX}px`;

  return (
    <article
      className="container mx-auto max-w-7xl pt-10 md:pt-14"
      style={{ ['--seo-image-width' as string]: imageWidth }}
    >
      <div className="seo-article overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="space-y-10 px-6 py-8 md:px-12 md:py-12">
          {rows.map((row, index) => {
            const imageOnLeft = index % 2 === 1;

            return (
              <div
                key={`seo-row-${index}`}
                className={
                  'seo-article-row grid grid-cols-1 items-start gap-6 ' +
                  'md:grid md:gap-10 ' +
                  (imageOnLeft ? 'md:[&>*:first-child]:order-2' : '')
                }
                data-image-side={imageOnLeft ? 'left' : 'right'}
              >
                <div className="prose-rbx min-w-0 text-left">
                  <HtmlContent html={row.textHtml} />
                </div>
                <div
                  className={
                    'seo-article__image-col flex w-full shrink-0 ' +
                    'justify-center md:justify-start'
                  }
                >
                  <SeoContentImage
                    slot={row.image}
                    priority={row.priority}
                  />
                </div>
              </div>
            );
          })}

          {remainderHtml && (
            <div className="prose-rbx text-left">
              <HtmlContent html={remainderHtml} />
            </div>
          )}
        </div>

        {ctaHtml && (
          <div
            className={
              'seo-article__cta border-t-4 border-rbx-brown px-6 py-8 ' +
              'md:px-12 md:py-10'
            }
          >
            <HtmlContent html={ctaHtml} className="text-left" />
          </div>
        )}
      </div>
    </article>
  );
}
