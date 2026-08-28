import { NextResponse } from 'next/server';
import { saveReport } from '@/lib/denuncias/blob-store';
import { sendAnonymousReportEmail } from '@/lib/denuncias/send-report-email';
import { validateReportFormInput } from '@/lib/denuncias/validate-report';

export const runtime = 'nodejs';

interface ReportRequestBody {
  description?: unknown;
  unknownWhen?: unknown;
  occurredAt?: unknown;
  location?: unknown;
  honeypot?: unknown;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function POST(request: Request) {
  let body: ReportRequestBody;

  try {
    body = (await request.json()) as ReportRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Requisição inválida.' },
      { status: 400 },
    );
  }

  const validation = validateReportFormInput({
    description: asString(body.description),
    unknownWhen: Boolean(body.unknownWhen),
    occurredAt: asString(body.occurredAt),
    location: asString(body.location),
    honeypot: asString(body.honeypot),
  });

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    );
  }

  let reportCode: string;

  try {
    const record = await saveReport({
      description: validation.data.description,
      unknownWhen: validation.data.unknownWhen,
      occurredAt: validation.data.occurredAt,
      locationValue: validation.data.locationValue,
      locationLabel: validation.data.locationLabel,
    });

    reportCode = record.reportCode;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Não foi possível registrar a denúncia agora. Tente novamente ' +
          'em alguns minutos.',
      },
      { status: 500 },
    );
  }

  try {
    await sendAnonymousReportEmail(validation.data, reportCode);
  } catch {
    // Report is already persisted; do not expose email delivery details.
  }

  return NextResponse.json({ ok: true, reportCode });
}
