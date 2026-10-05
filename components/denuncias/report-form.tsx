'use client';

import { useState, type FormEvent } from 'react';
import { GTM_EVENTS, trackGtmEvent } from '@/lib/analytics/data-layer';
import {
  MAX_REPORT_DESCRIPTION_LENGTH,
  REPORT_LOCATION_OPTIONS,
} from '@/lib/denuncias/constants';

type FormStatus = 'idle' | 'submitting' | 'error';

const FIELD_CLASS =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 ' +
  'text-base text-rbx-accent outline-none transition ' +
  'focus:border-rbx-green-dark focus:ring-2 focus:ring-rbx-green/30';

const LABEL_CLASS =
  'mb-1.5 block text-left text-base font-semibold text-rbx-accent';

interface ReportFormProps {
  onSubmitted: (reportCode: string) => void;
}

export default function ReportForm({ onSubmitted }: ReportFormProps) {
  const [description, setDescription] = useState('');
  const [unknownWhen, setUnknownWhen] = useState(false);
  const [occurredAt, setOccurredAt] = useState('');
  const [location, setLocation] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/denuncias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          unknownWhen,
          occurredAt,
          location,
          honeypot,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        reportCode?: string;
      };

      if (!response.ok || !payload.ok || !payload.reportCode) {
        setStatus('error');
        setErrorMessage(
          payload.error || 'Não foi possível enviar a denúncia.',
        );
        return;
      }

      trackGtmEvent(GTM_EVENTS.REPORT_SUBMITTED, {
        event_location: 'denuncias_page',
        unknown_when: unknownWhen,
      });

      setDescription('');
      setUnknownWhen(false);
      setOccurredAt('');
      setLocation('');
      setHoneypot('');
      setStatus('idle');
      onSubmitted(payload.reportCode);
    } catch {
      setStatus('error');
      setErrorMessage(
        'Falha de conexão. Verifique sua internet e tente novamente.',
      );
    }
  };

  return (
    <form className="space-y-5 text-left" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="report-description" className={LABEL_CLASS}>
          Diga o que aconteceu.
        </label>
        <textarea
          id="report-description"
          name="description"
          required
          rows={7}
          maxLength={MAX_REPORT_DESCRIPTION_LENGTH}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={FIELD_CLASS}
        />
      </div>

      <label className="flex items-start gap-3 text-left text-base text-rbx-accent">
        <input
          type="checkbox"
          name="unknownWhen"
          checked={unknownWhen}
          onChange={(event) => setUnknownWhen(event.target.checked)}
          className="mt-1 h-4 w-4 accent-rbx-green-dark"
        />
        <span>Não sei dizer quando aconteceu.</span>
      </label>

      {!unknownWhen && (
        <>
          <div>
            <label htmlFor="report-occurred-at" className={LABEL_CLASS}>
              Data e hora
            </label>
            <input
              id="report-occurred-at"
              name="occurredAt"
              type="datetime-local"
              required
              value={occurredAt}
              onChange={(event) => setOccurredAt(event.target.value)}
              className={FIELD_CLASS}
            />
          </div>

          <div>
            <label htmlFor="report-location" className={LABEL_CLASS}>
              Local
            </label>
            <select
              id="report-location"
              name="location"
              required
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className={FIELD_CLASS}
            >
              <option value="">Selecione o local</option>
              {REPORT_LOCATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="report-company">Company</label>
        <input
          id="report-company"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {status === 'error' && errorMessage && (
        <p className="text-base font-medium text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={
          'w-full rounded-md bg-rbx-green-primary px-6 py-3 text-lg ' +
          'font-semibold text-white transition-colors ' +
          'hover:bg-rbx-green-secondary disabled:cursor-not-allowed ' +
          'disabled:opacity-70'
        }
      >
        {status === 'submitting' ? 'Enviando...' : 'Enviar denúncia'}
      </button>
    </form>
  );
}
