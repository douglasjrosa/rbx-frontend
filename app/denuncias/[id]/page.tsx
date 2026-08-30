import type { Metadata } from 'next';
import DenunciasAdminPage from '@/components/denuncias/admin/denuncias-admin-page';
import PageContainer from '@/components/page-container';
import { normalizeReportCode } from '@/lib/denuncias/report-code';

interface DenunciasAdminRouteProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Painel de denúncias',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DenunciasAdminRoute({
  params,
}: DenunciasAdminRouteProps) {
  const { id } = await params;

  return (
    <PageContainer variant="wood">
      <div
        className={
          'container mx-auto max-w-7xl space-y-6 px-4 pt-10 pb-8 ' +
          'md:space-y-8 md:pt-14'
        }
      >
        <DenunciasAdminPage reportCode={normalizeReportCode(id)} />
      </div>
    </PageContainer>
  );
}
