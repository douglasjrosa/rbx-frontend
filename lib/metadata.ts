import type { Metadata } from 'next';
import type { HomePage, LegalPage } from '@/lib/content/types';
import type { SeoPage } from '@/lib/content/types';
import { siteConfig } from '@/content/site';

export function buildHomeMetadata(page: HomePage): Metadata {
  return {
    title: page.metadata.metaTitle,
    description: page.metadata.metaDescription,
    openGraph: {
      title: `${page.metadata.metaTitle} | ${siteConfig.metaTitleSuffix}`,
      description: page.metadata.metaDescription,
      images: page.metadata.shareImage
        ? [{ url: page.metadata.shareImage.src }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metadata.metaTitle,
      description: page.metadata.metaDescription,
    },
  };
}

export function buildSeoMetadata(page: SeoPage): Metadata {
  return {
    title: page.keyword,
    description: page.metaDescription,
    openGraph: {
      title: `${page.keyword} | ${siteConfig.metaTitleSuffix}`,
      description: page.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.keyword,
      description: page.metaDescription,
    },
  };
}

export function buildLegalMetadata(page: LegalPage): Metadata {
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: `${page.title} | ${siteConfig.metaTitleSuffix}`,
      description: page.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
    },
  };
}
