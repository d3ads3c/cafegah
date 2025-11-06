import { NextRequest, NextResponse } from 'next/server';

/**
 * Segment middleware for the (panel) route group.
 * Requires a LoggedUser cookie (set by your register/login API).
 * If missing, redirects to /login and includes a `from` query param so the user
 * can be returned after authenticating.
 */
export function proxy(req: NextRequest) {
  try {
    const token = req.cookies.get('LoggedUser')?.value;
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      // preserve destination so login can redirect back
      loginUrl.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
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

// Configure middleware to protect dashboard, invoice, and result routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/invoice/:path*',
    '/result/:path*'
  ],
};
