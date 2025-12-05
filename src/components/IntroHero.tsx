'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function IntroHero({ mode = 'desktop' }: { mode?: 'desktop' | 'kiosk' }) {
  const [bgmOn, setBgmOn] = useState(false);

  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm font-medium text-emerald-300 tracking-wide uppercase">
          PassView Youth Career Studio
        </span>
      </div>

      <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
        청소년 진로체험<br />
        <span className="text-emerald-400">미래를 디자인하다</span>
      </h1>

      <p className="max-w-2xl text-xl text-gray-300/90 leading-relaxed mb-10 font-light">
        AI 상담사와 함께하는 실감형 진로 탐색.<br />
        <span className="text-white font-medium">상담</span>부터 <span className="text-white font-medium">분석</span>, <span className="text-white font-medium">처방</span>, 그리고 <span className="text-white font-medium">결과 리포트</span>까지.<br />
        당신의 꿈을 현실로 만드는 여정을 지금 시작하세요.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <Link
          href="/career/consultant"
          className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-bold text-gray-950 transition-transform hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            체험 시작하기
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
        </Link>

        <div className="flex gap-3 w-full sm:w-auto">
          <Link
            href="/program-intro"
            className="flex-1 sm:flex-none flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            프로그램 소개
          </Link>
          <button
            onClick={() => setBgmOn(v => !v)}
            className={`flex items-center justify-center rounded-2xl border px-6 py-4 text-base font-semibold transition-all backdrop-blur-sm
              ${bgmOn
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
          >
            {bgmOn ? '🔊 BGM ON' : '🔇 BGM OFF'}
          </button>
        </div>
      </div>

      {mode === 'kiosk' && (
        <p className="mt-12 text-sm font-medium text-gray-500/60 uppercase tracking-widest">
          3분 미사용 시 자동 초기화
        </p>
      )}
    </section>
  );
}
