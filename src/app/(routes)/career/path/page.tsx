'use client';

import { useRouter } from 'next/navigation';
import { R } from '@/lib/routes';

export default function Page(){
  const r = useRouter();
  const choose = (p:'college'|'job')=>{
    if (typeof window !== 'undefined') localStorage.setItem('ycs.path', p);
    r.push(R.consultantSession); // 🌟 Correct property name
  };
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">진로 방향 선택</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <button onClick={()=>choose('college')}
          className="rounded-2xl border p-5 text-left bg-white hover:shadow">
          <div className="text-lg font-semibold">대학 진학</div>
          <p className="text-sm text-gray-600 mt-1">전공 탐색 · 학생부/수능/포트폴리오</p>
        </button>
        <button onClick={()=>choose('job')}
          className="rounded-2xl border p-5 text-left bg-white hover:shadow">
          <div className="text-lg font-semibold">바로 취업</div>
          <p className="text-sm text-gray-600 mt-1">자격/현장역량 · 인턴/실습 · 면접 준비</p>
        </button>
      </div>
    </main>
  );
}