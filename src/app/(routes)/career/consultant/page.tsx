// src/app/(routes)/career/consultant/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AvatarPieWheel, { Avatar } from '@/components/AvatarPieWheel';
import { speak, cancel } from '@/lib/tts';
import Link from 'next/link';

const AVATARS: Avatar[] = [
  { id: 1, name: '서연' },
  { id: 2, name: '준호' },
  { id: 3, name: '민지' },
  { id: 4, name: '도현' },
  { id: 5, name: '하윤' },
  { id: 6, name: '지우' },
];

export default function Page() {
  const r = useRouter();
  const hasSpokenRef = useRef(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const message = "이 곳은 아바타상담사를 선택하는 곳입니다. 룰렛을 돌려 상담사를 선택한 후 다음단계를 클릭하세요.";

  const trySpeak = () => {
    if (!hasSpokenRef.current) {
      hasSpokenRef.current = true;
      speak(message);
      setNeedsInteraction(false);
    }
  };

  useEffect(() => {
    // 자동 재생 시도
    const timer = setTimeout(() => {
      try {
        speak(message);
        hasSpokenRef.current = true;
      } catch {
        // 자동 재생 실패 시 사용자 클릭 필요
        setNeedsInteraction(true);
      }
    }, 500);

    // 클릭 시 재생 (폴백)
    const handleClick = () => {
      if (!hasSpokenRef.current) {
        trySpeak();
      }
      document.removeEventListener('click', handleClick);
    };
    document.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timer);
      cancel();
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <main className="px-5 py-10 relative">
      {/* 홈으로 버튼 */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md bg-white text-blue-700 hover:bg-gray-100"
        >
          🏠 홈으로
        </Link>
      </div>

      {/* 음성 재생 안내 (자동재생 차단 시) */}
      {needsInteraction && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={trySpeak}
            className="px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md bg-blue-600 text-white hover:bg-blue-700 animate-pulse"
          >
            🔊 안내 듣기
          </button>
        </div>
      )}

      <AvatarPieWheel
        avatars={AVATARS}
        onNext={(a) => r.push(`/video?counselor=${encodeURIComponent(a.name)}`)}
      />
    </main>
  );
}