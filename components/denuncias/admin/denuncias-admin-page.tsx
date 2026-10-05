'use client';

import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/denuncias/admin/admin-dashboard';
import AdminLoginForm from '@/components/denuncias/admin/admin-login-form';
import { normalizeReportCode } from '@/lib/denuncias/report-code';

interface DenunciasAdminPageProps {
  reportCode: string;
}

export default function DenunciasAdminPage({
  reportCode,
}: DenunciasAdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/denuncias/admin/session/');
        const payload = (await response.json()) as {
          authenticated?: boolean;
          configured?: boolean;
        };

        setIsConfigured(payload.configured ?? true);
        setIsAuthenticated(Boolean(payload.authenticated));
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingSession(false);
      }
    };

    void checkSession();
  }, []);

  if (isCheckingSession) {
    return (
      <p className="text-center text-lg text-rbx-accent">Carregando...</p>
    );
  }

  if (!isConfigured) {
    return (
      <div className="card-rbx mx-auto max-w-lg text-left">
        <h1 className="title text-rbx-green-dark">Painel indisponível</h1>
        <p className="mt-3 text-base leading-relaxed text-rbx-accent">
          Configure as variáveis ADMIN_USER e ADMIN_PASS para habilitar o
          acesso administrativo.
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginForm onAuthenticated={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <AdminDashboard
      initialReportCode={normalizeReportCode(reportCode)}
      onLogout={() => setIsAuthenticated(false)}
    />
  );
}
