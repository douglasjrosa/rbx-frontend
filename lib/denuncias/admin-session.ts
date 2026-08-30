import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_SESSION_COOKIE = 'denuncias_admin_session';

const SESSION_VERSION = 'v1';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSessionSecret(): string {
  const user = process.env.ADMIN_USER?.trim();
  const pass = process.env.ADMIN_PASS?.trim();

  if (!user || !pass) {
    throw new Error('Admin credentials are not configured.');
  }

  return createHmac('sha256', pass).update(user).digest('hex');
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${SESSION_VERSION}.${expiresAt}`;
  const signature = createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const parts = token.split('.');

  if (parts.length !== 3) {
    return false;
  }

  const [version, expiresAtValue, signature] = parts;

  if (version !== SESSION_VERSION) {
    return false;
  }

  const expiresAt = Number(expiresAtValue);

  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  const payload = `${version}.${expiresAtValue}`;
  const expectedSignature = createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url');
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  };
}
