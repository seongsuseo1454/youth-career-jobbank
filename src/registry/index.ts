import type { QuestionSet, JobDef, Question } from '@/lib/careers/types';

// Question 타입에 맞게 수정
const FALLBACK_QUESTIONS: Question[] = [
  { id: 1, q: '이 직업에서 가장 중요한 핵심 역량은?', options: ['창의력', '분석력', '의사소통', '협업'], correct: 1 },
  { id: 2, q: '문제 해결 시 가장 먼저 고려해야 할 것은?', options: ['비용', '데이터의 정확성', '속도', '편의성'], correct: 1 },
  { id: 3, q: '팀 프로젝트에서 본인의 역할은?', options: ['조율자', '기록자', '분석가', '의사결정자'], correct: 2 },
  { id: 4, q: '기술 발전이 이 직업에 미치는 영향은?', options: ['작다', '중간', '크다', '없다'], correct: 2 },
  { id: 5, q: '이 직업의 윤리적 책임은?', options: ['중요하지 않다', '보통이다', '매우 중요하다', '상관없다'], correct: 2 },
];

export type Job = { 
  key: string; 
  title: string; 
  [k:string]: any 
};

const JOB_BANK: Record<string, Job[]> = {
  'data-scientist': [
    { key: 'data-analyst', title: 'Data Analyst' },
    { key: 'ml-engineer', title: 'ML Engineer' },
  ],
  'frontend': [
    { key: 'ui-engineer', title: 'UI Engineer' },
  ],
};

// 새로운 통합 함수
export function getJobBank(field: string, job?: string): Job[] | QuestionSet {
  if (!job) {
    return JOB_BANK[field] ?? [];
  }
  // Return QuestionSet with FALLBACK_QUESTIONS
  return {
    elem: FALLBACK_QUESTIONS,
    middle: FALLBACK_QUESTIONS,
    high: FALLBACK_QUESTIONS
  };
}

export function getJobIndex(field: string, job: string): JobDef {
  const list = JOB_BANK[field] ?? [];
  const index = list.findIndex(j => j.key === job);
  
  return {
    key: job,
    title: list[index]?.title ?? job,
    field,
    questions: {
      elem: FALLBACK_QUESTIONS,
      middle: FALLBACK_QUESTIONS,
      high: FALLBACK_QUESTIONS
    }
  };
}

export const REGISTRY = { JOB_BANK };
export default REGISTRY;