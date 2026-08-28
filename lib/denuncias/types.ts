import type { ReportLocationValue } from '@/lib/denuncias/constants';

export interface ReportPayload {
  description: string;
  unknownWhen: boolean;
  occurredAt: string | null;
  locationValue: ReportLocationValue | null;
  locationLabel: string | null;
}

export interface ReportTimelineEntry {
  id: string;
  at: string;
  status: string;
  message: string;
}

export interface ReportRecord {
  reportCode: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  payload: ReportPayload;
  timeline: ReportTimelineEntry[];
}

export interface ReportStatusResponse {
  ok: true;
  reportCode: string;
  status: string;
  updatedAt: string;
  timeline: Array<Pick<ReportTimelineEntry, 'at' | 'status' | 'message'>>;
}

export interface InsertReportLogInput {
  status: string;
  message: string;
}
