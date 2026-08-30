import { NextResponse } from 'next/server';
import { isAdminSessionActive } from '@/lib/denuncias/admin-api';
import { areAdminCredentialsConfigured } from '@/lib/denuncias/admin-auth';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    authenticated: await isAdminSessionActive(),
    configured: areAdminCredentialsConfigured(),
  });
}
