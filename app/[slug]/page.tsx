import { notFound } from 'next/navigation';
import { preload } from 'react-dom';
import PageContainer from '@/components/page-container';
import SeoArticleLayout from '@/components/seo/seo-article-layout';
import { getAllSeoSlugs, getSeoPage } from '@/lib/content/seo';
import { imagePath } from '@/lib/images';
import { buildSeoMetadata } from '@/lib/metadata';
import { getSeoPageImageSlots } from '@/lib/seo/build-article-segments';

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

  const firstImage = getSeoPageImageSlots(slug)[0];

  if (firstImage) {
    preload(imagePath(firstImage.filename), {
      as: 'image',
      fetchPriority: 'high',
    });
  }

  return (
    <PageContainer variant="wood">
      <SeoArticleLayout page={page} />
    </PageContainer>
  );
}
