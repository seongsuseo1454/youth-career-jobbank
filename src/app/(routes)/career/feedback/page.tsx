'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { R } from '@/lib/routes';

export default function Page(){
  const r = useRouter();
  const [useful, setUseful] = useState('도움이 됨');
  const [extra, setExtra]   = useState('');

  const submit = ()=>{
    try{
      const payload = { useful, extra, at: new Date().toISOString() };
      localStorage.setItem('ycs.feedback', JSON.stringify(payload));
    }catch{}
    r.push('/'); // 홈으로
  };

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">설문</h1>

      <div className="rounded-2xl border bg-white p-5 space-y-3">
        <div>
          <div className="text-sm font-semibold mb-1">이번 체험은 도움이 되었나요?</div>
          <select className="w-full border rounded px-3 py-2" value={useful} onChange={e=>setUseful(e.target.value)}>
            <option>매우 도움이 됨</option>
            <option>도움이 됨</option>
            <option>보통</option>
            <option>도움이 되지 않음</option>
          </select>
        </div>
        <div>
          <div className="text-sm font-semibold mb-1">추가하고 싶은 직업/테마가 있다면 적어주세요</div>
          <textarea className="w-full border rounded p-3" rows={4} value={extra} onChange={e=>setExtra(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={submit} className="rounded bg-black text-white px-4 py-2">제출하고 종료</button>
      </div>
    </main>
  );
}