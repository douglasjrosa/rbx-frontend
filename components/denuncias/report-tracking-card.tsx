'use client';

import { useState, type FormEvent } from 'react';
import {
  formatReportStatusLabel,
  formatReportTimelineMessage,
} from '@/lib/denuncias/format-timeline';

type TrackingStatus = 'idle' | 'loading' | 'success' | 'not_found' | 'error';

interface TimelineEntry {
  at: string;
  status: string;
  message: string;
}

const FIELD_CLASS =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 ' +
  'text-base text-rbx-accent outline-none transition ' +
  'focus:border-rbx-green-dark focus:ring-2 focus:ring-rbx-green/30';

const LABEL_CLASS =
  'mb-1.5 block text-left text-base font-semibold text-rbx-accent';

function formatTimelineDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export default function ReportTrackingCard() {
  const [reportCode, setReportCode] = useState('');
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setTimeline([]);

    try {
      const params = new URLSearchParams({
        reportCode: reportCode.trim(),
      });
      const response = await fetch(`/api/denuncias/status?${params.toString()}`);
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        timeline?: TimelineEntry[];
      };

      if (response.status === 404) {
        setStatus('not_found');
        setErrorMessage(payload.error || 'Código não encontrado.');
        return;
      }

      if (!response.ok || !payload.ok || !payload.timeline) {
        setStatus('error');
        setErrorMessage(
          payload.error || 'Não foi possível consultar o andamento.',
        );
        return;
      }

      setTimeline(payload.timeline);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(
        'Falha de conexão. Verifique sua internet e tente novamente.',
      );
    }
  };

  return (
    <div className="space-y-5 text-left">
      <p className="text-base leading-relaxed text-rbx-accent">
        Guarde o código recebido após o envio. Com ele, você pode consultar
        aqui as atualizações do andamento, sem precisar se identificar.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="report-code" className={LABEL_CLASS}>
            Digite aqui o código da sua denúncia
          </label>
          <input
            id="report-code"
            name="report_code"
            type="text"
            required
            autoComplete="off"
            value={reportCode}
            onChange={(event) => setReportCode(event.target.value)}
            className={FIELD_CLASS}
            placeholder="RMX-XXXXXX"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={
            'w-full rounded-md bg-rbx-green-primary px-6 py-3 text-lg ' +
            'font-semibold text-white transition-colors ' +
            'hover:bg-rbx-green-secondary disabled:cursor-not-allowed ' +
            'disabled:opacity-70'
          }
        >
          {status === 'loading' ? 'Consultando...' : 'Ver andamento'}
        </button>
      </form>

      {(status === 'not_found' || status === 'error') && errorMessage && (
        <p className="text-base font-medium text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      {status === 'success' && timeline.length > 0 && (
        <ol className="space-y-4 border-t border-gray-200 pt-5">
          {timeline.map((entry) => (
            <li
              key={`${entry.at}-${entry.status}-${entry.message}`}
              className="rounded-md border border-gray-200 bg-white px-4 py-3"
            >
              <p className="text-sm font-medium text-gray-600">
                {formatTimelineDate(entry.at)}
              </p>
              <p className="mt-1 text-base font-semibold text-rbx-accent">
                {formatReportStatusLabel(entry.status)}
              </p>
              <p className="mt-1 text-base leading-relaxed text-rbx-accent">
                {formatReportTimelineMessage(entry.message)}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
