import { notFound } from 'next/navigation';
import HtmlContent from '@/components/html-content';
import PageContainer from '@/components/page-container';
import { getAllSeoSlugs, getSeoPage } from '@/lib/content/seo';
import { buildSeoMetadata } from '@/lib/metadata';

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    return {};
  }

  return buildSeoMetadata(page);
}

export default async function SeoSlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageContainer variant="wood">
      <article className="container max-w-4xl mx-auto">
        <div className="card-rbx text-left mb-8 prose-rbx">
          <HtmlContent html={page.mainContent} />
        </div>
        {page.middleContent && (
          <div className="card-rbx text-left mb-8 prose-rbx">
            <HtmlContent html={page.middleContent} />
          </div>
        )}
        {page.callToAction && (
          <div
            className={
              'card-rbx text-left mb-16 prose-rbx ' +
              'border-t-4 border-rbx-brown'
            }
          >
            <HtmlContent html={page.callToAction} />
          </div>
        )}
      </article>
    </PageContainer>
  );
}
