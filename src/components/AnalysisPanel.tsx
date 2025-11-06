// [제목] 분석(틱틱 + 완료 멜로디) → 결과 보기
'use client';
import React, { useEffect, useRef, useState } from 'react';
// ✅ 올바른 Store Hook 이름으로 Import
import { useCareerStateStore } from '@/hooks/careerStoreState'; 

export default function AnalysisPanel({ onNext }:{ onNext: ()=>void }){
    // 💥 오류 수정: 잘못된 호출 방식 대신 Hook과 셀렉터를 사용합니다.
    const student = useCareerStateStore(state => state.student);
    const jobPick = useCareerStateStore(state => state.jobPick);
    
    const [done, setDone] = useState(false);
    const ctx = useRef<AudioContext|null>(null);
    
    // beep 함수는 그대로 유지
    const beep=(f:number,ms:number,v=0.08)=>{ 
        try{ 
            ctx.current ??= new (window.AudioContext||(window as any).webkitAudioContext)(); 
            const c=ctx.current,o=c.createOscillator(),g=c.createGain(); 
            o.type='sine'; 
            o.frequency.value=f; 
            o.connect(g); 
            g.connect(c.destination); 
            g.gain.setValueAtTime(v,c.currentTime); 
            g.gain.exponentialRampToValueAtTime(0.01,c.currentTime+ms/1000); 
            o.start(); 
            o.stop(c.currentTime+ms/1000);
        }catch{} 
    };

    // 분석 진행 및 완료 멜로디 로직은 그대로 유지
    useEffect(()=>{
        let i=0; 
        const tid=setInterval(()=>{ 
            beep(1200,60,0.06); 
            if(++i>18){ 
                clearInterval(tid); 
                setTimeout(()=>beep(523,120,0.12),0); 
                setTimeout(()=>beep(659,120,0.12),140); 
                setTimeout(()=>beep(784,220,0.14),280); 
                setDone(true);
            } 
        },100);
        return ()=>clearInterval(tid);
    },[]);

    return (
        <section className="rounded-2xl border p-4 shadow-sm">
            <h2 className="text-xl font-bold">분석 중…</h2>
            <p className="text-gray-600 mb-4">대상: {student.name || '학생'} · 직업/분야: <b>{jobPick || '-'}</b></p>
            <div className="animate-pulse text-gray-700">입력·체험 로그 기반으로 분석하고 있습니다…</div>
            <div className="mt-4">{done
                ? <button onClick={onNext} className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700">분석 완료 → 결과 보기</button>
                : <span className="text-sm text-gray-500">잠시만 기다려 주세요</span>}</div>
        </section>
    );
}
