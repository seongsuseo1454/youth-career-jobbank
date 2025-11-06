// [제목] 개별 체험 진입 페이지(키 기반)
'use client';

import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const { key } = useParams<{ key: string }>();
  const router = useRouter();

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">체험: {key}</h1>
      <p className="text-gray-600 mt-2">여기에 해당 직업의 체험 UI가 들어갑니다.</p>

      <textarea className="mt-6 w-full border rounded p-3 min-h-[140px]" placeholder="체험 아이디어/메모를 입력해주세요" />

      <div className="mt-4 flex gap-2">
        <button onClick={() => router.back()} className="px-4 py-2 rounded-md border">← 뒤로</button>
        <button className="px-4 py-2 rounded-md bg-black text-white">분석으로 →</button>
      </div>
    </main>
  );
}