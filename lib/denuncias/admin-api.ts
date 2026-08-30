import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
} from '@/lib/denuncias/admin-session';

export async function isAdminSessionActive(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return verifySessionToken(token);
}

export function unauthorizedAdminResponse(): NextResponse {
  return NextResponse.json(
    { ok: false, error: 'Sessão expirada ou inválida.' },
    { status: 401 },
  );
}

export async function requireAdminSession(): Promise<NextResponse | null> {
  const isActive = await isAdminSessionActive();

  if (!isActive) {
    return unauthorizedAdminResponse();
  }

  return null;
}
