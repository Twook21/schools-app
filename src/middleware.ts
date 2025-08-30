import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedAdminRoutes = ['/admin', '/admin/berita', '/admin/kegiatan', '/admin/pesan'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const isProtectedAdminRoute = protectedAdminRoutes.some(route => pathname.startsWith(route));

  if (!isProtectedAdminRoute) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'ADMIN') {
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}