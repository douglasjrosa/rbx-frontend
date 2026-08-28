'use client';

interface ReportSuccessBannerProps {
  reportCode: string;
  onDismiss: () => void;
}

export default function ReportSuccessBanner({
  reportCode,
  onDismiss,
}: ReportSuccessBannerProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportCode);
    } catch {
      // Clipboard may be unavailable; the code remains visible for manual copy.
    }
  };

  return (
    <div
      className={
        'relative rounded-md border border-rbx-green bg-green-50 px-4 py-5 ' +
        'text-left md:px-6'
      }
      role="status"
    >
      <button
        type="button"
        onClick={onDismiss}
        className={
          'absolute top-3 right-3 rounded-md px-2 py-1 text-sm font-semibold ' +
          'text-rbx-green-dark transition-colors hover:bg-green-100'
        }
        aria-label="Fechar aviso de sucesso"
      >
        X
      </button>

      <p className="pr-8 text-lg font-semibold text-rbx-green-dark">
        Sua denúncia anônima foi enviada para o RH da Ribermax.
      </p>
      <p className="mt-2 text-base leading-relaxed text-rbx-accent">
        Anote o código abaixo para acompanhar o andamento da sua denúncia.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <code
          className={
            'rounded-md border border-rbx-green bg-white px-4 py-2 text-lg ' +
            'font-bold tracking-wide text-rbx-green-dark'
          }
        >
          {reportCode}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className={
            'rounded-md bg-rbx-green-primary px-4 py-2 text-base font-semibold ' +
            'text-white transition-colors hover:bg-rbx-green-secondary'
          }
        >
          Copiar código
        </button>
      </div>
    </div>
  );
}
