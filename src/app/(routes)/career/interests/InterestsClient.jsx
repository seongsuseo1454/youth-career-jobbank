// 파일 경로: app/(routes)/career/interests/InterestsClient.jsx
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

const InterestsClient = () => {
  const searchParams = useSimulatedSearchParams();
  const [testResultId, setTestResultId] = useState(null);

  // URL에서 검사 결과 ID를 읽는다고 가정합니다.
  const resultId = searchParams.get('testId');

  useEffect(() => {
    if (resultId) {
      setTestResultId(resultId);
    }
  }, [resultId]);

  return (
    <div className="p-8 md:p-12 bg-white rounded-xl shadow-2xl max-w-4xl mx-auto my-10 border-t-4 border-green-500">
      <h1 className="text-4xl font-bold text-green-700 mb-6 border-b pb-2">흥미/적성 검사 결과</h1>
      
      {testResultId ? (
        <div className="bg-green-50 p-6 rounded-lg">
          <p className="text-2xl font-semibold text-green-800 mb-3">
            검사 결과 ID: <span className="text-green-600">{testResultId}</span>
          </p>
          <p className="text-gray-700">
            해당 ID를 기반으로 흥미/적성 검사 보고서와 맞춤형 진로 추천 결과를 불러옵니다.
          </p>
          {/* 여기에 상세 결과 차트와 추천 콘텐츠 UI가 들어갑니다. */}
          <div className="mt-4 w-full h-48 bg-gray-100 flex items-center justify-center rounded border border-green-200">
            <span className="text-gray-500">결과 분석 보고서 로드 영역</span>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-lg text-center">
          <p className="text-xl font-medium text-yellow-800">
            URL에서 유효한 검사 결과를 찾을 수 없습니다.
          </p>
          <button className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-150 shadow-md">
            다시 검사하기
          </button>
        </div>
      )}
    </div>
  );
};

export default InterestsClient;