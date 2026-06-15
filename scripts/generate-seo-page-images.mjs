import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SEO_DIR = path.join(ROOT, 'content', 'seo');
const DIMS_PATH = path.join(ROOT, 'lib/seo/image-dimensions.json');
const OUT_PATH = path.join(ROOT, 'content/seo/page-images.ts');
const SEPARATOR = '#############################################';

const SEO_IMAGE_CATALOG = {
  boxes: [
    'caixa-economica.webp',
    'caixa-estruturada.webp',
    'caixa-leve.webp',
    'caixa-reforcada.webp',
    'caixa-resistente.webp',
    'caixa-super-leve.webp',
    'caixa-super-reforcada.webp',
    'caixa-madeira-fumigada-1.webp',
    'caixa-madeira-fumigada-2.webp',
    'caixa-madeira-fumigada-3.webp',
    'caixa_madeira_fumigada_02.webp',
    'caixas.webp',
    'header_caixas.webp',
  ],
  crates: [
    'engradado-reforcado.webp',
    'engradado-resistente.webp',
    'engradado-leve.webp',
    'engradado_economico-300x273.webp',
    'engradado-madeira-transporte-1.webp',
    'engradado-madeira-transporte-2.webp',
    'engradado-madeira-transporte-3.webp',
  ],
  export: [
    'fumigacao.webp',
    'certificacao_min.webp',
    'IPPC.webp',
    'madeira-fumigada-exportacao.png',
    'mapamundi-min.webp',
    'worldwide-min.webp',
    'worldwide.webp',
    'porto-de-santos-optimized.avif',
  ],
  factory: [
    'fabrica-embalagens-madeira-1.webp',
    'fabrica-embalagens-madeira-2.webp',
    'fabrica-embalagens-madeira-3.webp',
    'fabricante-embalagem-madeira-1.webp',
    'fabricante-embalagem-madeira-2.webp',
    'fabricante-embalagem-madeira-3.webp',
    'ribermax_fabrica.png',
    'empresa.webp',
    '20160127_161138-min.webp',
  ],
  workshop: [
    'IMG_20190902_165552685-min.webp',
    'IMG_20201015_165641469-min.webp',
    'IMG_20201016_122913136_HDR-min.webp',
    'IMG_20201208_173244057-min.webp',
    'm_IMG_20201208_173926536-min.webp',
    'm_IMG_20201210_102658269-min.webp',
    'm_IMG_20210115_110017071-min.webp',
    'm_IMG_20210127_161914408-min.webp',
  ],
  transport: [
    'caminhao-min.webp',
    'caminhao_novo.png',
    'engradado-madeira-transporte-1.webp',
    'engradado-madeira-transporte-2.webp',
  ],
  equipment: [
    'caixas-madeira-equipamentos-1.webp',
    'caixas-madeira-equipamentos-2.webp',
    'caixas-madeira-equipamentos-3.webp',
    'diversity/caixa-madeira-compensado.png',
    'diversity/caixas-madeira-equipamentos.png',
    'diversity/engradado-madeira-equipamentos.png',
    'diversity/embalagens-especiais-madeira.png',
  ],
  technical: [
    'desenhista-tecnico-cotas.webp',
    'lupaCx.webp',
    'madeira-vs-papelao.webp',
    'madeira_Xpapelao.webp',
    'sarrafos_sob_medida-300x273.webp',
    'palete-sob-medida.webp',
  ],
  local: [
    'floresta-min-min.webp',
    'empresa.webp',
    'fabrica-embalagens-madeira-2.webp',
  ],
};

function resolveImageCategories(slug) {
  if (slug.includes('engradado')) return ['crates', 'transport', 'export'];
  if (slug.includes('exportacao') || slug.includes('fumigad')) {
    return ['export', 'boxes', 'transport'];
  }
  if (
    slug.includes('fabrica') ||
    slug.includes('fabricacao') ||
    slug.includes('fornecedor') ||
    slug.includes('empresa')
  ) {
    return ['factory', 'workshop', 'technical'];
  }
  if (
    slug.includes('equipamento') ||
    slug.includes('maquina') ||
    slug.includes('industrial') ||
    slug.includes('industria')
  ) {
    return ['equipment', 'boxes', 'factory'];
  }
  if (slug.includes('transporte') || slug.includes('preco')) {
    return ['transport', 'crates', 'boxes'];
  }
  if (slug.includes('medida') || slug.includes('compensado')) {
    return ['technical', 'boxes', 'factory'];
  }
  if (slug.includes('ribeirao')) return ['local', 'factory', 'boxes'];
  if (slug.includes('caixa')) return ['boxes', 'export', 'technical'];
  return ['boxes', 'factory', 'export'];
}

const dimensions = JSON.parse(fs.readFileSync(DIMS_PATH, 'utf-8'));

function splitHtmlBlocks(html) {
  const trimmed = html.trim();
  if (!trimmed) return [];
  return trimmed.split(/(?=<h2[\s>])/i).map((part) => part.trim()).filter(Boolean);
}

function mergeSeoContentBlocks(mainContent, middleContent) {
  return [...splitHtmlBlocks(mainContent), ...splitHtmlBlocks(middleContent)];
}

function extractSection(raw, label) {
  const marker = `${label}:`;
  const start = raw.indexOf(marker);
  if (start === -1) return '';
  const afterLabel = raw.slice(start + marker.length);
  const nextSeparator = afterLabel.indexOf(SEPARATOR);
  return (nextSeparator === -1
    ? afterLabel
    : afterLabel.slice(0, nextSeparator)
  ).trim();
}

function extractMiddleContent(body) {
  const parts = body
    .split(SEPARATOR)
    .map((part) => part.trim())
    .filter(
      (part) =>
        part &&
        !part.startsWith('Page content:') &&
        !part.startsWith('Call To Action:'),
    );
  return parts.length <= 1 ? '' : parts.slice(1).join('\n');
}

function parsePage(filePath) {
  const slug = path.basename(filePath, '.md');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const headerEnd = raw.indexOf(SEPARATOR);
  const body = headerEnd === -1 ? '' : raw.slice(headerEnd);
  const keyword =
    raw.match(/^Frase-chave:\s*(.+)$/m)?.[1]?.trim() ?? slug;
  const mainContent = extractSection(body, 'Page content');
  const middleContent = extractMiddleContent(body);
  const bodyBlocks = mergeSeoContentBlocks(mainContent, middleContent);

  return { slug, keyword, bodyBlocks };
}

function humanizeFilename(filename) {
  return filename
    .replace(/^diversity\//, '')
    .replace(/[-_]/g, ' ')
    .replace(/\.(webp|png|jpg|jpeg|avif)$/i, '');
}

function buildAlt(keyword, filename) {
  const subject = humanizeFilename(filename);
  return `${subject} para ${keyword.toLowerCase()}`;
}

function buildCaption(keyword, filename) {
  const subject = humanizeFilename(filename);
  return `Imagem de ${subject} aplicada a ${keyword.toLowerCase()}.`;
}

function pickImages(slug, index) {
  const categories = resolveImageCategories(slug);
  const pool = [];
  for (const category of categories) {
    for (const image of SEO_IMAGE_CATALOG[category]) {
      if (!pool.includes(image)) pool.push(image);
    }
  }

  const offset = index * 3;
  const selected = [];
  for (let i = 0; i < 3; i += 1) {
    selected.push(pool[(offset + i) % pool.length]);
  }

  if (new Set(selected).size < 3) {
    const extras = Object.values(SEO_IMAGE_CATALOG)
      .flat()
      .filter((image) => !selected.includes(image));
    for (const extra of extras) {
      if (selected.length >= 3) break;
      if (!selected.includes(extra)) selected.push(extra);
    }
  }

  return selected.slice(0, 3);
}

function pickInsertPoints(blockCount) {
  if (blockCount <= 1) return [0, 0, 0];
  if (blockCount === 2) return [0, 1, 1];
  if (blockCount === 3) return [0, 1, 2];
  const step = Math.max(1, Math.floor(blockCount / 4));
  return [0, step, step * 2];
}

const slugs = fs
  .readdirSync(SEO_DIR)
  .filter((file) => file.endsWith('.md'))
  .sort();

const entries = slugs.map((file, index) => {
  const page = parsePage(path.join(SEO_DIR, file));
  const filenames = pickImages(page.slug, index);
  const insertPoints = pickInsertPoints(page.bodyBlocks.length);

  const images = filenames.map((filename, imageIndex) => {
    const dim = dimensions[filename] ?? { width: 800, height: 600 };
    return {
      filename,
      alt: buildAlt(page.keyword, filename),
      width: dim.width,
      height: dim.height,
      caption: buildCaption(page.keyword, filename),
      insertAfterBlock: insertPoints[imageIndex],
    };
  });

  return [page.slug, images];
});

const lines = [
  "import type { SeoPageImagesMap } from '@/lib/seo/types';",
  '',
  'export const SEO_PAGE_IMAGES: SeoPageImagesMap = {',
];

for (const [slug, images] of entries) {
  lines.push(`  '${slug}': [`);
  for (const image of images) {
    lines.push('    {');
    lines.push(`      filename: '${image.filename}',`);
    lines.push(`      alt: '${image.alt.replace(/'/g, "\\'")}',`);
    lines.push(`      width: ${image.width},`);
    lines.push(`      height: ${image.height},`);
    lines.push(`      caption: '${image.caption.replace(/'/g, "\\'")}',`);
    lines.push(`      insertAfterBlock: ${image.insertAfterBlock},`);
    lines.push('    },');
  }
  lines.push('  ],');
}

lines.push('};', '');
fs.writeFileSync(OUT_PATH, lines.join('\n'));
console.log(`Generated ${entries.length} pages to ${OUT_PATH}`);
