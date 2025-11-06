'use client';

import { useEffect } from 'react';

export default function KakaoInit() {
  const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    if (!key) {
      console.info('[Kakao] NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY 없음 → init 생략');
      return;
    }

    const SDK_ID = 'kakao-sdk';
    if (document.getElementById(SDK_ID)) {
      try {
        const Kakao = (window as any).Kakao;
        if (Kakao && !Kakao.isInitialized()) Kakao.init(key);
      } catch {}
      return;
    }

    const s = document.createElement('script');
    s.id = SDK_ID;
    s.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    s.async = true;
    s.onload = () => {
      try {
        const Kakao = (window as any).Kakao;
        if (Kakao && !Kakao.isInitialized()) Kakao.init(key);
      } catch (e) {
        console.warn('[Kakao] init 실패:', e);
      }
    };
    s.onerror = () => console.warn('[Kakao] SDK 로드 실패');
    document.head.appendChild(s);
  }, [key]);

  return null;
}