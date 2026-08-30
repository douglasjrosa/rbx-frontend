import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/denuncias/admin-api';
import {
  MAX_LOG_MESSAGE_LENGTH,
  MAX_LOG_STATUS_LENGTH,
} from '@/lib/denuncias/constants';
import {
  deleteReport,
  getReport,
  updateReport,
} from '@/lib/denuncias/blob-store';
import {
  isValidReportCode,
  normalizeReportCode,
} from '@/lib/denuncias/report-code';

export const runtime = 'nodejs';

interface RouteContext {
  params: Promise<{ reportCode: string }>;
}

interface PatchRequestBody {
  status?: unknown;
  message?: unknown;
  removeTimelineEntryId?: unknown;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdminSession();

  if (authError) {
    return authError;
  }

  const { reportCode: rawReportCode } = await context.params;
  const reportCode = normalizeReportCode(rawReportCode);

  if (!isValidReportCode(reportCode)) {
    return NextResponse.json(
      { ok: false, error: 'Código inválido.' },
      { status: 400 },
    );
  }

  const record = await getReport(reportCode);

  if (!record) {
    return NextResponse.json(
      { ok: false, error: 'Denúncia não encontrada.' },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, report: record });
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdminSession();

  if (authError) {
    return authError;
  }

  const { reportCode: rawReportCode } = await context.params;
  const reportCode = normalizeReportCode(rawReportCode);

  if (!isValidReportCode(reportCode)) {
    return NextResponse.json(
      { ok: false, error: 'Código inválido.' },
      { status: 400 },
    );
  }

  let body: PatchRequestBody;

  try {
    body = (await request.json()) as PatchRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Requisição inválida.' },
      { status: 400 },
    );
  }

  const status = asString(body.status).trim();
  const message = asString(body.message).trim();
  const removeTimelineEntryId = asString(body.removeTimelineEntryId).trim();

  if (!status && !message && !removeTimelineEntryId) {
    return NextResponse.json(
      { ok: false, error: 'Nenhuma alteração informada.' },
      { status: 400 },
    );
  }

  if (status && status.length > MAX_LOG_STATUS_LENGTH) {
    return NextResponse.json(
      { ok: false, error: 'Status excede o limite permitido.' },
      { status: 400 },
    );
  }

  if (message && message.length > MAX_LOG_MESSAGE_LENGTH) {
    return NextResponse.json(
      { ok: false, error: 'Mensagem excede o limite permitido.' },
      { status: 400 },
    );
  }

  if (message && !status) {
    return NextResponse.json(
      { ok: false, error: 'Informe o status junto com a mensagem.' },
      { status: 400 },
    );
  }

  try {
    const report = await updateReport(reportCode, {
      ...(status && message
        ? { timelineEntry: { status, message } }
        : {}),
      ...(status && !message ? { status } : {}),
      ...(removeTimelineEntryId
        ? { removeTimelineEntryId }
        : {}),
    });

    return NextResponse.json({ ok: true, report });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Denúncia não encontrada.' },
      { status: 404 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdminSession();

  if (authError) {
    return authError;
  }

  const { reportCode: rawReportCode } = await context.params;
  const reportCode = normalizeReportCode(rawReportCode);

  if (!isValidReportCode(reportCode)) {
    return NextResponse.json(
      { ok: false, error: 'Código inválido.' },
      { status: 400 },
    );
  }

  try {
    await deleteReport(reportCode);

    return NextResponse.json({ ok: true, reportCode });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Denúncia não encontrada.' },
      { status: 404 },
    );
  }
}
