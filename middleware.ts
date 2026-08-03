import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TRACKING_QUERY_KEYS = ['_g'] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/index.amp' || pathname === '/index.amp/') {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = '/';
    homeUrl.search = '';
    return NextResponse.redirect(homeUrl, 308);
  }

  const cleanUrl = request.nextUrl.clone();
  let shouldRedirect = false;

  for (const key of TRACKING_QUERY_KEYS) {
    if (cleanUrl.searchParams.has(key)) {
      cleanUrl.searchParams.delete(key);
      shouldRedirect = true;
    }
  }

  if (shouldRedirect) {
    return NextResponse.redirect(cleanUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and static assets; run on page navigations.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
