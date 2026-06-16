import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SEO_DIR = path.join(ROOT, 'content', 'seo');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const PAGE_IMAGES_PATH = path.join(ROOT, 'content', 'seo', 'page-images.ts');
const SEPARATOR = '#############################################';

function splitHtmlBlocks(html) {
  const trimmed = html.trim();
  if (!trimmed) return [];
  return trimmed.split(/(?=<h2[\s>])/i).map((part) => part.trim()).filter(Boolean);
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

function countBodyBlocks(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const headerEnd = raw.indexOf(SEPARATOR);
  const body = headerEnd === -1 ? '' : raw.slice(headerEnd);
  const mainContent = extractSection(body, 'Page content');
  const middleContent = extractMiddleContent(body);
  return [
    ...splitHtmlBlocks(mainContent),
    ...splitHtmlBlocks(middleContent),
  ].length;
}

function loadPageImages() {
  const source = fs.readFileSync(PAGE_IMAGES_PATH, 'utf-8');
  const slugs = [...source.matchAll(/'([^']+)': \[/g)].map((match) => match[1]);
  const map = {};

  for (const slug of slugs) {
    const blockPattern = new RegExp(
      `'${slug}': \\[([\\s\\S]*?)\\n  \\],`,
      'm',
    );
    const blockMatch = source.match(blockPattern);
    if (!blockMatch) {
      throw new Error(`Could not parse image block for ${slug}`);
    }

    const filenames = [...blockMatch[1].matchAll(/filename: '([^']+)'/g)].map(
      (match) => match[1],
    );
    const insertPoints = [
      ...blockMatch[1].matchAll(/insertAfterBlock: (\d+)/g),
    ].map((match) => Number(match[1]));
    const alts = [...blockMatch[1].matchAll(/alt: '([^']*)'/g)].map(
      (match) => match[1],
    );

    map[slug] = filenames.map((filename, index) => ({
      filename,
      alt: alts[index] ?? '',
      insertAfterBlock: insertPoints[index] ?? 0,
    }));
  }

  return map;
}

const seoFiles = fs
  .readdirSync(SEO_DIR)
  .filter((file) => file.endsWith('.md'))
  .sort();

const pageImages = loadPageImages();
const errors = [];

for (const file of seoFiles) {
  const slug = file.replace(/\.md$/, '');
  const images = pageImages[slug];

  if (!images) {
    errors.push(`Missing image manifest for ${slug}`);
    continue;
  }

  if (images.length < 1 || images.length > 3) {
    errors.push(
      `${slug} must have between 1 and 3 images (found ${images.length})`,
    );
  }

  const uniqueFilenames = new Set(images.map((image) => image.filename));
  if (uniqueFilenames.size !== images.length) {
    errors.push(`${slug} reuses an image within the same page`);
  }

  const blockCount = countBodyBlocks(path.join(SEO_DIR, file));
  const maxInsert = Math.max(0, blockCount - 1);

  for (const image of images) {
    const imagePath = path.join(IMAGES_DIR, image.filename);
    if (!fs.existsSync(imagePath)) {
      errors.push(`${slug} references missing image ${image.filename}`);
    }

    if (!image.alt.trim()) {
      errors.push(`${slug} image ${image.filename} is missing alt text`);
    }

    if (image.insertAfterBlock < 0 || image.insertAfterBlock > maxInsert) {
      errors.push(
        `${slug} image ${image.filename} has invalid insertAfterBlock ` +
          `${image.insertAfterBlock} (max ${maxInsert})`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error('SEO image validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${seoFiles.length} SEO pages with image manifests.`);
