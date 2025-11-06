// src/app/(routes)/career/selection/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useCareerStateStore } from '@/hooks/careerStoreState';
import { R } from '@/lib/routes';
import React from 'react'; // React를 명시적으로 import (JSX 사용 시 권장)

const CATALOG: Record<string, string[]> = {
  '우주': ['항공우주 엔지니어', '위성운영 전문가', '로켓설계 테크니션'],
  '항공': ['조종사 시뮬레이터', '항공정비 체험', '공항운영 매니저'],
  '로봇': ['로봇제작 메이커', '로봇제어 프로그래머', '물류로봇 운영자'],
  'AI': ['AI 모델 디자이너', '데이터 라벨러', 'AI 서비스 기획자'],
  '디자인': ['UX/UI 디자이너', '브랜드 디자이너', '일러스트레이터'],
  '음악': ['작곡가 체험', '사운드 엔지니어', '뮤직 프로듀서'],
};

const FALLBACK = ['환경 연구원', '도시 계획가', '게임 기획자', '영상 편집자', '건축 디자이너'];

// 간단한 랜덤 선택 함수 (임시 함수는 컴포넌트 밖에 두는 것이 좋습니다.)
const sample = (arr: string[], count: number) => {
    return arr.slice(0, count);
};

export default function Page() {
  const r = useRouter();
  
  // 💡 최적화: 필요한 상태와 액션만 선택적으로 가져옵니다.
  const interest = useCareerStateStore(state => state.student.interest);
  const setJobPick = useCareerStateStore(state => state.setJobPick); 

  const key = Object.keys(CATALOG).find(k => interest.includes(k));
  const list = key ? CATALOG[key] : sample(FALLBACK, 3);

  // ✅ pick 함수를 깔끔하게 정의
  // src/app/(routes)/career/selection/page.tsx 내부

 const pick = (job: string) => {
   setJobPick(job);
   
    // 💥 오류 수정: R.experience를 호출하고 job을 인자로 전달합니다.
   r.push(R.experience(job)); 
   // job(선택된 직업)을 URL 인자 (param)로 넘겨줍니다.
 };
  
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      {/* 💥 중복된 코드가 제거되고 깔끔하게 JSX 시작 */}
        <h1 className="text-3xl font-bold mb-4">선택한 관심 분야: {interest}</h1> 
        <p>선택할 직업 후보 목록:</p>
        <div className="flex flex-wrap gap-4">
            {list.map(job => (
                <button 
                    key={job} 
                    onClick={() => pick(job)}
                    className="p-3 border rounded-lg hover:bg-gray-100 transition duration-150"
                >
                    {job}
                </button>
            ))}
        </div>
        {/* 임시 콘텐츠: 여기에 실제 UI가 들어갈 것입니다. */}
    </main>
  );
}