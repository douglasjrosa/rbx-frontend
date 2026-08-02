import { notFound } from 'next/navigation';
import PageContainer from '@/components/page-container';
import SeoArticleLayout from '@/components/seo/seo-article-layout';
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
      <SeoArticleLayout page={page} />
    </PageContainer>
  );
}
