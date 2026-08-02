import {
  getReportLocationLabel,
  MAX_REPORT_DESCRIPTION_LENGTH,
  MIN_REPORT_DESCRIPTION_LENGTH,
  REPORT_LOCATION_VALUES,
  type ReportLocationValue,
} from '@/lib/denuncias/constants';

export interface ReportFormInput {
  description: string;
  unknownWhen: boolean;
  occurredAt: string;
  location: string;
  honeypot: string;
}

export interface ValidReportPayload {
  description: string;
  unknownWhen: boolean;
  occurredAt: string | null;
  locationValue: ReportLocationValue | null;
  locationLabel: string | null;
}

export type ReportValidationResult =
  | { ok: true; data: ValidReportPayload }
  | { ok: false; error: string };

function isReportLocationValue(value: string): value is ReportLocationValue {
  return (REPORT_LOCATION_VALUES as readonly string[]).includes(value);
}

export function validateReportFormInput(
  input: ReportFormInput,
): ReportValidationResult {
  if (input.honeypot.trim()) {
    return { ok: false, error: 'Invalid submission.' };
  }

  const description = input.description.trim();

  if (description.length < MIN_REPORT_DESCRIPTION_LENGTH) {
    return {
      ok: false,
      error: 'Descreva o que aconteceu com mais detalhes.',
    };
  }

  if (description.length > MAX_REPORT_DESCRIPTION_LENGTH) {
    return {
      ok: false,
      error: 'A descrição ultrapassou o limite permitido.',
    };
  }

  if (input.unknownWhen) {
    return {
      ok: true,
      data: {
        description,
        unknownWhen: true,
        occurredAt: null,
        locationValue: null,
        locationLabel: null,
      },
    };
  }

  const occurredAt = input.occurredAt.trim();

  if (!occurredAt) {
    return {
      ok: false,
      error: 'Informe a data e a hora do ocorrido.',
    };
  }

  const occurredDate = new Date(occurredAt);

  if (Number.isNaN(occurredDate.getTime())) {
    return {
      ok: false,
      error: 'Data e hora inválidas.',
    };
  }

  if (!isReportLocationValue(input.location)) {
    return {
      ok: false,
      error: 'Selecione o local do ocorrido.',
    };
  }

  return {
    ok: true,
    data: {
      description,
      unknownWhen: false,
      occurredAt,
      locationValue: input.location,
      locationLabel: getReportLocationLabel(input.location) ?? input.location,
    },
  };
}
