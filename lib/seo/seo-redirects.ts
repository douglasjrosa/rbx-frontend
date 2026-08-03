/**
 * Permanent SEO consolidations: satellite landings → one canonical per cluster.
 * Kept separate from next.config for review and reuse (sitemap filters, etc.).
 */
export const SEO_CANONICAL_REDIRECTS: ReadonlyArray<{
  sourceSlug: string;
  destinationSlug: string;
}> = [
  // Fumigada / exportação
  {
    sourceSlug: 'caixa-madeira-fumigada',
    destinationSlug: 'caixa-madeira-fumigada-exportacao',
  },
  {
    sourceSlug: 'embalagem-fumigada',
    destinationSlug: 'caixa-madeira-fumigada-exportacao',
  },
  {
    sourceSlug: 'embalagem-madeira-fumigada',
    destinationSlug: 'caixa-madeira-fumigada-exportacao',
  },

  // Fábrica / fabricante
  {
    sourceSlug: 'fabrica-embalagens-madeira',
    destinationSlug: 'fabrica-caixas-madeira',
  },
  {
    sourceSlug: 'fabricacao-embalagens-madeira',
    destinationSlug: 'fabrica-caixas-madeira',
  },
  {
    sourceSlug: 'fabricacao-caixas-madeira',
    destinationSlug: 'fabrica-caixas-madeira',
  },
  {
    sourceSlug: 'fabricante-embalagem-madeira',
    destinationSlug: 'fabrica-caixas-madeira',
  },

  // Empresa
  {
    sourceSlug: 'empresa-embalagens-madeira',
    destinationSlug: 'empresa-caixas-madeira',
  },

  // Engradado
  {
    sourceSlug: 'caixa-engradado-madeira',
    destinationSlug: 'engradado-madeira',
  },
  {
    sourceSlug: 'engradado-madeira-comprar',
    destinationSlug: 'engradado-madeira',
  },
] as const;

export const SEO_REDIRECT_SOURCE_SLUGS = new Set(
  SEO_CANONICAL_REDIRECTS.map((entry) => entry.sourceSlug),
);

export function buildSeoCanonicalRedirectRules(): Array<{
  source: string;
  destination: string;
  permanent: boolean;
}> {
  const clusterRedirects = SEO_CANONICAL_REDIRECTS.flatMap(
    ({ sourceSlug, destinationSlug }) => {
      const destination = `/${destinationSlug}/`;

      return [
        {
          source: `/${sourceSlug}`,
          destination,
          permanent: true,
        },
        {
          source: `/${sourceSlug}/`,
          destination,
          permanent: true,
        },
      ];
    },
  );

  return [
    ...clusterRedirects,
    {
      source: '/index.amp',
      destination: '/',
      permanent: true,
    },
    {
      source: '/index.amp/',
      destination: '/',
      permanent: true,
    },
  ];
}
