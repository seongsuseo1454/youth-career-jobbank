// [제목] 라이선스 검증 API
// src/app/api/license/route.ts (Next.js App Router)
import { NextResponse } from 'next/server';

// 예시: 환경변수에 발급된 정식 키와 허용 도메인/기관ID 저장
const VALID_KEYS = (process.env.LICENSE_KEYS ?? '').split(',');   // "NS-2025-001,NS-2025-002"
const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS ?? '').split(','); // "youth.nonsan.go.kr,kiosk.local"

export async function POST(req: Request) {
  const { licenseKey, tenant, host, deviceId } = await req.json();

  const okKey = VALID_KEYS.includes(licenseKey);
  const okHost = ALLOWED_HOSTS.includes(host);
  const okTenant = tenant === 'nonsan-youth-center'; // 납품 기관 고정

  // (선택) 블랙리스트 장치 차단
  const denied = (process.env.BLOCKED_DEVICES ?? '').split(',').includes(deviceId);

  if (okKey && okHost && okTenant && !denied) {
    return NextResponse.json({ ok: true, message: 'licensed' }, { status: 200 });
  }
  return NextResponse.json({ ok: false, message: 'denied' }, { status: 403 });
}