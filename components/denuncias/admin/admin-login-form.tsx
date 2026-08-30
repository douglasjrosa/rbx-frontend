'use client';

import { useState, type FormEvent } from 'react';

const FIELD_CLASS =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 ' +
  'text-base text-rbx-accent outline-none transition ' +
  'focus:border-rbx-green-dark focus:ring-2 focus:ring-rbx-green/30';

const LABEL_CLASS =
  'mb-1.5 block text-left text-base font-semibold text-rbx-accent';

interface AdminLoginFormProps {
  onAuthenticated: () => void;
}

export default function AdminLoginForm({
  onAuthenticated,
}: AdminLoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/denuncias/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setErrorMessage(payload.error || 'Não foi possível entrar.');
        return;
      }

      setPassword('');
      onAuthenticated();
    } catch {
      setErrorMessage('Falha de conexão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card-rbx text-left">
        <h1 className="title text-rbx-green-dark">Acesso restrito</h1>
        <p className="mt-3 text-base leading-relaxed text-rbx-accent">
          Informe usuário e senha para acessar o painel de denúncias.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="admin-username" className={LABEL_CLASS}>
              Usuário
            </label>
            <input
              id="admin-username"
              name="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={FIELD_CLASS}
            />
          </div>

          <div>
            <label htmlFor="admin-password" className={LABEL_CLASS}>
              Senha
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={FIELD_CLASS}
            />
          </div>

          {errorMessage && (
            <p className="text-base font-medium text-red-700" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={
              'w-full rounded-md bg-rbx-green-primary px-6 py-3 text-lg ' +
              'font-semibold text-white transition-colors ' +
              'hover:bg-rbx-green-secondary disabled:cursor-not-allowed ' +
              'disabled:opacity-70'
            }
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
