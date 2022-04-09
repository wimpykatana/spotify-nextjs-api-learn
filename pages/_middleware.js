import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  //token is exist if user login
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  //allow the request if true

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
