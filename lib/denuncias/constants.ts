export const REPORT_TO_EMAIL = 'rh@ribermax.com.br';

export const REPORT_BLOB_FOLDER = 'denuncias';

export const REPORT_CODE_PREFIX = 'RMX-';

export const REPORT_INITIAL_STATUS = 'Recebida';

export const REPORT_INITIAL_TIMELINE_MESSAGE =
  'Denúncia recebida pelo canal anônimo. Em análise pelo RH.';

export const MAX_LOG_MESSAGE_LENGTH = 2000;

export const MAX_LOG_STATUS_LENGTH = 100;

export const MAX_REPORT_DESCRIPTION_LENGTH = 5000;

export const MIN_REPORT_DESCRIPTION_LENGTH = 10;

export const REPORT_LOCATION_OPTIONS = [
  { value: 'outside_company', label: 'Fora da empresa' },
  { value: 'assembly_hall', label: 'No salão da Montagem' },
  { value: 'wood_cutting_hall', label: 'No salão do Corte de Madeiras' },
  { value: 'sheet_cutting_hall', label: 'No salão do Corte de Chapas' },
  { value: 'near_warehouse', label: 'Próximo ao Almoxarifado' },
  { value: 'offices', label: 'Em um dos Escritórios' },
  { value: 'bathrooms', label: 'Em um dos Banheiros' },
  { value: 'cafeterias', label: 'Em um dos Refeitórios' },
  { value: 'auditorium', label: 'No Auditório' },
  { value: 'other_place', label: 'Em outro lugar' },
] as const;

export type ReportLocationValue =
  (typeof REPORT_LOCATION_OPTIONS)[number]['value'];

export const REPORT_LOCATION_VALUES = REPORT_LOCATION_OPTIONS.map(
  (option) => option.value,
);

export function getReportLocationLabel(
  value: string,
): string | undefined {
  return REPORT_LOCATION_OPTIONS.find((option) => option.value === value)
    ?.label;
}
