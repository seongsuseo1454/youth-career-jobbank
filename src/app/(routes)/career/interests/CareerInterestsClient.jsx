// 파일 경로: app/(routes)/career/interests/CareerInterestsClient.js
'use client'; 

import React, { useState, useEffect, useMemo } from 'react';

// Next.js useSearchParams 대신 브라우저 URL을 읽는 시뮬레이션 훅 사용
const useSimulatedSearchParams = () => {
    if (typeof window === 'undefined') {
        return { get: () => null };
    }
    const params = new URLSearchParams(window.location.search);
    return { get: (key) => params.get(key) };
};

const CareerInterestsClient = () => {
  const searchParams = useSimulatedSearchParams();
  
  // URL에서 주요 흥미 코드를 읽어옵니다. (예: /interests?codes=R,I,A)
  const interestCodes = searchParams.get('codes') || 'N/A';
  
  // URL에서 점수를 읽어옵니다. (예: /interests?scores=10,8,5)
  const scoreString = searchParams.get('scores');
  
  const scores = useMemo(() => {
    if (scoreString) {
      const codeArray = interestCodes.split(',');
      const scoreArray = scoreString.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
      
      const results = {};
      codeArray.forEach((code, index) => {
        if (scoreArray[index] !== undefined) {
          results[code.trim()] = scoreArray[index];
        }
      });
      return results;
    }
    return {};
  }, [interestCodes, scoreString]);

  const primaryCode = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];

  const codeMap = {
    R: { name: "현실형 (Realistic)", color: "bg-green-500", detail: "손과 도구를 사용하는 활동을 선호하며 실질적인 목표를 추구합니다." },
    I: { name: "탐구형 (Investigative)", color: "bg-blue-500", detail: "탐구하고 분석하는 활동을 즐기며 학문적 성취를 중요시합니다." },
    A: { name: "예술형 (Artistic)", color: "bg-purple-500", detail: "창의적인 활동과 표현을 선호하며 자유로운 사고를 추구합니다." },
    S: { name: "사회형 (Social)", color: "bg-yellow-500", detail: "다른 사람들을 돕거나 가르치는 활동을 선호하며 봉사에 가치를 둡니다." },
    E: { name: "진취형 (Enterprising)", color: "bg-red-500", detail: "목표를 설정하고 사람들을 이끄는 활동을 선호하며 리더십이 강합니다." },
    C: { name: "관습형 (Conventional)", color: "bg-indigo-500", detail: "자료를 정리하고 체계적으로 처리하는 활동을 선호하며 정확성을 중시합니다." },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 border-b-4 border-blue-500 pb-2">
            나의 흥미 검사 결과 분석
        </h1>
        <p className="text-gray-600 mb-8">
            URL 쿼리 파라미터를 기반으로 개인화된 결과를 보여줍니다.
        </p>

        {Object.keys(scores).length > 0 ? (
          <>
            <div className={`p-6 rounded-lg mb-8 ${codeMap[primaryCode]?.color || 'bg-gray-200'} text-white shadow-lg`}>
                <h2 className="text-2xl font-bold mb-1">
                    주요 흥미 유형: {primaryCode ? codeMap[primaryCode]?.name : '알 수 없음'}
                </h2>
                <p className="text-sm opacity-90">
                    {primaryCode ? codeMap[primaryCode]?.detail : '결과 코드를 해석하는 데 문제가 발생했습니다.'}
                </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">흥미 코드별 점수</h3>
            <div className="space-y-4">
              {Object.entries(scores).map(([code, score]) => {
                const map = codeMap[code] || { name: '알 수 없음', color: 'bg-gray-400' };
                const widthPercentage = Math.min(100, (score / 15) * 100); // 최대 점수를 15로 가정

                return (
                  <div key={code} className="flex items-center space-x-4">
                    <span className="w-24 font-medium text-gray-700">{map.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-8">
                      <div 
                        className={`${map.color} h-full rounded-full flex items-center justify-end p-2 transition-all duration-700`} 
                        style={{ width: `${widthPercentage}%` }}
                      >
                        <span className="text-sm font-bold pr-2">{score}점</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-10 text-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                    이 흥미에 맞는 추천 직업 보기
                </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-medium mb-4">
                URL에서 흥미 검사 결과를 찾을 수 없습니다.
            </p>
            <p>테스트를 다시 시작하거나, URL 쿼리 파라미터가 올바르게 전달되었는지 확인하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerInterestsClient;