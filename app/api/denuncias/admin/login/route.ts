import { NextResponse } from 'next/server';
import {
  areAdminCredentialsConfigured,
  validateAdminCredentials,
} from '@/lib/denuncias/admin-auth';
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  getSessionCookieOptions,
} from '@/lib/denuncias/admin-session';

export const runtime = 'nodejs';

interface LoginRequestBody {
  username?: unknown;
  password?: unknown;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export async function POST(request: Request) {
  if (!areAdminCredentialsConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Acesso administrativo indisponível.' },
      { status: 503 },
    );
  }

  let body: LoginRequestBody;

  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Requisição inválida.' },
      { status: 400 },
    );
  }

  const username = asString(body.username);
  const password = asString(body.password);

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, error: 'Informe usuário e senha.' },
      { status: 400 },
    );
  }

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json(
      { ok: false, error: 'Usuário ou senha inválidos.' },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createSessionToken(),
    getSessionCookieOptions(),
  );

  return response;
}
