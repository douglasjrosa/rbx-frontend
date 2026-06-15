import { notFound } from 'next/navigation';
import HtmlContent from '@/components/html-content';
import PageContainer from '@/components/page-container';
import { getLegalPage } from '@/lib/content/legal-pages';
import { buildLegalMetadata } from '@/lib/metadata';

const PAGE_SLUG = 'politica-de-cookies-br';

export async function generateMetadata() {
  const page = getLegalPage(PAGE_SLUG);

  if (!page) {
    return {};
  }

  return buildLegalMetadata(page);
}

export default function CookiePolicyPage() {
  const page = getLegalPage(PAGE_SLUG);

  if (!page) {
    notFound();
  }

  return (
    <PageContainer variant="wood">
      <article className="container max-w-4xl mx-auto">
        <div className="card-rbx text-left mb-16 prose-rbx cookie-policy">
          <HtmlContent html={page.content} />
        </div>
      </article>
    </PageContainer>
  );
}
