// src/app/(routes)/career/experience/[field]/[job]/page.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

// ✅ 공용 레지스트리 (경로 그대로 유지)
import { getJobBank, getJobIndex } from '../../../../../../registry';
import type { QuestionSet, Question, JobDef } from '@/lib/careers/types';

// -------------------- 유틸 --------------------
const toGrade = (v?: string | null): keyof QuestionSet => {
  const g = (v || '').toLowerCase();
  if (g.includes('초등')) return 'elem';
  if (g.includes('중학')) return 'middle';
  return 'high';
};

// ✅ 문항이 없을 때 안전 Fallback
const FALLBACK_QUESTIONS: Question[] = [
  { id: 1, q: '이 직업에서 가장 중요한 핵심 역량은?', options: ['창의력', '분석력', '의사소통', '협업'], correct: 1 },
  { id: 2, q: '문제 해결 시 가장 먼저 고려해야 할 것은?', options: ['비용', '데이터의 정확성', '속도', '편의성'], correct: 1 },
  { id: 3, q: '팀 프로젝트에서 본인의 역할은?', options: ['조율자', '기록자', '분석가', '의사결정자'], correct: 2 },
  { id: 4, q: '기술 발전이 이 직업에 미치는 영향은?', options: ['작다', '중간', '크다', '없다'], correct: 2 },
  { id: 5, q: '이 직업의 윤리적 책임은?', options: ['중요하지 않다', '보통이다', '매우 중요하다', '상관없다'], correct: 2 },
];

// -------------------- 페이지 --------------------
export default function ExperienceJobPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const { field, job } = useParams<{ field: string; job: string }>();

  // 쿼리 유지
  const keepQS = useMemo(() => {
    const keep = new URLSearchParams();
    ['counselor','name','school','grade','classroom','goal','level','field','interest']
      .forEach(k => { const v = sp.get(k); if (v) keep.set(k, v); });
    return keep.toString();
  }, [sp]);

  // ✅ 직업명: 레지스트리에서 가져와 표기(30개 직업 모두 자동 노출)
  const jobMeta: JobDef = getJobIndex(field, job) ?? { key: job, title: job, field: field || '' };
  const jobTitle = jobMeta.title;

  // ✅ 학습 레벨에 맞춰 문항 선택
  const gradeKey = toGrade(sp.get('level'));
  const bank = getJobBank(field, job);
  const QUESTIONS = Array.isArray(bank) ? FALLBACK_QUESTIONS : (bank[gradeKey] ?? FALLBACK_QUESTIONS);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const correctCount = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
  const allCorrect = correctCount === QUESTIONS.length;

  const handleChoice = (index: number) => {
    const updated = [...answers];
    updated[step] = index;
    setAnswers(updated);
  };

  const next = useCallback(() => {
    if (!isLast) setStep((s) => s + 1);
  }, [isLast]);

  // ✅ 결과보기 이동 (interest 누락 방지)
  const goReport = useCallback(() => {
    const keep = new URLSearchParams(keepQS);
    keep.set('ans', answers.join(''));
    if (!keep.get('interest')) keep.set('interest', field);
    // 보고서에서 직업명이 필요하면 jobTitle 전달(기존 호환 유지용)
    if (!keep.get('jobTitle')) keep.set('jobTitle', jobTitle);
    router.push(`/career/experience/${field}/${job}/report?${keep.toString()}`);
  }, [router, field, job, answers, keepQS, jobTitle]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-extrabold text-indigo-700">
            직업테마 체험: {jobTitle}
          </h1>
          <button
            onClick={() => router.push(`/career/themes?${sp.toString()}`)}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            ← 테마 다시 선택
          </button>
        </div>

        {/* 진행바 */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            문제 {step + 1} / {QUESTIONS.length}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 문항 */}
        <div className="text-lg font-semibold text-gray-900 mb-4">
          {current.q}
        </div>

        <div className="space-y-3">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleChoice(i)}
              className={`w-full text-left p-4 rounded-xl border-2 ${
                answers[step] === i
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                  : 'border-gray-200 hover:border-indigo-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* 버튼 */}
        <div className="mt-8 flex justify-between items-center">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              ← 이전
            </button>
          ) : (
            <div />
          )}

          {isLast ? (
            <button
              onClick={goReport}
              disabled={!allCorrect}
              className={`px-6 py-3 rounded-xl font-bold text-white ${
                allCorrect
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              ✅ 결과보기
            </button>
          ) : (
            <button
              onClick={next}
              disabled={answers[step] === -1}
              className={`px-6 py-3 rounded-xl font-bold text-white ${
                answers[step] !== -1
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              다음 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}