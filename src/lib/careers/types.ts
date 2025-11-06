// src/lib/careers/types.ts
export type ChoiceKey = 'A' | 'B' | 'C' | 'D';

export type QuizChoice = {
  key: ChoiceKey;
  label: string;
  footnote?: string;
};

export type QuizItem = {
  id: string;
  grade: '초' | '중' | '고';
  stem: string;
  choices: QuizChoice[];
  answerKey: ChoiceKey;
  hint?: string;
  explanation?: string;
};

export type JobBank = {
  title: string;
  desc: string;
  items: QuizItem[];
};

// 직업 인덱스(옵션): 모듈이 미리 만들어 제공할 수도 있고, registry가 BANK로부터 생성할 수도 있음
export type JobIndex = Map<string, { title: string; desc?: string }>;

// 각 분야 모듈이 충족해야 하는 최소 형태
export type CareerFieldModule = {
  // 각 파일에서 별도로 export const FIELD_KEY 제공 (타입상 필수값은 아님)
  BANK: Record<string, JobBank>;
  INDEX?: JobIndex; // ← registry.ts에서 참조하므로 옵션으로 명시
};

export type Question = {
  id: number;
  q: string;
  options: string[];
  correct: number;
};

export type QuestionSet = {
  elem: Question[];
  middle: Question[];
  high: Question[];
};

// src/lib/careers/types.ts
export type JobDef = {
  key: string;
  title: string;
  field: string;
  questions?: QuestionSet;  // 추가
};
