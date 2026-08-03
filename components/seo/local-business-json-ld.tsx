import { buildLocalBusinessJsonLd } from '@/lib/seo/local-business-json-ld';

export default function LocalBusinessJsonLd() {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
