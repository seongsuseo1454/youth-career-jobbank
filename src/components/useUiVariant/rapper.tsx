'use client';
import { PropsWithChildren, useEffect } from 'react';
import useUiVariant from '@/hooks/useUiVariant';

export default function UiVariantWrapper({ children }: PropsWithChildren) {
  const variant = useUiVariant();

  // 키오스크: 무입력 3분 → /kiosk로 복귀
  useEffect(() => {
    if (variant !== 'kiosk') return;
    let t: ReturnType<typeof setTimeout> | null = null;

    const reset = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        window.location.href = '/kiosk?mode=kiosk';
      }, 1000 * 60 * 3);
    };

    const events: (keyof WindowEventMap)[] = [
      'click', 'touchstart', 'keydown', 'mousemove'
    ];
    events.forEach((e) => window.addEventListener
(e, reset, { passive: true } as AddEventListenerOptions));
    reset();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (t) clearTimeout(t);
    };
  }, [variant]);

  return <div className={variant === 'kiosk' ? 'kiosk' : 'desktop'}>{children}</div>;
}
