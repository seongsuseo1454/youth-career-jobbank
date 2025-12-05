// src/app/(routes)/career/interests/CareerInterestsClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { speak, cancel } from '@/lib/tts';

const CareerInterestsClient = () => {
  const searchParams = useSearchParams();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // URL에서 주요 흥미 코드를 읽어옵니다. (예: /interests?codes=R,I,A)
  const interestCodes = searchParams.get('codes') || 'N/A';

  // URL에서 점수를 읽어옵니다. (예: /interests?scores=10,8,5)
  const scoreString = searchParams.get('scores');

  // 페이지 로드 시 자동으로 안내 음성 재생 시도
  useEffect(() => {
    const message = "흥미 검사 결과가 나왔습니다. 결과를 확인하고 추천 직업을 알아보세요.";

    // 1. 자동 재생 시도 (0.5초 후)
    const timer = setTimeout(() => {
      setIsSpeaking(true);
      speak(message, () => setIsSpeaking(false));
    }, 500);

    // 2. 자동 재생 실패 대비: 화면 클릭 시 재생 (한 번만)
    const handleFirstClick = () => {
      if (!isSpeaking) {
        setIsSpeaking(true);
        speak(message, () => setIsSpeaking(false));
      }
      document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);

    return () => {
      clearTimeout(timer);
      cancel();
      document.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      cancel();
      setIsSpeaking(false);
    } else {
      const message = "흥미 검사 결과가 나왔습니다. 결과를 확인하고 추천 직업을 알아보세요.";
      setIsSpeaking(true);
      speak(message, () => setIsSpeaking(false));
    }
  };

  const scores = useMemo(() => {
    if (scoreString) {
      const codeArray = interestCodes.split(',');
      const scoreArray = scoreString.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

      const results: { [key: string]: number } = {};
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

  const codeMap: { [key: string]: { name: string; color: string; detail: string } } = {
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-500 pb-2">
            나의 흥미 검사 결과 분석
          </h1>
          <button
            onClick={handleToggleSpeak}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isSpeaking
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
          >
            {isSpeaking ? '🔊 음성 중지' : '🔈 안내 듣기'}
          </button>
        </div>
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
                const widthPercentage = Math.min(100, (score / 15) * 100);

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
              <button
                onClick={() => window.location.href = '/career/consultant'}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
              >
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