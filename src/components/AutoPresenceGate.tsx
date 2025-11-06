// [제목] 상담 페이지 래퍼 (환경 확인 및 동적 로딩)
'use client';

import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, useCallback } from 'react';

// =========================================================================
// 1. 필수 정의 (외부 모듈 경로 오류 회피를 위해 내부 정의)
// =========================================================================

/**
 * 임시 TTS 함수 (실제로는 '@/lib/tts'에서 임포트될 것으로 예상됨)
 */
function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  const utterance = new SpeechSynthesisUtterance(text);
  const koreanVoice = window.speechSynthesis.getVoices().find(
    (voice) => voice.lang === 'ko-KR' || voice.name.includes('Korean')
  );
  if (koreanVoice) {
    utterance.voice = koreanVoice;
  }
  
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

/**
 * 임시 경로 상수 (실제로는 '@/lib/routes'에서 임포트될 것으로 예상됨)
 */
const R = {
  consultant: '/career/counsel', 
};

/**
 * VideoIntroCall 컴포넌트의 props 타입 정의 (빨간 줄 FIX)
 */
interface VideoIntroCallProps {
  counselorName: string;
}

// VideoIntroCall 동적 로딩 정의
const VideoIntroCall = dynamic<VideoIntroCallProps>(
  () => import('@/components/VideoIntroCall'), 
  { ssr: false }
);

// =========================================================================
// 2. 메인 컴포넌트 (AutoPresenceGate + Page Logic)
// =========================================================================

type Result = 'single' | 'group';

export default function Page() {
  const sp = useSearchParams();
  const name = sp.get('counselor') || '세종대왕'; 
  const router = useRouter();
  
  const [status, setStatus] = useState<'idle'|'sampling'|'decided'|'denied'>('idle');
  const [message, setMessage] = useState<string>('');
  const stopRef = useRef<() => void>();

  // 최종적으로 VideoIntroCall을 렌더링할지 여부
  const [showVideoCall, setShowVideoCall] = useState(false);
  
  // 최초 상호작용 리스너 설정
  useEffect(() => {
    if (status !== 'idle') return; 
    
    const start = () => runSampling();
    
    window.addEventListener('click', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    window.addEventListener('touchstart', start, { once: true });
    
    return () => {
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
      window.removeEventListener('touchstart', start);
      stopRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]); 

  const runSampling = useCallback(async () => {
    if (status !== 'idle') return;

    setStatus('sampling');

    let stream: MediaStream | null = null;
    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;

    stopRef.current = () => {
      stream?.getTracks().forEach(t => t.stop());
      audioCtx?.close().catch(()=>{});
    };

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      let faces = 0;
      const video = document.createElement('video');
      video.srcObject = stream;
      video.muted = true;
      (video as any).playsInline = true;
      await video.play().catch(()=>{});

      const fdSupported = 'FaceDetector' in window;
      // @ts-ignore (FaceDetector는 표준 API가 아닐 수 있어 타입 오류 방지)
      const detector = fdSupported ? new (window as any).FaceDetector({ fastMode: true, maxDetectedFaces: 5 }) : null;

      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const src = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      src.connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);

      const startTime = performance.now();
      let noiseAcc = 0;
      let frames = 0;

      while (performance.now() - startTime < 2500) {
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128; 
          sum += v * v;
        }
        const rms = Math.sqrt(sum / buf.length);
        noiseAcc += rms;
        frames++;

        if (detector) {
          try {
            const bitmap = await createImageBitmap(video);
            // @ts-ignore
            const dets = await detector.detect(bitmap);
            faces = Math.max(faces, dets.length || 0);
            bitmap.close?.();
          } catch {}
        }

        await new Promise(r => setTimeout(r, 120));
      }

      const avgNoise = noiseAcc / Math.max(frames, 1);
      const group = faces >= 2 || avgNoise >= 0.07;
      const decided: Result = group ? 'group' : 'single';
      
      setStatus('decided');

      if (decided === 'group') {
        const msg = '단체가 감지되었습니다. 조용히 해주시고, 1명씩 차례로 상담을 진행합니다.';
        setMessage(msg);
        speak(msg);
      } else {
        const msg = '개인 체험으로 진행합니다. 반가워요!';
        setMessage(msg);
        speak(msg);
      }

      // 1.8초 후 VideoIntroCall 렌더링으로 전환
      setTimeout(() => {
        stopRef.current?.();
        // 실제 상담 컴포넌트 렌더링 시작
        setShowVideoCall(true); 
      }, 1800);

    } catch (e) {
      console.error("Media access or detection error:", e);
      setStatus('denied');
      const msg = '권한을 허용하지 않아 개인 체험으로 진행합니다.';
      setMessage(msg);
      speak(msg);
      // 짧은 안내 후 VideoIntroCall 렌더링으로 전환
      setTimeout(() => setShowVideoCall(true), 1200); 
    }
  }, [status]); 

  // =================================================================
  // 렌더링 (Gate UI vs. Video Call)
  // =================================================================

  if (showVideoCall) {
    // 환경 확인이 완료되면 VideoIntroCall을 렌더링
    return <VideoIntroCall counselorName={name} />;
  }

  const showBanner = status !== 'idle';
  
  return (
    <>
      {/* 1. 배경 및 Idle 메시지 */}
      <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {status === 'idle' ? '화상 체험을 시작하려면 화면을 클릭하세요' : '환경 확인 중'}
          </h1>
          <p className="text-gray-500 mt-2">카메라 및 마이크 권한 요청이 발생할 수 있습니다.</p>
        </div>
      </div>
      
      {/* 2. 상태 배너 (AutoPresenceGate UI) */}
      {showBanner && (
          <div className="fixed top-0 inset-x-0 z-30">
            <div className="mx-auto max-w-5xl px-4 py-3">
              <div className="rounded-xl border bg-white/90 backdrop-blur px-4 py-3 shadow">
                <div className="text-sm text-gray-700">
                  {status === 'sampling' && '주변 환경을 잠시 확인하고 있습니다…'}
                  {status !== 'sampling' && message}
                </div>
                {status === 'sampling' && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-gray-200">
                    <div className="h-full w-1/3 animate-[progress_1.2s_linear_infinite] bg-indigo-500" />
                  </div>
                )}
              </div>
            </div>
            {/* CSS-in-JS로 progress keyframes 정의 */}
            <style jsx>{`
              @keyframes progress {
                0% { transform: translateX(-100%) }
                100% { transform: translateX(300%) }
              }
            `}</style>
          </div>
      )}
    </>
  );
}
