import { del, get, list, put } from '@vercel/blob';
import {
  REPORT_BLOB_FOLDER,
  REPORT_INITIAL_STATUS,
  REPORT_INITIAL_TIMELINE_MESSAGE,
} from '@/lib/denuncias/constants';
import { generateReportCode } from '@/lib/denuncias/report-code';
import type {
  InsertReportLogInput,
  ReportPayload,
  ReportRecord,
  ReportTimelineEntry,
} from '@/lib/denuncias/types';

function getReportBlobPath(reportCode: string): string {
  return `${REPORT_BLOB_FOLDER}/${reportCode}.json`;
}

function createTimelineEntry(
  status: string,
  message: string,
): ReportTimelineEntry {
  return {
    id: `evt_${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`,
    at: new Date().toISOString(),
    status,
    message,
  };
}

async function readReportFromBlob(pathname: string): Promise<ReportRecord | null> {
  const result = await get(pathname, {
    access: 'private',
    useCache: false,
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  const raw = await new Response(result.stream).text();

  try {
    return JSON.parse(raw) as ReportRecord;
  } catch {
    return null;
  }
}

export async function saveReport(payload: ReportPayload): Promise<ReportRecord> {
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const reportCode = generateReportCode();
    const now = new Date().toISOString();
    const record: ReportRecord = {
      reportCode,
      createdAt: now,
      updatedAt: now,
      status: REPORT_INITIAL_STATUS,
      payload,
      timeline: [
        createTimelineEntry(
          REPORT_INITIAL_STATUS,
          REPORT_INITIAL_TIMELINE_MESSAGE,
        ),
      ],
    };

    try {
      await put(getReportBlobPath(reportCode), JSON.stringify(record), {
        access: 'private',
        contentType: 'application/json',
      });

      return record;
    } catch (error) {
      const isLastAttempt = attempt === maxAttempts - 1;

      if (isLastAttempt) {
        throw error;
      }
    }
  }

  throw new Error('Unable to allocate a unique report code.');
}

export async function getReport(reportCode: string): Promise<ReportRecord | null> {
  return readReportFromBlob(getReportBlobPath(reportCode));
}

export async function appendReportLog(
  reportCode: string,
  input: InsertReportLogInput,
): Promise<ReportRecord> {
  const existing = await getReport(reportCode);

  if (!existing) {
    throw new Error('Report not found.');
  }

  const entry = createTimelineEntry(input.status, input.message);
  const updated: ReportRecord = {
    ...existing,
    status: input.status,
    updatedAt: entry.at,
    timeline: [...existing.timeline, entry],
  };

  await put(getReportBlobPath(reportCode), JSON.stringify(updated), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
  });

  return updated;
}

export interface ReportSummary {
  reportCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function listReports(): Promise<ReportSummary[]> {
  const result = await list({ prefix: `${REPORT_BLOB_FOLDER}/` });
  const summaries = await Promise.all(
    result.blobs.map(async (blob) => {
      const reportCode = blob.pathname
        .replace(`${REPORT_BLOB_FOLDER}/`, '')
        .replace(/\.json$/, '');
      const record = await getReport(reportCode);

      if (!record) {
        return null;
      }

      return {
        reportCode: record.reportCode,
        status: record.status,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      };
    }),
  );

  return summaries
    .filter((summary): summary is ReportSummary => summary !== null)
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() -
        new Date(left.updatedAt).getTime(),
    );
}

export async function updateReport(
  reportCode: string,
  input: {
    status?: string;
    timelineEntry?: InsertReportLogInput;
    removeTimelineEntryId?: string;
  },
): Promise<ReportRecord> {
  const existing = await getReport(reportCode);

  if (!existing) {
    throw new Error('Report not found.');
  }

  let timeline = [...existing.timeline];
  let status = existing.status;
  let updatedAt = existing.updatedAt;

  if (input.removeTimelineEntryId) {
    timeline = timeline.filter(
      (entry) => entry.id !== input.removeTimelineEntryId,
    );
    updatedAt = new Date().toISOString();
  }

  if (input.timelineEntry) {
    const entry = createTimelineEntry(
      input.timelineEntry.status,
      input.timelineEntry.message,
    );
    timeline = [...timeline, entry];
    status = input.timelineEntry.status;
    updatedAt = entry.at;
  } else if (input.status) {
    status = input.status.trim();
    updatedAt = new Date().toISOString();
  }

  const updated: ReportRecord = {
    ...existing,
    status,
    updatedAt,
    timeline,
  };

  await put(getReportBlobPath(reportCode), JSON.stringify(updated), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
  });

  return updated;
}

export async function deleteReport(reportCode: string): Promise<void> {
  const existing = await getReport(reportCode);

  if (!existing) {
    throw new Error('Report not found.');
  }

  await del(getReportBlobPath(reportCode));
}
