import { NextResponse } from 'next/server';
import { getReport } from '@/lib/denuncias/blob-store';
import { isRateLimited } from '@/lib/denuncias/rate-limit';
import {
  isValidReportCode,
  normalizeReportCode,
} from '@/lib/denuncias/report-code';
import type { ReportStatusResponse } from '@/lib/denuncias/types';

export const runtime = 'nodejs';

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawCode = searchParams.get('reportCode') ?? '';
  const reportCode = normalizeReportCode(rawCode);

  if (!isValidReportCode(reportCode)) {
    return NextResponse.json(
      { ok: false, error: 'Código inválido.' },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(`denuncias-status:${clientIp}`)) {
    return NextResponse.json(
      { ok: false, error: 'Muitas consultas. Tente novamente em instantes.' },
      { status: 429 },
    );
  }

  const record = await getReport(reportCode);

  if (!record) {
    return NextResponse.json(
      { ok: false, error: 'Código não encontrado.' },
      { status: 404 },
    );
  }

  const response: ReportStatusResponse = {
    ok: true,
    reportCode: record.reportCode,
    status: record.status,
    updatedAt: record.updatedAt,
    timeline: record.timeline.map((entry) => ({
      at: entry.at,
      status: entry.status,
      message: entry.message,
    })),
  };

  return NextResponse.json(response);
}
