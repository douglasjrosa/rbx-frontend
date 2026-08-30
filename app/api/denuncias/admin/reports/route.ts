import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/denuncias/admin-api';
import { listReports } from '@/lib/denuncias/blob-store';

export const runtime = 'nodejs';

export async function GET() {
  const authError = await requireAdminSession();

  if (authError) {
    return authError;
  }

  try {
    const reports = await listReports();

    return NextResponse.json({ ok: true, reports });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Não foi possível listar as denúncias.' },
      { status: 500 },
    );
  }
}
