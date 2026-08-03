import { siteConfig } from '@/content/site';
import { RIBERMAX_LOCATION } from '@/lib/contact-location';

const SITE_ORIGIN = 'https://ribermax.com.br';

export function buildLocalBusinessJsonLd(): Record<string, unknown> {
  const logoPath = siteConfig.metadata.shareImage?.src ?? siteConfig.favicon.src;
  const logoUrl = new URL(logoPath, SITE_ORIGIN).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#localbusiness`,
    name: RIBERMAX_LOCATION.businessName,
    url: `${SITE_ORIGIN}/`,
    image: logoUrl,
    logo: logoUrl,
    email: 'contato@ribermax.com.br',
    telephone: siteConfig.whatsappPhone,
    foundingDate: '1996',
    description: siteConfig.metadata.metaDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: RIBERMAX_LOCATION.streetAddress,
      addressLocality: RIBERMAX_LOCATION.addressLocality,
      addressRegion: RIBERMAX_LOCATION.addressRegion,
      postalCode: RIBERMAX_LOCATION.postalCode,
      addressCountry: RIBERMAX_LOCATION.addressCountry,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brazil',
    },
    sameAs: siteConfig.footer.socialLinks.map((link) => link.url),
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: RIBERMAX_LOCATION.businessName,
      url: `${SITE_ORIGIN}/`,
      logo: logoUrl,
    },
  };
}
