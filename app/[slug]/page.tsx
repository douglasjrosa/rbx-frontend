import { notFound } from 'next/navigation';
import PageContainer from '@/components/page-container';
import SeoArticleLayout from '@/components/seo/seo-article-layout';
import SeoCompetitiveLayout from '@/components/seo/seo-competitive-layout';
import { getAllSeoSlugs, getSeoPage } from '@/lib/content/seo';
import { buildSeoMetadata } from '@/lib/metadata';
import {
  isPrioritySeoSlug,
  type PrioritySeoSlug,
} from '@/lib/seo/priority-landing';

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

  if (isPrioritySeoSlug(slug)) {
    return (
      <PageContainer variant="wood">
        <SeoCompetitiveLayout
          page={page}
          slug={slug as PrioritySeoSlug}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer variant="wood">
      <SeoArticleLayout page={page} />
    </PageContainer>
  );
}
