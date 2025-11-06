'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function IntroHero({ mode = 'desktop' }: { mode?: 'desktop' | 'kiosk' }) {
  const [bgmOn, setBgmOn] = useState(false);

  return (
    <section className="text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300 ring-1 ring-emerald-400/30">
        ● PassView Youth Career Studio
      </span>

      <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight">
        청소년 진로체험
        <br />
        <span className="text-emerald-300">미래 직업을 탐험하세요</span>
      </h1>

      <p className="mt-6 text-lg text-gray-200/90">
        AI 상담사와 실감형 체험으로 상담 → 분석 → 처방 → 결과물까지 한 번에.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/wheel"
          className="w-full sm:w-auto rounded-xl bg-emerald-500 px-5 py-3 text-base font-semibold text-black hover:bg-emerald-400 transition"
        >
          청소년 진로체험 시작 →
        </Link>
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
          {bgmOn ? '배경음 OFF' : '배경음 ON'}
        </button>
      </div>

      {mode === 'kiosk' && (
        <p className="mt-4 text-sm text-gray-300/80">무입력 3분 후 자동 초기화됩니다.</p>
      )}
    </section>
  );
}
