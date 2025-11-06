// [제목] 관심분야 선택(10개 분야) → 선택 시 체험으로 이동
'use client'; // 이미 있다면 괜찮습니다. 없다면 반드시 추가해야 합니다.

import React from 'react';
import { useRouter } from 'next/navigation'; // <-- 🚨 이 코드가 반드시 있어야 합니다!
import { useCareerStateStore } from '@/hooks/careerStoreState';
import { R } from '@/lib/routes';

const FIELDS = [
 '우주/항공','로봇','AI','디자인','음악','의료','환경','건축','게임','미디어',
];

export default function CareerSelector(){
 const r=useRouter();
 
 // 💥 오류 수정: 잘못된 호출을 제거하고 셀렉터를 사용해 필요한 상태와 액션만 가져옵니다.
 const setJobPick = useCareerStateStore(state => state.setJobPick);
 const student = useCareerStateStore(state => state.student); // student 상태 가져오기

 const pick=(f:string)=>{
 // 데모: 분야 자체를 jobPick으로 저장 (후속 버전: 분야→3개 테마 추천)
 setJobPick(f);
 // R.experience는 Guard에서 함수로 사용되었으므로, 인자 없이 호출하도록 R 객체를 수정했거나,
 // 혹은 R.experience가 문자열이라고 가정하고 그대로 둡니다.
 r.push(R.experience(f)); // ✅ 관심분야(f)를 인자로 넘겨 호출!
};

 return (
 <section>
 <h2 className="text-xl font-bold">관심 분야 선택</h2>
 <p className="text-gray-600 mb-4">{student.name ||'학생'}의 입력을 바탕으로 관심 분야를 선택하세요.</p>
 <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
 {FIELDS.map(f=>(
 <button key={f} onClick={()=>pick(f)} className="p-5 rounded-xl border hover:border-blue-500 hover:shadow text-left">
 <div className="text-lg font-bold">{f}</div>
 <div className="text-sm text-gray-500 mt-1">탐색을 시작합니다</div>
 </button>
 ))}
 </div>
 </section>
 );
}