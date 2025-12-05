// src/app/program-intro/page.tsx
'use client';

import Link from 'next/link';

export default function ProgramIntroPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full opacity-30" />
      </div>

      <header className="relative pt-20 pb-16 text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-300 tracking-widest uppercase">
            Program Overview
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-[1.1] mb-6">
          PassView 진로체험<br />
          <span className="text-emerald-400">All-in-One 솔루션</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed font-light">
          AI 기술과 실감형 콘텐츠의 결합.<br className="hidden sm:block" />
          단순한 체험을 넘어 <strong className="text-white font-medium">데이터 기반의 진로 설계</strong>를 경험해보세요.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-emerald-500/50"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-20 space-y-20">
        {/* Core Features Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="체계적인 프로그램 구성"
            icon="🏗️"
            items={[
              "AI 화상상담 — 가상 멘토와의 심층 인터뷰 & 자기소개",
              "진로 탐색 — 10개 핵심 분야 및 학년별 맞춤형 실무 체험",
              "역량 분석 — 성취도, 집중도, 탐구력 등 다면 평가",
              "결과 리포트 — 개인 맞춤형 진로 제안서 & 모바일 공유"
            ]}
          />
          <FeatureCard
            title="맞춤형 운영 & 대상"
            icon="🎯"
            items={[
              "대상: 초·중·고등학생 (발달 단계별 난이도 자동 조정)",
              "운영: 학교, 지자체 진로센터, 공공기관 특화 커리큘럼",
              "시간: 1인 30~60분 (상담 → 체험 → 분석 → 리포트)"
            ]}
          />
        </section>

        {/* 3 Key Pillars */}
        <section className="grid gap-6 sm:grid-cols-3">
          <PillarCard
            title="실감형 체험"
            desc="실제 직업 현장의 업무 흐름을 반영한 시나리오 기반 문제은행으로 직무 이해도를 극대화합니다."
            badge="Experiential"
            delay={0}
          />
          <PillarCard
            title="AI 데이터 분석"
            desc="학생의 응답 패턴과 수행 결과를 AI가 분석하여 성취도, 적성, 핵심 역량 지표를 도출합니다."
            badge="Analytics"
            delay={100}
          />
          <PillarCard
            title="스마트 결과 공유"
            desc="생성된 분석 리포트는 QR코드 및 카카오톡으로 즉시 전송되어 학부모·교사와 공유 가능합니다."
            badge="Shareable"
            delay={200}
          />
        </section>

        {/* Flow Step */}
        <section>
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900/20 to-slate-900/50 border border-emerald-500/20 p-8 sm:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-black text-sm font-bold">FLOW</span>
              진행 프로세스
            </h2>

            <div className="grid gap-8 sm:grid-cols-3 relative z-10">
              <StepItem number="01" title="AI 상담 및 설계" desc="가상 멘토와 대화하며 자기소개서를 작성하고 관심 분야를 탐색합니다." />
              <StepItem number="02" title="미션 수행 & 체험" desc="선택한 직업 테마의 실무 미션을 수행하며 직업 적성을 확인합니다." />
              <StepItem number="03" title="분석 & 리포트" desc="AI가 분석한 역량 상세 리포트를 확인하고 소장/공유합니다." />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <div className="group rounded-3xl bg-white/5 border border-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">{title}</h2>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300/90 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: item.replace('—', '<span class="text-gray-500 mx-2">|</span>').replace(':', '<span class="text-emerald-400 mx-1">:</span>') }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PillarCard({ title, desc, badge, delay }: { title: string; desc: string; badge: string, delay: number }) {
  return (
    <div
      className="flex flex-col rounded-3xl bg-slate-900/50 border border-white/5 p-8 transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 inline-flex self-start rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
        {badge}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm flex-1">{desc}</p>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="relative pl-6 sm:pl-0 sm:pt-6 border-l-2 sm:border-l-0 sm:border-t-2 border-white/10">
      <div className="absolute -left-[9px] top-0 sm:left-0 sm:-top-[9px] w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500" />
      <span className="text-4xl font-black text-white/5 absolute right-4 top-4 sm:right-0 sm:top-4 select-none">{number}</span>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}