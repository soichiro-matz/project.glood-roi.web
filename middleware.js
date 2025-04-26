import { NextResponse } from 'next/server'

export function middleware(request) {
  const hostname = request.headers.get('host') || ''

  if (hostname.endsWith('.vercel.app')) {
    const url = request.nextUrl.clone()
    url.hostname = 'gloodroi.com'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
