'use client';

import { useRouter } from 'next/navigation';
import { R } from '@/lib/routes';

export default function Page(){
  const r = useRouter();
  
  // consultantSession 대신 다른 유효한 경로 사용 
  const next = () => {
    if (typeof window !== 'undefined') {
      const level = localStorage.getItem('ycs.level') || '';
      const path = localStorage.getItem('ycs.path') || '';
      r.push(`/career/consultant/session?level=${level}&path=${path}`);
    }
  };

  const level = typeof window !== 'undefined' ? localStorage.getItem('ycs.level') : '';
  const path  = typeof window !== 'undefined' ? localStorage.getItem('ycs.path')  : '';
  const label = (level||'중등') + ' · ' + (path==='job' ? '바로 취업' : '대학 진학');

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-5">
      <h1 className="text-2xl font-bold">상담 인사</h1>
      <div className="rounded-xl border bg-white p-5 space-y-3">
        <p className="text-sm text-gray-600">선택: {label}</p>
        <p>
          안녕하세요! 저는 AI 진로상담사입니다. 간단한 소개와 관심 분야를 알려주시면,
          {path==='job' ? ' 현장 역량·자격 중심' : ' 전공/활동 설계 중심'}
          으로 안내해 드릴게요.
        </p>
      </div>
      <div className="flex justify-end">
        <button onClick={next} className="rounded bg-black text-white px-4 py-2">다음</button>
      </div>
    </main>
  );
}