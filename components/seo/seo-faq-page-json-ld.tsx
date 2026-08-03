import { buildFaqPageJsonLd } from '@/lib/seo/faq-page-json-ld';
import type { SeoFaqItem } from '@/lib/seo/priority-landing';

interface SeoFaqPageJsonLdProps {
  faqs: SeoFaqItem[];
}

export default function SeoFaqPageJsonLd({ faqs }: SeoFaqPageJsonLdProps) {
  const jsonLd = buildFaqPageJsonLd(faqs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
