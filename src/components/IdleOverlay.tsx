// src/components/IdleOverlay.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function IdleOverlay() {
  const [idle, setIdle] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 대기 타이머 리셋
  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIdle(false);
    timerRef.current = setTimeout(() => setIdle(true), 15000); // 15초 후 대기모드
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach((e) => window.addEventListener
(e, reset));
    reset();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  // 오디오 페이드인/아웃
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    let vol = idle ? 0 : el.volume; // 시작점
    const target = idle ? 0.25 : 0; // 대기: 0.25, 종료: 0
    const step = idle ? 0.05 : -0.05;
    const t = setInterval(() => {
      vol = Math.max(0, Math.min(1, vol + step));
      el.volume = vol;
      if ((step > 0 && vol >= target) || (step < 0 && vol <= target)) {
        clearInterval(t);
        if (target === 0) { el.pause(); el.currentTime = 0; }
      }
    }, 120);

    if (idle) {
      // 일부 브라우저는 사용자 상호작용 전 자동재생 제한 → 처음 클릭 이후엔 정상
      el.play().catch(() => {/* 무시: 첫 상호작용 전 자동재생 차단일 수 있음 */});
    }
    return () => clearInterval(t);
  }, [idle]);

  if (!idle) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/45 backdrop-blur-sm  /* 배경 보이게 반투명+블러 */
        flex items-center justify-center
      "
      onClick={reset} // 아무 곳이나 클릭하면 대기모드 해제
    >
      <audio ref={audioRef} loop src="/sounds/idle.mp3" />
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold mb-2 drop-shadow">대기 모드</h2>
        <p className="opacity-90">화면을 터치하면 상담을 계속합니다.</p>
      </div>
    </div>
  );
}
