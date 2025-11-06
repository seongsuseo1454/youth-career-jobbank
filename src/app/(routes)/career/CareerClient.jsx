// 파일 경로: app/(routes)/career/themes/ThemesClient.jsx
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

const DUMMY_THEMES = [
    { id: 'tech', name: '미래 기술 혁신가', color: 'bg-indigo-500' },
    { id: 'creator', name: '콘텐츠 창조자', color: 'bg-pink-500' },
    { id: 'sustainability', name: '지속 가능한 사회 활동가', color: 'bg-teal-500' },
];

const ThemesClient = () => {
  const searchParams = useSimulatedSearchParams();
  // URL에서 선택된 테마 ID를 읽어온다고 가정합니다.
  const selectedThemeId = searchParams.get('themeId'); 
  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    // 쿼리 파라미터가 변경되면 해당 테마 정보를 업데이트합니다.
    const theme = DUMMY_THEMES.find(t => t.id === selectedThemeId);
    setCurrentTheme(theme || null);
  }, [selectedThemeId]);

  return (
    <div className="p-6 md:p-10 bg-white rounded-xl shadow-2xl max-w-5xl mx-auto my-10 border-t-8 border-yellow-500">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">진로 테마 탐색</h1>
      <p className="text-gray-600 mb-8">당신에게 맞는 미래 직업 테마를 확인하고 세부 내용을 탐색하세요.</p>

      {/* 선택된 테마 영역 */}
      <div className={`p-8 rounded-lg shadow-xl transition-all duration-300 ${currentTheme ? currentTheme.color : 'bg-gray-100'}`}>
        {currentTheme ? (
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">
              선택된 테마: {currentTheme.name}
            </h2>
            <p className="text-white text-opacity-80">
              이 테마는 {currentTheme.name}와 관련된 직업군, 필수 역량, 추천 교육 과정을 포함하고 있습니다.
            </p>
            <button className="mt-4 px-6 py-2 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
                테마 상세 로드맵 보기
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">테마를 선택하거나 URL에서 결과를 확인하세요.</h2>
            <p className="text-gray-500">
              URL 쿼리 파라미터(예: `?themeId=tech`)가 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* 전체 테마 목록 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {DUMMY_THEMES.map((theme) => (
          <div key={theme.id} className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800">{theme.name}</h3>
            <p className="text-sm text-gray-500 mt-1">#미래직업 #직업군 #커리어</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesClient;