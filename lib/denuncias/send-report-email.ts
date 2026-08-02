import nodemailer from 'nodemailer';
import type { ValidReportPayload } from '@/lib/denuncias/validate-report';
import { REPORT_TO_EMAIL } from '@/lib/denuncias/constants';

const SMTP_PORT_DEFAULT = 465;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function formatOccurredAt(isoLocalValue: string): string {
  const date = new Date(isoLocalValue);

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function buildEmailBody(payload: ValidReportPayload): string {
  const whenLine = payload.unknownWhen
    ? 'Data e hora: não informado (autor não soube dizer quando aconteceu)'
    : `Data e hora: ${formatOccurredAt(payload.occurredAt ?? '')}`;

  const locationLine = payload.unknownWhen
    ? 'Local: não informado'
    : `Local: ${payload.locationLabel}`;

  return [
    'Nova denúncia anônima recebida pelo site Ribermax.',
    '',
    '--- Relato ---',
    payload.description,
    '',
    '--- Contexto ---',
    whenLine,
    locationLine,
    '',
    'Este e-mail foi gerado automaticamente. O autor não se identificou.',
  ].join('\n');
}

export async function sendAnonymousReportEmail(
  payload: ValidReportPayload,
): Promise<void> {
  const host = requireEnv('SMTP_HOST');
  const user = requireEnv('SMTP_USER');
  const pass = requireEnv('SMTP_PASS');
  const fromEmail =
    process.env.REPORT_FROM_EMAIL?.trim() || user;
  const toEmail =
    process.env.REPORT_TO_EMAIL?.trim() || REPORT_TO_EMAIL;
  const port = Number.parseInt(
    process.env.SMTP_PORT ?? String(SMTP_PORT_DEFAULT),
    10,
  );
  const secure =
    (process.env.SMTP_SECURE ?? 'true').toLowerCase() !== 'false';

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: `"Canal de Denúncias Ribermax" <${fromEmail}>`,
    to: toEmail,
    subject: '[Denúncia anônima] Relato recebido pelo site',
    text: buildEmailBody(payload),
  });
}
