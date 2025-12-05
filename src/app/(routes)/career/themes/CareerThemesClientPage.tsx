'use client';

import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getField, getFieldLabel, getJobIndex } from '@/lib/careers/registry';
import { speak, cancel } from '@/lib/tts';

// ──────────────────────────────────────────────────────────
// 쿼리 도우미
const pick = (sp: ReturnType<typeof useSearchParams>, k: string, d = '') =>
  (sp.get(k) ?? d).toString();


// 관심분야 정규화 (10개)
const normalizeField = (v: string) => {
  const s = (v || '').toLowerCase();
  if (/(robot|mecha|메카|로봇)/.test(s)) return 'robot-mechatronics';
  if (/(space|aero|항공|우주)/.test(s)) return 'space-aero';
  if (/(auto|mobility|모빌|자율주행)/.test(s)) return 'mobility';
  if (/(ai|data|데이터|인공지능)/.test(s)) return 'ai-data';
  if (/(cyber|security|보안)/.test(s)) return 'cyber-security';
  if (/(medical|bio|의료|바이오)/.test(s)) return 'medical-bio';
  if (/(nursing|rehab|간호|재활)/.test(s)) return 'nursing-rehab';
  if (/(env|energy|환경|에너지)/.test(s)) return 'env-energy';
  if (/(software|app|소프트|앱)/.test(s)) return 'software-app';
  if (/(game|meta|게임|메타|메타버스)/.test(s)) return 'game-metaverse';
  return 'ai-data';
};


// 버튼 팔레트
const PALETTE = [
  { color: 'bg-indigo-600', hover: 'hover:bg-indigo-700' },
  { color: 'bg-violet-600', hover: 'hover:bg-violet-700' },
  { color: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
];


// 분야별 기본 3카드(문제은행 인덱스 없거나, 3개 미만일 때 보강용)
const DEFAULT_THEMES: Record<
  string,
  Array<{ key: string; title: string; desc: string }>
> = {
  'ai-data': [
    { key: 'data-scientist', title: '데이터 사이언티스트', desc: '데이터로 비즈니스 인사이트 도출' },
    { key: 'ai-researcher', title: '인공지능 연구원', desc: '모델/알고리즘 연구·개발' },
    { key: 'bigdata-analyst', title: '빅데이터 분석가', desc: '대규모 데이터 처리·시각화' },
  ],
  'software-app': [
    { key: 'frontend-dev', title: '프론트엔드 개발자', desc: '웹 UI/UX 구현' },
    { key: 'backend-dev', title: '백엔드 개발자', desc: 'API·DB·서버 설계' },
    { key: 'mobile-dev', title: '모바일 앱 개발자', desc: 'iOS/Android 앱' },
  ],
  'robot-mechatronics': [
    { key: 'robot-engineer', title: '로봇 엔지니어', desc: '센서·액추에이터 통합 제어' },
    { key: 'mechatronics-dev', title: '메카트로닉스 개발자', desc: 'HW/SW 융합 시스템' },
    { key: 'automation-tech', title: '자동화 기술자', desc: '생산라인 자동화' },
  ],
  'space-aero': [
    { key: 'aerospace-engineer', title: '항공우주 엔지니어', desc: '비행체 구조/추력 설계' },
    { key: 'satellite-operator', title: '위성 운용 전문가', desc: '위성 데이터·지상국 운용' },
    { key: 'avionics-engineer', title: '항공전자 엔지니어', desc: '항공기 전자/항법 시스템' },
  ],
  mobility: [
    { key: 'ev-powertrain', title: '전기차 파워트레인', desc: '배터리·모터·인버터' },
    { key: 'adas-autonomy', title: '자율주행/ADAS', desc: '센싱·제어·맵핑' },
    { key: 'vehicle-design', title: '차량 설계', desc: '차체/내장/인체공학' },
  ],
  'cyber-security': [
    { key: 'security-analyst', title: '보안 분석가', desc: '침해사고 탐지/대응' },
    { key: 'penetration-tester', title: '모의해킹 전문가', desc: '취약점 진단·가이드' },
    { key: 'soc-engineer', title: 'SOC 엔지니어', desc: '보안 자동화/탐지 룰' },
  ],
  'medical-bio': [
    { key: 'clinician', title: '임상의사', desc: '진료/진단/치료 계획' },
    { key: 'bio-researcher', title: '바이오 연구원', desc: '질병 메커니즘·신약' },
    { key: 'med-ai', title: '의료 AI 엔지니어', desc: '의료영상/EMR 모델링' },
  ],
  // ✅ 5) 간호·재활
  'nursing-rehab': [
    { key: 'rn', title: '간호사', desc: '환자 돌봄·의료 협업·기본 간호' },
    { key: 'ot', title: '작업치료사', desc: 'ADL 향상·감각/운동 재활' },
    { key: 'pt', title: '물리치료사', desc: '근골격/신경계 물리치료' },
  ],
  // ✅ 6) 환경·에너지
  'env-energy': [
    { key: 'env-engineer', title: '환경공학기술자', desc: '대기/수질/폐기물 공정 설계' },
    { key: 'renewable-eng', title: '신재생에너지 전문가', desc: '태양광/풍력/ESS/수소' },
    { key: 'water-quality-analyst', title: '수질분석 기사', desc: '시료 채취·분석·QA/QC' },
  ],
  // ✅ 7) 우주·항공
  'space-aero-alt': [
    { key: 'aerospace-engineer', title: '항공우주 엔지니어', desc: '비행성능/구조/추력' },
    { key: 'satellite-operator', title: '위성 운용 전문가', desc: '임무계획·지상국 운영' },
    { key: 'avionics-engineer', title: '항공전자 엔지니어', desc: '항법/통신/비행제어' },
  ],
  // ✅ 8) 자동차·모빌리티
  'mobility-alt': [
    { key: 'ev-powertrain', title: '전기차 파워트레인', desc: '배터리·구동·인버터' },
    { key: 'adas-autonomy', title: '자율주행/ADAS', desc: '인지·판단·제어' },
    { key: 'vehicle-design', title: '차량 설계', desc: '차체/내장/안전/NVH' },
  ],
};


// 분야 가이드
const FIELD_GUIDE: Record<string, string> = {
  'ai-data': '선택한 관심분야의 대표 직무를 체험합니다. 데이터 수집/분석/모델링을 다룹니다.',
  'software-app': '웹/앱 개발 전반—UI, API, 배포까지 실무 흐름을 익힙니다.',
  'robot-mechatronics': '센서·제어·기구가 결합된 메카트로닉스 기반 로봇을 이해합니다.',
  'space-aero': '항공우주 시스템, 위성/비행체 설계와 운용을 살펴봅니다.',
  mobility: '전동화/자율주행/커넥티드카 등 미래 모빌리티를 체험합니다.',
  'cyber-security': '침해사고 대응, 모의해킹, 보안 자동화를 경험합니다.',
  'medical-bio': '의료/바이오 R&D 및 임상 데이터 활용 기초를 익힙니다.',
  'nursing-rehab': '간호/재활의 실제 케어 과정과 팀 협업을 이해합니다.',
  'env-energy': '에너지 전환/환경 규제 대응과 분석을 체험합니다.',
  'game-metaverse': '게임/메타버스 제작 파이프라인을 경험합니다.',
};


// ──────────────────────────────────────────────────────────
export default function CareerThemesPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const hasSpokenRef = useRef(false);

  // 음성 자동 재생 (한 번만)
  useEffect(() => {
    const message = "직업테마에 오신것을 환영합니다. 원하는 직업을 선택하시고 체험시작을 클릭하세요.";

    const playAudio = () => {
      if (!hasSpokenRef.current) {
        hasSpokenRef.current = true;
        speak(message);
      }
    };

    // 1. 자동 재생 시도
    const timer = setTimeout(playAudio, 500);

    // 2. 브라우저 정책으로 막힐 경우 대비: 화면 클릭 시 재생
    const handleGlobalClick = () => {
      playAudio();
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleGlobalClick);
      cancel();
    };
  }, []);


  // 쿼리 유지
  const keepQS = useMemo(() => {
    const keep = new URLSearchParams();
    [
      'counselor', 'name', 'school', 'grade', 'classroom',
      'goal', 'level', 'field', 'interest'
    ].forEach((k) => { const v = sp.get(k); if (v) keep.set(k, v); });
    if (!keep.get('level')) keep.set('level', '고등학생');
    return keep.toString();
  }, [sp]);


  // 분야/라벨/모듈
  const rawField = pick(sp, 'field', 'ai-data');
  const field = normalizeField(rawField);
  const fieldLabel = getFieldLabel(field);
  const module = getField(field);


  // 카드 데이터(모듈 인덱스 → 배열) or 폴백(해당 분야만)
  const entries = useMemo(() => {
    const arr: Array<{ key: string; title: string; desc: string }> = [];
    const idx = getJobIndex(field);


    if (idx && idx.size > 0) {
      for (const [key, meta] of idx.entries()) {
        arr.push({ key, title: (meta as any).title, desc: (meta as any).desc ?? '' });
      }
      // ✅ 모듈에 3개 미만이면 기본 추천으로 채워 3개 보장
      if (arr.length < 3 && DEFAULT_THEMES[field]) {
        for (const d of DEFAULT_THEMES[field]) {
          if (arr.length >= 3) break;
          if (!arr.find(a => a.key === d.key)) arr.push(d);
        }
      }
    } else {
      // 모듈 인덱스 없으면 분야 기본 추천 사용
      (DEFAULT_THEMES[field] ?? []).forEach((e) => arr.push(e));
      // 우주·항공/모빌리티 보조 키도 지원
      if (arr.length === 0 && DEFAULT_THEMES[`${field}-alt`]) {
        (DEFAULT_THEMES[`${field}-alt`] ?? []).forEach((e) => arr.push(e));
      }
    }
    return arr.slice(0, 3);
  }, [field]);


  // 이동
  const handleThemeClick = useCallback((jobKey: string) => {
    const qs = keepQS ? `?${keepQS}` : '';
    router.push(`/career/experience/${encodeURIComponent(field)}/${encodeURIComponent(jobKey)}/video${qs}`);
  }, [router, keepQS, field]);


  // ─────────────── 렌더 ───────────────
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black tracking-tight">직업 테마 선택</h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/video?${keepQS}`)}
                className="rounded-full bg-white/20 hover:bg-white/30 px-4 py-2 text-sm font-medium"
              >
                ← 화상상담
              </button>
              <button
                onClick={() => router.push('/')}
                className="rounded-full bg-white/20 hover:bg-white/30 px-4 py-2 text-sm font-medium"
              >
                🏠 홈으로
              </button>
            </div>
          </div>
          <p className="mt-3 text-white/90 text-lg">
            AI 상담사 <b>{pick(sp, 'counselor', '-')}</b>와 함께하는 맞춤형 직무 탐색
          </p>
          <div className="mt-2 inline-block bg-white/15 px-3 py-1 rounded-lg text-sm font-semibold">
            관련분야: <b>{fieldLabel}</b> {module?.INDEX?.size ? '' : '(기본 추천)'}
          </div>
        </header>


        {/* 테마 카드 3개 */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {entries.map((t, i) => {
            const { color, hover } = PALETTE[i % PALETTE.length];
            return (
              <button
                key={t.key}
                onClick={() => handleThemeClick(t.key)}
                className="text-left flex flex-col p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-white border border-gray-100"
              >
                <div className="text-3xl font-extrabold mb-2 text-gray-900">{t.title}</div>
                <p className="text-gray-500 mb-6 text-lg font-medium">{t.desc}</p>
                <div className="mt-auto">
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    <span className="w-2 h-2 inline-block rounded-full bg-blue-400 mr-2 animate-pulse" />
                    초·중·고 맞춤 5문항 체험
                  </div>
                  <p className="text-sm text-gray-500">집중·성실·탐구 역량에 맞춘 실전형 문제로 진행됩니다.</p>
                </div>
                <span className={`mt-6 inline-block w-full text-center py-3 rounded-xl text-lg font-bold text-white ${color} ${hover} shadow-lg`}>
                  체험 시작 →
                </span>
              </button>
            );
          })}
        </main>


        {/* 분야 가이드 */}
        <section className="mt-10">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
            <div className="font-bold text-amber-800 mb-1">💡 분야 가이드: {fieldLabel}</div>
            <p className="text-amber-900 text-sm">
              {FIELD_GUIDE[field] ?? '선택한 관심분야의 대표 직무를 체험합니다.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}