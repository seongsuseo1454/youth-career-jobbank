'use client';

// WARNING: THIS CODE IS TEMPORARILY MOCKED TO BYPASS COMPILER ERROR.
// In your Next.js project, you should use: 
// import { useSearchParams } from "next/navigation";

// @ts-ignore: Next.js specific hook; mock definition for compiler bypass.
const useSearchParams = () => {
  // Simple mock implementation to prevent compiler error.
  // In a real environment, this would return URLSearchParams methods.
  return {
    get: (key) => {
      // Fallback implementation logic (e.g., for direct browser usage)
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
      }
      return null;
    }
  };
};

/**
 * AnalysisContent (분석 결과 내용)
 * useSearchParams를 사용하여 URL 쿼리 파라미터에 접근합니다.
 * 'use client'가 선언된 클라이언트 컴포넌트입니다.
 */
export default function AnalysisContent() {
  // useSearchParams는 클라이언트 훅이므로 반드시 클라이언트 컴포넌트 내에서 사용되어야 합니다.
  const sp = useSearchParams(); 
  
  // NOTE: When running outside of Next.js, this will rely on the window.location.search mock.
  // This is purely for compiler bypass and should revert to Next.js's native hook for production.
  const counselor = sp.get("counselor") ?? "상담사";
  const student = sp.get("student") ?? "학생";
  const job = sp.get("job") ?? "직업";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-2">분석 결과</h1>
      <div className="rounded-xl border p-5 bg-white shadow">
        <p className="mb-2"><b>상담사</b> : {counselor}</p>
        <p className="mb-2"><b>학생</b> : {student}</p>
        <p className="mb-4"><b>선택 직업</b> : {job}</p>
        <p className="text-gray-700">
          선택하신 직업에 맞춰 체험 활동과 학습 경로를 안내해 드립니다. 아주 잘하셨어요!
        </p>
      </div>
    </div>
  );
}
