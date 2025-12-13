import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware for protected routes.
 * - Protected routes (dashboard, invoice, result): Requires LoggedUser cookie. If missing, redirects to /login.
 * - Public auth routes (login, register): If LoggedUser cookie is set, redirects to /dashboard.
 */
export function proxy(req: NextRequest) {
  try {
    const token = req.cookies.get('LoggedUser')?.value;
    const pathname = req.nextUrl.pathname;

    // If user is logged in and trying to access login/register, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If user is not logged in and trying to access protected routes, redirect to login
    if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/invoice') || pathname.startsWith('/result'))) {
      const loginUrl = new URL('/login', req.url);
      // preserve destination so login can redirect back
      loginUrl.searchParams.set('from', pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (err) {
    // On unexpected error, be conservative and redirect to login.
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }
}

// Configure middleware to protect dashboard, invoice, and result routes, and redirect logged-in users from auth routes
export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard/:path*',
    '/invoice/:path*',
    '/result/:path*'
  ],
};
