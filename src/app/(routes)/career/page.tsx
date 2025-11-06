'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// 필요 시 여러분 컴포넌트로 교체
const CareerSelector = () => (
  <div className="p-4 rounded-xl bg-white border">관심분야를 선택하고 아래 버튼을 누르세요.</div>
);

export default function CareerPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const keepQS = (() => {
    const q = new URLSearchParams(sp.toString());
    if (!q.get('level')) q.set('level', '고등학생');
    if (!q.get('field')) q.set('field', 'medical-bio'); // 관련분야 기본값
    return `?${q.toString()}`;
  })();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-extrabold mb-4">관심분야 선택</h1>
      <CareerSelector />
      <div className="mt-6">
        <button
          onClick={() => router.push(`/career/themes${keepQS}`)}
          className="rounded-xl bg-blue-600 text-white px-6 py-3 font-bold hover:bg-blue-700"
        >
          직업 테마 선택으로 →
        </button>
      </div>
    </main>
  );
}