import type { ReportRecord } from '@/lib/denuncias/types';

export interface ReportListItem {
  reportCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function formatAdminDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export function formatReportContext(report: ReportRecord): string {
  if (report.payload.unknownWhen) {
    return 'Data e local não informados';
  }

  const when = report.payload.occurredAt
    ? formatAdminDate(report.payload.occurredAt)
    : 'Data não informada';
  const where = report.payload.locationLabel ?? 'Local não informado';

  return `${when} · ${where}`;
}
