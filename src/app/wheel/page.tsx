// (그대로) src/app/wheel/page.tsx
'use client';


import { useRouter, useSearchParams } from 'next/navigation';
import AvatarPieWheel, { Avatar } from '../../components/AvatarPieWheel';


export default function WheelPage() {
  const router = useRouter();
  const sp = useSearchParams();


  // 다음 단계 이동 (안전가드 포함)
  const goVideo = (picked: Avatar) => {
    const name = picked?.name?.trim();
    if (!name) {
      alert('상담사를 먼저 선택해주세요.');
      return;
    }
    const params = new URLSearchParams(sp.toString());
    params.set('counselor', name); // 선택한 상담사 반영
    router.push(`/video?${params.toString()}`); // 다음 단계로 이동
  };


  return (
    <main className="relative mx-auto max-w-5xl px-5 py-10">
      {/* ✅ 홈으로: 상단 왼쪽 고정 */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 z-20 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow"
      >
        홈으로
      </button>


      <h1 className="text-3xl font-extrabold text-gray-900">아바타 관심분야 휠</h1>
      <p className="mt-2 text-gray-600">원하는 상담사를 선택하면 다음 단계로 이동합니다.</p>


      <div className="mt-8 flex items-center justify-center">
        <AvatarPieWheel onNext={goVideo} />
      </div>
    </main>
  );
}
