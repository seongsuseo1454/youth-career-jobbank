import { NextRequest, NextResponse } from 'next/server';
import { env } from '../../../../../lib/env'; // 경로 확인 후 맞게 수정

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'missing code' }, { status: 400 });
    }

    // ✅ 환경변수 확인
    if (!env.KAKAO_REST_API_KEY || !env.KAKAO_REDIRECT_URI) {
      return NextResponse.json({ error: 'kakao env missing' }, { status: 500 });
    }

    // ✅ 인가코드 → 토큰 교환
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: env.KAKAO_REST_API_KEY,
      redirect_uri: env.KAKAO_REDIRECT_URI,
      code,
    });

    if (env.KAKAO_CLIENT_SECRET) {
      body.set('client_secret', env.KAKAO_CLIENT_SECRET);
    }

    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body,
    });

    const tokenJson = await tokenRes.json();

    if (!tokenRes.ok) {
      return NextResponse.json({ error: tokenJson.error_description || 'token exchange failed' }, { status: 500 });
    }

    // ✅ 토큰 처리 후 리디렉션
    const base = process.env.NEXT_PUBLIC_APP_BASE_URL || url.origin;
    return NextResponse.redirect(`${base}/program-intro?login=kakao`, 302);

  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'server error' }, { status: 500 });
  }
}