// src/app/intro/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Theme = "space" | "ocean" | "mountain-lake";

// 이미지 경로 매핑 (public/backgrounds/*.jpg)
const IMG = {
  space: "/backgrounds/space.jpg",
  ocean: "/backgrounds/ocean.jpg",
  "mountain-lake": "/backgrounds/mountain-lake.jpg", // ← 하이픈 키는 반드시 문자열!
} satisfies Record<Theme, string>;

// 배경음 (public/sfx/a-wonderful-day.mp3)
const AUDIO_SRC = "/sfx/a-wonderful-day.mp3";

export default function IntroPage() {
  const [theme, setTheme] = useState<Theme>("space");
  const [bgmOn, setBgmOn] = useState(true);
  const [needsKick, setNeedsKick] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 12초마다 자동 테마 순환
  useEffect(() => {
    const order: Theme[] = ["space", "ocean", "mountain-lake"];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % order.length;
      setTheme(order[i]);
    }, 12000);
    return () => clearInterval(t);
  }, []);

  // 배경음 자동재생 처리
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const play = async () => {
      try {
        if (bgmOn) {
          await el.play();
          setNeedsKick(false);
        } else {
          el.pause();
        }
      } catch {
        setNeedsKick(true); // iOS 등 자동재생 차단
      }
    };
    el.volume = 0.45;
    if (el.readyState < 2) el.load();
    void play();
  }, [bgmOn]);

  const kickStart = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      await el.play();
      setNeedsKick(false);
      setBgmOn(true);
    } catch {}
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG[theme]})` }}
        aria-hidden
      />
      {/* 살짝 어둡게 */}
      <div className="absolute inset-0 -z-10 bg-black/55" />

      {/* 본문 */}
      <div className="relative z-0 mx-auto max-w-5xl px-6 py-12">
        <header>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-200 ring-1 ring-emerald-400/30">
            ● PassView Youth Career Studio
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight">
            청소년 진로체험 <br />
            <span className="text-emerald-300">미래 직업을 탐험하세요</span>
          </h1>
          <p className="mt-4 text-gray-200/90">
            AI 상담사와 실감형 체험으로 상담 → 분석 → 처방 → 결과(QR/카카오)까지 한 번에.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/wheel"
              className="rounded-xl bg-emerald-500 px-5 py-3 text-base font-semibold text-black hover:bg-emerald-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              청소년 진로체험 시작 →
            </Link>
            <Link
              href="/program-intro"
              className="rounded-xl bg-white/10 px-5 py-3 text-base font-semibold text-white hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              프로그램 소개
            </Link>
            <button
              onClick={() => setBgmOn((v) => !v)}
              className="rounded-xl bg-white/10 px-5 py-3 text-base font-semibold text-white hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-pressed={bgmOn}
            >
              {bgmOn ? "배경음 OFF" : "배경음 ON"}
            </button>
          </div>
        </header>

        {/* 테마 선택 */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <ThemeButton current={theme} me="space" setTheme={setTheme} label="우주" />
          <ThemeButton current={theme} me="ocean" setTheme={setTheme} label="바다" />
          <ThemeButton current={theme} me="mountain-lake" setTheme={setTheme} label="산·호수" />
        </div>
      </div>

      {/* 오디오 */}
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" playsInline />

      {/* 자동재생 차단 시 재생 버튼 */}
      {needsKick && (
        <button
          onClick={kickStart}
          className="fixed bottom-6 right-6 z-20 rounded-full bg-emerald-500 text-black font-bold px-4 py-3 shadow-xl hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          ▶ 배경음 재생
        </button>
      )}
    </main>
  );
}

function ThemeButton({
  current,
  me,
  setTheme,
  label,
}: {
  current: Theme;
  me: Theme;
  setTheme: (t: Theme) => void;
  label: string;
}) {
  const active = current === me;
  return (
    <button
      onClick={() => setTheme(me)}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2",
        active
          ? "bg-emerald-500 text-black focus-visible:ring-emerald-300"
          : "bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/70",
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}