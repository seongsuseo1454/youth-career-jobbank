// [제목] 공유 링크 검증 미들웨어
// src/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/share')) {
    const token = req.nextUrl.searchParams.get('t');
    try {
      const v = jwt.verify(token!, process.env.JWT_SECRET!);
      // (선택) v.t === 'nonsan-youth-center' 확인
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/share/expired', req.url));
    }
  }
  return NextResponse.next();
}