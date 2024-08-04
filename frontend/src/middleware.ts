/**
 * This middle will run for every route interaction.
 * We will prevent user on server side to access our route that are protected.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define static path names that need to be protected
const protectedRoutes = ['/'];
const afterAuthRoutes = ['/auth/signin', '/auth/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get('token');
  const isAuthenticated = Boolean(token && typeof token === 'object');

  // Function to check if the current path matches any of the routes
  const matchRoute = (routes: string | string[]) => routes.includes(pathname);

  if (!isAuthenticated) {
    // Prevent unauthenticated users from accessing protected routes
    if (matchRoute(protectedRoutes)) {
      if (pathname !== '/auth/signin') {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }
    }
  } else {
    // Prevent authenticated users from accessing signin/signup routes
    if (matchRoute(afterAuthRoutes)) {
      if (pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

// Configure middleware to match all paths except specified ones
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
