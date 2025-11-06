'use client';
import SharePanel from '@/components/SharePanel';
import { useCareerStateStore } from '@/hooks/careerStoreState';
// useMemo를 사용해 summary 계산을 최적화하기 위해 React에서 import합니다.
import { useMemo } from 'react'; 

export default function ResultPage(){
  // 💡 최적화: 새로운 Store 이름을 사용하고, 필요한 상태만 선택자(selector)를 사용하여 가져옵니다.
  // 이로써 student와 jobPick 외의 상태 변경에는 리렌더링되지 않습니다.
  const student = useCareerStateStore(state => state.student);
  const jobPick = useCareerStateStore(state => state.jobPick);

  // 💡 useMemo를 사용하여 student나 jobPick이 변경될 때만 summary를 재생성합니다.
  const summary = useMemo(() => {
      // 코드가 훨씬 깔끔해졌죠?
      return [
          `이름: ${student.name ||'-'}`,
          `학교: ${student.school ||'-'}`,
          `학년·반: ${student.grade ||'-'} ${student.klass||''}`,
          `관심분야: ${student.interest ||'-'}`,
          `선택: ${jobPick ||'-'}`,
          '',
          `분석 요약: ${student.interest||'관심분야'} 적합도가 높고, 탐색 동기가 우수합니다.`,
          `강점: 몰입도/호기심 | 보완: 기초 이론 정리 + 발표 훈련`,
          `📚 처방: 관련 기초서 1권, 실습 키트, 주 2회 프로젝트 노트`,
      ].join('\n');
  }, [student, jobPick]); // student 객체나 jobPick 값이 변경될 때만 실행

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-extrabold mb-6">결과 보고서</h1>
      <SharePanel title="진로 체험 결과" summary={summary}/>
    </main>
  );
}