import { NextRequest, NextResponse } from 'next/server';
import {
  buildRedirectTargetUrl,
  getRedirectDestinationParam,
  isValidRedirectDestination,
} from '@/lib/analytics/redirect-validation';
import { isValidTrackingRedirectToken } from '@/lib/analytics/tracking-redirect';

export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!isValidTrackingRedirectToken(token)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const destination = getRedirectDestinationParam(request.nextUrl.searchParams);

  if (!destination || !isValidRedirectDestination(destination)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const redirectUrl = buildRedirectTargetUrl(destination, request.url);

  return NextResponse.redirect(redirectUrl, 302);
}
