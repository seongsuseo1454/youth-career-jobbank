'use client';
import { useEffect, useRef, useState } from 'react';

export default function AmbientAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    return () => {  // 언마운트 시 정리
      try {
        srcRef.current?.stop();
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  async function start() {
    if (on) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;

    // 1분 길이의 아주 약한 핑크노이즈 버퍼 생성 (부드러운 대기 사운드)
    const seconds = 60;
    const rate = ctx.sampleRate;
    const frames = seconds * rate;
    const buffer = ctx.createBuffer(1, frames, rate);
    const data = buffer.getChannelData(0);

    // Voss–McCartney 근사: 핑크/브라운 중간 느낌의 저역 위주 노이즈
    let white = 0, b0 = 0, b1 = 0, b2 = 0, b3 = 0;
    for (let i = 0; i < frames; i++) {
      white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      const pink = b0 + b1 + b2 + white * 0.1848;
      // 아주 낮은 볼륨 + 천천히 사인 곡선으로 호흡감
      const t = i / rate;
      const breath = 0.6 + 0.4 * Math.sin(2 * Math.PI * (1 / 8) * t);
      data[i] = (pink * 0.005) * breath;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const gain = ctx.createGain();
    gain.gain.value = 0.06; // 기본 음량

    src.connect
(gain).connect(ctx.destination
);
    src.start();

    srcRef.current = src;
    gainRef.current = gain;
    setOn(true);
  }

  async function stop() {
    try {
      srcRef.current?.stop();
      await ctxRef.current?.close();
    } catch {}
    srcRef.current = null;
    ctxRef.current = null;
    gainRef.current = null;
    setOn(false);
  }

  return (
    <div className="fixed left-4 bottom-4 z-50 flex items-center gap-2 rounded-xl bg-black/40 px-3 py-2 text-white backdrop-blur">
      <button
        onClick={on ? stop : start}
        className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
        aria-label={on ? '대기 음악 끄기' : '대기 음악 켜기'}
      >
        {on ? '음악 끄기' : '음악 켜기'}
      </button>
      <span className="text-xs opacity-80">잔잔한 대기음</span>
    </div>
  );
}
