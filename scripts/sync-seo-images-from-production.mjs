#!/usr/bin/env node
/**
 * Downloads production SEO images and regenerates page-images.ts.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SEO_DIR = path.join(ROOT, 'content', 'seo');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const PRODUCTION_DATA_PATH = path.join(ROOT, 'scripts', 'production-seo-images.json');
const PAGE_IMAGES_PATH = path.join(ROOT, 'content', 'seo', 'page-images.ts');
const DIMENSIONS_PATH = path.join(ROOT, 'lib', 'seo', 'image-dimensions.json');

function normalizeFilename(url) {
  const basename = path.basename(url.split('?')[0]);
  return basename.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
}

function parseKeyword(raw) {
  return raw.match(/^Frase-chave:\s*(.+)$/m)?.[1]?.trim() ?? '';
}

function loadProductionData() {
  return JSON.parse(fs.readFileSync(PRODUCTION_DATA_PATH, 'utf-8'));
}

function loadDimensions() {
  return JSON.parse(fs.readFileSync(DIMENSIONS_PATH, 'utf-8'));
}

function saveDimensions(dimensions) {
  fs.writeFileSync(DIMENSIONS_PATH, `${JSON.stringify(dimensions, null, 2)}\n`);
}

function downloadImage(url, destination) {
  if (fs.existsSync(destination)) {
    return;
  }

  execSync(`curl -sL --max-time 30 ${JSON.stringify(url)} -o ${JSON.stringify(destination)}`, {
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

async function getImageSize(filePath) {
  const metadata = await sharp(filePath).metadata();
  return {
    width: metadata.width ?? 529,
    height: metadata.height ?? 300,
  };
}

function buildAltText(keyword, filename) {
  const stem = filename.replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' ');
  if (keyword) {
    return `${stem} - ${keyword}`;
  }
  return stem;
}

function buildCaption(keyword, filename) {
  const stem = filename.replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' ');
  if (keyword) {
    return `Imagem de ${stem} aplicada a ${keyword.toLowerCase()}.`;
  }
  return `Imagem de ${stem}.`;
}

function escapeSingleQuotes(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function renderPageImages(map) {
  const lines = [
    "import type { SeoPageImagesMap } from '@/lib/seo/types';",
    '',
    'export const SEO_PAGE_IMAGES: SeoPageImagesMap = {',
  ];

  for (const [slug, images] of Object.entries(map)) {
    lines.push(`  '${slug}': [`);
    for (const image of images) {
      lines.push('    {');
      lines.push(`      filename: '${escapeSingleQuotes(image.filename)}',`);
      lines.push(`      alt: '${escapeSingleQuotes(image.alt)}',`);
      lines.push(`      width: ${image.width},`);
      lines.push(`      height: ${image.height},`);
      lines.push(`      caption: '${escapeSingleQuotes(image.caption)}',`);
      lines.push(`      insertAfterBlock: ${image.insertAfterBlock},`);
      lines.push('    },');
    }
    lines.push('  ],');
  }

  lines.push('};', '');
  return lines.join('\n');
}

async function main() {
  const productionData = loadProductionData();
  const dimensions = loadDimensions();
  const pageImages = {};

  for (const [slug, info] of Object.entries(productionData)) {
    if (info.error || !info.productionUrls?.length) {
      throw new Error(`Missing production images for ${slug}`);
    }

    const productionUrl = info.productionUrls[0];
    const filename = normalizeFilename(productionUrl);
    const destination = path.join(IMAGES_DIR, filename);
    downloadImage(productionUrl, destination);

    if (!fs.existsSync(destination)) {
      throw new Error(`Failed to download ${productionUrl}`);
    }

    if (!dimensions[filename]) {
      dimensions[filename] = await getImageSize(destination);
    }

    const seoRaw = fs.readFileSync(path.join(SEO_DIR, `${slug}.md`), 'utf-8');
    const keyword = parseKeyword(seoRaw);
    const { width, height } = dimensions[filename];

    pageImages[slug] = [
      {
        filename,
        alt: buildAltText(keyword, filename),
        width,
        height,
        caption: buildCaption(keyword, filename),
        insertAfterBlock: 0,
      },
    ];
  }

  saveDimensions(dimensions);
  fs.writeFileSync(PAGE_IMAGES_PATH, renderPageImages(pageImages));
  process.stdout.write(`Updated ${Object.keys(pageImages).length} SEO pages\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
