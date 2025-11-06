// src/components/IdleMain.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Theme = "space" | "ocean" | "mountain-lake";

const IMG: Record<Theme, string> = {
  // ✅ 이미지 파일은 /public/backgrounds 에 두세요
  space: "/backgrounds/space.jpg",
  ocean: "/backgrounds/ocean.jpg",
  "mountain-lake": "/backgrounds/mountain-lake.jpg",
};

export default function IdleMain() {
  const [theme, setTheme] = useState<Theme>("space");
  const [bgmOn, setBgmOn] = useState(true);
  const [needsKick, setNeedsKick] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 12초마다 자동 테마 순환
  useEffect(() => {
    const order: Theme[] = ["space", "ocean", "mountain-lake"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setTheme(order[i]);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  // 배경음 재생/차단 처리
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const play = async () => {
      try {
        if (bgmOn) {
          el.volume = 0.45;
          if (el.readyState < 2) el.load();
          await el.play();
          setNeedsKick(false);
        } else el.pause();
      } catch {
        setNeedsKick(true);
      }
    };
    void play();
  }, [bgmOn]);

  const kickStart = async () => {
    try {
      await audioRef.current?.play();
      setNeedsKick(false);
      setBgmOn(true);
    } catch {}
  };

  return (
    <main
      className="min-h-screen text-white flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${IMG[theme]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 어둡게 오버레이 */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300 ring-1 ring-emerald-400/30">
          ● PassView Youth Career Studio
        </span>

        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight">
          청소년 진로체험
          <br />
          <span className="text-emerald-300">미래 직업을 탐험하세요</span>
        </h1>

        <p className="mt-6 text-lg text-gray-100/90">
          AI 상담사와 실감형 체험으로<br className="hidden sm:block" />
          상담 → 분석 → 처방 → 결과(QR/카카오)까지 한 번에!
        </p>

        {/* 액션 */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/wheel"
            className="w-full sm:w-auto rounded-xl bg-emerald-500 px-5 py-3 text-base font-semibold text-black hover:bg-emerald-400 transition"
          >
            청소년 진로체험 시작 →
          </Link>

          {/* ⚠️ 소개 페이지 경로는 /program-intro 입니다 */}
          <Link
            href="/program-intro"
            className="w-full sm:w-auto rounded-xl bg-white/10 px-5 py-3 text-base font-semibold text-white hover:bg-white/20 transition"
          >
            프로그램 소개
          </Link>

          <button
            onClick={() => setBgmOn(v => !v)}
            className="w-full sm:w-auto rounded-xl bg-white/10 px-5 py-3 text-base font-semibold text-white hover:bg-white/20 transition"
          >
            {bgmOn ? "배경음 OFF" : "배경음 ON"}
          </button>
        </div>

        {/* 테마 선택 버튼 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <ThemeButton current={theme} me="space" setTheme={setTheme} label="우주" />
          <ThemeButton current={theme} me="ocean" setTheme={setTheme} label="바다" />
          <ThemeButton current={theme} me="mountain-lake" setTheme={setTheme} label="산·호수" />
        </div>
      </div>

      {/* 오디오 */}
      <audio ref={audioRef} src="/sfx/a-wonderful-day.mp3" loop preload="auto" playsInline />

      {needsKick && (
        <button
          onClick={kickStart}
          className="fixed bottom-6 right-6 z-20 rounded-full bg-emerald-500 text-black font-bold px-4 py-3 shadow-xl hover:bg-emerald-400"
        >
          ▶ 배경음 재생
        </button>
      )}
    </main>
  );
}

function ThemeButton({
  current, me, setTheme, label,
}: {
  current: Theme; me: Theme; setTheme: (t: Theme) => void; label: string;
}) {
  const active = current === me;
  return (
    <button
      onClick={() => setTheme(me)}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none",
        active ? "bg-emerald-500 text-black" : "bg-white/10 text-white hover:bg-white/20",
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
