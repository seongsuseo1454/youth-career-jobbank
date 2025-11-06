'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ✅ 오류 수정: 'careerStoreState' 대신 올바른 Hook 이름으로 Import
import { useCareerStateStore } from '@/hooks/careerStoreState'; 
// 💥 수정: R만 사용하므로 R만 가져옵니다.
import { R } from '@/lib/routes'; 

/**
 * 진행 단계에 대한 접근 권한을 확인하고, 
 * 완료되지 않은 단계가 있다면 해당 경로로 리디렉션하는 가드 컴포넌트입니다.
 * * @param require - 현재 페이지 접근을 위해 선행되어야 하는 완료 단계 목록
 * @returns null (UI를 렌더링하지 않음)
 */
export default function Guard({ require }: { require:Array<'interest'|'theme'|'experience'|'analysis'> }) {
  const router = useRouter();
  
  // 💥 오류 수정: useCareerStateStore Hook을 사용하여 'done' 상태 가져오기
  // done 객체는 { interest: boolean, theme: boolean, ... } 구조를 가정합니다.
  const done = useCareerStateStore(s => s.done); 
  
  useEffect(() => {
    // 관심분야 선택 단계가 완료되지 않았다면 이동
    if (require.includes('interest') && !done.interest) {
        router.replace(R.interests);
    // 테마 선택 단계가 완료되지 않았다면 이동
    } else if (require.includes('theme') && !done.theme) {
        // R.themes가 상수 경로라고 가정합니다.
        router.replace(R.themes); 
    // 테마 체험 단계가 완료되지 않았다면 이동
    } else if (require.includes('experience') && !done.experience) {
        // R.experience가 인자를 받는 함수(e.g., /career/experience/[id])라고 가정하고 'sample' 인자를 사용
        router.replace(R.experience('sample')); 
    // AI 분석 단계가 완료되지 않았다면 이동
    } else if (require.includes('analysis') && !done.analysis) {
        router.replace(R.analysis);
    }
  }, [done, router, require]);
  
  // Guard는 화면에 아무것도 표시하지 않습니다.
  return null;
}
