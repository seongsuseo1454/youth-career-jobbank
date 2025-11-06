// 파일 경로: app/(routes)/career/call/CallClient.jsx
'use client'; 

import React, { useEffect, useState } from 'react';

// Next.js 모듈 임포트 오류를 피하기 위해, 브라우저의 window 객체를 사용하여 
// 쿼리 파라미터를 직접 읽는 시뮬레이션 훅을 사용합니다.
const useSimulatedSearchParams = () => {
    if (typeof window === 'undefined') {
        // 서버 측 렌더링 시 안전하게 처리
        return { get: () => null };
    }
    const params = new URLSearchParams(window.location.search);
    return { get: (key) => params.get(key) };
};

const CallClient = () => {
  const searchParams = useSimulatedSearchParams();
  const [callStatus, setCallStatus] = useState('상담 세션을 준비 중입니다...');
  
  // URL에서 세션 ID를 읽는다고 가정합니다.
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    if (sessionId) {
      setCallStatus(`세션 ID: ${sessionId}로 커리어 상담을 시작합니다.`);
      // 여기에 화상 통화 컴포넌트 초기화 로직 (예: WebRTC)이 들어갑니다.
    } else {
      setCallStatus('상담 세션 ID가 누락되었습니다. 링크를 다시 확인해주세요.');
    }
  }, [sessionId]);

  return (
    <div className="p-8 md:p-12 bg-white rounded-xl shadow-2xl max-w-4xl mx-auto my-10 border-t-4 border-indigo-500">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 border-b pb-2">커리어 화상 상담실</h1>
      
      <div className="bg-indigo-50 p-6 rounded-lg mb-6 flex items-center justify-between">
        <p className="text-xl font-medium text-indigo-800">{callStatus}</p>
        <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" title="연결 상태 표시"></div>
      </div>

      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        <span className="text-gray-500 text-lg">화상 통화 인터페이스 (상대방 연결 대기 중...)</span>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-150 shadow-md">
          통화 종료
        </button>
        <button className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-400 transition duration-150 shadow-md">
          채팅 열기
        </button>
      </div>
    </div>
  );
};

export default CallClient;