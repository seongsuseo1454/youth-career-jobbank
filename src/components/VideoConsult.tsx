// [제목] 화상 상담 미리보기(HTTPS/권한 오류 안내·PIP·TTS 인사 1회)
'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  consultant: string;
  studentName?: string;
  onNext?: () => void;
  useTTS?: boolean;
};

export default function VideoConsult({ consultant, studentName, onNext, useTTS = true }: Props) {
  const videoRef = useRef<HTMLVideoElement|null>(null);
  const streamRef = useRef<MediaStream|null>(null);
  const [camOn,setCamOn]=useState(false);
  const [micOn,setMicOn]=useState(true);
  const [pipAvail,setPipAvail]=useState(false);
  const [error,setError]=useState('');
  const [greeted,setGreeted]=useState(false);

  const greeting = useMemo(()=>{
    const nm=(studentName??'학생').trim();
    return `안녕하세요, ${nm}님! 저는 ${consultant} 상담사입니다. 오른쪽 폼에 자기소개서를 순서대로 입력해 주세요.`;
  },[consultant,studentName]);

  const openDevices=async()=>{
    setError('');
    try{
      const httpsOk = location.protocol==='https:' || location.hostname==='localhost';
      if(!httpsOk) throw new Error('HTTPS 환경에서 접속해주세요(개발은 localhost 허용).');
      const s = await navigator.mediaDevices.getUserMedia({
        video:{ facingMode:'user', width:{ideal:1280}, height:{ideal:720} },
        audio:{ echoCancellation:true, noiseSuppression:true, autoGainControl:true },
      });
      streamRef.current=s;
      if(videoRef.current){ videoRef.current.srcObject=s; await videoRef.current.play().catch(()=>{}); }
      setCamOn(true); setMicOn(true);
    }catch(e:any){
      const msg = e?.name==='NotAllowedError' ? '카메라/마이크 권한을 허용해 주세요.'
              : e?.name==='NotFoundError' ? '사용 가능한 카메라/마이크를 찾을 수 없습니다.'
              : e?.message || '카메라/마이크 초기화 중 오류';
      setError(msg); setCamOn(false); setMicOn(false);
    }
  };
  const closeDevices=()=>{ streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; if(videoRef.current) videoRef.current.srcObject=null; setCamOn(false); };
  const toggleMic=()=>{ const next=!micOn; setMicOn(next); streamRef.current?.getAudioTracks().forEach(t=>t.enabled=next); };

  const togglePip=async()=>{
    try{
      // @ts-ignore
      if(!document.pictureInPictureEnabled) return;
      // @ts-ignore
      if(document.pictureInPictureElement){ /* @ts-ignore */ await document.exitPictureInPicture(); }
      else if(videoRef.current){ /* @ts-ignore */ await videoRef.current.requestPictureInPicture(); }
    }catch{}
  };

  useEffect(()=>{ setPipAvail(!!document.pictureInPictureEnabled); openDevices(); return ()=>closeDevices(); },[]);
  useEffect(()=>{
    if(!useTTS||greeted) return; setGreeted(true);
    const clean=greeting.replace(/[^\w가-힣\s,.!?]/g,' ');
    if('speechSynthesis' in window){ try{ const u=new SpeechSynthesisUtterance(clean); u.lang='ko-KR'; u.rate=1; u.pitch=1; speechSynthesis.speak(u); }catch{} }
  },[greeting,useTTS,greeted]);

  return (
    <section className="rounded-2xl border p-4 bg-white shadow-sm">
      <header className="mb-4">
        <h2 className="text-xl font-bold">화상 채팅 (상담사: {consultant})</h2>
        <p className="text-gray-600 text-sm mt-1">미리보기 확인 후, 자기소개서를 입력해 주세요.</p>
      </header>

      <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
        <video ref={videoRef} className="w-full h-full object-cover bg-black" playsInline muted={!micOn}/>
        {!camOn && <div className="absolute inset-0 flex items-center justify-center"><div className="bg-black/60 text-white rounded px-4 py-2 text-sm">{error||'카메라 여는 중…'}</div></div>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={toggleMic} className={`px-4 py-2 rounded text-white ${micOn?'bg-blue-600 hover:bg-blue-700':'bg-gray-400'}`}>마이크 {micOn?'끄기':'켜기'}</button>
        <button onClick={camOn?closeDevices:openDevices} className={`px-4 py-2 rounded text-white ${camOn?'bg-gray-700 hover:bg-gray-800':'bg-green-600 hover:bg-green-700'}`}>카메라 {camOn?'끄기':'켜기'}</button>
        {pipAvail&&camOn&&<button onClick={togglePip} className="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700">PIP(작은창)</button>}
        {onNext && <button onClick={onNext} className="ml-auto px-4 py-2 rounded text-white bg-emerald-600 hover:bg-emerald-700">다음 단계 →</button>}
      </div>

      <p className="mt-3 text-xs text-gray-500">※ HTTPS/권한 필수. 로컬은 localhost 허용. 외부 음원 없이 안전하게 동작.</p>
    </section>
  );
}