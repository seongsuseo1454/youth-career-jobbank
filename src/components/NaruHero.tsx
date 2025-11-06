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
    // 최종 확정 진단: 인자가 없는 경로는 문자열 상수, 인자가 있는 경로는 함수 호출 + 타입 강제 변환
    
    // Check if 'interest' is required and not done
    if (require.includes('interest') && !done.interest) {
        // R.interests는 문자열 상수입니다.
        router.replace(R.interests);
    // Check if 'theme' is required and not done
    } else if (require.includes('theme') && !done.theme) {
        // R.themes도 문자열 상수입니다.
        router.replace(R.themes); 
    // Check if 'experience' is required and not done
    } else if (require.includes('experience') && !done.experience) {
        // R.experience는 함수 호출이 필요하며, 타입 충돌을 피하기 위해 string으로 강제 변환합니다.
        router.replace(R.experience('sample') as string); 
    // Check if 'analysis' is required and not done
    } else if (require.includes('analysis') && !done.analysis) {
        // R.analysis도 문자열 상수입니다.
        router.replace(R.analysis);
    }
  }, [done, router, require]);
  
  // Guard does not render anything.
  return null;
}
