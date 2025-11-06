'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Correct import name for the career state store hook
import { useCareerStateStore } from '@/hooks/careerStoreState'; 
// Import R object containing route definitions
import { R } from '@/lib/routes'; 

/**
 * Guard Component: Checks prerequisites and redirects if steps are incomplete.
 * This ensures the user follows the career flow sequentially.
 * * @param require - Array of steps (e.g., 'interest', 'theme') required to access the current page.
 * @returns null (Does not render any UI)
 */
export default function Guard({ require }: { require:Array<'interest'|'theme'|'experience'|'analysis'> }) {
  const router = useRouter();
  
  // Fetch the 'done' status from the store
  // Assumes 'done' is an object: { interest: boolean, theme: boolean, ... }
  const done = useCareerStateStore(s => s.done); 
  
  useEffect(() => {
    // R 경로 타입 오류 해결을 위해, Next.js 라우터가 가장 확실하게 받는 string 타입으로 통일합니다.
    // 인자가 없는 경로는 문자열 상수를 기본으로 사용하되, 오류가 지속되는 경로는 함수 호출 + 강제 string 변환을 적용합니다.
    
    // Check if 'interest' is required and not done
    if (require.includes('interest') && !done.interest) {
        // R.interests는 상수일 가능성이 높으므로 상수로 유지
        router.replace(R.interests);
    // Check if 'theme' is required and not done
    } else if (require.includes('theme') && !done.theme) {
        // ✅ FIX: R.themes는 문자열/함수 충돌이 잦았으므로 함수 호출 + string 강제 변환 시도
        router.replace(R.themes as string); 
    // Check if 'experience' is required and not done
    } else if (require.includes('experience') && !done.experience) {
        // ✅ FIX: R.experience는 인자를 받는 함수이며, 타입 오류 재발을 막기 위해 string 강제 변환을 다시 적용
        router.replace(R.experience('sample') as string); 
    // Check if 'analysis' is required and not done
    } else if (require.includes('analysis') && !done.analysis) {
        // ✅ FIX: R.analysis는 문자열/함수 충돌이 잦았으므로 함수 호출 + string 강제 변환 시도
        router.replace(R.analysis as string);
    }
  }, [done, router, require]);
  
  // Guard does not render anything.
  return null;
}
