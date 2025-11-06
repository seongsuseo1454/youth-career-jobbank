'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
// Next.js 의존성 제거: useSearchParams, useRouter 대신 브라우저 API 사용
// import { useSearchParams, useRouter } from 'next/navigation'; 

// 아이콘: 단순 문자열로 대체 (실제 환경에서는 Lucide React 아이콘을 사용해야 함)
const Icon = ({ children }) => <span className="inline-block w-4 h-4 text-center mr-1">{children}</span>;

/**
 * 다음 단계 확장을 위한 가이드
 * - 지금은 Loopback(동일 페이지 내 두 Peer)으로 동작합니다.
 * - 원격 상담을 하려면, 아래 createOffer/createAnswer/icecandidate 전달 부분을
 * WebSocket 등 신호 서버로 교체하면 즉시 확장 가능합니다.
 */

type ChatMsg = { who: 'me' | 'consultant'; text: string; ts: number };

// URL 파라미터를 읽는 훅 대체 함수
const useUrlParams = () => {
  if (typeof window === 'undefined') {
    // 서버 컴포넌트 래퍼 내부에 Suspense가 있어 여기는 실행되지 않아야 하지만, 안전을 위해 빈 객체를 반환합니다.
    return { get: () => null };
  }
  return new URLSearchParams(window.location.search);
};

// 라우터 대체 함수
const useSimpleRouter = () => {
    return {
        push: (path: string) => {
            window.location.href = path; // 단순 페이지 이동
        }
    };
};


export default function SessionClient() {
  const sp = useUrlParams();
  const router = useSimpleRouter();
  
  // URL에서 'name' 파라미터 값을 안전하게 가져옵니다.
  const consultantName = useMemo(() => sp.get('name') ?? '상담사', [sp]);

  // --- UI state ---
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState('');

  // --- Media / RTC refs ---
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Loopback: 같은 페이지에 두 개의 PeerConnection
  const pc1Ref = useRef<RTCPeerConnection | null>(null); // local
  const pc2Ref = useRef<RTCPeerConnection | null>(null); // remote

  // --- TTS(인사/안내 멘트) ---
  const speak = (text: string) => {
    // 특수문자 제거 + 공백 정리
    const cleaned = text.replace(/[^\p{Letter}\p{Number}\p{Mark}\s.,?!]/gu, ' ').replace(/\s+/g, ' ').trim();
    const u = new SpeechSynthesisUtterance(cleaned);
    u.lang = 'ko-KR';
    u.rate = 1.0;
    u.pitch = 1.0;
    try { window.speechSynthesis.cancel(); } catch {}
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    // 세션 첫 진입 인사 멘트
    speak(`${consultantName}님과의 화상 상담을 준비합니다. 마이크와 카메라 접근을 허용해 주세요.`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Chat helpers ---
  const addMsg = (m: ChatMsg) => setMessages(prev => [...prev, m]);
  const sendMsg = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    addMsg({ who: 'me', text, ts: Date.now() });

    // 데모용: 상대(상담사) 자동 응답
    setTimeout(() => {
      addMsg({
        who: 'consultant',
        text: `좋아요. "${text}" 내용 확인했습니다. 계속 말씀해 주세요.`,
        ts: Date.now(),
      });
    }, 500);
  };

  // --- Start / Stop ---
  const startSession = async () => {
    if (started) return;
    setStarted(true);

    // 1) 로컬 미디어
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: { echoCancellation: true, noiseSuppression: true },
        });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            await localVideoRef.current.play().catch(() => undefined);
        }
    
        // 2) 피어 연결(Loopback)
        const pc1 = new RTCPeerConnection();
        const pc2 = new RTCPeerConnection();
        pc1Ref.current = pc1;
        pc2Ref.current = pc2;
    
        // 로컬 트랙을 pc1에 추가
        stream.getTracks().forEach(t => pc1.addTrack(t, stream));
    
        // pc2의 원격 트랙을 UI에 표시
        pc2.ontrack = (ev) => {
            const remoteStream = ev.streams[0];
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play().catch(() => undefined);
            }
        };
    
        // ICE 교환 (로컬 loopback이므로 코드 내부에서 교환)
        pc1.onicecandidate = (e) => {
            if (e.candidate) pc2.addIceCandidate(e.candidate);
        };
        pc2.onicecandidate = (e) => {
            if (e.candidate) pc1.addIceCandidate(e.candidate);
        };
    
        // Offer/Answer 교환
        const offer = await pc1.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true });
        await pc1.setLocalDescription(offer);
        await pc2.setRemoteDescription(offer);
        const answer = await pc2.createAnswer();
        await pc2.setLocalDescription(answer);
        await pc1.setRemoteDescription(answer);
    
        speak('화상 연결을 시작합니다. 자기소개와 관심 직업 분야를 말씀해 주세요.');
    } catch (error) {
        console.error("미디어 접근 또는 WebRTC 연결 오류:", error);
        setStarted(false);
        speak('카메라나 마이크에 접근할 수 없습니다. 권한을 확인해 주세요.');
    }
  };

  const stopSession = () => {
    setStarted(false);
    try {
      pc1Ref.current?.getSenders().forEach(s => s.track?.stop());
      pc2Ref.current?.getSenders().forEach(s => s.track?.stop());
      pc1Ref.current?.close();
      pc2Ref.current?.close();
    } catch {}
    pc1Ref.current = null;
    pc2Ref.current = null;

    localStreamRef.current?.getTracks().forEach(t => t.stop());
    localStreamRef.current = null;

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    speak('상담을 종료했습니다. 필요하시면 관심 분야 선택으로 이동하세요.');
  };

  // --- Controls ---
  const toggleMute = () => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getAudioTracks().forEach(t => (t.enabled = !t.enabled));
    setMuted(prev => !prev);
  };
  const toggleCam = () => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getVideoTracks().forEach(t => (t.enabled = !t.enabled));
    setCamOff(prev => !prev);
  };
  const goInterests = () => {
    router.push('/career/interests');
  };

  // --- Fullscreen ---
  const enterFullscreen = (el: HTMLElement | null) => {
    if (!el) return;
    if (document.fullscreenElement) return;
    el.requestFullscreen?.();
  };

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          화상 상담 세션
        </h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
            onClick={() => router.push('/')}
          >
            홈으로
          </button>
        </div>
      </div>

      {/* 참여자 이름 */}
      <p className="text-gray-600 mb-4">
        상담사: <span className="font-semibold">{consultantName}</span>
      </p>

      {/* 비디오 영역 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 영상들 */}
        <div className="lg:col-span-2 grid grid-rows-2 gap-4">
          {/* 원격 영상 */}
          <div className="relative rounded-2xl overflow-hidden bg-black">
            <video
              ref={remoteVideoRef}
              className="w-full h-[44vh] object-cover"
              playsInline
              autoPlay
              muted
            />
            <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-white/20 text-white backdrop-blur">
              상대 영상 (데모: 본인 미러 연결)
            </div>
            <button
              className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-white/20 text-white backdrop-blur hover:bg-white/30"
              onClick={() => enterFullscreen(remoteVideoRef.current)}
            >
              전체화면
            </button>
          </div>

          {/* 내 영상(작게) */}
          <div className="relative rounded-2xl overflow-hidden bg-black">
            <video
              ref={localVideoRef}
              className="w-full h-[28vh] object-cover"
              playsInline
              muted
            />
            <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-white/20 text-white backdrop-blur">
              내 카메라
            </div>
          </div>
        </div>

        {/* 채팅 패널 */}
        <div className="rounded-2xl border bg-white shadow-sm flex flex-col h-[72vh]">
          <div className="px-4 py-3 border-b font-bold">
            채팅
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.who === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.who === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} px-3 py-2 rounded-xl max-w-[80%]`}>
                  <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                  <div className={`text-[10px] mt-1 ${m.who === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {new Date(m.ts).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
              placeholder="메시지를 입력하세요"
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMsg}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              보내기
            </button>
          </div>
        </div>
      </section>

      {/* 컨트롤 바 */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!started ? (
          <button
            className="px-5 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700"
            onClick={startSession}
          >
            <Icon>▶</Icon> 상담 시작
          </button>
        ) : (
          <button
            className="px-5 py-3 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700"
            onClick={stopSession}
          >
            <Icon>■</Icon> 상담 종료
          </button>
        )}

        <button
          className={`px-4 py-2 rounded-lg text-white font-semibold ${muted ? 'bg-gray-500' : 'bg-gray-700 hover:bg-gray-800'}`}
          onClick={toggleMute}
          disabled={!started}
          title={muted ? '음소거 해제' : '음소거'}
        >
          <Icon>{muted ? '🔇' : '🎤'}</Icon> {muted ? '마이크 켜기' : '마이크 끄기'}
        </button>

        <button
          className={`px-4 py-2 rounded-lg text-white font-semibold ${camOff ? 'bg-gray-500' : 'bg-gray-700 hover:bg-gray-800'}`}
          onClick={toggleCam}
          disabled={!started}
          title={camOff ? '카메라 켜기' : '카메라 끄기'}
        >
          <Icon>{camOff ? '📷' : '📹'}</Icon> {camOff ? '카메라 켜기' : '카메라 끄기'}
        </button>

        <button
          className="ml-auto px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          onClick={goInterests}
        >
          관심분야 선택으로 <Icon>→</Icon>
        </button>
      </div>

      {/* 접근권한/안내 */}
      <p className="mt-3 text-sm text-gray-500">
        * 데모 모드: 동일 기기에서만 카메라/마이크를 사용해 미러 상담처럼 동작합니다. 
        원격 상담을 위해서는 신호 서버(WebSocket 등)로 Offer/Answer, ICE 후보를 교환하도록 확장하세요.
      </p>
    </main>
  );
}
