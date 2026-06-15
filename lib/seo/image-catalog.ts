export const SEO_IMAGE_CATALOG = {
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
} as const;

export type SeoImageCategory = keyof typeof SEO_IMAGE_CATALOG;

const EXCLUDED_IMAGES = new Set([
  'wood-min.webp',
  'bg_h1.webp',
  'bg_bloco-min.webp',
  'blur.webp',
  'sem-imagem.png',
  'pattern_01.png',
  'green-wallpaper.webp',
  'fuyndo_verdeclaro_02.png',
  'ribermax_logo_branca.png',
  'Logo_Ribermax_min.webp',
  'logomarca_h_p_min.webp',
  'logomarca_h_p_branca.png',
  'logotipo_whatsapp_512x512.png',
  'logotipo_ribermax_45x45_min.webp',
]);

export function getAllCatalogImages(): string[] {
  const images = Object.values(SEO_IMAGE_CATALOG).flat();

  return [...new Set(images)].filter((image) => !EXCLUDED_IMAGES.has(image));
}

export function resolveImageCategories(slug: string): SeoImageCategory[] {
  if (slug.includes('engradado')) {
    return ['crates', 'transport', 'export'];
  }

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

  if (slug.includes('ribeirao')) {
    return ['local', 'factory', 'boxes'];
  }

  if (slug.includes('caixa')) {
    return ['boxes', 'export', 'technical'];
  }

  return ['boxes', 'factory', 'export'];
}
