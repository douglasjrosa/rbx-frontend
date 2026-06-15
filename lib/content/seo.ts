import fs from 'fs';
import path from 'path';
import type { SeoPage } from './types';
import { normalizeInternalLinks } from '@/lib/images';

const SEO_DIR = path.join(process.cwd(), 'content', 'seo');
const SEPARATOR = '#############################################';

function parseHeader(raw: string): Pick<
  SeoPage,
  'keyword' | 'slug' | 'metaDescription' | 'company'
> {
  const keyword =
    raw.match(/^Frase-chave:\s*(.+)$/m)?.[1]?.trim() ?? '';
  const slug = raw.match(/^Slug:\s*(.+)$/m)?.[1]?.trim() ?? '';
  const metaDescription =
    raw.match(/^Metadescription:\s*(.+)$/m)?.[1]?.trim() ?? '';
  const company =
    raw.match(/^Company:\s*(.+)$/m)?.[1]?.trim() ??
    'Ribermax Embalagens';

  return { keyword, slug, metaDescription, company };
}

function extractSection(raw: string, label: string): string {
  const marker = `${label}:`;
  const start = raw.indexOf(marker);
  if (start === -1) {
    return '';
  }

  const afterLabel = raw.slice(start + marker.length);
  const nextSeparator = afterLabel.indexOf(SEPARATOR);
  const content =
    nextSeparator === -1
      ? afterLabel.trim()
      : afterLabel.slice(0, nextSeparator).trim();

  return normalizeInternalLinks(content);
}

export function parseSeoMarkdown(raw: string, filename: string): SeoPage {
  const headerEnd = raw.indexOf(SEPARATOR);
  const header = headerEnd === -1 ? raw : raw.slice(0, headerEnd);
  const body = headerEnd === -1 ? '' : raw.slice(headerEnd);

  const parsedHeader = parseHeader(header);
  const fallbackSlug = filename.replace(/\.md$/, '');

  return {
    slug: parsedHeader.slug || fallbackSlug,
    keyword: parsedHeader.keyword,
    metaDescription: parsedHeader.metaDescription,
    company: parsedHeader.company,
    mainContent: extractSection(body, 'Page content'),
    middleContent: extractMiddleContent(body),
    callToAction: extractSection(body, 'Call To Action'),
  };
}

function extractMiddleContent(body: string): string {
  const parts = body.split(SEPARATOR).map((part) => part.trim());
  const contentParts = parts.filter(
    (part) =>
      part &&
      !part.startsWith('Page content:') &&
      !part.startsWith('Call To Action:'),
  );

  if (contentParts.length <= 1) {
    return '';
  }

  return normalizeInternalLinks(contentParts.slice(1).join('\n'));
}

export function getAllSeoSlugs(): string[] {
  if (!fs.existsSync(SEO_DIR)) {
    return [];
  }

  return fs
    .readdirSync(SEO_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort();
}

export function getSeoPage(slug: string): SeoPage | null {
  const filePath = path.join(SEO_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  return parseSeoMarkdown(raw, `${slug}.md`);
}
