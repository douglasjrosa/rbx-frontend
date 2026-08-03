export const RIBERMAX_LOCATION = {
  businessName: 'Ribermax Embalagens de Madeira',
  streetAddress: 'Rua Áustria, 585 – Vila Elisa',
  addressLocality: 'Ribeirão Preto',
  addressRegion: 'SP',
  postalCode: '14075-430',
  addressCountry: 'BR',
  mapQuery:
    'Ribermax Embalagens de Madeira, Rua Áustria, 585, Vila Elisa, ' +
    'Ribeirão Preto, SP',
} as const;

export const MAP_EMBED_HEIGHT_PX = 400;

export function getRibermaxMapEmbedUrl(): string {
  const query = encodeURIComponent(RIBERMAX_LOCATION.mapQuery);

  return `https://www.google.com/maps?q=${query}&hl=pt-BR&z=16&output=embed`;
}

export function getRibermaxDirectionsUrl(): string {
  const destination = encodeURIComponent(RIBERMAX_LOCATION.mapQuery);

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function getRibermaxPostalAddressLabel(): string {
  const {
    streetAddress,
    postalCode,
    addressLocality,
    addressRegion,
  } = RIBERMAX_LOCATION;

  return (
    `${streetAddress} – ${postalCode} – ` +
    `${addressLocality} ${addressRegion}.`
  );
}
