import fs from 'fs';
import path from 'path';
import type { LegalPage } from './types';

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages');

const LEGAL_PAGE_META: Record<string, Omit<LegalPage, 'content'>> = {
  'politica-de-cookies-br': {
    slug: 'politica-de-cookies-br',
    title: 'Política de Cookies (BR)',
    metaDescription:
      'Política de cookies da Ribermax Embalagens para cidadãos e ' +
      'residentes permanentes legais do Brasil.',
  },
};

export function getLegalPage(slug: string): LegalPage | null {
  const meta = LEGAL_PAGE_META[slug];

  if (!meta) {
    return null;
  }

  const filePath = path.join(PAGES_DIR, `${slug}.html`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  return {
    ...meta,
    content,
  };
}

export function getAllLegalPageSlugs(): string[] {
  return Object.keys(LEGAL_PAGE_META);
}
