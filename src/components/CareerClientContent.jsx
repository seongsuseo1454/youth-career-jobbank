// 파일 경로: components/CareerClientContent.jsx
// 이 지시문은 이 파일과 내부의 훅이 클라이언트 환경에서 실행됨을 명시합니다.
'use client'; 

import React from 'react';
// Next.js 프로젝트에서는 실제 useSearchParams 훅을 임포트해서 사용해야 합니다.
// 개발 환경에 따라 아래 import를 실제 next/navigation 경로로 수정해야 할 수 있습니다.
// import { useSearchParams } from 'next/navigation'; 
// 임시 시뮬레이션 훅을 사용합니다.
const useSimulatedSearchParams = () => {
    if (typeof window === 'undefined') return { get: () => null };
    const params = new URLSearchParams(window.location.search);
    return { get: (key) => params.get(key) };
};


// 이 컴포넌트는 useSearchParams와 같은 클라이언트 전용 기능에 의존합니다.
const CareerClientContent = () => {
  // 실제 Next.js 환경이라면 useSearchParams()를 사용하세요.
  const searchParams = useSimulatedSearchParams();
  const id = searchParams.get('id') || 'ID 파라미터가 URL에 없습니다.';
  const type = searchParams.get('type') || '타입 파라미터가 URL에 없습니다.';
  
  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl max-w-lg mx-auto mt-10 border border-teal-300">
      <h1 className="text-2xl font-bold text-teal-700 mb-4">커리어 콜 페이지 (클라이언트 로직)</h1>
      <p className="text-gray-700">
        <span className="font-semibold text-gray-500">ID:</span> 
        <span className="font-mono bg-yellow-100 p-1 rounded ml-2">{id}</span>
      </p>
      <p className="text-gray-700 mt-2">
        <span className="font-semibold text-gray-500">Type:</span> 
        <span className="font-mono bg-yellow-100 p-1 rounded ml-2">{type}</span>
      </p>
      <p className="text-sm text-gray-400 mt-4">
        이 콘텐츠는 브라우저가 완전히 로드된 후 (클라이언트 측에서) 표시됩니다.
      </p>
    </div>
  );
};

export default CareerClientContent;