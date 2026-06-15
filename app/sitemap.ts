import type { MetadataRoute } from 'next';
import { getAllSeoSlugs } from '@/lib/content/seo';

const BASE_URL = 'https://ribermax.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntry: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const seoEntries: MetadataRoute.Sitemap = getAllSeoSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...homeEntry, ...seoEntries];
}
