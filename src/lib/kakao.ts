// src/lib/kakao.ts
import { env, validateEnvOnce } from '@/lib/env';

let loadingPromise: Promise<void> | null = null;

/** Kakao JS SDK 로드 + init (중복호출 방지) */
export async function ensureKakaoReady(apiKey: string = env.KAKAO_API_KEY): Promise<void> {
  validateEnvOnce();

  if (typeof window === 'undefined') return;

  // 이미 준비
  if (window.Kakao && window.Kakao.isInitialized?.()) return;

  // 스크립트 로드 1회
  if (!loadingPromise) {
    loadingPromise = new Promise<void>((resolve, reject) => {
      if (document.getElementById('kakao-sdk')) return resolve();
      const s = document.createElement('script');
      s.id = 'kakao-sdk';
      s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
      s.integrity = 'sha384-M9O7sK5UoyspXiWTp3SzmqhagYjZkOaYyb7PZbEwwhkyxb41G2aFQm65UoY4i1ZB';
      s.crossOrigin = 'anonymous';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Kakao SDK 로드 실패'));
      document.head.appendChild(s);
    });
  }
  await loadingPromise;

  if (!window.Kakao) throw new Error('Kakao SDK not found');
  if (!window.Kakao.isInitialized?.()) {
    if (!apiKey) throw new Error('KAKAO_API_KEY 누락');
    window.Kakao.init
(apiKey);
  }
}
