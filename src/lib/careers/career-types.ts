// src/lib/careers/career-types.ts

/** 학년 구분 */
export type GradeKey = 'ELEM' | 'MIDDLE' | 'HIGH';

/** 문제 1문항 구조 */
export type QuestionItem = {
  id: string;
  question?: string;
  answerKey: string;
  skill: string;
};

/** 직무별 문항 묶음 */
export type JobBank = {
  ELEM: QuestionItem[];
  MIDDLE: QuestionItem[];
  HIGH: QuestionItem[];
};

/** 보고서 메타 정보 */
export type ReportMeta = {
  summary: string;
  gradeFocus: string[];
  reading: string[];
  skills: string[];
  salary: string;
  activities: string[];
};

/** 전체 분야 구조 */
export type FieldData = {
  label: string;
  inspirationalMessage: string;
  relatedCareers: { title: string; description: string }[];
  themes?: Record<string, any>;
  bank?: Record<string, any>;
  meta?: Record<string, any>;
};

/** 학년 변환 */
export function normalizeLevel(level?: string | null): GradeKey {
  const v = (level || '').trim();
  if (/고/.test(v)) return 'HIGH';
  if (/중/.test(v)) return 'MIDDLE';
  return 'ELEM';
}

/** 정답 파싱 */
export function parseAnswers(s?: string | null): string[] {
  return (s ?? '')
    .toUpperCase()
    .split(/[\s,\/|]+/)
    .filter(Boolean);
}

/** 등급 계산 */
export function gradeLetter(percent: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  if (percent >= 90) return 'S';
  if (percent >= 80) return 'A';
  if (percent >= 70) return 'B';
  if (percent >= 60) return 'C';
  return 'D';
}