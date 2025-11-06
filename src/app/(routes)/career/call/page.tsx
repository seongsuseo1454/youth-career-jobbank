// [제목] 룰렛 → /video 전환 시 오디오 허용 플래그 전달 (최소 변경)
// (예) src/app/(routes)/call/page.tsx  혹은 "다음단계" onClick 이 있는 파일

'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

function NextStep({ counselor }: { counselor: string }) {
  const router = useRouter();

  const goNext = useCallback(() => {
    try { sessionStorage.setItem('allowAudio', '1'); } catch {}
    router.push(`/video?counselor=${encodeURIComponent(counselor)}&autoplay=1`);
  }, [router, counselor]);

  return (
    <button onClick={goNext} className="px-4 py-2 rounded bg-emerald-600 text-white">
      다음 단계 →
    </button>
  );
}

export default function Page() {
  const searchParams = useSearchParams();
  const counselor = searchParams?.get('counselor') ?? 'sejong';
  return <NextStep counselor={counselor} />;
}