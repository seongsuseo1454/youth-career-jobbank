'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';

/* ========================================================
0) 전역(인쇄/레이아웃/애니메이션)
======================================================== */
const GlobalStyle = () => (
  <style jsx global>{`
    @page { size: A4 portrait; margin: 12mm; }
    @media print {
      .no-print { display: none !important; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { box-shadow: none !important; }
      .page-break { break-after: page; page-break-after: always; }
      html, body { background: white !important; }
    }
    .page { width: 210mm; margin: 0 auto; }
    @keyframes fadeIn { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
    .fade-in { animation: fadeIn .35s ease-out; }
  `}</style>
);

/* ========================================================
1) 공통 함수
======================================================== */
const goBack = () => { if (typeof window !== 'undefined') history.back(); };
const goHome = () => { if (typeof window !== 'undefined') location.href = '/'; };

/* ========================================================
2) 채점/유틸 (정규화 가중치 + 보정)
======================================================== */
type CatKey = 'ethics' | 'eda' | 'model' | 'perf' | 'sim';
function gradeLetter(p:number):'S'|'A'|'B'|'C'|'D'{if(p>=90)return'S';if(p>=80)return'A';if(p>=70)return'B';if(p>=60)return'C';return'D';}
function hashString(s:string){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function seededWeights(n:number,seed:string){const base=hashString(seed);const w:number[]=[];for(let i=0;i<n;i++){let s=base+i*1013904223;s^=s<<13;s^=s>>>17;s^=s<<5;const u=((s>>>0)%1000)/1000;w.push(0.6+u);}return w;}
function spreadPercent(n:number,pct:number,seed:string){const ws=seededWeights(n,seed);const sum=ws.reduce((a,b)=>a+b,0);const raw=ws.map(w=>pct*w/sum);const floor=raw.map(v=>Math.floor(v));let remain=Math.round(pct)-floor.reduce((a,b)=>a+b,0);const order=raw.map((v,i)=>({i,frac:v-Math.floor(v)})).sort((a,b)=>b.frac-a.frac
);for(let k=0;k<remain;k++)floor[order[k%n].i]+=1;return floor;}
function computeFromQuery(sp:URLSearchParams){const name=sp.get('name')??'응시자';const jobTitleFromQuery=sp.get('jobTitle')||'';const jobKeyRaw=(sp.get('job')||jobTitleFromQuery||'data-scientist').toLowerCase().replace(/\s+/g,'-');const ansRaw=sp.get('ans');const scoreRaw=sp.get('score');const totalRaw=sp.get('total');let correct=0,total=0;if(ansRaw&&ansRaw.trim()){const arr=(/[|,/\s]/.test(ansRaw)?ansRaw.split(/[\s,\/|]+/):ansRaw.split('')).map(x=>x.trim().toUpperCase()).filter(Boolean);total=arr.length||1;correct=arr.filter(x=>x==='A').length;}else{const s=Number(scoreRaw),t=Number(totalRaw);if(Number.isFinite(s)&&Number.isFinite(t)&&t>0){correct=Math.max(0,s);total=Math.max(1,t);}else{correct=0;total=1;}}const percent=Math.max(0,Math.min(100,Math.round((correct/Math.max(1,total))*100)));const grade=gradeLetter(percent);const keys:CatKey[]=['ethics','eda','model','perf','sim'];const split=spreadPercent(5,percent,`${name}|${jobKeyRaw}|${percent}`);const categories=keys.map((k,i)=>({key:k,name:k==='ethics'?'데이터 윤리':k==='eda'?'탐색적 분석(EDA)':k==='model'?'모델링':k==='perf'?'성능 평가':'실무 응용',pct:split[i]}));return{name,jobKeyRaw,jobTitleFromQuery,correct,total,percent,grade,categories};}

/* ========================================================
3) 테마 정의
======================================================== */
const THEMES={ 'data-scientist':{field:'AI·데이터',title:'데이터 사이언티스트',hero:'가설-검증으로 데이터를 근거로 바꾸는 문제 해결가.',highlights:['가설·A/B 실험','피처 엔지니어링','해석 가능한 모델링']} };

/* ========================================================
4) 결과 보고서 (IV~V)
======================================================== */
export default function DeepReportPages(){
  const [sp,setSp]=useState<URLSearchParams|null>(null);
  useEffect(()=>{if(typeof window!=='undefined')setSp(new URLSearchParams(window.location.search));},[]);
  const ready=!!sp;
  const now=useMemo(()=>new Date().toLocaleDateString('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit'}),[]);
  const computed=useMemo(()=>sp?computeFromQuery(sp):null,[sp]);
  const name=computed?.name??'응시자';
  const theme=THEMES['data-scientist'];
  const percent=computed?.percent??0;
  const grade=computed?.grade??'D';
  const categories=computed?.categories??[];

  if(!ready||!computed)return(
    <main className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <GlobalStyle/><div className="text-slate-600">심화 보고서 불러오는 중…</div>
    </main>
  );

  return(
  <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 print:bg-white">
    <GlobalStyle/>

    {/* 상단 네비 */}
    <div className="no-print page mx-auto mb-4 flex items-center justify-between">
      <div className="text-slate-600 text-sm">심화 결과보고서</div>
      <div className="flex gap-2">
        <button onClick={goHome} className="rounded-full bg-white border-2 border-slate-200 px-4 py-2 text-sm">🏠 홈</button>
        <button onClick={goBack} className="rounded-full bg-white border-2 border-slate-200 px-4 py-2 text-sm">⬅ 뒤로가기</button>
      </div>
    </div>

    {/* IV. 포트폴리오 미션 */}
    <div className="page bg-white rounded-3xl shadow-2xl p-7 md:p-10 fade-in">
      <section className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <span className="text-4xl">📂</span><span>IV. 진로 포트폴리오 미션</span>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {name} 학생은 {theme.title} 분야에서 <b>{percent}%</b>의 성취를 보여주었습니다.
          이제 실전 미션을 통해 배운 것을 적용해봅시다.
        </p>
      </section>

      {/* 인쇄 버튼 ↓↓↓ */}
      <section className="no-print mt-8">
        <div className="rounded-2xl border-2 border-yellow-200 p-5 bg-gradient-to-br from-yellow-50 to-white">
          <button
            onClick={()=>window.print()}
            className="w-full rounded-xl px-6 py-4 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow"
          >
            🖨️ A4로 인쇄하기
          </button>
        </div>
      </section>
    </div>

  </main>);
}
