// 파일 경로: app/(routes)/career/call/CareerCallClient.jsx
'use client'; 

import React, { useState, useEffect } from 'react';

// Next.js 모듈 임포트 오류를 피하기 위해, 브라우저의 window 객체를 사용하여 
// 쿼리 파라미터를 직접 읽는 시뮬레이션 훅을 사용합니다.
const useSimulatedSearchParams = () => {
    if (typeof window === 'undefined') {
        return { get: () => null };
    }
    const params = new URLSearchParams(window.location.search);
    return { get: (key) => params.get(key) };
};

const CareerCallClient = () => {
  const searchParams = useSimulatedSearchParams();
  // URL에서 세션 ID를 읽어옵니다. (예: /career/call?sessionId=12345)
  const sessionId = searchParams.get('sessionId'); 
  const userRole = searchParams.get('role') || 'Student'; // 역할 기본값 설정
  
  const [callStatus, setCallStatus] = useState('pending'); // 'pending', 'connecting', 'connected', 'ended'

  useEffect(() => {
    if (sessionId) {
      setCallStatus('connecting');
      console.log(`Attempting to join session: ${sessionId} as ${userRole}...`);
      
      // 실제 화상 통화 연결 로직 (예: WebRTC 초기화) 시뮬레이션
      const timer = setTimeout(() => {
        setCallStatus('connected');
        console.log('Successfully connected to the call.');
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setCallStatus('error');
    }
  }, [sessionId, userRole]);

  const getStatusText = () => {
    switch (callStatus) {
      case 'pending':
        return "세션 정보 확인 중...";
      case 'connecting':
        return "상담 연결 중...";
      case 'connected':
        return `세션 ${sessionId}에 연결되었습니다.`;
      case 'ended':
        return "통화가 종료되었습니다.";
      case 'error':
        return "세션 ID가 없어 통화에 접속할 수 없습니다.";
      default:
        return "알 수 없는 상태";
    }
  };

  const getStyle = () => {
    switch (callStatus) {
      case 'connected':
        return 'bg-green-600 shadow-green-500/50';
      case 'connecting':
        return 'bg-blue-500 shadow-blue-500/50 animate-pulse';
      case 'error':
        return 'bg-red-500 shadow-red-500/50';
      default:
        return 'bg-gray-400 shadow-gray-400/50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className={`w-full max-w-4xl p-6 md:p-10 rounded-2xl shadow-2xl transition-all duration-500 ${getStyle()}`}>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {getStatusText()}
        </h1>
        <p className="text-lg mb-8 text-white text-opacity-80">
            {sessionId ? `세션 ID: ${sessionId} | 역할: ${userRole}` : "URL에 유효한 세션 정보가 필요합니다."}
        </p>

        {/* 화상 통화 영역 시뮬레이션 */}
        <div className="w-full h-96 bg-black rounded-xl border-4 border-white border-opacity-30 flex items-center justify-center">
            {callStatus === 'connected' ? (
                <span className="text-2xl text-green-300">화상 연결 활성화</span>
            ) : (
                <span className="text-xl text-gray-500">카메라 및 마이크를 준비 중...</span>
            )}
        </div>

        {/* 컨트롤 버튼 */}
        <div className="flex justify-center space-x-4 mt-8">
            <button 
                className="px-6 py-3 bg-red-600 hover:bg-red-700 font-semibold rounded-full transition shadow-md"
                disabled={callStatus !== 'connected'}
                onClick={() => setCallStatus('ended')}
            >
                통화 종료
            </button>
            <button 
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 font-semibold rounded-full transition shadow-md"
            >
                화면 공유
            </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCallClient;