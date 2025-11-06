'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FIELDS, type ThemeDef } from '@/lib/themes';

export default function InterestsPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const suggested = sp.get('s')?.split(',').map(s => s.trim()).filter(Boolean) || [];

  const [candidates, setCandidates] = useState<ThemeDef[]>([]);

  useEffect(() => {
    if (suggested && suggested.length > 0) {
      const valid = FIELDS.filter(f => suggested.includes(f.field));
      setCandidates(valid.slice(0, 3));
    } else {
      const shuffled = [...FIELDS].sort(() => Math.random() - 0.5);
      setCandidates(shuffled.slice(0, 3));
    }
  }, [sp]);

  const goBack = () => router.push('/career/session');

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">관심 분야 선택</h1>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
          onClick={() => router.push('/')}
        >
          홈으로
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        상담사가 분석한 후보 분야입니다. 하나를 골라 계속 진행해 주세요.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {candidates.map((themeDef) => (
          <button
            key={themeDef.field}
            className="rounded-2xl border border-gray-200 shadow bg-white p-6 text-center hover:shadow-xl hover:scale-105 transition"
            onClick={() => {
              const q = new URLSearchParams({ field: themeDef.field });
              router.push(`/career/experience?${q.toString()}`);
            }}
          >
            <div className="text-xl font-bold text-indigo-600 mb-1">
              {themeDef.title || themeDef.field}
            </div>
            <div className="text-xs text-gray-500">선택하면 체험을 바로 시작합니다</div>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          className="px-6 py-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700"
          onClick={goBack}
        >
          ← 화상채팅으로 돌아가기
        </button>
      </div>
    </main>
  );
}