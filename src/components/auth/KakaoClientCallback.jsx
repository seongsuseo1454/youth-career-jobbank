// 파일 경로: components/auth/KakaoClientCallback.jsx
// 'use client' 지시문이 반드시 필요합니다.
'use client'; 

import React, { useEffect, useState } from 'react';

// Next.js 환경이 아닌 컴파일 환경에서 'next/navigation' 모듈을 해결할 수 없기 때문에,
// window.location.search를 사용하여 쿼리 파라미터를 시뮬레이션하는 훅으로 대체합니다.
const useSimulatedSearchParams = () => {
    if (typeof window === 'undefined') {
        // 서버 측 렌더링을 시뮬레이션할 때 안전하게 빈 객체를 반환합니다.
        return { get: () => null };
    }
    // 브라우저 환경에서 실제 URL 파라미터를 파싱합니다.
    const params = new URLSearchParams(window.location.search);
    return { get: (key) => params.get(key) };
};

const KakaoClientCallback = () => {
  // 실제 useSearchParams 대신 시뮬레이션된 훅을 사용하여 모듈 해결 오류를 방지합니다.
  const searchParams = useSimulatedSearchParams(); 
  const [message, setMessage] = useState('인증 정보를 처리하는 중...');

  useEffect(() => {
    // 쿼리 파라미터에서 'code' 값을 가져옵니다.
    const code = searchParams.get('code');

    if (code) {
      // TODO: code를 사용하여 실제 카카오 토큰 교환 및 로그인 처리 로직을 구현합니다.
      setMessage(`Kakao 인증 코드 발견: ${code}. 서버로 전송하여 토큰을 발급받아야 합니다.`);
      
      // 예시로 3초 후 메인 페이지로 리디렉션
      // setTimeout(() => {
      //   window.location.href = '/'; 
      // }, 3000);
      
    } else {
      setMessage('URL에서 Kakao 인증 코드를 찾을 수 없습니다. 인증 과정에 오류가 발생했을 수 있습니다.');
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-indigo-50 rounded-xl shadow-2xl max-w-md mx-auto my-12">
      <h1 className="text-2xl font-bold text-indigo-800 mb-4">Kakao 로그인 콜백 처리</h1>
      <p className="text-center text-gray-700">{message}</p>
      {message.includes('코드 발견') && (
          <p className="mt-4 text-sm text-gray-500">
              처리 완료 후 자동으로 이동합니다.
          </p>
      )}
    </div>
  );
};

export default KakaoClientCallback;