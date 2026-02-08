import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;


  const isProtectedRoute = pathname.startsWith('/admin') || 
       pathname.startsWith('/tutor') || 
    pathname.startsWith('/student');

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }


  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/tutor/:path*', '/student/:path*', '/login', '/register'],
}