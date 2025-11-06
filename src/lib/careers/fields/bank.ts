// src/lib/careers/fields/bank.ts
// 문제은행 + 헬퍼 + getJobBank 공개 API (JSX 절대 금지)



export type Choice = { key: 'a'|'b'|'c'|'d'; text: string; correct?: boolean };
export type Q = { id: string; title: string; stem: string; choices: Choice[]; tip?: string };
export type GradeKey = 'ELEM' | 'MIDDLE' | 'HIGH';
export type JobBank = Record<GradeKey, Q[]>;



// ---------- 유틸 ----------
const mc = (a: string, b: string, c: string, d?: string): Choice[] => {
  const arr: Choice[] = [
    { key: 'a', text: a }, { key: 'b', text: b }, { key: 'c', text: c },
  ];
  if (d) arr.push({ key: 'd', text: d });
  return arr;
};
const mark = (choices: Choice[], correctKey: Choice['key']) =>
  choices.map(c => ({ ...c, correct: c.key === correctKey }));



const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');



// ---------- 별칭(한글/변형 → 정규 키) ----------
const JOB_ALIAS: Record<string, string> = {
  '간호사': 'nurse',
  'registered-nurse': 'nurse',
  'rn': 'nurse',
  '의사': 'doctor',
};



// ---------- 테스트용 문제은행 (예: 간호/의사) ----------
const NURSE_BANK: JobBank = {
  ELEM: [
    { id:'n-e1', title:'손 위생',   stem:'감염 예방의 기본은?',             choices: mark(mc('손 씻기','모자 착용','선풍기 사용'), 'a') },
    { id:'n-e2', title:'바이탈',     stem:'바이탈사인에 포함되지 않는 것은?', choices: mark(mc('혈압','체중','체온'), 'b') },
    { id:'n-e3', title:'환자 확인',  stem:'투약 전 확인 원칙은?',             choices: mark(mc('5 Rights','색 확인','모양 확인'), 'a') },
    { id:'n-e4', title:'의사소통',   stem:'효과적인 보고 방식은?',            choices: mark(mc('SBAR','자유서술','이모티콘'), 'a') },
    { id:'n-e5', title:'팀워크',     stem:'병동 협업에 도움이 되는 태도는?',    choices: mark(mc('협력','개인주의','지시만 수행'), 'a') },
  ],
  MIDDLE: [],
  HIGH: [],
};



const DOCTOR_BANK: JobBank = {
  ELEM: [
    { id:'d-e1', title:'진료 순서', stem:'올바른 순서는?',       choices: mark(mc('문진→진찰→처방','처방→문진→진찰','진찰→처방→문진'), 'a') },
    { id:'d-e2', title:'손 위생',   stem:'환자 보기 전 행동은?', choices: mark(mc('손 씻기/손소독','전화','문 닫기'), 'a') },
    { id:'d-e3', title:'청진기',   stem:'무엇을 듣나?',         choices: mark(mc('심장/폐 소리','혈액형','체온'), 'a') },
    { id:'d-e4', title:'응급전화', stem:'긴급 도움 번호?',       choices: mark(mc('119','114','123'), 'a') },
    { id:'d-e5', title:'생활 습관', stem:'건강 습관은?',         choices: mark(mc('손 자주 씻기','밤새 게임','아침 거르기'), 'a') },
  ],
  MIDDLE: [], HIGH: [],
};



// ---------- 레지스트리 ----------
const BANK: Record<string, Record<string, JobBank>> = {
  'nursing-rehab': {
    nurse: NURSE_BANK,
    'registered-nurse': NURSE_BANK,
    rn: NURSE_BANK,
  },
  'medical-bio': {
    doctor: DOCTOR_BANK,
  },
};

// ---------- 공개 API ----------
export function getJobBank(field: string, job: string): JobBank {
  const jobSlug = slug(job);
  const aliased = JOB_ALIAS[job] || JOB_ALIAS[jobSlug] || jobSlug;
  const found = BANK[field]?.[aliased] || BANK[field]?.[jobSlug] || BANK[field]?.[job];
  if (found) return found;



  // 기본 템플릿(비상용)
  const fallback: JobBank = {
    ELEM: [
      { id:'fb-e1', title:'기본1', stem:'기본 문항 1', choices: mark(mc('정답 A','오답 B','오답 C'),'a') },
      { id:'fb-e2', title:'기본2', stem:'기본 문항 2', choices: mark(mc('오답 A','정답 B','오답 C'),'b') },
      { id:'fb-e3', title:'기본3', stem:'기본 문항 3', choices: mark(mc('오답 A','오답 B','정답 C'),'c') },
      { id:'fb-e4', title:'기본4', stem:'기본 문항 4', choices: mark(mc('정답 A','오답 B','오답 C'),'a') },
      { id:'fb-e5', title:'기본5', stem:'기본 문항 5', choices: mark(mc('오답 A','정답 B','오답 C'),'b') },
    ],
    MIDDLE: [], HIGH: [],
  };
  return fallback;
}
