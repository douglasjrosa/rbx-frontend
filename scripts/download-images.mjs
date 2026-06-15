import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const BASE = 'https://ribermax.com.br/images/';
const FORCE_DOWNLOAD = process.argv.includes('--force');

const LOCAL_FALLBACKS = {
  'caixa_madeira_fumigada_02.webp': 'caixa-madeira-fumigada-2.webp',
  'logomarca_h_p_min.webp': 'logomarca-h.webp',
  'certificacao_min.webp': 'Checked.webp',
  'porto-de-santos-optimized.avif': 'porto de santos optimized.avif',
  'madeira_Xpapelao.webp': 'madeira-vs-papelao.webp',
  'logomarca_efect.webp': 'logomarca-efect.webp',
};

const IMAGE_FILES = [
  'Logo_Ribermax_min.webp',
  'logomarca_h_p_min.webp',
  'certificacao_min.webp',
  'logotipo_ribermax_45x45_min.webp',
  'logotipo_whatsapp_512x512.png',
  'wood-min.webp',
  'porto de santos optimized.avif',
  'floresta-min-min.webp',
  'bg_bloco-min.webp',
  'bg_h1.webp',
  'worldwide.webp',
  'madeira_Xpapelao.webp',
  'caixa_madeira_fumigada_02.webp',
  'logomarca_efect.webp',
  'especialista-min.webp',
  'caixa-economica.webp',
  'caixa-estruturada.webp',
  '20160127_161138-min.webp',
  'engradado-madeira-transporte-2.webp',
  'engradado-resistente.webp',
  'caixa-madeira-fumigada-3.webp',
  'capa_fb.webp',
  'Prancheta-1.png',
  'Prancheta-2.png',
  'Prancheta-3.png',
  'caixa_nov.png',
  'caminhao_novo.png',
  'madeira-fumigada-exportacao.png',
  'ribermax_fabrica.png',
  'diferenciais.png',
  'wood-pannel.jpg',
  'fuyndo_verdeclaro_02.png',
  'green-wallpaper.webp',
];

function isValidImageFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const buffer = fs.readFileSync(filePath, { start: 0, end: 16 });
  const header = buffer.toString('utf8', 0, 16);

  if (header.startsWith('<!doctype') || header.startsWith('<html')) {
    return false;
  }

  if (buffer.toString('ascii', 0, 4) === 'RIFF') {
    return true;
  }

  if (buffer.toString('ascii', 4, 8) === 'ftyp') {
    return true;
  }

  if (buffer[0] === 0x89 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return true;
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    return true;
  }

  return false;
}

function copyLocalFallback(localName) {
  const fallback = LOCAL_FALLBACKS[localName];

  if (!fallback) {
    return false;
  }

  const sourcePath = path.join(IMAGES_DIR, fallback);
  const destPath = path.join(IMAGES_DIR, localName);

  if (!isValidImageFile(sourcePath)) {
    return false;
  }

  fs.copyFileSync(sourcePath, destPath);
  console.log(`fallback ${localName} <- ${fallback}`);
  return true;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          download(response.headers.location, dest).then(resolve).catch(reject);
          return;
        }

        const contentType = response.headers['content-type'] ?? '';

        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${response.statusCode} for ${url}`));
          return;
        }

        if (contentType.includes('text/html')) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTML response for ${url}`));
          return;
        }

        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (error) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(error);
      });
  });
}

async function main() {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  for (const filename of IMAGE_FILES) {
    const encoded = encodeURI(filename);
    const url = `${BASE}${encoded}`;
    const localName = filename.includes('porto de santos')
      ? 'porto-de-santos-optimized.avif'
      : filename;
    const dest = path.join(IMAGES_DIR, localName);

    if (!FORCE_DOWNLOAD && isValidImageFile(dest)) {
      console.log(`skip ${localName}`);
      continue;
    }

    try {
      await download(url, dest);

      if (!isValidImageFile(dest)) {
        fs.unlinkSync(dest);
        throw new Error(`Downloaded file is not a valid image`);
      }

      console.log(`ok ${localName}`);
    } catch (error) {
      console.warn(`fail ${localName}: ${error.message}`);

      if (copyLocalFallback(localName)) {
        continue;
      }

      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
    }
  }
}

main();
