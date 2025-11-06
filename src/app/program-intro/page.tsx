// src/app/program-intro/page.tsx
'use client';

import Link from 'next/link';

export default function ProgramIntroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="mx-auto max-w-5xl px-6 pt-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          PassView 청소년 진로체험
          <br />
          <span className="text-emerald-300">프로그램 소개</span>
        </h1>
        <p className="mt-4 text-gray-200/90">
          AI 상담사와 실감형 체험으로 진로역량을 분석하고,
          맞춤형 결과 보고서(QR/카카오 공유)까지 한 번에 제공합니다.
        </p>

        {/* ✅ 홈으로 버튼만 남김 */}
        <div className="mt-6">
          <Link
            href="/"
            className="rounded-xl bg-emerald-500 px-5 py-3 text-base font-semibold text-black hover:bg-emerald-400 transition"
          >
            ← 홈으로
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-300 mb-3">프로그램 구성</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-100">
            <li>① <b>AI 화상상담</b> — 가상 상담사와 실시간 자기소개</li>
            <li>② <b>진로 탐색</b> — 10개 분야 · 학년(초/중/고)별 맞춤 문제은행</li>
            <li>③ <b>역량 분석</b> — 성취도/집중도/탐구력 자동 평가</li>
            <li>④ <b>결과 보고서</b> — 맞춤 진로제안서, QR/카카오 공유</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-300 mb-3">대상 및 운영</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-100">
            <li>대상: 초·중·고등학생 (학년별 난이도 구성)</li>
            <li>운영: 학교·지자체·공공기관 맞춤형 진행</li>
            <li>시간: 1인 30~60분 (상담·체험·보고서 포함)</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 mt-6 grid gap-6 sm:grid-cols-3">
        <Card title="실감형 체험" desc="분야·직업 테마별 문제은행으로 실제 업무 흐름을 체험합니다." badge="Experiential" />
        <Card title="AI 분석" desc="응답 패턴 기반 핵심 지표(성취/집중/탐구)를 산출합니다." badge="Analytics" />
        <Card title="결과 공유" desc="PDF/QR/카카오톡으로 학생·학부모·교사가 쉽게 확인합니다." badge="Shareable" />
      </section>

      <section className="mx-auto max-w-5xl px-6 mt-10 mb-14">
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/30 p-6">
          <h2 className="text-2xl font-bold text-emerald-300 mb-2">진행 순서</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-100">
            <li>화상상담에서 자기소개서 입력 및 관심분야 선택</li>
            <li>직업 테마 선택 → 학년 맞춤 5문항 풀이</li>
            <li>자동 분석 및 결과 보고서 확인/공유</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

function Card({ title, desc, badge }: { title: string; desc: string; badge: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 shadow-xl flex flex-col">
      <div className="text-xs font-semibold text-emerald-300">{badge}</div>
      <div className="mt-2 text-xl font-bold">{title}</div>
      <p className="mt-2 text-gray-200">{desc}</p>
    </div>
  );
}