const LEGACY_REPORT_STATUS_LABELS: Record<string, string> = {
  received: 'Recebida',
  under_review: 'Em análise',
};

const LEGACY_REPORT_TIMELINE_MESSAGES: Record<string, string> = {
  'Anonymous report received through the channel. Under review by HR.':
    'Denúncia recebida pelo canal anônimo. Em análise pelo RH.',
};

export function formatReportStatusLabel(status: string): string {
  return LEGACY_REPORT_STATUS_LABELS[status] ?? status;
}

export function formatReportTimelineMessage(message: string): string {
  return LEGACY_REPORT_TIMELINE_MESSAGES[message] ?? message;
}
