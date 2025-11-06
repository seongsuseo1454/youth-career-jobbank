'use client';

import { useEffect } from 'react';
import IntroHero from '../../components/IntroHero'; // ← ../../ (두 단계 위)

export default function KioskHome() {
  // 무입력 자동 리셋(3분)
  useEffect(() => {
    let t: any;
    const reset = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        window.location.href = '/kiosk?mode=kiosk';
      }, 1000 * 60 * 3);
    };
    ['click', 'touchstart', 'keydown', 'mousemove'].forEach((e) =>
      window.addEventListener(e, reset, { passive: true })
    );
    reset();
    return () => {
      ['click', 'touchstart', 'keydown', 'mousemove'].forEach((e) =>
        window.removeEventListener(e, reset)
      );
      clearTimeout(t);
    };
  }, []);

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl py-12">
        <div className="scale-[1.15] sm:scale-100 origin-top">
          <IntroHero mode="kiosk" />
        </div>
      </div>
    </main>
  );
}
