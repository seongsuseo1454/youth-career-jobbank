// [제목] 커리어 레지스트리(10개 관심분야 통합: 테마목록/문제은행 집결)
import type { ReactNode } from 'react';

/* ===== 공통 타입 ===== */
export type FieldKey =
  | 'ai-data'
  | 'software-app'
  | 'robotics-mechatronics'
  | 'cybersecurity'
  | 'game-metaverse'
  | 'medical-bio'
  | 'nursing-rehab'
  | 'environment-energy'
  | 'space-aerospace'
  | 'automotive-mobility';

export type GradeKey = 'ELEM' | 'MIDDLE' | 'HIGH';

export type Choice = { key: 'A' | 'B' | 'C' | 'D'; text: string; correct?: boolean; note?: string };
export type Question = {
  id: string;                 // 고유ID
  title: string;              // 소제목(예: 핵심 개념)
  stem: string;               // 문제 본문
  tip?: string;               // 정답 맞춘 후 보조팁
  choices: Choice[];          // 4지선다
};

export type QuestionBank = {
  ELEM?: Question[];
  MIDDLE?: Question[];
  HIGH?: Question[];
};

export type JobKey = string;

export type JobMeta = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export type JobBankByJob = Record<JobKey, QuestionBank>;
export type JobIndexMap = Map<JobKey, JobMeta>;

export type FieldModule = {
  JOB_INDEX?: JobIndexMap | Array<{ key: JobKey; title: string; description?: string }>;
  JOB_BANK?: JobBankByJob;
};

/* ===== 안전 임포트 유틸 ===== */
function loadFieldModule(path: string): FieldModule {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(path);
    return mod ?? {};
  } catch {
    return {};
  }
}

/* ===== 각 분야 모듈 불러오기 (없어도 앱이 깨지지 않도록) ===== */
const FIELD_PATHS: Record<FieldKey, string> = {
  'ai-data':                '@/lib/careers/fields/ai-data',
  'software-app':           '@/lib/careers/fields/software-app',
  'robotics-mechatronics':  '@/lib/careers/fields/robotics-mechatronics',
  'cybersecurity':          '@/lib/careers/fields/cybersecurity',
  'game-metaverse':         '@/lib/careers/fields/game-metaverse',
  'medical-bio':            '@/lib/careers/fields/medical-bio',
  'nursing-rehab':          '@/lib/careers/fields/nursing-rehab',
  'environment-energy':     '@/lib/careers/fields/environment-energy',
  'space-aerospace':        '@/lib/careers/fields/space-aerospace',
  'automotive-mobility':    '@/lib/careers/fields/automotive-mobility',
};

type RegistryItem = { index: JobIndexMap; bank: JobBankByJob };
const REGISTRY: Partial<Record<FieldKey, RegistryItem>> = {};

// 모듈 정규화
function normalizeIndex(src: FieldModule['JOB_INDEX']): JobIndexMap {
  if (!src) return new Map();
  if (src instanceof Map) return src;
  if (Array.isArray(src)) {
    return new Map(src.map((v) => [v.key, { title: v.title, description: v.description }]));
  }
  return new Map();
}

function normalizeBank(src: FieldModule['JOB_BANK']): JobBankByJob {
  if (!src || typeof src !== 'object') return {};
  return src;
}

// 레지스트리 채우기
(Object.keys(FIELD_PATHS) as FieldKey[]).forEach((field) => {
  const mod = loadFieldModule(FIELD_PATHS[field]);
  REGISTRY[field] = {
    index: normalizeIndex(mod.JOB_INDEX),
    bank: normalizeBank(mod.JOB_BANK),
  };
});

/* ===== 외부로 제공하는 API ===== */

// (1) 테마 카드에 쓰는 통합 목록 (themes/page.tsx에서 사용)
export const CAREER_THEMES: Array<{ field: FieldKey; job: JobKey; title: string; description?: string }> =
  (Object.keys(REGISTRY) as FieldKey[]).flatMap((field) => {
    const item = REGISTRY[field];
    if (!item) return [];
    return Array.from
(item.index.entries()).map(([job, meta]) => ({
      field,
      job,
      title: meta.title,
      description: meta.description
,
    }));
  });

// (2) 특정 분야의 직업 메타 인덱스
export function getJobIndex(field: string | FieldKey): JobIndexMap {
  const f = field as FieldKey;
  return REGISTRY[f]?.index ?? new Map();
}

// (3) 특정 직업의 학년별 문제은행
export function getJobBank(field: string | FieldKey, job: string): QuestionBank | undefined {
  const f = field as FieldKey;
  const bank = REGISTRY[f]?.bank ?? {};
  return bank[job] ?? undefined;
}