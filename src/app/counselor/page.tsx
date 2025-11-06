// [제목] 상담(화상+자기소개) 페이지 래퍼 (동적 로딩)
'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';

// FIX: 동적으로 불러올 컴포넌트의 Prop 타입을 정의합니다.
// 이는 TypeScript에게 VideoIntroCall 컴포넌트가 counselorName prop을 받음을 알려줍니다.
interface VideoIntroCallProps {
  counselorName: string;
}

// FIX: dynamic 함수에 정의한 Prop 타입을 제네릭으로 전달합니다.
const VideoIntroCall = dynamic<VideoIntroCallProps>(
  () => import('@/components/VideoIntroCall'), 
  { ssr: false }
);

export default function Page() {
  // useSearchParams는 클라이언트 컴포넌트에서만 사용할 수 있습니다.
  const sp = useSearchParams();
  const name = sp.get('counselor') || '세종대왕';
  
  // VideoIntroCall 컴포넌트에 Prop이 올바르게 전달되어 빨간 줄이 사라집니다.
  return <VideoIntroCall counselorName={name} />;
}