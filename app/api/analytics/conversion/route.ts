import { NextResponse } from 'next/server';
import { WHATSAPP_CLICK_EVENT } from '@/lib/analytics/config';
import { sendGa4MeasurementProtocolEvent } from '@/lib/analytics/send-ga4-measurement-protocol';

export const runtime = 'nodejs';

const ALLOWED_EVENTS = new Set<string>([WHATSAPP_CLICK_EVENT]);

const MAX_STRING_LENGTH = 500;

interface ConversionRequestBody {
  event?: unknown;
  page_path?: unknown;
  page_location?: unknown;
  page_title?: unknown;
  event_location?: unknown;
  link_url?: unknown;
  consent_status?: unknown;
  gclid?: unknown;
  gbraid?: unknown;
  wbraid?: unknown;
  client_id?: unknown;
  timestamp_ms?: unknown;
}

function asTrimmedString(value: unknown, max = MAX_STRING_LENGTH): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, max);
}

function resolveConsentFlags(
  status: string,
): {
  ad_user_data: 'GRANTED' | 'DENIED';
  ad_personalization: 'GRANTED' | 'DENIED';
} {
  if (status === 'accepted') {
    return {
      ad_user_data: 'GRANTED',
      ad_personalization: 'GRANTED',
    };
  }

  return {
    ad_user_data: 'DENIED',
    ad_personalization: 'DENIED',
  };
}

export async function POST(request: Request) {
  let body: ConversionRequestBody;

  try {
    body = (await request.json()) as ConversionRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const event = asTrimmedString(body.event, 80);

  if (!ALLOWED_EVENTS.has(event)) {
    return NextResponse.json(
      { ok: false, error: 'Event not allowed.' },
      { status: 400 },
    );
  }

  const consentStatus = asTrimmedString(body.consent_status, 20) || 'unknown';
  const clientId =
    asTrimmedString(body.client_id, 128) ||
    `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
  const timestampMs =
    typeof body.timestamp_ms === 'number' && Number.isFinite(body.timestamp_ms)
      ? body.timestamp_ms
      : Date.now();

  const pagePath = asTrimmedString(body.page_path);
  const pageLocation = asTrimmedString(body.page_location);
  const pageTitle = asTrimmedString(body.page_title);
  const eventLocation = asTrimmedString(body.event_location);
  const linkUrl = asTrimmedString(body.link_url);
  const gclid = asTrimmedString(body.gclid, 200);
  const gbraid = asTrimmedString(body.gbraid, 200);
  const wbraid = asTrimmedString(body.wbraid, 200);

  try {
    const mpResult = await sendGa4MeasurementProtocolEvent({
      clientId,
      eventName: event,
      consent: resolveConsentFlags(consentStatus),
      timestampMicros: timestampMs * 1000,
      params: {
        page_path: pagePath || undefined,
        page_location: pageLocation || undefined,
        page_title: pageTitle || undefined,
        event_location: eventLocation || undefined,
        link_url: linkUrl || undefined,
        session_id: Math.floor(timestampMs / 1000),
        ...(gclid ? { gclid } : {}),
        ...(gbraid ? { gbraid } : {}),
        ...(wbraid ? { wbraid } : {}),
      },
    });

    return NextResponse.json({
      ok: true,
      ga4: mpResult.skipped ? 'skipped' : mpResult.ok ? 'sent' : 'failed',
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Failed to forward conversion.' },
      { status: 500 },
    );
  }
}
