import HtmlContent from '@/components/html-content';
import SeoCalculatorLaunchTeaser from '@/components/seo/seo-calculator-launch-teaser';
import SeoContentImage, {
  SEO_CONTENT_IMAGE_MAX_WIDTH_PX,
} from '@/components/seo/seo-content-image';
import SeoConversionHero from '@/components/seo/seo-conversion-hero';
import SeoFaqAccordion from '@/components/seo/seo-faq-accordion';
import SeoFaqPageJsonLd from '@/components/seo/seo-faq-page-json-ld';
import SeoProofStrip from '@/components/seo/seo-proof-strip';
import SeoSolutionCards from '@/components/seo/seo-solution-cards';
import SeoStickyMobileCta from '@/components/seo/seo-sticky-mobile-cta';
import type { SeoPage } from '@/lib/content/types';
import {
  buildSeoArticleRows,
  getSeoPageImageSlots,
} from '@/lib/seo/build-article-segments';
import {
  PRIORITY_LANDINGS,
  type PrioritySeoSlug,
} from '@/lib/seo/priority-landing';

interface SeoCompetitiveLayoutProps {
  page: SeoPage;
  slug: PrioritySeoSlug;
}

function extractH1Text(html: string): string | null {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) {
    return null;
  }

  return match[1].replace(/<[^>]+>/g, '').trim();
}

function stripH1AndFaqSections(html: string): string {
  let next = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
  next = next.replace(
    /<h2[^>]*>\s*Perguntas frequentes\s*<\/h2>[\s\S]*$/i,
    '',
  );
  return next.trim();
}

export default function SeoCompetitiveLayout({
  page,
  slug,
}: SeoCompetitiveLayoutProps) {
  const config = PRIORITY_LANDINGS[slug];
  const title = extractH1Text(page.mainContent) ?? page.keyword;
  const images = getSeoPageImageSlots(page.slug);
  const sanitizedPage: SeoPage = {
    ...page,
    mainContent: stripH1AndFaqSections(page.mainContent),
    middleContent: stripH1AndFaqSections(page.middleContent),
  };
  const { rows, remainderHtml, ctaHtml } = buildSeoArticleRows(
    sanitizedPage,
    images,
  );
  const imageWidth = `${SEO_CONTENT_IMAGE_MAX_WIDTH_PX}px`;

  return (
    <>
      <SeoFaqPageJsonLd faqs={config.faqs} />
      <article
        className="pb-24 pt-10 md:pb-14 md:pt-14"
        style={{ ['--seo-image-width' as string]: imageWidth }}
      >
        <div className="container mx-auto max-w-7xl space-y-8 md:space-y-10">
          <SeoConversionHero title={title} config={config} />
          <SeoProofStrip />

          <div className="space-y-10 rounded-2xl bg-white px-6 py-8 shadow-lg md:px-12 md:py-12">
            {rows.map((row, index) => {
              const imageOnLeft = index % 2 === 1;

              return (
                <div
                  key={`seo-competitive-row-${index}`}
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
        </div>

        <div
          className={
            'mt-8 w-full bg-rbx-white bg-auto bg-repeat py-10 ' +
            'md:mt-10 md:py-14'
          }
        >
          <div className="container mx-auto max-w-7xl space-y-8 md:space-y-10">
            <SeoSolutionCards />
            <SeoFaqAccordion faqs={config.faqs} />
          </div>
        </div>

        <div className="container mx-auto mt-8 max-w-7xl space-y-8 md:mt-10 md:space-y-10">
          <SeoCalculatorLaunchTeaser />

          {ctaHtml && (
            <div
              className={
                'rounded-2xl border-t-4 border-rbx-brown bg-white ' +
                'px-6 py-8 shadow-lg md:px-12 md:py-10'
              }
            >
              <HtmlContent html={ctaHtml} className="text-left" />
            </div>
          )}
        </div>
      </article>
      <SeoStickyMobileCta label={config.stickyCtaLabel} />
    </>
  );
}
