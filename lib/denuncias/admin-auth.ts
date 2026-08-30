import { timingSafeEqual } from 'node:crypto';

export function areAdminCredentialsConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_USER?.trim() && process.env.ADMIN_PASS?.trim(),
  );
}

export function validateAdminCredentials(
  username: string,
  password: string,
): boolean {
  const expectedUser = process.env.ADMIN_USER?.trim();
  const expectedPass = process.env.ADMIN_PASS?.trim();

  if (!expectedUser || !expectedPass) {
    return false;
  }

  const providedUser = username.trim();
  const providedPass = password;

  const userBuffer = Buffer.from(providedUser);
  const expectedUserBuffer = Buffer.from(expectedUser);
  const passBuffer = Buffer.from(providedPass);
  const expectedPassBuffer = Buffer.from(expectedPass);

  if (
    userBuffer.length !== expectedUserBuffer.length ||
    passBuffer.length !== expectedPassBuffer.length
  ) {
    return false;
  }

  return (
    timingSafeEqual(userBuffer, expectedUserBuffer) &&
    timingSafeEqual(passBuffer, expectedPassBuffer)
  );
}
