import HtmlContent from '@/components/html-content';
import SeoContentImage from '@/components/seo/seo-content-image';
import {
  buildSeoArticleRows,
  getSeoPageImageSlots,
} from '@/lib/seo/build-article-segments';
import type { SeoPage } from '@/lib/content/types';

const SEO_IMAGE_MAX_WIDTH_PX = 500;

interface SeoArticleLayoutProps {
  page: SeoPage;
}

export default function SeoArticleLayout({ page }: SeoArticleLayoutProps) {
  const images = getSeoPageImageSlots(page.slug);
  const { rows, remainderHtml, ctaHtml } = buildSeoArticleRows(page, images);

  return (
    <article className="container mx-auto max-w-7xl pt-10 md:pt-14">
      <div className="seo-article overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="space-y-10 px-6 py-8 md:px-12 md:py-12">
          {rows.map((row, index) => {
            const imageOnLeft = index % 2 === 1;

            return (
              <div
                key={`seo-row-${index}`}
                className={
                  'grid grid-cols-1 items-start gap-8 md:grid-cols-2 ' +
                  (imageOnLeft ? 'md:[&>*:first-child]:order-2' : '')
                }
              >
                <div className="prose-rbx min-w-0 text-left">
                  <HtmlContent html={row.textHtml} />
                </div>
                <div
                  className={
                    'flex w-full justify-center ' +
                    (imageOnLeft ? 'md:justify-start' : 'md:justify-end')
                  }
                >
                  <SeoContentImage
                    slot={row.image}
                    priority={row.priority}
                    maxWidth={SEO_IMAGE_MAX_WIDTH_PX}
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
