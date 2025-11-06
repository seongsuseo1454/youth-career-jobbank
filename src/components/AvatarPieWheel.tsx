'use client';


import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';


/** ===== 타입 ===== */
export type Avatar = { id: number; name: string };
type Props = {
 avatars?: Avatar[];
 onPick?: (a: Avatar) => void;
 onNext?: (a: Avatar) => void;
};


/** ===== 상수 ===== */
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#22C5E9', '#6366F1'];


/** ===== 컴포넌트 ===== */
export default function AvatarPieWheel({ avatars, onPick, onNext }: Props) {
 // 기본 6 멘토
 const defaults: Avatar[] = [
   { id: 1, name: '세종대왕' },
   { id: 2, name: '이순신 장군' },
   { id: 3, name: '간디' },
   { id: 4, name: '아인슈타인' },
   { id: 5, name: '링컨' },
   { id: 6, name: '소크라테스' },
 ];
 const data = avatars && avatars.length ? avatars : defaults;


 const n = data.length;
 const slice = 360 / n;


 // 섹터 계산
 const sectors = useMemo(() => {
   return data.map((a, i) => {
     const from = i * slice;
     const to = (i + 1) * slice;
     const color = COLORS[i % COLORS.length];
     return { ...a, from, to, color, idx: i };
   });
 }, [data, slice]);


 const gradient = useMemo(
   () => `conic-gradient(${sectors.map(s => `${s.color} ${s.from}deg ${s.to}deg`).join(',')})`,
   [sectors]
 );


 const [angle, setAngle] = useState(0);
 const [isSpinning, setIsSpinning] = useState(false);
 const [picked, setPicked] = useState<Avatar | null>(null);


 /** ===== 사운드(선택) ===== */
 const audioCtxRef = useRef<AudioContext | null>(null);
 const ensureAudio = () => {
   if (!audioCtxRef.current) {
     // @ts-ignore
     audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
   }
 };
 const beep = useCallback((freq: number, ms: number, vol = 0.1) => {
   try {
     ensureAudio();
     const ctx = audioCtxRef.current!;
     const osc = ctx.createOscillator();
     const gain = ctx.createGain();
     osc.connect(gain);
     gain.connect(ctx.destination);
     osc.type = 'sine';
     osc.frequency.value = freq;
     gain.gain.setValueAtTime(vol, ctx.currentTime);
     gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + ms / 1000);
     osc.start();
     osc.stop(ctx.currentTime + ms / 1000);
   } catch {}
 }, []);


 // 회전 중 틱 소리
 useEffect(() => {
   if (!isSpinning) return;
   let raf = 0;
   let last = performance.now();
   const loop = () => {
     const now = performance.now();
     if (now - last > 95) {
       beep(1400, 35, 0.06);
       last = now;
     }
     raf = requestAnimationFrame(loop);
   };
   raf = requestAnimationFrame(loop);
   return () => cancelAnimationFrame(raf);
 }, [isSpinning, beep]);


 // 회전 종료 처리
 const onTransitionEnd = () => {
   setIsSpinning(false);
   const norm = ((angle % 360) + 360) % 360;
   const pointerDeg = (360 - norm) % 360;
   const adjusted = (pointerDeg + slice * 0.05) % 360; // 경계 보정
   const idx = Math.floor(adjusted / slice) % n;
   const chosen = data[idx];
   setPicked(chosen);


   // 승리 멜로디
   beep(523, 120, 0.14);
   setTimeout(() => beep(659, 120, 0.14), 130);
   setTimeout(() => beep(784, 240, 0.16), 260);


   onPick?.(chosen);
 };


 // 회전 시작
 const spin = async () => {
   if (isSpinning || !n) return;
   try {
     ensureAudio();
     if (audioCtxRef.current?.state === 'suspended') {
       await audioCtxRef.current.resume();
     }
   } catch {}
   setPicked(null);
   setIsSpinning(true);
   const spins = 5 + Math.random() * 3;
   const extra = Math.random() * 360;
   setAngle(prev => prev + spins * 360 + extra);
 };


 const goNext = () => {
   if (picked) onNext?.(picked);
 };


 /** ===== 렌더 ===== */
 return (
   <div className="w-full max-w-[640px] mx-auto">
     {/* 안내 문구 (상단 타이틀/좌측 홈 제거) */}
     <header className="text-center mb-6">
       <h2 className="text-2xl font-extrabold text-gray-900">룰렛을 돌려 상담사를 선택하세요 🎯</h2>
       <p className="text-gray-500 mt-2">선택하면 다음 단계로 이동할 수 있습니다.</p>
     </header>


     {/* 휠 */}
     <div className="relative mx-auto w-full max-w-md aspect-square mb-6">
       {/* 포인터 */}
       <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-30">
         <div
           className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[28px]
                      border-l-transparent border-r-transparent border-t-orange-500"
           style={{ transform: 'rotate(180deg)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.5))' }}
         />
       </div>


       {/* 룰렛 본체 */}
       <div
         className="absolute inset-0 rounded-full transform-gpu"
         style={{
           transform: `rotate(${angle}deg)`,
           transition: isSpinning ? 'transform 3.8s cubic-bezier(.17,.67,.12,.99)' : 'none',
         }}
         onTransitionEnd={onTransitionEnd}
       >
         <div className="absolute inset-0 rounded-full border-[12px] border-gray-300 shadow-2xl" />
         <div className="absolute inset-0 rounded-full" style={{ background: gradient }} />
         {/* 경계선 */}
         {sectors.map(s => {
           const size = '50%';
           return (
             <div
               key={`line-${s.id}`}
               className="absolute left-1/2 top-1/2 origin-bottom"
               style={{
                 transform: `rotate(${s.from}deg)`,
                 width: '3px',
                 height: size,
                 marginTop: `calc(-${size})`,
                 marginLeft: '-1.5px',
                 background:
                   'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(0,0,0,0.25))',
               }}
             />
           );
         })}
       </div>


       {/* 중앙 결과 */}
       <div className="absolute inset-0 flex items-center justify-center">
         <div
           className="w-1/2 h-1/2 rounded-full bg-white border-[10px] border-gray-300 flex flex-col items-center justify-center text-center p-4"
           style={{
             boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.08), 0 8px 18px rgba(0,0,0,0.15)',
           }}
         >
           {picked ? (
             <div className="text-center p-1">
               <p className="text-xs text-gray-500 font-semibold mb-0.5">선택된 멘토</p>
               <p className="text-2xl font-extrabold text-emerald-600">{picked.name} 🎉</p>
             </div>
           ) : (
             <p className="text-lg text-gray-500 font-semibold">
               {isSpinning ? '운명 결정 중…' : 'PRESS START'}
             </p>
           )}
         </div>
       </div>
     </div>


     {/* 버튼 */}
     <div className="flex items-center justify-center gap-3">
       <button
         className={`px-6 py-3 rounded-full font-bold text-white text-base shadow-2xl transition
           ${isSpinning ? 'bg-gray-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
         onClick={spin}
         disabled={isSpinning}
       >
         {isSpinning ? '🌀 돌리는 중…' : '돌리기 시작'}
       </button>


       <button
         className={`px-6 py-3 rounded-full font-bold text-white text-base shadow-2xl transition
           ${picked ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800' : 'bg-gray-300 cursor-not-allowed'}`}
         onClick={goNext}
         disabled={!picked}
       >
         다음 단계 →
       </button>
     </div>


     <p className="text-center text-sm text-gray-400 mt-3">Tip: 소리를 켜고 돌려보세요!</p>
   </div>
 );
}