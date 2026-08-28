import { NextResponse } from 'next/server';
import { appendReportLog } from '@/lib/denuncias/blob-store';
import { isAuthorizedBearerToken } from '@/lib/denuncias/auth-token';
import {
  MAX_LOG_MESSAGE_LENGTH,
  MAX_LOG_STATUS_LENGTH,
} from '@/lib/denuncias/constants';
import {
  isValidReportCode,
  normalizeReportCode,
} from '@/lib/denuncias/report-code';

export const runtime = 'nodejs';

interface InsertLogRequestBody {
  status?: unknown;
  message?: unknown;
}

interface RouteContext {
  params: Promise<{ reportCode: string }>;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function POST(request: Request, context: RouteContext) {
  const expectedToken = process.env.DENUNCIAS_LOG_API_TOKEN?.trim();

  if (!expectedToken) {
    return NextResponse.json(
      { ok: false, error: 'Service unavailable.' },
      { status: 503 },
    );
  }

  if (
    !isAuthorizedBearerToken(
      request.headers.get('authorization'),
      expectedToken,
    )
  ) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized.' },
      { status: 401 },
    );
  }

  const { reportCode: rawReportCode } = await context.params;
  const reportCode = normalizeReportCode(rawReportCode);

  if (!isValidReportCode(reportCode)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid report code.' },
      { status: 400 },
    );
  }

  let body: InsertLogRequestBody;

  try {
    body = (await request.json()) as InsertLogRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const status = asString(body.status).trim();
  const message = asString(body.message).trim();

  if (!status || !message) {
    return NextResponse.json(
      { ok: false, error: 'Status and message are required.' },
      { status: 400 },
    );
  }

  if (status.length > MAX_LOG_STATUS_LENGTH) {
    return NextResponse.json(
      { ok: false, error: 'Status exceeds the allowed length.' },
      { status: 400 },
    );
  }

  if (message.length > MAX_LOG_MESSAGE_LENGTH) {
    return NextResponse.json(
      { ok: false, error: 'Message exceeds the allowed length.' },
      { status: 400 },
    );
  }

  try {
    const updated = await appendReportLog(reportCode, { status, message });

    return NextResponse.json({
      ok: true,
      reportCode: updated.reportCode,
      status: updated.status,
      timelineLength: updated.timeline.length,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Report not found.' },
      { status: 404 },
    );
  }
}
