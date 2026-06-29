import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/sensei') && !pathname.startsWith('/sensei/login')) {
    const authCookie = request.cookies.get('sensei-session');

    if (!authCookie) {
      const loginUrl = new URL('/sensei/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sensei/:path*'],
};
