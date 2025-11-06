// src/lib/grade.ts
import { getJobBank } from './careers/fields/bank';


export type ScoreOut = {
  correct: number;
  total: number;
  percent?: number;
  grade?: 'S' | 'A' | 'B' | 'C' | 'D';
};


type Args = {
  fieldParam?: string | null;
  jobParam?: string | null;
  levelParam?: string | null;
  ansParam?: string | null;
  scoreParam?: string | null;
  totalParam?: string | null;
};


function parseAnswers(s?: string | null): string[] {
  return (s ?? '')
    .toUpperCase()
    .replace(/[^A-D|,\/\s]/g, '')
    .split(/[\s,\/|]+/)
    .filter(Boolean)
    .map((ch) => ch[0]);
}


function normalizeLevel(level?: string | null): 'ELEM' | 'MIDDLE' | 'HIGH' {
  const v = (level || '').trim();
  if (/고|HIGH/i.test(v)) return 'HIGH';
  if (/중|MIDDLE/i.test(v)) return 'MIDDLE';
  return 'ELEM';
}


function gradeLetter(pct: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  if (pct >= 90) return 'S';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B';
  if (pct >= 60) return 'C';
  return 'D';
}


/**
 * 채점 규칙(강제):
 * 1) 은행 문항 > 0 && 사용자 ans 존재  => 무조건 은행 채점
 * 2) (1)이 아니고 score/total 둘 다 유효  => 직접 점수 사용
 * 3) (2)도 아니고 ans만 존재              => 'A'를 정답 가정 간이채점
 * 4) 그 외                                 => 0/1
 */
export function computeScoreFromBankDirect(args: Args): ScoreOut {
  const field = String(args.fieldParam || 'ai-data');
  const job   = String(args.jobParam   || 'data-scientist');
  const level = normalizeLevel(args.levelParam);
  const user  = parseAnswers(args.ansParam);


  // ===== 1) 은행 + ans 있으면 무조건 은행 채점 =====
  try {
    const bank = getJobBank(field as any, job as any);
    const questions = bank[level] || [];
    if (questions.length > 0 && user.length > 0) {
      let correct = 0;
      const total = questions.length;
      const N = Math.min(user.length, total);


      for (let i = 0; i < N; i++) {
        const q: any = questions[i];
        const key: string | undefined = q?.choices?.find((c: any) => c?.correct)?.key;
        const userKey = (user[i] || '').toUpperCase();
        if (key && userKey && String(key).toUpperCase()[0] === userKey[0]) correct++;
      }


      const percent = Math.round((correct / Math.max(1, total)) * 100);
      return { correct, total, percent, grade: gradeLetter(percent) };
    }
  } catch (_) {
    // 은행 접근 실패 시 아래 fallback으로 진행
  }


  // ===== 2) 직접 점수 =====
  const s = Number(args.scoreParam ?? NaN);
  const t = Number(args.totalParam
 ?? NaN);
  if (Number.isFinite(s) && Number.isFinite(t) && t > 0) {
    const correct = Math.max(0, s);
    const total   = Math.max(1, t);
    const percent = Math.round((correct / total) * 100);
    return { correct, total, percent, grade: gradeLetter(percent) };
  }


  // ===== 3) ans만 있을 때 간이 채점 =====
  if (user.length > 0) {
    const correct = user.filter((a) => a === 'A').length;
    const total   = user.length;
    const percent = Math.round((correct / total) * 100);
    return { correct, total, percent, grade: gradeLetter(percent) };
  }


  // ===== 4) 기본 =====
  return { correct: 0, total: 1, percent: 0, grade: 'D' };
}
