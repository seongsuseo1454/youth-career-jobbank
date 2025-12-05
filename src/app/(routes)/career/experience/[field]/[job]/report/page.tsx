// src/app/(routes)/career/experience/[field]/[job]/report/page.tsx

'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { speak, cancel } from '@/lib/tts';
import {
  COUNSELORS, THEMES, getJobBank, computeFromQuery,
  pickCounselorFromQuery, getBooksByGrade, BOOKS_FALLBACK_BY_GRADE, hashString,
  JobBank, GradeKey, Book, GradeBooks
} from '@/lib/data';
import { GlobalStyle } from '@/components/GlobalStyle';
import {
  getEvaluationDetail,
  getCompetencyDetail,
  getRoadmapDetail
} from '@/lib/report-generator';

export default function CareerReport() {
  const sp = useSearchParams();
  const [urlSearchParams, setUrlSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sp) {
      setUrlSearchParams(sp);
    }
  }, [sp]);

  const ready = !!urlSearchParams;
  const now = useMemo(() => new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }), []);

  const computed = useMemo(() => urlSearchParams ? computeFromQuery(urlSearchParams) : null, [urlSearchParams]);

  const counselorKey = pickCounselorFromQuery();
  const C = COUNSELORS[counselorKey] || {
    display: '기본 상담사', title: '코칭', badge: '',
    quote: '끈기가 중요합니다.', checklist: ['확인'],
    gradient: 'from-slate-900 via-slate-800 to-slate-900', gradeS: 'from-gray-400 via-gray-500 to-gray-600'
  };

  const themeKey = (computed?.jobKeyRaw || 'data-scientist');
  const theme = THEMES[themeKey] || THEMES['data-scientist'] || { field: '', title: '알 수 없음', hero: '', highlights: [] };

  const jobTitle = (computed?.jobTitleFromQuery?.trim()) ? computed!.jobTitleFromQuery : theme.title;

  const name = computed?.name ?? '응시자';
  const percent = computed?.percent ?? 0;
  const grade = computed?.grade ?? 'D';
  const correct = computed?.correct ?? 0;
  const total = computed?.total ?? 1;
  const categories = computed?.categories ?? [];

  // 1. 종합 평가 상세 멘트
  const evalDetail = useMemo(() =>
    getEvaluationDetail(grade, name, jobTitle),
    [grade, name, jobTitle]);

  // 2. 진로 로드맵 상세 멘트 (학년 파악)
  const userGradeRaw = sp.get('level') || '고등학생';
  const userGrade: GradeKey = userGradeRaw.includes('초등') ? 'elem' : userGradeRaw.includes('중학') ? 'middle' : 'high';

  const roadmapSteps = useMemo(() =>
    getRoadmapDetail(grade, theme.field, userGrade),
    [grade, theme.field, userGrade]);

  // 음성 안내 (한 번만)
  const hasSpokenRef = useRef(false);

  // 음성 메시지 생성 (상세 평가 + 상담사 조언 포함)
  const ttsMessage = useMemo(() => {
    if (!ready || !computed) return '';

    // 부드러운 상담사 톤으로 메시지 구성
    return `반갑습니다, ${name}님. ${jobTitle} 직업 체험은 즐거우셨나요?
    분석 결과, ${name}님의 최종 성취도는 ${grade}등급으로 나타났어요.
    ${evalDetail}
    그리고 ${C.display} 상담사님께서도 이런 조언을 해주셨네요. "${C.quote}"
    더 자세한 내용은 지금 보시는 보고서에 꼼꼼히 담아두었습니다.
    결과를 소장하고 싶으시다면, 화면의 QR코드를 스캔하시거나, 카카오톡 전송 기능을 이용해보세요.
    ${name}님의 멋진 미래를 진심으로 응원합니다!`;
  }, [ready, computed, name, jobTitle, grade, evalDetail, C.display, C.quote]);

  const playAudio = useCallback(() => {
    if (ttsMessage) {
      cancel(); // 기존 음성 중단 후 재생
      speak(ttsMessage);
    }
  }, [ttsMessage]);

  useEffect(() => {
    if (!ready || !computed || !ttsMessage) return;

    const autoPlay = () => {
      if (!hasSpokenRef.current) {
        hasSpokenRef.current = true;
        speak(ttsMessage);
      }
    };

    // 1. 자동 재생 시도
    const timer = setTimeout(autoPlay, 1000);

    // 2. 브라우저 정책 대비: 클릭 시 재생 (최초 1회만)
    const handleGlobalClick = () => {
      if (!hasSpokenRef.current) {
        hasSpokenRef.current = true;
        speak(ttsMessage);
      }
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleGlobalClick);
      cancel();
    };
  }, [ready, computed, ttsMessage]);

  const gradeGrad = useMemo(() => {
    switch (grade) {
      case 'S': return C.gradeS;
      case 'A': return 'from-green-400 via-emerald-500 to-teal-500';
      case 'B': return 'from-blue-400 via-indigo-500 to-purple-500';
      case 'C': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'D': return 'from-gray-400 via-slate-500 to-zinc-600';
      default: return 'from-gray-400 via-slate-500 to-zinc-600';
    }
  }, [grade, C.gradeS]);

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const qrSrc = useMemo(() => {
    if (!shareUrl) return '';
    const cert = String(hashString(`${shareUrl}|${name}|${now}`)).slice(0, 6);
    const data = `${shareUrl}&cert=${cert}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(data)}`;
  }, [shareUrl, name, now]);

  const goHome = useCallback(() => { if (typeof window !== 'undefined') location.href = '/' }, []);
  const goBack = useCallback(() => {
    if (typeof window === 'undefined') return;
    const hasHistory = window.history.length > 1 || document.referrer !== '';
    if (hasHistory) {
      window.history.back();
    } else {
      window.location.href = '/quiz/1';
    }
  }, []);
  const copyLink = useCallback(async () => {
    try { await navigator.clipboard.writeText(shareUrl); alert('링크 복사 완료!'); } catch { }
  }, [shareUrl]);

  if (!ready || !computed) {
    return (
      <main className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <GlobalStyle />
        <div className="text-slate-600">보고서 생성 중…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 print:bg-white">
      <GlobalStyle />

      <div className="page mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 fade-in">
        <div className="no-print flex justify-end gap-2 mb-6">
          <button onClick={goHome} className="rounded-full bg-white border-2 border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700">🏠 홈</button>
          <button onClick={goBack} className="rounded-full bg-white border-2 border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700">⬅ 뒤로</button>
          <button onClick={playAudio} className="rounded-full bg-indigo-50 border-2 border-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1">
            <span>🔊</span> 다시 듣기
          </button>
          <button onClick={copyLink} className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 text-sm font-semibold">🔗 링크복사</button>
        </div>

        <section className="mb-8">
          <div className={`relative rounded-3xl bg-gradient-to-br ${C.gradient} text-white px-10 py-10 shadow-2xl overflow-hidden`}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage:
                `repeating-linear-gradient(45deg, transparent, transparent 36px, rgba(255,255,255,.12) 36px, rgba(255,255,255,.12) 72px)`
            }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-1">{jobTitle}</h1>
                  <p className="text-white/85 text-lg">{theme.field} 체험 성과 종합 분석 보고서</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full">
                    <span className="text-sm text-white/70">평가일</span>
                    <span className="text-white font-semibold">{now}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-white/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60">응시자</span>
                    <span className="text-xl font-bold">{name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60">평가 분야</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">{theme.field}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60">상담사</span>
                    <span className="font-semibold">{C.display} · {C.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60">테마</span>
                    <span className="text-white/90">{theme.hero}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* I. 성취 카드 */}
        <section className="mb-8">
          <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">📊</span><span>I. 상담사 종합평가 분석 및 성취도</span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="group relative">
              <div className={`relative h-44 rounded-3xl bg-gradient-to-br ${gradeGrad} p-1 shadow-2xl`}>
                <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur p-6 flex flex-col items-center justify-center text-white">
                  <p className="text-sm opacity-90 mb-1">최종 성취 등급</p>
                  <div className="text-7xl font-black tracking-tight">{grade}</div>
                  <p className="text-xs mt-2 opacity-95">{C.badge}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-slate-200 p-6 shadow-xl flex flex-col gap-3 min-h-[11rem] overflow-hidden">
                <div>
                  <div className="flex items-baseline gap-4">
                    <div className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {percent}%
                    </div>
                    <div className="text-xl text-slate-600 font-medium">{correct} / {total} 문제 정답</div>
                  </div>

                  <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden shadow-inner mt-3">
                    <div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${grade === 'S' ? C.gradeS :
                        grade === 'A' ? 'from-green-400 to-emerald-600' :
                          grade === 'B' ? 'from-blue-400 to-indigo-600' :
                            grade === 'C' ? 'from-yellow-400 to-orange-600' :
                              'from-slate-300 to-slate-400'
                        }`} style={{ width: `${percent}%` }} />
                  </div>

                  {/* 상세 평가 멘트 */}
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-medium">
                    {evalDetail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* II. 핵심 역량 */}
        <section className="mb-6">
          <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎯</span><span>II. 핵심 역량 심층 진단</span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <div key={c.key} className="group bg-white rounded-2xl border-2 border-slate-200 p-5 hover:shadow-xl transition-all flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {c.key === 'ethics' ? '⚖️' : c.key === 'eda' ? '📊' : c.key === 'model' ? '🔧' : c.key === 'perf' ? '📈' : '🎮'}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-800">{c.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{c.pct >= 80 ? '강점' : c.pct >= 60 ? '양호' : '보강 필요'}</p>
                    </div>
                  </div>
                  <div className={`text-2xl font-black ${c.pct >= 80 ? 'text-red-500' : c.pct >= 60 ? 'text-indigo-600' : c.pct >= 40 ? 'text-yellow-600' : 'text-slate-400'}`}>{c.pct}%</div>
                </div>
                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className={`absolute inset-y-0 left-0 ${c.pct >= 80 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                    c.pct >= 60 ? 'bg-gradient-to-r from-indigo-400 to-indigo-600' :
                      c.pct >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        'bg-gradient-to-r from-slate-300 to-slate-400'
                    }`} style={{ width: `${c.pct}%` }} />
                </div>
                {/* 역량별 상세 조언 */}
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mt-auto">
                  {getCompetencyDetail(c.key, c.pct)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 성장 메시지 */}
        <section className="mt-6 relative rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_18%_18%,white,transparent_60%)]"></div>
          <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🌱</span> 성장 메시지 & 잠재력 조언
          </h3>
          <p className="text-slate-800 leading-relaxed mb-4">
            <b>{name}</b> 학생은 이번 <b>{theme.title}</b> 체험을 통해 <b className="text-indigo-600">가능성</b>을 증명했습니다.
            배움의 목적은 점수가 아니라 <b className="text-purple-600">깊은 이해와 실천</b>입니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-indigo-200 bg-white/80 p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-indigo-700 mb-2">🌟 {C.display}의 한마디</h4>
              <p className="text-slate-700 text-sm leading-relaxed">“{C.quote}”</p>
            </div>
            <div className="rounded-2xl border border-purple-200 bg-white/80 p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">💎 오늘의 성장 체크리스트</h4>
              <ul className="list-disc pl-5 text-slate-700 text-sm space-y-1">
                {C.checklist.map((t, i) => (<li key={i}>{t}</li>))}
              </ul>
            </div>
          </div>
          <div className="page-break h-2" />
        </section>
      </div>

      {/* ================== PAGE 2 ================== */}
      <div className="page mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">

        {/* III. 진로 로드맵 */}
        <section className="mb-8">
          <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">🚀</span><span>III. 진로 로드맵 & 구체 행동</span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition"></div>
                <div className="relative bg-white rounded-2xl p-6 border-2 border-indigo-200 h-full flex flex-col">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full grid place-items-center text-2xl mb-3 font-bold text-indigo-600">STEP {idx + 1}</div>
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">실천 가이드</h3>
                  <p className="text-slate-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 추천 도서 */}
        <section className="mb-8 mt-8 books-wrap">
          <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">📚</span>
            <span>추천 도서 — 학년별 맞춤 (각 6권)</span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
          </h2>

          <div className="grid md:grid-cols-3 gap-4 books-list">
            {(['elem', 'middle', 'high'] as GradeKey[]).map((g) => {
              const booksForGrade = getBooksByGrade(themeKey);
              const currentGradeBooks = (Array.isArray(booksForGrade[g]) ? booksForGrade[g] : []).slice(0, 6);

              return (
                <div
                  key={g}
                  className="rounded-2xl border-2 border-slate-200 p-5 bg-gradient-to-br from-slate-50 to-white book-item"
                >
                  <div className="text-sm font-semibold text-slate-500 mb-2">
                    {g === 'elem' ? '초등' : g === 'middle' ? '중등' : '고등'}
                  </div>

                  <ul className="space-y-2">
                    {currentGradeBooks.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">📖</span>
                        <div className="text-slate-800">
                          <div className="book-title font-semibold">{b?.title ?? '제목 없음'}</div>
                          <div className="book-meta text-xs text-slate-500">저자: {b?.author ?? '정보 없음'}</div>
                          {b?.note && <div className="text-xs text-amber-700 mt-0.5">Tip: {b.note}</div>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* 핵심 개념 한눈에 */}
        <section className="mb-8">
          <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">💡</span><span>핵심 개념 한눈에</span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '⚖️', t: '데이터/윤리', b: '출처 표기, 개인정보/저작권 보호, 안전수칙 준수.' },
              { icon: '📊', t: 'EDA', b: '분포·이상치·패턴 탐색, 시각화와 요약통계.' },
              { icon: '🔧', t: '모델링/프로토타입', b: '문제정의→설계→검증의 반복.' },
              { icon: '📈', t: '성능 해석', b: '정확도·정밀도·재현율과 과적합 점검.' },
              { icon: '🎮', t: '실무 응용', b: '가상환경·테스트베드에서 안전하게 실험/개선.' },
            ].map((c, i) => (
              <div key={i} className="group bg-white rounded-2xl border-2 border-slate-200 p-5 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{c.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-2">{c.t}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VI. 체험 인증 + 결과 전송 */}
        <section id="cert" className="no-print mt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>🔐</span>
            <span>VI. 체험 인증 및 결과 전송</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border-2 border-slate-200 p-6 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span>📜</span>
                <span>체험 인증서</span>
              </h3>

              <p className="text-slate-700 text-sm leading-relaxed mb-6">
                본 인증서는 <strong className="text-slate-900">{name}</strong> 학생이{" "}
                <strong className="text-slate-900">{theme.title}</strong> 진로체험 프로그램을
                성실히 수행했음을 증명합니다.
              </p>

              <div className="space-y-1 text-sm text-slate-600">
                <div>발급일: {now}</div>
                <div>인증번호: {String(hashString(`${shareUrl}|${name}|${now}`)).slice(0, 6)}</div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-indigo-200 p-6 bg-gradient-to-br from-indigo-50 to-white">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                <span>🔒</span>
                <span>QR 인증</span>
              </h3>

              {shareUrl ? (
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-md">
                    <img
                      alt="인증 QR 코드"
                      className="w-32 h-32"
                      src={qrSrc}
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      QR 스캔 시 이 보고서의 진위 여부를 서버에서 확인합니다.
                    </p>
                    <button
                      onClick={copyLink}
                      className="rounded-xl px-5 py-2.5 font-semibold text-white shadow-md bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <span>🔗</span>
                      <span>링크 복사</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-40 grid place-items-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin text-2xl">⏳</div>
                    <div className="text-sm">링크 준비 중…</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border-2 border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span>💬</span>
              <span>카카오톡으로 결과 전송</span>
            </h3>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-3">
                <div>
                  <label htmlFor="kakaoPhone" className="block text-sm text-slate-600 mb-1.5">
                    전화번호 (선택)
                  </label>
                  <input
                    id="kakaoPhone"
                    type="tel"
                    placeholder="예: 010-1234-5678"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    id="kakaoAgree"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>결과(인증 QR 포함)를 카카오톡으로 전송하는 것에 동의합니다.</span>
                </label>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    const phone = (document.getElementById('kakaoPhone') as HTMLInputElement)?.value || '';
                    const agree = (document.getElementById('kakaoAgree') as HTMLInputElement)?.checked;
                    if (!agree) {
                      alert('카카오톡 전송에 동의가 필요합니다.');
                      return;
                    }
                    alert(`카카오톡으로 전송했습니다.\n전화번호: ${phone || '(미입력)'}\nURL: ${shareUrl}`);
                  }}
                  className="rounded-xl px-6 py-3 font-semibold text-white shadow-lg bg-slate-900 hover:bg-black transition-all active:scale-95 whitespace-nowrap"
                >
                  카카오톡으로 전송하기
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="print-only mt-10">
          <div className="rounded-2xl border-2 border-slate-300 p-6 bg-slate-50 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              🎯 진로체험 2탄 — AI 포트폴리오 미션 예고
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-2">
              다음 단계에서는 나만의 진로 포트폴리오를 완성합니다.<br />
              체험한 직업을 바탕으로 AI가 추천하는 경로와<br />
              진로 로드맵을 함께 설계하세요.
            </p>
            <p className="text-xs text-slate-500">
              ※ 체험 인증자에 한해 참여 가능합니다.
            </p>
          </div>
        </section>

        <footer className="mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
          <p className="font-semibold">© 2024 진로 체험 평가 시스템</p>
          <p className="mt-1">
            본 보고서는 교육 목적으로 제공되며, 전문 상담을 대체하지 않습니다.
          </p>
        </footer>
      </div>
    </main>
  );
}