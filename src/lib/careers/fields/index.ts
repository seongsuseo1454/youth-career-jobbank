import type { GradeKey, ReportMeta } from '@/lib/careers/career-types';

export const INDEX = new Map([
  ['data-scientist', { title: '데이터 사이언티스트', desc: '문제 정의 → 모델링 → 평가' }],
  ['ai-researcher', { title: '인공지능 연구원', desc: 'AI 알고리즘 개발·검증' }],
  ['bigdata-analyst', { title: '빅데이터 분석가', desc: '데이터 수집·분석·시각화' }],
]);

export const AI_DATA_BANK: Record<string, any> = {
  'data-scientist': { ELEM: [], MIDDLE: [], HIGH: [] },
  'ai-researcher': { ELEM: [], MIDDLE: [], HIGH: [] },
  'bigdata-analyst': { ELEM: [], MIDDLE: [], HIGH: [] },
};

export const AI_DATA_REPORT_META: Record<string, Record<GradeKey, ReportMeta>> = {
  'data-scientist': {
    ELEM: { summary: '', gradeFocus: [], reading: [], skills: [], salary: '', activities: [] },
    MIDDLE: { summary: '', gradeFocus: [], reading: [], skills: [], salary: '', activities: [] },
    HIGH: { summary: '', gradeFocus: [], reading: [], skills: [], salary: '', activities: [] },
  },
};