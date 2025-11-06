// src/lib/careers/core.ts
export type GradeKey = 'ELEM' | 'MIDDLE' | 'HIGH';

export type Choice = {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
  correct?: boolean;
  note?: string; // 오답 선택 시 각주(힌트)
};

export type Q = {
  id: string;
  title: string;
  stem: string;
  choices: Choice[];
  tip?: string;       // 정답 선택 시 힌트
  explain?: string;   // 해설(정답/핵심개념)
};

export type JobBank = Record<GradeKey, Q[]>;

export type CareerMeta = {
  title: string;
  desc?: string;
};

export type ReportMeta = {
  summary: string;
  gradeFocus: string[];
  reading: string[];
  skills: string[];
  salary?: string;
  activities?: string[];
};

export type FieldModule = {
  FIELD_KEY: string;                                      // 'ai-data' 등
  INDEX: Map<string, CareerMeta & { desc?: string }>;     // 직업 인덱스
  BANK: Record<string, JobBank>;                          // 직업별 문제은행
  REPORT_META?: Record<string, Record<GradeKey, ReportMeta>>;
};