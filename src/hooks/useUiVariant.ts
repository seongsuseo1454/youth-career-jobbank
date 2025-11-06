'use client';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export type UiVariant = 'kiosk' | 'desktop';

/** URL ?mode=kiosk|desktop 우선, 없으면 터치/세로비 기반 자동 추정 */
export default function useUiVariant(): UiVariant {
  const sp = useSearchParams();
  const urlMode = sp.get('mode') as UiVariant | null;

  const variant = useMemo<UiVariant>(() => {
    if (urlMode === 'kiosk' || urlMode === 'desktop') return urlMode;
    if (typeof window === 'undefined') return 'desktop';

    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const w = window.innerWidth
;
    const h = window.innerHeight
;
    // 터치 + 세로/대형 화면이면 kiosk로 추정
    if (touch && (h >= 900 || h > w)) return 'kiosk';
    return 'desktop';
  }, [urlMode]);

  useEffect(() => {
    if (urlMode) {
      try {
        localStorage.setItem('ui:mode', urlMode);
      } catch {}
    }
  }, [urlMode]);

  return variant;
}
