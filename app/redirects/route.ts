import { NextRequest, NextResponse } from 'next/server';
import { getRedirectDestination } from '@/lib/analytics/redirect-destinations';
import { isValidTrackingRedirectToken } from '@/lib/analytics/tracking-redirect';

export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!isValidTrackingRedirectToken(token)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const destination = getRedirectDestination(
    request.nextUrl.searchParams.get('cta'),
  );
  const redirectUrl = destination.startsWith('/#')
    ? new URL(destination, request.url)
    : new URL(destination, request.url);

  return NextResponse.redirect(redirectUrl, 302);
}
