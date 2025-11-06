// src/app/page.tsx
'use client';

import IdleMain from '@/components/IdleMain';

export default function HomePage() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <IdleMain />
    </div>
  );
}