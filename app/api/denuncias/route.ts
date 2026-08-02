import { NextResponse } from 'next/server';
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

  try {
    await sendAnonymousReportEmail(validation.data);
  } catch (error) {
    const smtpCode =
      error && typeof error === 'object' && 'code' in error
        ? String((error as { code?: string }).code ?? '')
        : '';
    const responseCode =
      error && typeof error === 'object' && 'responseCode' in error
        ? Number((error as { responseCode?: number }).responseCode)
        : undefined;

    if (process.env.NODE_ENV !== 'production') {
      const message =
        error instanceof Error ? error.message : String(error);
      // Surface auth/config failures in the local API response to speed up setup.
      if (smtpCode === 'EAUTH' || responseCode === 535) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Falha de autenticação SMTP. Confira SMTP_USER e SMTP_PASS ' +
              'no .env.local (conta Google Workspace / Gmail).',
          },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          ok: false,
          error: `Falha ao enviar e-mail: ${message}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          'Não foi possível enviar a denúncia agora. Tente novamente ' +
          'em alguns minutos.',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
