'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { getField } from '@/lib/careers/registry';

type ChoiceKey = 'A' | 'B' | 'C' | 'D';

type QuizItem = {
  id: string;
  grade?: '초' | '중' | '고';
  stem: string;
  choices: Array<{ key: ChoiceKey; label: string; footnote?: string }>;
  hint?: string;
  explanation?: string;
};

type JobMeta = { title?: string; desc?: string; items?: QuizItem[] };

const levelToGrade = (level?: string | null): '초' | '중' | '고' => {
  const s = (level ?? '').toString();
  if (/초/.test(s)) return '초';
  if (/중/.test(s)) return '중';
  return '고';
};

export default function ExperienceVideoPage() {
  const router = useRouter();
  const params = useParams<{ field: string; job: string }>();
  const sp = useSearchParams();

  // 쿼리 유지
  const keepQS = useMemo(() => {
    const keep = new URLSearchParams();
    ['counselor','name','school','grade','classroom','goal','interest','level'].forEach((k) => {
      const v = sp.get(k);
      if (v) keep.set(k, v);
    });
    return keep.toString
();
  }, [sp]);

  // 학령
  const levelLabel = sp.get('level') ?? '고등학생';
  const grade = levelToGrade(levelLabel);

  // 문제은행 로드
  const mod = getField(params.field);
  const jobMeta = (mod?.BANK?.[params.job] ?? {}) as JobMeta;
  const allItems: QuizItem[] = Array.isArray(jobMeta.items
) ? jobMeta.items
 : [];

  // 학령별 5문항 + 보기 랜덤(표시만 섞임)
  const items = useMemo<QuizItem[]>(() => {
    const filtered = allItems.filter((it) => (it.grade ?? '고') === grade).slice(0, 5);
    return filtered.map((it) => ({
      ...it
,
      choices: [...it.choices
].sort(() => Math.random() - 0.5),
    }));
  }, [allItems, grade]);

  // 모듈/직업 누락 예외
  if (!mod || !jobMeta || !Array.isArray(jobMeta.items
)) {
    const backHref = `/career/themes${keepQS ? `?${keepQS}` : ''}`;
    return (
      <div className="p-6">
        <div className="rounded-xl border bg-white p-6 shadow">
          선택한 분야/직업의 문제은행을 찾을 수 없습니다. 테마 화면에서 다시 선택해 주세요.
        </div>
        <div className="mt-4">
          <button
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-300"
            onClick={() => router.push(backHref)}
          >
            ← 뒤로가기
          </button>
        </div>
      </div>
    );
  }

  // 슬라이드 상태
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ChoiceKey | undefined>>({});
  const current = items[idx];

  const onSelect = useCallback((qid: string, key: ChoiceKey) => {
    setAnswers((prev) => ({ ...prev, [qid]: key }));
  }, []);

  const onPrev = useCallback(() => setIdx((v) => Math.max(0, v - 1)), []);
  const onNext = useCallback(() => setIdx((v) => Math.min(items.length - 1, v + 1)), [items.length]);

  const onSubmit = useCallback(() => {
    const ordered = items.map((it) => answers[it.id] ?? 'A');
    const ansString = ordered.join('');

    const q = new URLSearchParams(keepQS);
    q.set('field', params.field);
    q.set('job', params.job);
    q.set('jobTitle', jobMeta.title ?? params.job);
    q.set('ans', ansString);
    q.set('score', String(items.length || 5));
    q.set('total', String(items.length || 5));

    router.push(`/career/experience/${params.field}/${params.job}/report?${q.toString()}`);
  }, [answers, items, jobMeta.title, keepQS, params.field, params.job, router]);

  const goBackThemes = useCallback(() => {
    router.push(`/career/themes${keepQS ? `?${keepQS}` : ''}`);
  }, [keepQS, router]);

  const progressPct = useMemo(() => {
    const total = Math.max(items.length, 5);
    return Math.round(((Math.min(idx, total - 1) + 1) / total) * 100);
  }, [idx, items.length]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {jobMeta.title ?? '직업 체험'} <span className="text-indigo-600">({grade} · 5문항)</span>
            </h1>
            {jobMeta.desc
 ? <p className="text-gray-500">{jobMeta.desc
}</p> : null}
          </div>
          <button
            onClick={goBackThemes}
            className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-300"
          >
            ← 뒤로가기
          </button>
        </header>

        {/* 진행바 */}
        <div className="mb-4">
          <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progressPct}%` }} aria-label="progress" />
          </div>
          <div className="mt-1 text-sm text-gray-600 font-semibold">문항 {Math.min(idx + 1, 5)} / 5</div>
        </div>

        {/* 슬라이드 */}
        {current ? (
          <div className="rounded-2xl border bg-white p-6 shadow-lg">
            <div className="mb-4 text-lg font-bold text-gray-900">Q{idx + 1}. {current.stem}</div>

            <div className="space-y-3">
              {current.choices.map((c) => {
                const checked = answers[current.id] === c.key;
                return (
                  <label
                    key={c.key}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${
                      checked ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={current.id}
                      className="mt-1"
                      checked={checked}
                      onChange={() => onSelect(current.id, c.key)}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{c.key}. {c.label}</div>
                      {c.footnote ? <div className="text-xs text-gray-500 mt-1">※ {c.footnote}</div> : null}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* 힌트/해설 */}
            <div className="mt-5 space-y-2">
              {current.hint ? (
                <div className="text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <span className="font-semibold text-amber-700">힌트:</span>{' '}
                  <span className="text-amber-800">{current.hint}</span>
                </div>
              ) : null}
              {current.explanation ? (
                <div className="text-sm bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <span className="font-semibold text-emerald-700">해설:</span>{' '}
                  <span className="text-emerald-800">{current.explanation}</span>
                </div>
              ) : null}
            </div>

            {/* 하단 컨트롤 */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={onPrev}
                disabled={idx === 0}
                className={`rounded-lg px-4 py-2 font-semibold ${
                  idx === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-slate-200 hover:bg-slate-300'
                }`}
              >
                ◀ 뒤로가기
              </button>

              {idx < 4 ? (
                <button
                  onClick={onNext}
                  disabled={!answers[current.id]}
                  className={`rounded-lg px-5 py-2 font-extrabold ${
                    answers[current.id]
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  다음 ▶
                </button>
              ) : (
                <button
                  onClick={onSubmit}
                  disabled={!answers[current.id]}
                  className={`rounded-lg px-5 py-2 font-extrabold ${
                    answers[current.id]
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  제출하고 결과보기
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-6 shadow">해당 학령({grade}) 문항이 준비되지 않았습니다.</div>
        )}
      </div>
    </div>
  );
}
