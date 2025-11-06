// src/lib/careers/registry.ts
// 테마(분야) ↔ 문제은행 모듈 연결 허브 (1차 10개 분야)


import type { CareerFieldModule } from './types';


// ── 1차분: 10개 분야 모듈 임포트
import * as AI_DATA from './fields/ai-data';
import * as SOFTWARE_APP from './fields/software-app';
import * as ROBOT_MECHATRONICS from './fields/robot-mechatronics';
import * as CYBER_SECURITY from './fields/cyber-security';
import * as GAME_METAVERSE from './fields/game-metaverse';
import * as MEDICAL_BIO from './fields/medical-bio';
import * as NURSING_REHAB from './fields/nursing-rehab';
import * as ENV_ENERGY from './fields/env-energy';
import * as SPACE_AERO from './fields/space-aero';
import * as MOBILITY from './fields/mobility';


type FieldEntry = CareerFieldModule & { FIELD_KEY: string };
const asField = (m: any): FieldEntry => m as FieldEntry;


// 표시용 라벨
const FIELD_LABELS: Record<string, string> = {
  'ai-data': 'AI·데이터',
  'software-app': '소프트웨어·앱',
  'robot-mechatronics': '로봇·메카트로닉스',
  'cyber-security': '사이버보안',
  'game-metaverse': '게임·메타버스',
  'medical-bio': '의료·바이오',
  'nursing-rehab': '간호·재활',
  'env-energy': '환경·에너지',
  'space-aero': '우주·항공',
  'mobility': '자동차·모빌리티',
};


// 등록 레지스트리(중복 정의 없음)
export const MODULES: Record<string, FieldEntry> = {
  [AI_DATA.FIELD_KEY]: asField(AI_DATA),
  [SOFTWARE_APP.FIELD_KEY]: asField(SOFTWARE_APP),
  [ROBOT_MECHATRONICS.FIELD_KEY]: asField(ROBOT_MECHATRONICS),
  [CYBER_SECURITY.FIELD_KEY]: asField(CYBER_SECURITY),
  [GAME_METAVERSE.FIELD_KEY]: asField(GAME_METAVERSE),
  [MEDICAL_BIO.FIELD_KEY]: asField(MEDICAL_BIO),
  [NURSING_REHAB.FIELD_KEY]: asField(NURSING_REHAB),
  [ENV_ENERGY.FIELD_KEY]: asField(ENV_ENERGY),
  [SPACE_AERO.FIELD_KEY]: asField(SPACE_AERO),
  [MOBILITY.FIELD_KEY]: asField(MOBILITY),
};


// 유틸 3종
export function getField(fieldKey: string): FieldEntry | undefined {
  return MODULES[fieldKey];
}


export function getFieldLabel(fieldKey: string): string {
  return FIELD_LABELS[fieldKey] ?? fieldKey;
}


/**
 * 직업 인덱스(Map) 조회
 * - 모듈이 INDEX 제공 시 그대로 사용
 * - 없으면 BANK에서 title/desc로 즉시 생성
 */
export function getJobIndex(
  fieldKey: string
): Map<string, { title: string; desc?: string }> {
  const mod = getField(fieldKey);
  if (!mod) return new Map();


  // 1) 모듈에 INDEX가 있으면 그대로 반환
  if (mod.INDEX && mod.INDEX instanceof Map && mod.INDEX.size > 0) {
    const idx = mod.INDEX as Map<string, { title: string; desc?: string }>;
    return idx;
  }


  // 2) BANK 기반으로 안전하게 생성
  const idx = new Map<string, { title: string; desc?: string }>();
  if (mod.BANK) {
    for (const [jobKey, meta] of Object.entries(mod.BANK)) {
      const title = (meta as any)?.title ?? jobKey;
      const desc = (meta as any)?.desc ?? '';
      idx.set(jobKey, { title, desc });
    }
  }
  return idx;
}