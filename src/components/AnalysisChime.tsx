'use client';
import { useEffect, useRef } from 'react';

export default function AnalysisChime({ play }: { play: boolean }){
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (play && ref.current) {
      // 특수문자, TTS 끊김 방지: 짧은 효과음 파일만 재생
      ref.current.currentTime = 0;
      ref.current.play().catch(()=>{ /* autoplay 차단 대비 무시 */ });
    }
  }, [play]);
  return (
    <audio ref={ref} preload="auto" src="/sfx/chime.mp3" />
  );
}