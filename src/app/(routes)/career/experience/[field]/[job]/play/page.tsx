'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function PlayRedirect() {
  const router = useRouter();
  const pathname = usePathname();     // 예: /career/experience/env-energy/수질분석기사/play
  const sp = useSearchParams();       // 보고서에 넘길 기존 쿼리 유지

  // field / job 추출 (경로 우선, 없으면 쿼리 fallback)
  const { field, job } = useMemo(() => {
    const parts = (pathname || '').split('/'); // ["", "career", "experience", "[field]", "[job]", "play"]
    const f = parts[4] || sp.get('field') || 'ai-data';
    const j = parts[5] || sp.get('jobTitle') || '직업';
    return { field: decodeURIComponent(f), job: decodeURIComponent(j) };
  }, [pathname, sp]);

  // 기존 쿼리 전부 보존해서 report로 넘김
  const keepQS = useMemo(() => {
    const q = new URLSearchParams();
    // useSearchParams 는 read-only이므로 for...of 로 복사
    for (const [k, v] of sp.entries()) q.set(k, v);
    // 경로에서 가져온 값이 있으면 보강
    if (!q.get('field')) q.set('field', field);
    if (!q.get('jobTitle')) q.set('jobTitle', job);
    return q.toString();
  }, [sp, field, job]);

  // 자동 이동 (100% 정답 제한 같은 가드 전혀 없음)
  useEffect(() => {
    router.replace(`/career/experience/${encodeURIComponent(field)}/${encodeURIComponent(job)}/report${keepQS ? `?${keepQS}` : ''}`);
  }, [router, field, job, keepQS]);

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-xl font-bold mb-2">이동 중…</h1>
        <p className="text-slate-600 mb-4">
          결과 보고서 페이지로 자동 이동합니다.
          자동 이동이 되지 않으면 아래 버튼을 눌러 이동하세요.
        </p>
        <a
          href={`/career/experience/${encodeURIComponent(field)}/${encodeURIComponent(job)}/report${keepQS ? `?${keepQS}` : ''}`}
          className="inline-block rounded-lg px-4 py-2 bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          결과 보고서로 이동
        </a>
      </div>
    </div>
  );
}