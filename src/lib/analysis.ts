export function analyzeSimple(input:{interest?:string; theme?:string;}) {
  return {
    summary: `${input.interest
 ?? '일반'} 관심기반 요약`,
    topJobs: ['테마 A', '테마 B', '테마 C'],
    reason: '샘플 분석(규칙기반 폴백)',
  };
}
// [제목] 분석 API 호출 래퍼 (프론트)
// src/lib/analyze.ts
export async function analyzeCareer(input: any) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/analyze', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'X-License': process.env.NEXT_PUBLIC_LICENSE_KEY! },
    body: JSON.stringify(input)
  });
  if(!res.ok) throw new Error('분석 서버 거부/오류');
  return res.json();
}