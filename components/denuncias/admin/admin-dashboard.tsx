'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  formatAdminDate,
  formatReportContext,
  type ReportListItem,
} from '@/components/denuncias/admin/admin-utils';
import {
  formatReportStatusLabel,
  formatReportTimelineMessage,
} from '@/lib/denuncias/format-timeline';
import type { ReportRecord } from '@/lib/denuncias/types';

const FIELD_CLASS =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 ' +
  'text-base text-rbx-accent outline-none transition ' +
  'focus:border-rbx-green-dark focus:ring-2 focus:ring-rbx-green/30';

const LABEL_CLASS =
  'mb-1.5 block text-left text-base font-semibold text-rbx-accent';

interface AdminDashboardProps {
  initialReportCode: string;
  onLogout: () => void;
}

export default function AdminDashboard({
  initialReportCode,
  onLogout,
}: AdminDashboardProps) {
  const router = useRouter();
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [selectedCode, setSelectedCode] = useState(initialReportCode);
  const [selectedReport, setSelectedReport] = useState<ReportRecord | null>(
    null,
  );
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [listError, setListError] = useState('');
  const [detailError, setDetailError] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [quickStatus, setQuickStatus] = useState('');

  const loadReports = useCallback(async () => {
    setIsLoadingList(true);
    setListError('');

    try {
      const response = await fetch('/api/denuncias/admin/reports');
      const payload = (await response.json()) as {
        ok?: boolean;
        reports?: ReportListItem[];
        error?: string;
      };

      if (!response.ok || !payload.ok || !payload.reports) {
        if (response.status === 401) {
          onLogout();
          return;
        }

        setListError(payload.error || 'Não foi possível carregar a lista.');
        return;
      }

      setReports(payload.reports);
    } catch {
      setListError('Falha de conexão ao carregar a lista.');
    } finally {
      setIsLoadingList(false);
    }
  }, [onLogout]);

  const loadReportDetail = useCallback(
    async (reportCode: string) => {
      if (!reportCode) {
        setSelectedReport(null);
        return;
      }

      setIsLoadingDetail(true);
      setDetailError('');
      setActionError('');
      setActionMessage('');

      try {
        const response = await fetch(
          `/api/denuncias/admin/reports/${encodeURIComponent(reportCode)}`,
        );
        const payload = (await response.json()) as {
          ok?: boolean;
          report?: ReportRecord;
          error?: string;
        };

        if (!response.ok || !payload.ok || !payload.report) {
          if (response.status === 401) {
            onLogout();
            return;
          }

          setSelectedReport(null);
          setDetailError(payload.error || 'Denúncia não encontrada.');
          return;
        }

        setSelectedReport(payload.report);
        setQuickStatus(payload.report.status);
      } catch {
        setSelectedReport(null);
        setDetailError('Falha de conexão ao carregar a denúncia.');
      } finally {
        setIsLoadingDetail(false);
      }
    },
    [onLogout],
  );

  useEffect(() => {
    void loadReports();
  }, [loadReports]);

  useEffect(() => {
    void loadReportDetail(selectedCode);
  }, [loadReportDetail, selectedCode]);

  const handleSelectReport = (reportCode: string) => {
    setSelectedCode(reportCode);
    router.replace(`/denuncias/${encodeURIComponent(reportCode)}`);
  };

  const handleLogout = async () => {
    await fetch('/api/denuncias/admin/logout', { method: 'POST' });
    onLogout();
  };

  const handleAddTimelineEntry = async () => {
    if (!selectedCode || !newStatus.trim() || !newMessage.trim()) {
      setActionError('Preencha status e mensagem para adicionar o registro.');
      return;
    }

    setIsSaving(true);
    setActionError('');
    setActionMessage('');

    try {
      const response = await fetch(
        `/api/denuncias/admin/reports/${encodeURIComponent(selectedCode)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: newStatus.trim(),
            message: newMessage.trim(),
          }),
        },
      );
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setActionError(payload.error || 'Não foi possível salvar o registro.');
        return;
      }

      setNewStatus('');
      setNewMessage('');
      setActionMessage('Registro adicionado com sucesso.');
      await Promise.all([loadReports(), loadReportDetail(selectedCode)]);
    } catch {
      setActionError('Falha de conexão ao salvar o registro.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickStatusUpdate = async () => {
    if (!selectedCode || !quickStatus.trim()) {
      setActionError('Informe o status para atualizar.');
      return;
    }

    setIsSaving(true);
    setActionError('');
    setActionMessage('');

    try {
      const response = await fetch(
        `/api/denuncias/admin/reports/${encodeURIComponent(selectedCode)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: quickStatus.trim() }),
        },
      );
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setActionError(payload.error || 'Não foi possível atualizar o status.');
        return;
      }

      setActionMessage('Status atualizado com sucesso.');
      await Promise.all([loadReports(), loadReportDetail(selectedCode)]);
    } catch {
      setActionError('Falha de conexão ao atualizar o status.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveTimelineEntry = async (entryId: string) => {
    if (!selectedCode) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setActionMessage('');

    try {
      const response = await fetch(
        `/api/denuncias/admin/reports/${encodeURIComponent(selectedCode)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ removeTimelineEntryId: entryId }),
        },
      );
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setActionError(payload.error || 'Não foi possível remover o registro.');
        return;
      }

      setActionMessage('Registro removido com sucesso.');
      await Promise.all([loadReports(), loadReportDetail(selectedCode)]);
    } catch {
      setActionError('Falha de conexão ao remover o registro.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteReport = async () => {
    if (!selectedCode) {
      return;
    }

    const confirmed = window.confirm(
      `Excluir permanentemente a denúncia ${selectedCode}?`,
    );

    if (!confirmed) {
      return;
    }

    setIsSaving(true);
    setActionError('');
    setActionMessage('');

    try {
      const response = await fetch(
        `/api/denuncias/admin/reports/${encodeURIComponent(selectedCode)}`,
        { method: 'DELETE' },
      );
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setActionError(payload.error || 'Não foi possível excluir a denúncia.');
        return;
      }

      setSelectedReport(null);
      const refreshed = await fetch('/api/denuncias/admin/reports');
      const refreshedPayload = (await refreshed.json()) as {
        ok?: boolean;
        reports?: ReportListItem[];
      };

      if (refreshedPayload.reports && refreshedPayload.reports.length > 0) {
        handleSelectReport(refreshedPayload.reports[0].reportCode);
      } else {
        setSelectedCode('');
      }

      setReports(refreshedPayload.reports ?? []);
      setActionMessage('Denúncia excluída com sucesso.');
    } catch {
      setActionError('Falha de conexão ao excluir a denúncia.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-rbx flex flex-wrap items-center justify-between gap-4 text-left">
        <div>
          <h1 className="title text-rbx-green-dark">Painel de denúncias</h1>
          <p className="mt-2 text-base text-rbx-accent">
            Gerencie relatos, status e histórico de andamento.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void loadReports()}
            className={
              'rounded-md border border-rbx-green px-4 py-2 text-base ' +
              'font-semibold text-rbx-green-dark transition-colors ' +
              'hover:bg-green-50'
            }
          >
            Atualizar lista
          </button>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className={
              'rounded-md bg-rbx-green-primary px-4 py-2 text-base ' +
              'font-semibold text-white transition-colors ' +
              'hover:bg-rbx-green-secondary'
            }
          >
            Sair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <section className="card-rbx text-left">
          <h2 className="text-xl font-semibold text-rbx-accent">
            Denúncias ({reports.length})
          </h2>

          {isLoadingList && (
            <p className="mt-4 text-base text-rbx-accent">Carregando...</p>
          )}

          {listError && (
            <p className="mt-4 text-base font-medium text-red-700" role="alert">
              {listError}
            </p>
          )}

          {!isLoadingList && !listError && reports.length === 0 && (
            <p className="mt-4 text-base text-rbx-accent">
              Nenhuma denúncia registrada.
            </p>
          )}

          <ul className="mt-4 max-h-[70vh] space-y-2 overflow-y-auto">
            {reports.map((report) => {
              const isSelected = report.reportCode === selectedCode;

              return (
                <li key={report.reportCode}>
                  <button
                    type="button"
                    onClick={() => handleSelectReport(report.reportCode)}
                    className={
                      'w-full rounded-md border px-3 py-3 text-left transition ' +
                      (isSelected
                        ? 'border-rbx-green bg-green-50'
                        : 'border-gray-200 bg-white hover:border-rbx-green/50')
                    }
                  >
                    <p className="font-semibold text-rbx-accent">
                      {report.reportCode}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {formatReportStatusLabel(report.status)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatAdminDate(report.updatedAt)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="card-rbx text-left">
          {!selectedCode && (
            <p className="text-base text-rbx-accent">
              Selecione uma denúncia na lista para ver os detalhes.
            </p>
          )}

          {selectedCode && isLoadingDetail && (
            <p className="text-base text-rbx-accent">Carregando denúncia...</p>
          )}

          {selectedCode && detailError && (
            <p className="text-base font-medium text-red-700" role="alert">
              {detailError}
            </p>
          )}

          {selectedReport && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-rbx-accent">
                    {selectedReport.reportCode}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Criada em {formatAdminDate(selectedReport.createdAt)}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Atualizada em {formatAdminDate(selectedReport.updatedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => void handleDeleteReport()}
                  className={
                    'rounded-md border border-red-300 px-4 py-2 text-base ' +
                    'font-semibold text-red-700 transition-colors ' +
                    'hover:bg-red-50 disabled:cursor-not-allowed ' +
                    'disabled:opacity-70'
                  }
                >
                  Excluir denúncia
                </button>
              </div>

              <div className="rounded-md border border-gray-200 bg-white p-4">
                <h3 className="text-lg font-semibold text-rbx-accent">Relato</h3>
                <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-rbx-accent">
                  {selectedReport.payload.description}
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  {formatReportContext(selectedReport)}
                </p>
              </div>

              <div className="rounded-md border border-gray-200 bg-white p-4">
                <h3 className="text-lg font-semibold text-rbx-accent">Status</h3>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={quickStatus}
                    onChange={(event) => setQuickStatus(event.target.value)}
                    className={FIELD_CLASS}
                    placeholder="Status atual"
                  />
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void handleQuickStatusUpdate()}
                    className={
                      'rounded-md bg-rbx-green-primary px-4 py-2 text-base ' +
                      'font-semibold text-white transition-colors ' +
                      'hover:bg-rbx-green-secondary disabled:cursor-not-allowed ' +
                      'disabled:opacity-70'
                    }
                  >
                    Atualizar status
                  </button>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 bg-white p-4">
                <h3 className="text-lg font-semibold text-rbx-accent">
                  Adicionar registro
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="timeline-status" className={LABEL_CLASS}>
                      Status
                    </label>
                    <input
                      id="timeline-status"
                      type="text"
                      value={newStatus}
                      onChange={(event) => setNewStatus(event.target.value)}
                      className={FIELD_CLASS}
                      placeholder="Ex.: Em análise"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline-message" className={LABEL_CLASS}>
                      Mensagem
                    </label>
                    <textarea
                      id="timeline-message"
                      rows={4}
                      value={newMessage}
                      onChange={(event) => setNewMessage(event.target.value)}
                      className={FIELD_CLASS}
                      placeholder="Descreva a atualização para o acompanhamento público."
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void handleAddTimelineEntry()}
                    className={
                      'rounded-md bg-rbx-green-primary px-4 py-2 text-base ' +
                      'font-semibold text-white transition-colors ' +
                      'hover:bg-rbx-green-secondary disabled:cursor-not-allowed ' +
                      'disabled:opacity-70'
                    }
                  >
                    Adicionar ao histórico
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-rbx-accent">
                  Histórico ({selectedReport.timeline.length})
                </h3>
                <ol className="mt-4 space-y-3">
                  {selectedReport.timeline.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-md border border-gray-200 bg-white p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-600">
                            {formatAdminDate(entry.at)}
                          </p>
                          <p className="mt-1 font-semibold text-rbx-accent">
                            {formatReportStatusLabel(entry.status)}
                          </p>
                          <p className="mt-1 text-base leading-relaxed text-rbx-accent">
                            {formatReportTimelineMessage(entry.message)}
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={() =>
                            void handleRemoveTimelineEntry(entry.id)
                          }
                          className={
                            'rounded-md border border-gray-300 px-3 py-1 ' +
                            'text-sm font-semibold text-gray-700 ' +
                            'transition-colors hover:bg-gray-50 ' +
                            'disabled:cursor-not-allowed disabled:opacity-70'
                          }
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {actionError && (
            <p className="mt-4 text-base font-medium text-red-700" role="alert">
              {actionError}
            </p>
          )}

          {actionMessage && (
            <p className="mt-4 text-base font-medium text-rbx-green-dark" role="status">
              {actionMessage}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
