// Next.js에서 useSearchParams와 같은 클라이언트 전용 훅을 사용하려면 
// 파일 최상단에 이 'use client' 지시문을 명시해야 합니다.
'use client'; 

// Next.js 환경 외부에서 컴파일 오류를 피하기 위해, 
// next/navigation 대신 브라우저의 window 객체를 직접 사용하는 훅을 정의합니다.
const useSimulatedSearchParams = () => {
  if (typeof window === 'undefined') {
    // 서버 측(SSR/SSG) 렌더링 시에는 빈 Map 객체를 반환합니다.
    // 실제 useSearchParams()는 이 시점에 Suspense로 감싸져야 합니다.
    return new Map();
  }
  
  // 브라우저 환경에서 window.location.search를 사용하여 파라미터를 파싱합니다.
  const params = new URLSearchParams(window.location.search);
  
  // Next.js의 useSearchParams의 .get() 메서드를 시뮬레이션하기 위해 Map 객체를 반환합니다.
  return {
    get: (key) => params.get(key)
  };
};

// SearchParamComponent를 기본 내보내기(Default Export)로 변경합니다.
const SearchParamComponent = () => {
  // 컴파일 오류를 피하기 위해 'next/navigation' 대신 로컬 시뮬레이션 훅 사용
  const searchParams = useSimulatedSearchParams(); 
  
  // 예시로 'id'라는 쿼리 파라미터를 가져옵니다.
  const id = searchParams.get('id') || 'ID 파라미터 없음';
  
  return (
    <div className="mt-4 p-6 bg-white rounded-xl shadow-lg border border-indigo-200">
      <h2 className="text-xl font-semibold text-indigo-800">클라이언트 측 정보</h2>
      <p className="text-gray-700 mt-2">
        URL에서 읽은 ID: <span className="font-mono bg-indigo-100 px-2 py-1 rounded-md text-indigo-600">{id}</span>
      </p>
      <p className="text-sm mt-4 text-gray-500">
        이 섹션은 브라우저에서 로드되어 URL 정보를 안전하게 처리합니다.
      </p>
    </div>
  );
};

export default SearchParamComponent;