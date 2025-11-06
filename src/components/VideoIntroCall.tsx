// [제목] 화상+자기소개서 화면 (상담사 인사 + 자기소개 멘트 연속 재생, 네비 복구) + 학년구분(초/중/고) 추가
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// ---- 상담사 멘트 사전 (존댓말, 부드러운 톤) -----------------
const GREETINGS: Record<string, string> = {
  '소크라테스': '안녕하세요, 소크라테스 상담사입니다. 스스로를 알아가는 시간이 가장 값집니다.',
  '세종대왕': '세종대왕 상담사입니다. 오늘 배운 작은 지식이 내일의 큰 힘이 되길 바랍니다.',
  '이순신 장군': '이순신 장군 상담사입니다. 끝까지 해보겠다는 마음이 가장 든든한 무기입니다.',
  '링컨': '링컨 상담사입니다. 실패는 다시 시작하라는 신호일 뿐입니다.',
  '아인슈타인': '아인슈타인 상담사입니다. 상상하는 만큼 성장합니다.',
  '간디': '간디 상담사입니다. 부드러운 마음으로 꾸준히 가면 길이 열립니다.',
};

// ---- TTS 공통(부드러운 톤) -----------------------------------
function speakSoft(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.95;
  u.pitch = 1.0;
  u.volume = 0.9;

  // 보이스 목록이 늦게 로드되는 브라우저 대응
  const setVoice = () => {
    const ko = window.speechSynthesis.getVoices().find(v => v.lang?.startsWith('ko'));
    if (ko) u.voice = ko;
    window.speechSynthesis.cancel();     // ← 줄바꿈 없는 정확한 호출
    window.speechSynthesis.speak(u);
  };
  if (window.speechSynthesis.getVoices().length) setVoice();
  else {
    const h = () => { setVoice(); window.speechSynthesis.removeEventListener('voiceschanged', h); };
    window.speechSynthesis.addEventListener('voiceschanged', h);
  }
}

// 학년 숫자에서 대략 밴드 추정(없으면 고등)
type Band = '초등학생' | '중학생' | '고등학생';
function inferBandFromGrade(gradeStr: string | null): Band {
  const g = Number(gradeStr ?? '');
  if (!Number.isFinite(g)) return '고등학생';
  if (g >= 1 && g <= 6) return '초등학생';
  if (g >= 7 && g <= 9) return '중학생';
  return '고등학생';
}

// 관심분야 → 실제 라우트 슬러그 (※ 기존 앱 라우트와 1:1 일치)
const FIELD_SLUG: Record<string, string> = {
  'AI·데이터': 'ai-data',
  '소프트웨어·앱': 'software-app',
  '로봇·메카트로닉스': 'robot-mechatronics',
  '사이버보안': 'cyber-security',
  '게임·메타버스': 'game-metaverse',
  '의료·바이오': 'medical-bio',
  '간호·재활': 'nursing-rehab',
  '환경·에너지': 'env-energy',
  '우주·항공': 'space-aero',
  '자동차·모빌리티': 'mobility',
};

export default function VideoIntroCall() {
  const router = useRouter();
  const sp = useSearchParams();

  const counselor = (sp.get('counselor') ?? '상담사').trim();
  const name = sp.get('name') ?? '';
  const school = sp.get('school') ?? '';
  const grade = sp.get('grade') ?? '';
  const classroom = sp.get('classroom') ?? '';
  const goal = sp.get('goal') ?? '';

  // ▶ level(초/중/고) 선택값 (URL 동기화)
  const initialLevel = (sp.get('level') as Band) || inferBandFromGrade(grade);
  const [level, setLevel] = useState<Band>(initialLevel);
  const setLevelAndSync = (next: Band) => {
    setLevel(next);
    const params = new URLSearchParams(sp.toString());
    params.set('level', next);
    router.replace(`?${params.toString()}`, { scroll: false }); // ← 줄바꿈 제거
  };

  // ---- 좌측 비디오 -----------------------------------
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [camOn, setCamOn] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [err, setErr] = useState('');

  const openMedia = async () => {
    setErr('');
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: micOn ? { echoCancellation: true, noiseSuppression: true, autoGainControl: false } : false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play().catch(() => {});
      }
      setCamOn(true);
    } catch {
      setErr('카메라/마이크 접근이 거부되었습니다.');
      setCamOn(false);
    }
  };
  const closeMedia = () => {
    const s = videoRef.current?.srcObject as MediaStream | null;
    s?.getTracks().forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setCamOn(false);
  };
  const toggleMic = () => {
    const s = videoRef.current?.srcObject as MediaStream | null;
    s?.getAudioTracks().forEach(t => (t.enabled = !micOn));
    setMicOn(v => !v);
  };

  // ---- 인사+안내 멘트 1회 재생 -----------------------
  const greetingCombined = useMemo(() => {
    const g = GREETINGS[counselor] ?? `${counselor} 상담사입니다. 반갑습니다.`;
    const guide =
      '천천히 시작해 볼까요? 오른쪽에 보이는 자기소개서 항목을 순서대로 작성해 주세요. ' +
      '이름, 학교, 학년과 반, 관심 분야를 선택한 뒤 마지막으로 목표를 적어 주시면 됩니다. ' +
      '작성 후 ‘제출’을 누르고 ‘직업체험 시작’ 버튼으로 이어가겠습니다.';
    return `${g} ${guide}`;
  }, [counselor]);

  useEffect(() => {
    const t = setTimeout(() => speakSoft(greetingCombined), 300);
    return () => {
      clearTimeout(t);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [greetingCombined]);

  // ---- 오른쪽 폼 --------------------------------------
  const [form, setForm] = useState({
    name: name || '',
    school: school || '',
    grade: grade || '',
    classroom: classroom || '',
    interest: '',
    goal: goal || '',
  });
  const [openInterests, setOpenInterests] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interests = [
    'AI·데이터','소프트웨어·앱','로봇·메카트로닉스','사이버보안',
    '게임·메타버스','의료·바이오','간호·재활','환경·에너지','우주·항공','자동차·모빌리티',
  ];

  const onSubmit = () => {
    const { name, school, grade, classroom, interest, goal } = form;
    if (!name || !school || !grade || !classroom || !interest || !goal) {
      alert('이름, 학교, 학년, 반, 관심분야, 목표를 모두 입력해 주세요.');
      return;
    }
    setSubmitted(true);
    speakSoft(`${name} 학생, 잘 입력하셨어요. 이제 직업체험을 시작해 볼게요.`);
  };

  const onStart = () => {
    if (!submitted) {
      alert('먼저 자기소개서를 제출해 주세요.');
      return;
    }
    const qs = new URLSearchParams({
      counselor,
      name: form.name,
      school: form.school,
      grade: form.grade,
      classroom: form.classroom,
      goal: form.goal,
      level, // 초/중/고
      field: FIELD_SLUG[form.interest] || 'ai-data', // ← 라우트와 정확히 일치
    }).toString();
    router.push(`/career/themes?${qs}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      {/* 상단 타이틀 + 네비(복구) */}
      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">화상상담</h1>
          <p className="text-sm text-emerald-700 font-semibold">생성형 AI 기반 실시간 상담</p>
          <p className="mt-1 font-medium">{counselor} 상담사입니다.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => router.back()} className="border px-3 py-2 rounded-md hover:bg-gray-50">뒤로가기</button>
          <button onClick={() => router.push('/')} className="border px-3 py-2 rounded-md hover:bg-gray-50">홈으로</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 왼쪽: 비디오 */}
        <div>
          <div className="bg-black rounded-xl border aspect-video overflow-hidden relative">
            <video ref={videoRef} autoPlay playsInline muted={!micOn} className="w-full h-full object-cover" />
            {!camOn && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 text-white rounded px-4 py-2 text-sm">
                  {err || '카메라 준비 중…'}
                </div>
              </div>
            )}
          </div>

          {/* 하단 컨트롤 */}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={camOn ? closeMedia : openMedia}
              className={`px-4 py-2 rounded-md text-sm text-white ${camOn ? 'bg-gray-700 hover:bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
              {camOn ? '카메라 끄기' : '카메라 켜기'}
            </button>
            <button
              onClick={toggleMic}
              className="px-4 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-800">
              {micOn ? '마이크 끄기' : '마이크 켜기'}
            </button>
            <button
              onClick={() => videoRef.current?.requestFullscreen()}
              className="px-4 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-800">
              전체화면
            </button>
            <span className="text-xs text-gray-500 ml-auto">※ 로컬 미디어 프리뷰입니다.</span>
          </div>
        </div>

        {/* 오른쪽: 자기소개서 폼 */}
        <div className="border rounded-xl p-5 bg-white">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">자기소개서 작성</h2>
            <span className="text-xs font-semibold text-emerald-600">AI 실시간 상담</span>
          </div>

          {/* ▶ 학년 구분(초/중/고) — URL 동기화 */}
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">학년 구분</div>
            <div className="flex gap-2">
              {(['초등학생', '중학생', '고등학생'] as Band[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setLevelAndSync(b)}
                  className={`px-3 py-1.5 rounded-md text-sm border ${
                    level === b ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* 제출 후 요약 */}
          {submitted && (
            <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <p className="font-bold mb-2">학생 자기소개서 요약</p>
              <p><b>이름:</b> {form.name}</p>
              <p><b>학교:</b> {form.school}</p>
              <p><b>학년/반:</b> {form.grade}학년 {form.classroom}반</p>
              <p><b>관심분야:</b> {form.interest}</p>
              <p><b>목표:</b> {form.goal}</p>
              <p className="mt-2 text-gray-700">이제 ‘직업체험 시작’을 눌러 다음 단계로 이동하세요.</p>
            </div>
          )}

          {/* 입력 폼 */}
          <div className="grid grid-cols-2 gap-2">
            <input value={form.name} onChange={e=>setForm(v=>({...v,name:e.target.value}))} placeholder="이름" className="border px-3 py-2 rounded-md" />
            <input value={form.school} onChange={e=>setForm(v=>({...v,school:e.target.value}))} placeholder="학교명" className="border px-3 py-2 rounded-md" />
            <input value={form.grade} onChange={e=>setForm(v=>({...v,grade:e.target.value}))} placeholder="학년(숫자)" className="border px-3 py-2 rounded-md" />
            <input value={form.classroom} onChange={e=>setForm(v=>({...v,classroom:e.target.value}))} placeholder="반(숫자)" className="border px-3 py-2 rounded-md" />
          </div>

          <div className="mt-3">
            <button onClick={()=>setOpenInterests(o=>!o)} className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-700">
              관심분야
            </button>
            <p className="text-sm text-gray-600 mt-1">선택됨: {form.interest || '없음'}</p>
            {openInterests && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {interests.map(f=>(
                  <button
                    key={f}
                    onClick={()=>{ setForm(v=>({...v,interest:f})); setOpenInterests(false); }}
                    className={`border rounded-md px-3 py-2 text-sm ${form.interest===f?'bg-emerald-600 text-white':'hover:bg-gray-50'}`}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            value={form.goal}
            onChange={e=>setForm(v=>({...v,goal:e.target.value}))}
            placeholder="목표 (예: AI 연구자로 성장)"
            className="w-full border rounded-md px-3 py-2 mt-3"
          />

          <div className="flex gap-2 mt-4">
            <button onClick={onSubmit} className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-black">제출</button>
            <button onClick={onStart} className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700">직업체험 시작 →</button>
          </div>

          <p className="mt-4 text-xs text-gray-500 border-t pt-3">
            ※ 이름, 학교, 학년, 반, 목표를 입력하고 ‘관심분야’를 선택한 후 ‘제출’을 누르세요.
            제출 후 ‘직업체험 시작’을 클릭하면 다음 단계로 이동합니다.
          </p>
        </div>
      </div>
    </div>
  );
}