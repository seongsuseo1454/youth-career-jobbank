// src/app/(routes)/career/consultant/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import AvatarPieWheel, { Avatar } from '@/components/AvatarPieWheel';

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
  return (
    <main className="px-5 py-10">
      <AvatarPieWheel
        avatars={AVATARS}
        onNext={(a) => r.push(`/career/consultant/video?name=${encodeURIComponent(a.name)}`)}
      />
    </main>
  );
}