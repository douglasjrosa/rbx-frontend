import type { Metadata } from 'next';
import ReportForm from '@/components/denuncias/report-form';
import PageContainer from '@/components/page-container';
import { siteConfig } from '@/content/site';

const PAGE_TITLE = 'Canal anônimo de denúncias';

const PAGE_DESCRIPTION =
  'Envie um relato anônimo para a Ribermax. Se souber informar data, ' +
  'hora e local do ocorrido, teremos mais facilidade em lidar com o ' +
  'problema.';

const INTRO_TEXT =
  'Aqui você pode nos dizer o que houve sem se identificar. Se souber ' +
  'informar data, hora e local do ocorrido, teremos mais facilidade em ' +
  'lidar com o problema. Queremos ajudar para que a Ribermax seja um ' +
  'local cada vez mais seguro e harmonioso para todos.';

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
      <div className="container mx-auto max-w-3xl space-y-6 pb-8 md:space-y-8">
        <section className="card-rbx text-left">
          <h1 className="title text-rbx-green-dark">{PAGE_TITLE}</h1>
          <p className="mt-4 text-lg leading-relaxed text-rbx-accent md:text-xl">
            {INTRO_TEXT}
          </p>
        </section>

        <section className="card-rbx text-left">
          <h2 className="mb-5 text-2xl font-semibold text-rbx-accent">
            Enviar relato
          </h2>
          <ReportForm />
        </section>
      </div>
    </PageContainer>
  );
}
