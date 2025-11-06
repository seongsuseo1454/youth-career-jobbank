// src/components/CounselorGREETING.tsx
// 상담사 인사 → 자기소개서 안내 멘트를 "순차 재생"하는 유틸 (웹 스피치 사용)

type SpeakOpts = {
  rate?: number;   // 속도
  pitch?: number;  // 피치
  volume?: number; // 볼륨
};
const defaultOpts: SpeakOpts = { rate: 0.98, pitch: 1.0, volume: 0.9 };

// 끝날 때까지 기다리는 TTS
function speak(text: string, opts: SpeakOpts = defaultOpts) {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return resolve(); // SSR/미지원 브라우저에선 조용히 패스
    }
    try {
      // 기존 대기열 정리
      window.speechSynthesis.cancel
();

      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ko-KR';
      u.rate = opts.rate ?? defaultOpts.rate!;
      u.pitch = opts.pitch ?? defaultOpts.pitch!;
      u.volume = opts.volume ?? defaultOpts.volume!;

      // 한국어 보이스 우선
      const vv = window.speechSynthesis.getVoices();
      const ko = vv.find(v => v.lang && v.lang.toLowerCase
().startsWith('ko'));
      if (ko) u.voice = ko;

      u.onend = () => resolve();
      u.onerror = () => resolve(); // 재생 실패도 흐름 막지 않음
      window.speechSynthesis.speak(u);
    } catch {
      resolve();
    }
  });
}

// 상담사별 멘트 사전(존댓말/부드러운 톤)
const GREETINGS: Record<string, string> = {
  '소크라테스': '안녕하세요, 소크라테스 상담사입니다. 스스로를 알아가는 시간이 가장 값집니다.',
  '세종대왕': '세종대왕 상담사입니다. 오늘 배운 작은 지식이 내일의 큰 힘이 되길 바라요.',
  '이순신 장군': '이순신 장군 상담사입니다. 끝까지 해보겠다는 마음이 가장 든든한 무기입니다.',
  '링컨': '링컨 상담사입니다. 실패는 다시 시작하라는 신호일 뿐입니다.',
  '아인슈타인': '아인슈타인 상담사입니다. 상상하는 만큼 성장합니다.',
  '간디': '간디 상담사입니다. 부드러운 마음으로 꾸준히 가면 길이 열립니다.',
};

function buildGuide(name?: string) {
  const who = name?.trim() ? `${name}님, ` : '';
  return (
    `${who}천천히 시작해 볼까요? 오른쪽에 보이는 자기소개서 항목을 순서대로 작성해 주세요. ` +
    `이름, 학교, 학년과 반, 그리고 관심 분야를 선택한 뒤, 마지막으로 목표를 적어 주시면 됩니다. ` +
    `작성 후에 ‘제출’을 누르고 ‘직업체험 시작’ 버튼으로 이어가겠습니다.`
  );
}

/**
 * 상담사 인사 + 자기소개서 안내 멘트를 "연속" 재생
 * - counselor: 쿼리/상태에서 받은 상담사 이름 (예: '세종대왕')
 * - studentName: 선택(있으면 멘트에 존칭 포함)
 * - gapMs: 인사 멘트와 안내 멘트 사이 쉬는 시간(ms)
 */
export async function playGreetingAndGuide(
  counselor: string,
  studentName?: string,
  gapMs = 600
) {
  const hello =
    GREETINGS[counselor] ??
    '안녕하세요, 상담사입니다. 지금부터 안내드리겠습니다.';
  const guide = buildGuide(studentName);

  await speak(hello, { rate: 0.98, pitch: 0.98, volume: 0.95 });
  await new Promise(r => setTimeout(r, gapMs));
  await speak(guide, { rate: 0.98, pitch: 1.0, volume: 0.9 });
}

/** 즉시 모든 발화 중지(페이지 떠날 때/리셋 버튼 등에 사용) */
export function stopAllTTS() {
  try {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel
();
  } catch {}
}