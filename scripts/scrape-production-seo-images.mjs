#!/usr/bin/env node
/**
 * Scrapes production WordPress SEO pages and extracts content images.
 * Usage: node scripts/scrape-production-seo-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SEO_DIR = path.join(ROOT, 'content', 'seo');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const OUTPUT_PATH = path.join(ROOT, 'scripts', 'production-seo-images.json');

const SKIP_PATTERNS = [
  'ribermax-pb',
  'ribermax_logo',
  'IPPC',
  'CTA_',
  'whatsapp',
  'cropped-ribermax',
  'favicon',
  'logotipo',
];

function getSlugs() {
  return fs
    .readdirSync(SEO_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort();
}

function fetchHtml(slug) {
  const url = `https://ribermax.com.br/${slug}/`;
  return execSync(`curl -sL --max-time 20 ${JSON.stringify(url)}`, {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

function extractContentImages(html) {
  const uploads = [
    ...html.matchAll(
      /https:\/\/ribermax\.com\.br\/wp-content\/uploads\/[^"'\s)]+\.(?:webp|png|jpg|jpeg|avif)/gi,
    ),
  ].map((match) => match[0]);

  const unique = [...new Set(uploads)];
  return unique.filter(
    (url) => !SKIP_PATTERNS.some((pattern) => url.includes(pattern)),
  );
}

function normalizeFilename(url) {
  const basename = path.basename(url.split('?')[0]);
  return basename.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
}

function listLocalImages(dir = IMAGES_DIR, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...listLocalImages(path.join(dir, entry.name), rel));
      continue;
    }

    if (/\.(webp|png|jpg|jpeg|avif)$/i.test(entry.name)) {
      files.push(rel);
    }
  }

  return files;
}

function findLocalMatch(productionFilename, localImages) {
  const normalized = productionFilename.toLowerCase();
  const stem = normalized.replace(/\.[a-z0-9]+$/i, '');

  const exact = localImages.find(
    (file) => path.basename(file).toLowerCase() === normalized,
  );
  if (exact) {
    return exact;
  }

  const stemMatch = localImages.find((file) => {
    const localStem = path.basename(file).toLowerCase().replace(/\.[a-z0-9]+$/i, '');
    return localStem === stem || localStem.includes(stem) || stem.includes(localStem);
  });
  if (stemMatch) {
    return stemMatch;
  }

  const fuzzy = localImages.find((file) =>
    path.basename(file).toLowerCase().includes(stem.slice(0, 12)),
  );
  return fuzzy ?? null;
}

function main() {
  const slugs = getSlugs();
  const localImages = listLocalImages();
  const results = {};

  for (const slug of slugs) {
    try {
      const html = fetchHtml(slug);
      const productionUrls = extractContentImages(html);
      const productionFiles = [
        ...new Set(productionUrls.map((url) => normalizeFilename(url))),
      ].filter((file) => !/-\d+x\d+\.[a-z]+$/i.test(file));

      const matches = productionFiles.map((file) => ({
        productionFile: file,
        productionUrl: productionUrls.find((url) => url.includes(file)),
        localFile: findLocalMatch(file, localImages),
      }));

      results[slug] = {
        productionUrls,
        productionFiles,
        matches,
      };
      process.stdout.write(`Scraped ${slug}\n`);
    } catch (error) {
      results[slug] = { error: String(error) };
      process.stderr.write(`Failed ${slug}: ${error}\n`);
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
  process.stdout.write(`Wrote ${OUTPUT_PATH}\n`);
}

main();
