import { REPORT_CODE_PREFIX } from '@/lib/denuncias/constants';

const REPORT_CODE_CHARSET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const REPORT_CODE_SUFFIX_LENGTH = 6;

export const REPORT_CODE_REGEX = /^RMX-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/;

export function generateReportCodeSuffix(): string {
  const bytes = new Uint8Array(REPORT_CODE_SUFFIX_LENGTH);
  crypto.getRandomValues(bytes);

  let suffix = '';

  for (let index = 0; index < REPORT_CODE_SUFFIX_LENGTH; index += 1) {
    const charIndex = bytes[index] % REPORT_CODE_CHARSET.length;
    suffix += REPORT_CODE_CHARSET[charIndex];
  }

  return suffix;
}

export function generateReportCode(): string {
  return `${REPORT_CODE_PREFIX}${generateReportCodeSuffix()}`;
}

export function normalizeReportCode(value: string): string {
  return value.trim().toUpperCase();
}

export function isValidReportCode(value: string): boolean {
  return REPORT_CODE_REGEX.test(normalizeReportCode(value));
}
