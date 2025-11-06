// [제목] 10개 관심분야 × 각 3개 직업 테마 (총 30개) + 유틸 함수
// 사용처 예시:
//   import { DOMAINS, THEMES, getThemesByDomain, pickRandomThemeByDomain } from '@/lib/themes';
//   const list = getThemesByDomain('ai-data'); // 해당 도메인의 3개 테마
//   const random = pickRandomThemeByDomain('media-film'); // 랜덤 1개

export type Domain = {
  key: string;             // 내부 고유키
  title: string;           // 화면 표시명
  color: string;           // 대표 색상 (Tailwind 혹은 HEX)
  icon?: string;           // (선택) 아이콘 경로
};

export type Theme = {
  id: string;              // 전역 고유 ID (도메인-슬러그)
  domainKey: string;       // 어떤 도메인에 속하는지
  title: string;           // 테마명 (직업명)
  summary: string;         // 한줄 요약
  steps: string[];         // 체험 순서 (UI 안내에 사용)
  studentTaskPrompt: string; // AI/생성 엔진에 넘길 기본 프롬프트
  counselorScript?: {      // (선택) 상담사 고정 멘트
    intro: string;
    guide: string[];
    closing?: string;
  };
  badge?: string;          // (선택) NEW / HOT 등
  difficulty?: 'EASY' | 'NORMAL' | 'ADV';
};

export type ThemeDef = { field: string; title?: string; hero?: string; highlights?: string[] };

export const FIELDS: ThemeDef[] = [
  { field: 'data-scientist', title: 'Data Scientist' },
  { field: 'frontend', title: 'Frontend Engineer' },
  { field: 'backend', title: 'Backend Engineer' },
  // 실제 프로젝트 필드로 채우세요
];

// ──────────────────────────────────────────────────────────────────────────────
// 10개 관심분야 (키는 라우팅/필터에 사용하기 좋게 영문-케밥)
export const DOMAINS: Domain[] = [
  { key: 'ai-data',           title: 'AI·데이터',            color: '#06b6d4' }, // cyan-500
  { key: 'software-app',      title: '소프트웨어·앱',        color: '#3b82f6' }, // blue-500
  { key: 'game-metaverse',    title: '게임·메타버스',        color: '#a855f7' }, // purple-500
  { key: 'robot-mechatronics',title: '로봇·메카트로닉스',    color: '#22c55e' }, // green-500
  { key: 'aero-space',        title: '우주·항공',            color: '#f97316' }, // orange-500
  { key: 'bio-medical',       title: '의료·바이오',          color: '#ef4444' }, // red-500
  { key: 'design-ux',         title: '디자인·UX/UI',         color: '#14b8a6' }, // teal-500
  { key: 'media-film',        title: '미디어·영상',          color: '#f59e0b' }, // amber-500
  { key: 'architecture-int',  title: '건축·인테리어',        color: '#64748b' }, // slate-500
  { key: 'env-energy',        title: '환경·에너지',          color: '#84cc16' }, // lime-500
];

// ──────────────────────────────────────────────────────────────────────────────
// 각 도메인당 3개씩 = 총 30개 테마
export const THEMES: Theme[] = [
  // 1) AI·데이터
  {
    id: 'ai-data-data-analyst',
    domainKey: 'ai-data',
    title: '데이터 분석가',
    summary: '학생 설문/로그 데이터를 정리·시각화해 인사이트 도출',
    steps: ['데이터 불러오기', '핵심지표 고르기', '차트 해석', '인사이트 문장화'],
    studentTaskPrompt:
      '학생이 입력한 소개·관심분야를 반영해 샘플 학습데이터에서 3개 핵심지표를 뽑고, 간단한 차트 설명과 권장 활동 2가지를 제안해줘.',
    counselorScript: {
      intro: '데이터에서 답을 찾는 법을 함께 볼까요?',
      guide: ['지표는 3개만 고르고 이유를 말해보세요.', '차트가 말하는 핵심 메시지를 한 문장으로.'],
      closing: '오늘 만든 인사이트가 진로 선택에 큰 힌트가 될 거예요.',
    },
    difficulty: 'EASY',
  },
  {
    id: 'ai-data-ai-engineer',
    domainKey: 'ai-data',
    title: 'AI 엔지니어',
    summary: '간단한 분류 모델 개념과 프롬프트 튜닝 체험',
    steps: ['문제 정의', '데이터/프롬프트 준비', '튜닝', '평가'],
    studentTaskPrompt:
      '관심 직업군을 분류하는 간단한 규칙/프롬프트를 만들고, 3개의 테스트 입력에 대한 예측과 근거를 설명해줘.',
    counselorScript: {
      intro: 'AI가 의사결정을 돕는 과정을 살펴봅시다.',
      guide: ['분류 기준을 평이한 말로 정리하세요.', '예측 근거를 반드시 쓰세요.'],
    },
    difficulty: 'NORMAL',
  },
  {
    id: 'ai-data-prompt-architect',
    domainKey: 'ai-data',
    title: '프롬프트 아키텍트',
    summary: '동일 과제에 대한 프롬프트 버전 비교',
    steps: ['목표 정의', '버전A 작성', '버전B 개선', '결과 비교'],
    studentTaskPrompt:
      '“4컷 체험기 스토리”를 더 생생하게 만드는 프롬프트 A/B를 작성하고, 결과 차이를 설명해줘.',
    difficulty: 'EASY',
  },

  // 2) 소프트웨어·앱
  {
    id: 'software-app-frontend-dev',
    domainKey: 'software-app',
    title: '프론트엔드 개발자',
    summary: '간단한 페이지 설계 → 컴포넌트 나누기 체험',
    steps: ['UI 스케치', '컴포넌트 분해', '상태/이벤트 설계', '리뷰'],
    studentTaskPrompt:
      '“진로체험 메인” UI를 3개 컴포넌트로 나누고, 각 책임과 상호작용을 한 문단으로 설명해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'software-app-mobile-dev',
    domainKey: 'software-app',
    title: '모바일 앱 개발자',
    summary: '간단한 화면 전환 플로우 설계',
    steps: ['화면 목록', '전환 조건', '예외케이스', '요약'],
    studentTaskPrompt:
      '“상담 → 분석 → 체험 → 결과” 네 화면의 전환 조건과 뒤로가기 동작 기준을 표 형식으로 설명해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'software-app-cloud-eng',
    domainKey: 'software-app',
    title: '클라우드 엔지니어',
    summary: '간단한 아키텍처 선택과 확장성 고려',
    steps: ['요구 정리', '구성 요소 선택', '비용/확장성', '리스크'],
    studentTaskPrompt:
      '동시 100명 체험을 가정하고, 인증/저장/배포 구성과 확장 전략을 다이어그램 설명으로 작성해줘.',
    difficulty: 'NORMAL',
  },

  // 3) 게임·메타버스
  {
    id: 'game-metaverse-game-planner',
    domainKey: 'game-metaverse',
    title: '게임 기획자',
    summary: '핵심 재미요소 3가지와 간단한 규칙서 만들기',
    steps: ['페르소나 설정', '핵심루프', '규칙 초안', '피드백 반영'],
    studentTaskPrompt:
      '중학생 대상 “직업 체험 게임”의 핵심루프와 규칙을 10문장 내로 써줘.',
    difficulty: 'EASY',
  },
  {
    id: 'game-metaverse-3d-artist',
    domainKey: 'game-metaverse',
    title: '3D 아티스트',
    summary: '장면 콘셉트·소품 리스트 작성',
    steps: ['무드보드 키워드', '오브젝트 목록', '라이팅 컨셉', '피드백'],
    studentTaskPrompt:
      '“우주 정거장 직업체험” 장면의 핵심 오브젝트 8개와 재질/조명을 표로 정리해줘.',
    difficulty: 'NORMAL',
  },
  {
    id: 'game-metaverse-vr-creator',
    domainKey: 'game-metaverse',
    title: 'VR 콘텐츠 크리에이터',
    summary: '몰입 과제 설계와 안전 가이드',
    steps: ['상호작용 정의', '타이밍/효과', '어지럼 방지', '요약'],
    studentTaskPrompt:
      '“응급구조 체험 VR”의 상호작용 5개와 시각/음향 피드백, 안전수칙을 목록으로 작성해줘.',
    difficulty: 'NORMAL',
  },

  // 4) 로봇·메카트로닉스
  {
    id: 'robot-mechatronics-robot-programmer',
    domainKey: 'robot-mechatronics',
    title: '로봇 프로그래머',
    summary: '라인 따라 이동/팔 제어의 개념 설계',
    steps: ['목표 행동', '센서/액추에이터', '의사코드', '테스트'],
    studentTaskPrompt:
      '“라인 트레이싱 + 물체 집기” 로봇 동작의 의사코드를 단계별로 작성해줘.',
    difficulty: 'NORMAL',
  },
  {
    id: 'robot-mechatronics-drone-tech',
    domainKey: 'robot-mechatronics',
    title: '드론 정비·조종',
    summary: '임무 계획서와 기본 안전 점검표',
    steps: ['비행 목적', '환경/리스크', '체크리스트', '임무 브리핑'],
    studentTaskPrompt:
      '“산불 감시” 드론 임무의 체크리스트와 비상대응 절차를 항목별로 정리해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'robot-mechatronics-automation-eng',
    domainKey: 'robot-mechatronics',
    title: '자동화 엔지니어',
    summary: '간단한 생산라인 흐름도와 병목 제거안',
    steps: ['프로세스 나열', '병목 식별', '대안 제시', '요약'],
    studentTaskPrompt:
      '3스테이션 조립라인의 흐름도와 병목 제거안을 도표+글로 설명해줘.',
    difficulty: 'NORMAL',
  },

  // 5) 우주·항공
  {
    id: 'aero-space-aircraft-maintainer',
    domainKey: 'aero-space',
    title: '항공정비사',
    summary: '점검 순서와 정비 로그 작성',
    steps: ['점검 항목', '이상 발견', '조치 기록', '검수 서명'],
    studentTaskPrompt:
      '단거리 여객기 출항 전 점검 체크리스트(10개)와 발견 시 조치 예시를 작성해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'aero-space-satellite-ops',
    domainKey: 'aero-space',
    title: '위성 운영 분석가',
    summary: '궤도/통신 제약을 고려한 관제요청서',
    steps: ['목표 관측', '시간창 계산(개념)', '우선순위', '요청서'],
    studentTaskPrompt:
      '태풍 관측을 위한 위성 관제요청서 개요(우선순위·시간창·데이터)를 작성해줘.',
    difficulty: 'ADV',
  },
  {
    id: 'aero-space-atc-sim',
    domainKey: 'aero-space',
    title: '항공교통관제(시뮬)',
    summary: '이착륙 순서·간격 조정 규칙서',
    steps: ['트래픽 상황', '분리 기준', '우선순위', '브리핑'],
    studentTaskPrompt:
      '혼잡 공항의 RWY 단일 사용 시 이착륙 순서 규칙과 예외 상황 대처를 정리해줘.',
    difficulty: 'NORMAL',
  },

  // 6) 의료·바이오
  {
    id: 'bio-medical-nurse',
    domainKey: 'bio-medical',
    title: '간호사',
    summary: '바이탈체크와 라포 형성 대화',
    steps: ['소개/라포', '바이탈 체크', '관찰 기록', '보고'],
    studentTaskPrompt:
      '학생 체험용으로 “초진 간단 바이탈체크 스크립트(대화문)”와 기록 예시를 작성해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'bio-medical-clinical-lab',
    domainKey: 'bio-medical',
    title: '임상병리사',
    summary: '검체 라벨링과 기본 분석 보고서',
    steps: ['채취·라벨', '장비 준비', '결과 기록', '보고서'],
    studentTaskPrompt:
      '혈액 기본검사 체험용으로 라벨링 규칙과 결과표 예시, 주의사항을 정리해줘.',
    difficulty: 'NORMAL',
  },
  {
    id: 'bio-medical-bio-researcher',
    domainKey: 'bio-medical',
    title: '바이오 연구원',
    summary: '가설-실험-결과 해석의 미니 사이클',
    steps: ['가설', '방법', '결과 가정', '해석'],
    studentTaskPrompt:
      '“카페인과 집중력” 가설에 대해 학생 실험 설계(도구·절차·기대결과)를 작성해줘.',
    difficulty: 'NORMAL',
  },

  // 7) 디자인·UX/UI
  {
    id: 'design-ux-ux-researcher',
    domainKey: 'design-ux',
    title: 'UX 리서처',
    summary: '인터뷰 질문지와 사용성 가설',
    steps: ['페르소나', '질문지(8문항)', '가설', '정리'],
    studentTaskPrompt:
      '“진로체험 키오스크” 사용성 인터뷰 질문지(8문항)와 개선 가설 3가지를 작성해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'design-ux-ui-designer',
    domainKey: 'design-ux',
    title: 'UI 디자이너',
    summary: '컴포넌트 토큰/버튼/카드 시스템 초안',
    steps: ['컬러/타이포', '버튼/카드', '상태 규칙', '샘플 섹션'],
    studentTaskPrompt:
      '접근성(명도 대비)을 고려한 버튼/카드 컴포넌트 가이드와 예시 문구를 작성해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'design-ux-motion-designer',
    domainKey: 'design-ux',
    title: '모션 디자이너',
    summary: '전환 애니메이션 원칙과 키프레임 구상',
    steps: ['톤·감정', '모션 원칙', '키프레임', '리뷰'],
    studentTaskPrompt:
      '“분석→체험→결과” 전환의 모션 원칙(속도·곡선·지연)을 원칙 5개/예시로 정리해줘.',
    difficulty: 'NORMAL',
  },

  // 8) 미디어·영상
  {
    id: 'media-film-video-editor',
    domainKey: 'media-film',
    title: '영상 편집자',
    summary: '컷 편집 기초와 BGM/자막 가이드',
    steps: ['컷리스트', 'BGM 톤', '자막 규칙', '검수'],
    studentTaskPrompt:
      '1분 체험스팟 영상의 컷리스트(10컷)와 자막/효과음 가이드를 표로 작성해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'media-film-youtube-producer',
    domainKey: 'media-film',
    title: '유튜브 프로듀서',
    summary: '콘셉트·타겟·썸네일 문구',
    steps: ['타겟 정의', '후킹 스크립트', '썸네일 카피', '업로드 체크'],
    studentTaskPrompt:
      '“진로체험 브이로그”의 훅 스크립트(10초)와 썸네일 문구 5가지를 제안해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'media-film-sound-designer',
    domainKey: 'media-film',
    title: '사운드 디자이너',
    summary: '장면별 효과음/배경음 설계',
    steps: ['장면 나누기', '효과음 매칭', 'BG tone', '믹스 체크'],
    studentTaskPrompt:
      '“분석완료 팡!” 등 체험 UI에 맞는 효과음 목록과 길이/톤을 표로 작성해줘.',
    difficulty: 'NORMAL',
  },

  // 9) 건축·인테리어
  {
    id: 'architecture-int-architect',
    domainKey: 'architecture-int',
    title: '건축가',
    summary: '대지 조건을 고려한 평면 개념',
    steps: ['요구 분석', '배치 개념', '동선', '검토'],
    studentTaskPrompt:
      '중규모 커뮤니티 센터의 공간 배치 개념과 동선을 도면 설명 형태로 작성해줘.',
    difficulty: 'NORMAL',
  },
  {
    id: 'architecture-int-space-designer',
    domainKey: 'architecture-int',
    title: '공간 디자이너',
    summary: '테마·재료·조명 콘셉트',
    steps: ['테마 보드', '재료/색', '조명', '요약'],
    studentTaskPrompt:
      '“미래 직업 체험존” 공간의 재료/색/조명 콘셉트를 무드 설명으로 작성해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'architecture-int-bim-modeler',
    domainKey: 'architecture-int',
    title: 'BIM 모델러',
    summary: '요소/속성/레벨 개념 정리',
    steps: ['요소 분류', '속성 정의', '레벨 설정', '리포트'],
    studentTaskPrompt:
      '교실 개조 프로젝트의 BIM 요소 목록과 속성 표(치수/재료/레벨)를 작성해줘.',
    difficulty: 'NORMAL',
  },

  // 10) 환경·에너지
  {
    id: 'env-energy-netzero-analyst',
    domainKey: 'env-energy',
    title: '탄소중립 분석가',
    summary: '활동별 탄소발자국 추정과 감축안',
    steps: ['활동 목록', '배출 추정', '감축안 3개', '우선순위'],
    studentTaskPrompt:
      '학교 일상(급식/통학/전기)에서 탄소배출 추정과 실행 가능한 감축안 3가지를 제안해줘.',
    difficulty: 'EASY',
  },
  {
    id: 'env-energy-renewable-eng',
    domainKey: 'env-energy',
    title: '재생에너지 엔지니어',
    summary: '태양광/풍력 기초 설계 비교',
    steps: ['현장 조건', '선택 기준', '장단점', '요약'],
    studentTaskPrompt:
      '교내 옥상 태양광과 소형 풍력 중 어느 것이 적합한지 비교표와 결론을 작성해줘.',
    difficulty: 'NORMAL',
  },
  {
    id: 'env-energy-environment-planner',
    domainKey: 'env-energy',
    title: '환경 플래너',
    summary: '캠페인 기획과 영향 평가',
    steps: ['문제 정의', '행동 캠페인', '홍보/측정', '평가'],
    studentTaskPrompt:
      '“노플라스틱 데이” 캠페인의 활동안, 포스터 카피, 효과 측정 지표를 제안해줘.',
    difficulty: 'EASY',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 헬퍼 함수들

/** 도메인 키로 3개 테마 가져오기 */
export function getThemesByDomain(domainKey: string): Theme[] {
  return THEMES.filter(t => t.domainKey === domainKey);
}

/** 여러 도메인에서 N개씩 랜덤 선택 (기본 1개씩) */
export function pickRandomThemesByDomains(domainKeys: string[], nPerDomain = 1): Theme[] {
  const picked: Theme[] = [];
  const rnd = <T,>(arr: T[], n: number) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, Math.min(n, a.length));
  };
  domainKeys.forEach(k => picked.push(...rnd(getThemesByDomain(k), nPerDomain)));
  return picked;
}

/** 단일 도메인에서 랜덤 1개 */
export function pickRandomThemeByDomain(domainKey: string): Theme | null {
  const arr = getThemesByDomain(domainKey);
  if (arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 테마 ID로 상세 찾기 */
export function findThemeById(id: string): Theme | undefined {
  return THEMES.find(t => t.id === id);
}

/** 관심분야(표시명) → 도메인 키 매핑 (UI에서 한글 표시 사용 시) */
export const INTEREST_TO_DOMAIN_KEY: Record<string, string> = {
  'AI·데이터': 'ai-data',
  '소프트웨어·앱': 'software-app',
  '게임·메타버스': 'game-metaverse',
  '로봇·메카트로닉스': 'robot-mechatronics',
  '우주·항공': 'aero-space',
  '의료·바이오': 'bio-medical',
  '디자인·UX/UI': 'design-ux',
  '미디어·영상': 'media-film',
  '건축·인테리어': 'architecture-int',
  '환경·에너지': 'env-energy',
};

/** 쿼리스트링 interests(한글 콤마) → 도메인키 배열로 정규화 */
export function normalizeInterestsToDomainKeys(interestsCSV: string): string[] {
  const names = interestsCSV.split(',').map(s => s.trim()).filter(Boolean);
  const keys = names.map(n => INTEREST_TO_DOMAIN_KEY[n]).filter(Boolean);
  // 중복 제거
  return Array.from
(new Set(keys));
}