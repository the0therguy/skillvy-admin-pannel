import {NextResponse} from 'next/server';

export function middleware(request) {
  const accessToken = request.cookies.get('access_token');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific routes or globally
export const config = {
  matcher: [], // Adjust to your protected routes
};
