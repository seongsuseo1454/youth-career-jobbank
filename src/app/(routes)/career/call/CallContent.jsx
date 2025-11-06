// /career/call/CallContents.jsx
'use client'; // 이 컴포넌트는 클라이언트 전용입니다.

import React from 'react';
// import { useSearchParams } from 'next/navigation'; // 실제 Next.js에서 사용

const CallContents = () => {
    // 1. useSearchParams()는 반드시 여기에, 즉 'use client' 파일 내에서 사용해야 합니다.
    // const searchParams = useSearchParams();
    // const callId = searchParams.get('id');

    // (시뮬레이션 데이터)
    const callId = "C00123";

    return (
        <div className="p-4 bg-yellow-50 rounded-lg text-yellow-800 border-l-4 border-yellow-400">
            <h2 className="text-lg font-semibold">클라이언트 전용 컨텐츠 (Call Session)</h2>
            <p>현재 URL 파라미터를 기반으로 로드된 Call ID: <strong>{callId}</strong></p>
        </div>
    );
};

export default CallContents;