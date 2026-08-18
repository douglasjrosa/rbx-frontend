import { GA4_MEASUREMENT_ID } from '@/lib/analytics/config';

type MeasurementProtocolConsent = {
  ad_user_data: 'GRANTED' | 'DENIED';
  ad_personalization: 'GRANTED' | 'DENIED';
};

export type Ga4MpEventInput = {
  clientId: string;
  eventName: string;
  consent: MeasurementProtocolConsent;
  params?: Record<string, string | number | boolean | undefined>;
  timestampMicros?: number;
};

/**
 * Sends a server-side GA4 event via Measurement Protocol.
 * No-op when GA4_MEASUREMENT_API_SECRET is missing.
 */
export async function sendGa4MeasurementProtocolEvent(
  input: Ga4MpEventInput,
): Promise<{ ok: boolean; skipped?: boolean; status?: number }> {
  const apiSecret = process.env.GA4_MEASUREMENT_API_SECRET;

  if (!apiSecret) {
    return { ok: true, skipped: true };
  }

  const url =
    'https://www.google-analytics.com/mp/collect' +
    `?measurement_id=${encodeURIComponent(GA4_MEASUREMENT_ID)}` +
    `&api_secret=${encodeURIComponent(apiSecret)}`;

  const eventParams: Record<string, string | number | boolean> = {
    engagement_time_msec: 1,
  };

  if (input.params) {
    for (const [key, value] of Object.entries(input.params)) {
      if (value !== undefined) {
        eventParams[key] = value;
      }
    }
  }

  const body = {
    client_id: input.clientId,
    timestamp_micros: String(
      input.timestampMicros ?? Date.now() * 1000,
    ),
    consent: input.consent,
    events: [
      {
        name: input.eventName,
        params: eventParams,
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  return { ok: response.ok, status: response.status };
}
