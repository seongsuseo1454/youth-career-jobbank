// [제목] 간단 체험 시뮬레이터(진행바) → 완료시 분석으로
'use client';
import React, { useEffect, useState } from 'react';
// ✅ 올바른 Store Hook 이름으로 Import합니다.
import { useCareerStateStore } from '@/hooks/careerStoreState'; 

export default function ExperienceSimulator({ onNext }:{ onNext: ()=>void }){
    // 💥 오류 수정: 잘못된 호출 방식(careerStoreState()) 대신
    // 올바른 Hook 이름과 셀렉터 함수를 사용하여 상태를 가져옵니다.
    const student = useCareerStateStore(state => state.student);
    const jobPick = useCareerStateStore(state => state.jobPick);

    const [p, setP] = useState(0);
    
    // 진행바 로직
    useEffect(() => { 
        const t = setInterval(() => setP(x => Math.min(100, x + 5)), 150); 
        // 100%에 도달하면 인터벌을 정리하고 다음 단계로 이동합니다.
        if (p === 100) {
            clearInterval(t);
        }
        return () => clearInterval(t); 
    }, [p]); // p가 변경될 때마다 useEffect를 다시 실행하여 종료 조건을 확인합니다.
    
    // onNext가 호출되면 Store의 done.experience 플래그를 true로 설정하는 로직도 추가되어야 하지만, 
    // 여기서는 onNext prop을 그대로 사용합니다.
    
    return (
        <section className="rounded-2xl border p-4 shadow-sm">
            <h2 className="text-xl font-bold">체험 진행</h2>
            <p className="text-gray-600 mb-4">{student.name || '학생'} · 선택: <b>{jobPick || '-'}</b></p>
            
            {/* 진행바 표시 */}
            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                <div 
                    className="bg-blue-600 h-3 transition-all" 
                    style={{ width: `${p}%` }}
                />
            </div>
            
            <p className="text-sm text-gray-500 mt-3">안내에 따라 상상/설계/선택을 진행합니다…</p>
            
            {/* onNext 버튼은 p가 100일 때 활성화되도록 로직을 추가할 수 있습니다. */}
            <button 
                onClick={onNext} 
                className="mt-4 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
            >
                체험 완료 → 분석
            </button>
        </section>
    );
}
