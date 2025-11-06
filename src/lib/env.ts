// src/lib/env.ts
/** 환경변수 단일 출처 */
export const env = {
  // --- Gemini ---
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  GEMINI_BASE_URL:
    process.env.GEMINI_BASE_URL ||
    'https://generativelanguage.googleapis.com/v1beta',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-1.5-flash',

  // --- (옵션) OpenAI 백업용 — 빨간줄 방지용 키/URL/모델 기본값 포함 ---
  AI_BASE_URL: process.env.AI_BASE_URL || '',
  AI_API_KEY: process.env.AI_API_KEY || '',
  AI_MODEL: process.env.AI_MODEL || 'gpt-4o-mini',

  // --- Kakao ---
  /** JS SDK용 공개키 */
  KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY || '',
  /** JS SDK authorize redirect */
  KAKAO_REDIRECT_URI: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '',
  /** 서버에서 토큰 교환 시 사용하는 REST API 키 / 시크릿 */
  KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY || '',
  KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET || '',

  // --- 앱 베이스 URL(선택) ---
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL || '',
};

/** 서버에서 필수값 확인(필요 시 호출) */
export function assertServerEnv() {
  if (!env.GEMINI_API_KEY) {
    throw new Error('🚨 GEMINI_API_KEY 누락: .env.local 확인');
  }
}

/** 클라이언트 1회 경고 */
export function validateEnvOnce() {
  if (typeof window !== 'undefined') {
    // 중복 실행 방지
    if ((window as any).__ENV_VALIDATED__) return;
    (window as any).__ENV_VALIDATED__ = true;
  }
  const missing: string[] = [];
  if (!env.KAKAO_API_KEY) missing.push('NEXT_PUBLIC_KAKAO_API_KEY');
  if (!env.KAKAO_REDIRECT_URI) missing.push('NEXT_PUBLIC_KAKAO_REDIRECT_URI');
  if (!env.GEMINI_API_KEY) missing.push('GEMINI_API_KEY (또는 NEXT_PUBLIC_GEMINI_API_KEY)');

  if (missing.length) {
    const msg = `⚠️ 환경변수 누락:\n- ${missing.join('\n- ')}\n\n.env.local을 확인해 주세요.`;
    if (typeof window !== 'undefined') alert(msg);
    console.error(msg);
  } else {
    console.log('✅ ENV OK');
  }
}