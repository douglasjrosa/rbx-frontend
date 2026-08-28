import type { Metadata } from 'next';
import DenunciasPageContent from '@/components/denuncias/denuncias-page-content';
import PageContainer from '@/components/page-container';
import { siteConfig } from '@/content/site';

const PAGE_TITLE = 'Canal anônimo de denúncias';

const PAGE_DESCRIPTION =
  'Envie um relato anônimo para a Ribermax. Se souber informar data, ' +
  'hora e local do ocorrido, teremos mais facilidade em lidar com o ' +
  'problema.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ${siteConfig.metaTitleSuffix}`,
    description: PAGE_DESCRIPTION,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DenunciasPage() {
  return (
    <PageContainer variant="wood">
      <DenunciasPageContent pageTitle={PAGE_TITLE} />
    </PageContainer>
  );
}
