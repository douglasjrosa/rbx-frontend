'use client';

import { useState } from 'react';
import ReportForm from '@/components/denuncias/report-form';
import ReportSuccessBanner from '@/components/denuncias/report-success-banner';
import ReportTrackingCard from '@/components/denuncias/report-tracking-card';

const INTRO_PARAGRAPH_CLASS =
  'text-lg leading-relaxed text-rbx-accent md:text-xl';

const INTRO_PARAGRAPHS = [
  'Aqui você pode nos dizer o que houve sem se identificar.',
  'Se souber informar data, hora e local do ocorrido, teremos mais ' +
    'facilidade em lidar com o problema.',
  'Queremos ajudar para que a Ribermax seja um local cada vez mais ' +
    'seguro e harmonioso para todos.',
] as const;

interface DenunciasPageContentProps {
  pageTitle: string;
}

export default function DenunciasPageContent({
  pageTitle,
}: DenunciasPageContentProps) {
  const [submittedReportCode, setSubmittedReportCode] = useState<string | null>(
    null,
  );

  const handleSubmitted = (reportCode: string) => {
    setSubmittedReportCode(reportCode);
  };

  const handleDismissBanner = () => {
    setSubmittedReportCode(null);
  };

  return (
    <div
      className={
        'container mx-auto max-w-6xl space-y-6 pt-10 pb-8 ' +
        'md:space-y-8 md:pt-14'
      }
    >
      <section className="card-rbx text-left">
        <h1 className="title text-rbx-green-dark">{pageTitle}</h1>
        <div className="mt-4 space-y-4">
          {INTRO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className={INTRO_PARAGRAPH_CLASS}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {submittedReportCode && (
        <ReportSuccessBanner
          reportCode={submittedReportCode}
          onDismiss={handleDismissBanner}
        />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <section className="card-rbx text-left">
          <h2 className="mb-5 text-2xl font-semibold text-rbx-accent">
            Enviar relato
          </h2>
          <ReportForm
            key={submittedReportCode ?? 'report-form'}
            onSubmitted={handleSubmitted}
          />
        </section>

        <section className="card-rbx text-left">
          <h2 className="mb-5 text-2xl font-semibold text-rbx-accent">
            Acompanhe sua denúncia aqui.
          </h2>
          <ReportTrackingCard />
        </section>
      </div>
    </div>
  );
}
