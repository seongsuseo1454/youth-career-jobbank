// src/lib/careers/fields/bank.ts
// quiz 문제 BANK, 관련 유틸리티 및 데이터들을 담당합니다.

// ✨ 타입 정의 ✨
export type Choice = { key: 'a' | 'b' | 'c' | 'd'; text: string; correct?: boolean };
export type GradeKey = 'elem' | 'middle' | 'high'; // GradeKey를 소문자로 통일
export type Q = { id: string; title: string; stem: string; choices: Choice[]; tip?: string; grade: GradeKey; explanation?: string; hint?: string; }; // grade, explanation, hint 추가
export type JobBank = Record<GradeKey, Q[]>;

// Book 관련 타입
export type Book = { title: string; author: string; note?: string };
export type GradeBooks = Record<GradeKey, Book[]>;


// ---------- 유틸리티 함수들 ----------
const mc = (a: string, b: string, c: string, d?: string): Choice[] => {
  const arr: Choice[] = [
    { key: 'a', text: a }, { key: 'b', text: b }, { key: 'c', text: c },
  ];
  if (d) arr.push({ key: 'd', text: d });
  return arr;
};
const mark = (choices: Choice[], correctKey: Choice['key']) =>
  choices.map(c => ({ ...c, correct: c.key === correctKey }));



const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');



// ---------- 별칭(한글/변형 → 정규 키) ----------
export const JOB_ALIAS: Record<string, string> = { // export 추가
  '간호사': 'nurse',
  'registered-nurse': 'nurse',
  'rn': 'nurse',
  '의사': 'doctor',
};



// ---------- 테스트용 문제은행 (예: 간호/의사) ----------
const NURSE_BANK: JobBank = {
  elem: [ // GradeKey 타입에 맞춰 소문자 'elem'
    { id: 'n-e1', title: '손 위생의 중요성', stem: '감염 예방의 기본은?', choices: mark(mc('손 씻기', '모자 착용', '선풍기 사용'), 'a'), grade: 'elem' },
    { id: 'n-e2', title: '바이탈사인 이해', stem: '바이탈사인에 포함되지 않는 것은?', choices: mark(mc('혈압', '체중', '체온'), 'b'), grade: 'elem' },
    { id: 'n-e3', title: '환자 확인 원칙', stem: '투약 전 확인 원칙은?', choices: mark(mc('5 Rights', '색 확인', '모양 확인'), 'a'), grade: 'elem' },
    { id: 'n-e4', title: '효과적인 보고', stem: '효과적인 보고 방식은?', choices: mark(mc('SBAR', '자유서술', '이모티콘'), 'a'), grade: 'elem' },
    { id: 'n-e5', title: '팀워크의 필요성', stem: '병동 협업에 도움이 되는 태도는?', choices: mark(mc('협력', '개인주의', '지시만 수행'), 'a'), grade: 'elem' },
  ],
  middle: [
    { id: 'nm-1', title: '간호 윤리 기본', grade: 'middle', stem: '간호사의 주요 윤리 강령은?', choices: mark(mc('환자 존중', '내 마음대로', '돈 많이 벌기'), 'a'), explanation: '환자 존중은 간호 윤리의 핵심입니다.' },
    { id: 'nm-2', title: '주사 종류', grade: 'middle', stem: '피하 주사에 대한 설명으로 옳은 것은?', choices: mark(mc('피부 아래 지방층에 주사', '근육에 주사', '정맥에 주사'), 'a'), explanation: '피하 주사는 피부 바로 아래 지방층에 주사하는 방법입니다.' },
    { id: 'nm-3', title: '활력 징후 측정', grade: 'middle', stem: '성인 정상 혈압 범위는?', choices: mark(mc('120/80 mmHg', '150/100 mmHg', '90/60 mmHg'), 'a'), explanation: '성인의 정상 혈압은 120/80 mmHg 입니다.' },
    { id: 'nm-4', title: '응급 처치 기본', grade: 'middle', stem: '심폐소생술(CPR)의 첫 단계는?', choices: mark(mc('환자 반응 확인 및 도움 요청', '인공 호흡 시작', '제세동기 적용'), 'a'), explanation: '심폐소생술의 첫 단계는 환자의 반응을 확인하고 도움을 요청하는 것입니다.' },
    { id: 'nm-5', title: '감염 관리 원칙', grade: 'middle', stem: '병원 내 감염을 예방하는 가장 기본적인 방법은?', choices: mark(mc('손 위생 철저', '장갑 사용만', '마스크 착용만'), 'a'), explanation: '손 위생은 병원 내 감염을 예방하는 가장 중요하고 기본적인 방법입니다.' },
  ],
  high: [
    { id: 'nh-1', title: '약리학의 이해', grade: 'high', stem: '약물 투여 전 간호사가 가장 먼저 확인해야 할 것은?', choices: mark(mc('5 Rights (정확한 환자, 약물, 용량, 경로, 시간)', '환자의 기분', '약물 맛'), 'a'), explanation: '환자 안전을 위해 5 Rights는 필수 확인 사항입니다.' },
    { id: 'nh-2', title: '질병 관리 및 예방', grade: 'high', stem: '만성 질환 관리를 위한 교육 내용으로 가장 중요한 것은?', choices: mark(mc('자가 관리 능력 향상', '의존성 심화', '빠른 포기'), 'a'), explanation: '만성 질환은 환자 스스로 관리하는 능력이 매우 중요합니다.' },
    { id: 'nh-3', title: '중환자 간호', grade: 'high', stem: '중환자실에서 중심정맥관 삽입 환자 간호 시 우선적으로 고려할 것은?', choices: mark(mc('감염 예방 및 합병증 관리', '미용 상태', '음식 섭취'), 'a'), explanation: '감염 예방은 중환자 간호의 가장 중요한 부분입니다.' },
    { id: 'nh-4', title: '정신 건강 간호', grade: 'high', stem: '정신 질환을 가진 환자와 의사소통 시 가장 적절한 태도는?', choices: mark(mc('경청하고 지지적 태도', '판단하고 비판', '무시하고 회피'), 'a'), explanation: '환자의 이야기를 경청하고 지지하는 것이 중요합니다.' },
    { id: 'nh-5', title: '수술 전후 간호', grade: 'high', stem: '수술 후 출혈 위험이 있는 환자에게 가장 중요한 관찰 항목은?', choices: mark(mc('혈압, 맥박, 출혈 부위', '머리카락 빠짐', '피부 색깔'), 'a'), explanation: '수술 후 출혈 위험 관리는 활력징후와 출혈 부위 확인이 핵심입니다.' },
  ],
};



const DOCTOR_BANK: JobBank = {
  elem: [
    { id: 'd-e1', title: '진료 순서의 이해', stem: '올바른 순서는?', choices: mark(mc('문진→진찰→처방', '처방→문진→진찰', '진찰→처방→문진'), 'a'), grade: 'elem' },
    { id: 'd-e2', title: '의사의 위생', stem: '환자 보기 전 행동은?', choices: mark(mc('손 씻기/손소독', '전화', '문 닫기'), 'a'), grade: 'elem' },
    { id: 'd-e3', title: '청진기 사용법', stem: '청진기로 무엇을 듣나?', choices: mark(mc('심장/폐 소리', '혈액형', '체온'), 'a'), grade: 'elem' },
    { id: 'd-e4', title: '응급 상황 대처', stem: '긴급 도움 번호?', choices: mark(mc('119', '114', '123'), 'a'), grade: 'elem' },
    { id: 'd-e5', title: '건강한 생활 습관', stem: '건강 습관은?', choices: mark(mc('손 자주 씻기', '밤새 게임', '아침 거르기'), 'a'), grade: 'elem' },
  ],
  middle: [
    { id: 'dm-1', title: '의학 역사', grade: 'middle', stem: '근대 의학의 아버지로 불리는 인물은?', choices: mark(mc('히포크라테스', '갈릴레이', '뉴턴'), 'a'), explanation: '히포크라테스는 고대 그리스의 의사이자 서양 의학의 아버지로 불립니다.' },
    { id: 'dm-2', title: '인체 해부학', grade: 'middle', stem: '인체에서 가장 큰 장기는?', choices: mark(mc('피부', '뇌', '심장'), 'a'), explanation: '피부는 인체에서 가장 큰 장기입니다.' },
    { id: 'dm-3', title: '바이러스와 세균', grade: 'middle', stem: '독감은 무엇에 의해 발생하는 질병인가?', choices: mark(mc('바이러스', '세균', '곰팡이'), 'a'), explanation: '독감은 인플루엔자 바이러스에 의해 발생하는 감염병입니다.' },
    { id: 'dm-4', title: '질병 진단법', grade: 'middle', stem: '환자의 증상, 병력, 신체검사 등을 통해 질병을 추정하는 과정은?', choices: mark(mc('진단', '치료', '예방'), 'a'), explanation: '질병을 추정하는 과정을 진단이라고 합니다.' },
    { id: 'dm-5', title: '약물 작용', grade: 'middle', stem: '몸의 염증을 줄이는 데 주로 사용되는 약물은?', choices: mark(mc('소염제', '진통제', '항생제'), 'a'), explanation: '소염제는 염증을 억제하고 완화하는 약물입니다.' },
  ],
  high: [
    { id: 'dh-1', title: '심혈관 질환', grade: 'high', stem: '심근경색증의 주요 증상은?', choices: mark(mc('가슴 통증 (압박감)', '두통', '소화불량'), 'a'), explanation: '심근경색증의 가장 특징적인 증상은 심한 가슴 통증입니다.' },
    { id: 'dh-2', title: '암의 발생 원인', grade: 'high', stem: '암 발생에 가장 큰 영향을 미치는 요인은?', choices: mark(mc('생활 습관 (흡연, 식습관)', '스트레스', '운동 부족'), 'a'), explanation: '생활 습관은 암 발생에 매우 큰 영향을 미칩니다.' },
    { id: 'dh-3', title: '뇌졸중 종류', grade: 'high', stem: '뇌혈관이 막혀서 발생하는 뇌졸중의 종류는?', choices: mark(mc('뇌경색', '뇌출혈', '일과성 허혈 발작'), 'a'), explanation: '뇌경색은 뇌혈관이 막혀 뇌 조직이 손상되는 형태의 뇌졸중입니다.' },
    { id: 'dh-4', title: '당뇨병 관리', grade: 'high', stem: '당뇨병 환자의 혈당 관리에 가장 중요한 요소는?', choices: mark(mc('식이 조절과 운동', '수술', '과식'), 'a'), explanation: '당뇨병 관리는 식이 조절과 규칙적인 운동이 필수적입니다.' },
    { id: 'dh-5', title: '신장 기능 검사', grade: 'high', stem: '신장 기능을 평가하는 주요 혈액 검사는?', choices: mark(mc('크레아티닌 및 BUN', '혈당', '콜레스테롤'), 'a'), explanation: '크레아티닌과 BUN은 신장 기능을 나타내는 주요 지표입니다.' },
  ],
};


// ✨ ai-data BANK (이전에 네가 보내준 내용과 고등학생용 추가, title 추가 완료!)
const AI_DATA_BANK: JobBank = {
  elem: [
    { id: 'ds-el-1', title: '데이터 분석의 시작', grade: 'elem', stem: '데이터 분석의 첫 단계로 가장 알맞은 것은?', choices: mark(mc('문제를 이해하고 목표를 정한다', '결과를 먼저 정해놓는다', '아무 데이터나 모은다', '색깔만 예쁘게 만든다'), 'a'), hint: '질문이 정확해야 답도 정확해집니다.', explanation: '문제 정의가 올바르지 않으면 데이터와 방법 선택이 모두 틀어집니다.', },
    { id: 'ds-el-2', title: '시각화의 중요성', grade: 'elem', stem: '표와 그래프를 사용하는 주된 이유는?', choices: mark(mc('복잡한 정보를 한눈에 이해하기 위해', '데이터를 숨기기 위해', '용량을 줄이기 위해', '색칠 공부를 하기 위해'), 'a'), hint: '보기 쉽게 만들면 설명도 쉬워집니다.', explanation: '시각화는 전달력과 이해도를 높이는 핵심 도구입니다.', },
    { id: 'ds-el-3', title: '데이터의 정의', grade: 'elem', stem: '다음 중 “데이터”가 될 수 있는 것은?', choices: mark(mc('학교 급식 만족도 설문 결과', '구름 모양 그 자체', '사탕 맛의 느낌', '꿈의 내용 그대로'), 'a'), hint: '기록·저장이 가능한 정보여야 합니다.', explanation: '수치·텍스트 등 저장/분석 가능한 형태여야 데이터입니다.', },
    { id: 'ds-el-4', title: '평균의 의미', grade: 'elem', stem: '평균(average)은 무엇을 나타내나요?', choices: mark(mc('전체를 대표하는 값', '가장 큰 값', '가장 작은 값', '임의의 값'), 'a'), hint: '모든 값을 더해 개수로 나눕니다.', explanation: '평균은 중심 경향을 보여 주는 대표값입니다.', },
    { id: 'ds-el-5', title: '데이터 수집 윤리', grade: 'elem', stem: '데이터를 수집할 때 중요한 태도는?', choices: mark(mc('정확하고 정직하게 기록한다', '정답만 골라 적는다', '맘대로 값을 바꾼다', '틀린 값은 숨긴다'), 'a'), hint: '신뢰가 곧 품질입니다.', explanation: '윤리와 정확성이 데이터 과학의 기반입니다.', },
  ],
  middle: [
    { id: 'ds-mid-1', title: '결측치 처리', grade: 'middle', stem: '결측치(missing value)를 다루는 방법으로 적절하지 않은 것은?', choices: mark(mc('모두 0으로 바꾼다', '평균/중앙값으로 대체한다', '결측이 많은 열/행은 제거한다', '모델이 허용하면 결측을 별도 값으로 둔다'), 'a'), hint: '무분별한 0 대체는 편향을 유발합니다.', explanation: '데이터 특성에 맞는 적절한 대체/제거 전략이 필요합니다.', },
    { id: 'ds-mid-2', title: '데이터 스케일링', grade: 'middle', stem: '데이터 스케일링이 필요한 주된 이유는?', choices: mark(mc('특성 간 단위 차이를 줄여 학습 안정성 향상', '정답을 바꾸기 위해', '데이터 개수를 늘리기 위해', '색을 예쁘게 하기 위해'), 'a'), hint: '거리 기반 모델일수록 중요합니다.', explanation: '스케일 차이는 손실과 경사에 영향을 주므로 정규화가 필요합니다.', },
    { id: 'ds-mid-3', title: '데이터 분할 목적', grade: 'middle', stem: '훈련/검증/테스트 데이터로 나누는 목적은?', choices: mark(mc('일반화 성능을 공정하게 평가하기 위해', '훈련 속도를 늦추기 위해', '메모리를 낭비하기 위해', '정답을 숨기기 위해'), 'a'), hint: '과적합을 피하고 성능을 객관 평가합니다.', explanation: '분리 평가가 모델 과적합 여부를 검증하는 표준입니다.', },
    { id: 'ds-mid-4', title: '상자그림 활용', grade: 'middle', stem: '시각화에서 상자그림(Box plot)이 유용한 이유는?', choices: mark(mc('분포의 중심과 이상치를 한눈에 보여준다', '색상 팔레트를 꾸며준다', '샘플 수만 표시한다', '평균만 보여준다'), 'a'), hint: '중앙값과 IQR을 확인할 수 있습니다.', explanation: '상자그림은 분포 형태와 이상치를 직관적으로 드러냅니다.', },
    { id: 'ds-mid-5', title: '정확도의 의미', grade: 'middle', stem: '모델의 정확도(accuracy)가 85%라는 의미는?', choices: mark(mc('전체 예측 중 85%가 맞았다', '양성만 85% 맞췄다', '음성만 85% 맞췄다', '데이터가 85개 있다'), 'a'), hint: '이 지문은 현재 제공된 코드에 없습니다.', explanation: '정확도는 전체 예측 중 맞은 비율입니다.', },
  ],
  high: [ // ✨ 고등학생용 문제 추가! (title 포함)
    { id: 'ds-high-1', title: '분산-편향 트레이드오프', grade: 'high', stem: '모델의 분산과 편향(Bias-Variance Trade-off) 중, 복잡한 모델에서 주로 나타나는 문제는?', choices: mark(mc('높은 분산 (Overfitting)', '높은 편향 (Underfitting)', '낮은 분산', '낮은 편향'), 'a'), hint: '모델이 학습 데이터에 너무 과도하게 적합될 때 발생합니다.', explanation: '복잡한 모델은 학습 데이터의 노이즈까지 학습하여 새로운 데이터에 대한 예측 성능이 저하되는 과적합(Overfitting)으로, 이는 높은 분산 문제와 연결됩니다.', },
    { id: 'ds-high-2', title: '교차 검증의 목적', grade: 'high', stem: 'K-fold 교차 검증(Cross-validation)을 사용하는 주된 목적은?', choices: mark(mc('모델의 일반화 성능을 안정적으로 평가', '데이터를 효율적으로 수집', '모델 학습 속도 향상', '모델 해석력 증대'), 'a'), hint: '단일 훈련/테스트 분할의 문제점을 보완합니다.', explanation: 'K-fold 교차 검증은 데이터셋을 여러 번 나누어 모델의 성능을 평가함으로써, 데이터 분할 방식에 따른 성능 변동을 줄이고 모델의 일반화 성능을 더 신뢰성 있게 추정할 수 있게 합니다.', },
    { id: 'ds-high-3', title: '모델 성능 저하 원인', grade: 'high', stem: '머신러닝 모델 배포 후 지속적인 성능 저하가 발생할 때 가장 먼저 고려해야 할 원인은?', choices: mark(mc('데이터 드리프트 (Data Drift)', '모델의 하이퍼파라미터 변경', '배포 서버의 하드웨어 오류', '코드 리팩토링 미흡'), 'a'), hint: '시간이 지남에 따라 입력 데이터의 분포가 변하는 현상을 의미합니다.', explanation: '데이터 드리프트는 모델이 학습한 데이터 분포와 실제 서비스 환경의 데이터 분포가 달라져 모델의 예측 성능이 저하되는 현상입니다. 이는 MLOps에서 중요한 모니터링 대상입니다.', },
    { id: 'ds-high-4', title: '회귀 모델 평가 지표', grade: 'high', stem: '다음 중 회귀 모델의 성능 평가 지표로 가장 적합하지 않은 것은?', choices: mark(mc('정확도 (Accuracy)', '평균 제곱 오차 (MSE)', 'R-제곱 (R-squared)', '평균 절대 오차 (MAE)'), 'a'), hint: '주로 분류 모델에서 사용되는 지표입니다.', explanation: '정확도(Accuracy)는 주로 분류(Classification) 모델에서 전체 예측 중 올바르게 분류된 비율을 나타내는 지표입니다. 회귀(Regression) 모델은 연속적인 값을 예측하므로 오차의 크기를 측정하는 MSE, MAE 또는 설명력을 나타내는 R-squared와 같은 지표를 사용합니다.', },
    { id: 'ds-high-5', title: '데이터 윤리: 편향 감소', grade: 'high', stem: '데이터 윤리 측면에서, AI 모델 개발 시 데이터 편향(Bias)을 줄이기 위한 노력으로 가장 거리가 먼 것은?', choices: mark(mc('편향된 데이터를 의도적으로 수집', '다양하고 대표성 있는 데이터셋 확보', '알고리즘 공정성 지표 활용', '데이터 전처리 과정에서 편향 검출 및 완화'), 'a'), hint: '편향된 데이터는 모델의 불공정한 결과로 이어집니다.', explanation: '편향된 데이터를 의도적으로 수집하는 것은 데이터 편향을 줄이려는 노력과는 완전히 반대되는 행위입니다. 편향을 줄이기 위해서는 다양한 데이터를 수집하고, 편향을 검출하여 완화하는 기술적 노력이 필요합니다.', },
  ]
};


// ---------- 레지스트리 (모든 BANK 데이터를 통합) ----------
const BANK_COLLECTION: Record<string, Record<string, JobBank>> = {
  'nursing-rehab': {
    nurse: NURSE_BANK,
    'registered-nurse': NURSE_BANK,
    rn: NURSE_BANK,
  },
  'medical-bio': {
    doctor: DOCTOR_BANK,
  },
  'ai-data': { // AI/Data 분야 BANK 추가
    'data-scientist': AI_DATA_BANK,
    // 'ml-engineer': MLE_BANK,  <-- 여기에 다른 직무도 추가!
    // 'data-analyst': DA_BANK,
  },
  // 여기에 다른 필드의 BANK도 추가!
};

// ---------- 공개 API: getJobBank ----------
export function getJobBank(field: string, job: string): JobBank {
  const jobSlug = slug(job);
  const aliased = JOB_ALIAS[job] || JOB_ALIAS[jobSlug] || jobSlug;
  const found = BANK_COLLECTION[field]?.[aliased] || BANK_COLLECTION[field]?.[jobSlug] || BANK_COLLECTION[field]?.[job];
  if (found) return found;

  // 기본 템플릿(비상용)
  const fallback: JobBank = {
    elem: [
      { id: 'fb-e1', title: '기본 문항 1', stem: '기본 문항 1', choices: mark(mc('정답 A', '오답 B', '오답 C'), 'a'), grade: 'elem' },
      { id: 'fb-e2', title: '기본 문항 2', stem: '기본 문항 2', choices: mark(mc('오답 A', '정답 B', '오답 C'), 'b'), grade: 'elem' },
      { id: 'fb-e3', title: '기본 문항 3', stem: '기본 문항 3', choices: mark(mc('오답 A', '오답 B', '정답 C'), 'c'), grade: 'elem' },
      { id: 'fb-e4', title: '기본 문항 4', stem: '기본 문항 4', choices: mark(mc('정답 A', '오답 B', '오답 C'), 'a'), grade: 'elem' },
      { id: 'fb-e5', title: '기본 문항 5', stem: '기본 문항 5', choices: mark(mc('오답 A', '정답 B', '오답 C'), 'b'), grade: 'elem' },
    ],
    middle: [], high: [],
  };
  return fallback;
}

// ---------- 유틸리티 함수들: hashString, computeFromQuery, pickCounselorFromQuery ----------
export function hashString(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function gradeLetter(p: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  if (p >= 90) return 'S';
  if (p >= 80) return 'A';
  if (p >= 70) return 'B';
  if (p >= 60) return 'C';
  return 'D';
}
function seededWeights(n: number, seed: string) {
  const base = hashString(seed);
  const w: number[] = [];
  for (let i = 0; i < n; i++) {
    let s = base + i * 1013904223;
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    const u = ((s >>> 0) % 1000) / 1000;
    w.push(0.6 + u); // 0.6~1.6
  }
  return w;
}
function spreadPercent(n: number, pct: number, seed: string) {
  const ws = seededWeights(n, seed);
  const sum = ws.reduce((a, b) => a + b, 0);
  const raw = ws.map(w => (pct * w) / sum);
  const floor = raw.map(v => Math.floor(v));
  let remain = pct - floor.reduce((a, b) => a + b, 0);
  const order = raw
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac
    );
  for (let k = 0; k < remain; k++) floor[order[k % n].i] += 1;
  return floor;
}
type CatKey = 'ethics' | 'eda' | 'model' | 'perf' | 'sim'; // computeFromQuery 내부에서 사용되므로 여기서 정의

export function computeFromQuery(sp: URLSearchParams) {
  const name = sp.get('name') ?? '응시자';
  const jobTitleFromQuery = sp.get('jobTitle') || '';
  const jobKeyRaw = (sp.get('job') || jobTitleFromQuery || 'data-scientist').toLowerCase().replace(/\s+/g, '-');

  const ansRaw = sp.get('ans');
  const scoreRaw = sp.get('score');
  const totalRaw = sp.get('total');
  let correct = 0, total = 0;

  if (ansRaw && ansRaw.trim()) {
    const arr = (/[|,/\s]/.test(ansRaw) ? ansRaw.split(/[\s,\/|]+/) : ansRaw.split('')).map(x => x.trim().toUpperCase()).filter(Boolean);
    total = arr.length || 1;
    correct = arr.filter(x => x === 'A').length;
  } else {
    const s = Number(scoreRaw), t = Number(totalRaw);
    if (Number.isFinite(s) && Number.isFinite(t) && t > 0) {
      correct = Math.max(0, s);
      total = Math.max(1, t);
    } else { correct = 0; total = 1; }
  }

  const percent = Math.max(0, Math.min(100, Math.round((correct / Math.max(1, total)) * 100)));
  const grade = gradeLetter(percent);

  const keys: CatKey[] = ['ethics', 'eda', 'model', 'perf', 'sim'];
  const split = spreadPercent(5, percent, `${name}|${jobKeyRaw}|${percent}`);
  const categories = keys.map((k, i) => ({
    key: k,
    name: k === 'ethics' ? '데이터 윤리' : k === 'eda' ? '탐색적 분석(EDA)' : k === 'model' ? '모델링' : k === 'perf' ? '성능 평가' : '실무 응용',
    pct: split[i]
  }));

  return { name, jobKeyRaw, jobTitleFromQuery, correct, total, percent, grade, categories };
}

type CounselorKey = 'sejong' | 'ein' | 'yi' | 'lincoln' | 'socrates' | 'gandhi';

export function pickCounselorFromQuery(): CounselorKey {
  if (typeof window === 'undefined') return 'sejong';
  const sp = new URLSearchParams(window.location.search);
  const v = (sp.get('counselor') || '').toLowerCase();

  if (v.includes('세종') || v.includes('sejong')) return 'sejong';
  if (v.includes('이순신') || v.includes('yi')) return 'yi';
  if (v.includes('아인') || v.includes('ein')) return 'ein';
  if (v.includes('링컨') || v.includes('lincoln')) return 'lincoln';
  if (v.includes('소크라테스') || v.includes('socrates')) return 'socrates';
  if (v.includes('간디') || v.includes('gandhi')) return 'gandhi';

  return 'sejong';
}


// ---------- COUNSELORS, THEMES, BOOKS 관련 데이터 ----------
export const COUNSELORS: Record<CounselorKey, {
  display: string; title: string; badge: string; quote: string; checklist: string[];
  gradient: string; gradeS: string;
}> = {
  sejong: {
    display: '세종대왕', title: '고전지혜 기반 코칭', badge: '성실 · 검증 · 기록',
    quote: '오늘 배운 작은 지식이 내일의 큰 힘이 되길 바랍니다.',
    checklist: ['오늘 배운 개념 한 줄 요약', '가장 어려웠던 문제 복기 3줄', '내일 실천 1가지 예약'],
    gradient: 'from-slate-900 via-slate-800 to-slate-900', gradeS: 'from-amber-400 via-orange-500 to-red-500'
  },

  yi: {
    display: '이순신 장군', title: '불굴의 의지 코칭', badge: '원칙 · 책임 · 용기',
    quote: '끝까지 해보겠다는 마음이 가장 든든한 무기입니다.',
    checklist: ['포기하고 싶었던 순간 기록', '극복 방안 1가지 적기', '나만의 원칙 한 줄'],
    gradient: 'from-slate-800 via-gray-900 to-black', gradeS: 'from-gray-400 via-slate-500 to-zinc-600'
  },

  ein: {
    display: '아인슈타인', title: '탐구형 사고 코칭', badge: '호기심 · 실험 · 통찰',
    quote: '상상하는 만큼 성장합니다.',
    checklist: ['왜?로 시작하는 질문 2개', '가설-검증 루프 1회', '실험 결과 그림/표 1개'],
    gradient: 'from-indigo-900 via-blue-800 to-indigo-900', gradeS: 'from-yellow-300 via-amber-400 to-orange-500'
  },

  lincoln: {
    display: '링컨', title: '포용과 리더십 코칭', badge: '경청 · 인내 · 정직',
    quote: '실패는 다시 시작하라는 신호일 뿐입니다.',
    checklist: ['타인의 의견 경청하기', '실패에서 배운 점 1가지', '정직한 자기 평가'],
    gradient: 'from-stone-900 via-stone-800 to-stone-900', gradeS: 'from-stone-400 via-stone-500 to-gray-600'
  },

  socrates: {
    display: '소크라테스', title: '철학적 문답 코칭', badge: '성찰 · 논리 · 진리',
    quote: '스스로를 알아가는 시간이 가장 값집니다.',
    checklist: ['나에게 던지는 질문 3가지', '답변에 대한 반론해보기', '깨달은 점 요약'],
    gradient: 'from-emerald-900 via-teal-800 to-emerald-900', gradeS: 'from-emerald-400 via-teal-500 to-green-600'
  },

  gandhi: {
    display: '간디', title: '평화와 끈기 코칭', badge: '성실 · 평온 · 지속',
    quote: '부드러운 마음으로 꾸준히 가면 길이 열립니다.',
    checklist: ['감정 다스리기 연습', '꾸준히 할 작은 습관 정하기', '타인 돕기 1회'],
    gradient: 'from-orange-900 via-amber-800 to-orange-900', gradeS: 'from-orange-400 via-amber-500 to-yellow-600'
  },
};

export type Theme = { field: string; title: string; hero: string; highlights: string[]; }; // Theme 타입 정의

export const THEMES: Record<string, Theme> = {
  /* 1) AI·데이터 */
  'data-scientist': {
    field: 'AI·데이터', title: '데이터 사이언티스트',
    hero: '가설-검증으로 데이터를 근거로 바꾸는 문제 해결가.',
    highlights: ['가설·A/B 실험', '피처 엔지니어링', '해석 가능한 모델링']
  },
  'ml-engineer': {
    field: 'AI·데이터', title: 'ML 엔지니어',
    hero: '학습/추론 파이프라인과 배포 자동화로 가치를 전달.',
    highlights: ['파이프라인', 'MLOps 모니터링', '성능-비용 최적화']
  },
  'data-analyst': {
    field: 'AI·데이터', title: '데이터 분석가',
    hero: '데이터에서 통찰을 뽑아 실질적 결정을 돕는다.',
    highlights: ['SQL/대시보드', '지표 정의', '원인 분석(EDA)']
  },

  /* 2) 소프트웨어·앱 */
  'frontend': {
    field: '소프트웨어·앱', title: '프론트엔드 개발자',
    hero: '사용자 경험을 코드로 구현하는 인터페이스 장인.',
    highlights: ['반응형/성능', '접근성/테스트', '상태관리/아키']
  },
  'backend': {
    field: '소프트웨어·앱', title: '백엔드 개발자',
    hero: '안정적인 API와 데이터를 책임지는 시스템의 심장.',
    highlights: ['API/DB 설계', '보안/권한/로그', '확장성/캐시']
  },
  'mobile-dev': {
    field: '소프트웨어·앱', title: '모바일 앱 개발자',
    hero: '손 안의 경험을 네이티브로 빠르고 아름답게.',
    highlights: ['네이티브 성능', '오프라인 동기화', '스토어 배포']
  },

  /* 3) 로봇·메카트로닉스 */
  'robot-engineer': {
    field: '로봇·메카트로닉스', title: '로봇 엔지니어',
    hero: '센서-제어-동역학을 통합해 움직임을 설계.',
    highlights: ['SLAM/경로계획', '센서 융합', '실환경 튜닝']
  },
  'mechatronics-tech': {
    field: '로봇·메카트로닉스', title: '메카트로닉스 기술자',
    hero: '기계·전장을 잇는 현장의 문제 해결사.',
    highlights: ['기구/전장 통합', '시퀀스 제어', '안전표준 준수']
  },
  'automation-eng': {
    field: '로봇·메카트로닉스', title: '자동화 엔지니어',
    hero: '반복을 자동화해 품질과 생산성을 올린다.',
    highlights: ['PLC/SCADA', '라인 최적화', '장애 대응']
  },

  /* 4) 사이버보안 */
  'security-analyst': {
    field: '사이버보안', title: '보안 분석가',
    hero: '위협을 탐지·대응하여 시스템을 지킨다.',
    highlights: ['로그/이상징후', '침해대응', '취약점 리포트']
  },
  'pentester': {
    field: '사이버보안', title: '침투 테스터',
    hero: '윤리적 해킹으로 보안 취약을 사전에 제거.',
    highlights: ['리컨/익스플로잇', '재현/리포팅', '법·윤리 준수']
  },
  'soc-engineer': {
    field: '사이버보안', title: 'SOC 엔지니어',
    hero: '보안 관제의 실시간 방패.',
    highlights: ['SIEM 튜닝', '플레이북 자동화', '24x7 운영']
  },

  /* 5) 게임·메타버스 */
  'vr-designer': {
    field: '게임·메타버스', title: 'VR 디자이너',
    hero: '몰입형 UX를 설계해 가상과 현실을 잇는다.',
    highlights: ['인터랙션/UX 흐름', '프로토타입/테스트', '성능·멀미 저감']
  },
  'game-programmer': {
    field: '게임·메타버스', title: '게임 프로그래머',
    hero: '실시간 상호작용을 부드럽게 구현하는 엔진 장인.',
    highlights: ['엔진/렌더', '네트코드', '최적화/툴링']
  },
  'tech-artist': {
    field: '게임·메타버스', title: '테크 아티스트',
    hero: '아트와 엔진을 잇는 그래픽 파이프 전문가.',
    highlights: ['셰이더/머티리얼', '리깅/툴', '프로파일링']
  },

  /* 6) 의료·바이오 */
  'doctor': {
    field: '의료·바이오', title: '의사',
    hero: '근거중심으로 환자 안전과 치료를 설계.',
    highlights: ['문진/진찰/판독', '감염관리', '임상윤리/동의']
  },
  'pharmacist': {
    field: '의료·바이오', title: '약사',
    hero: '정확한 복약지도', // 여기에 highlights 추가 필요
    highlights: []
  },
  'registered-nurse': {
    field: '의료·바이오', title: '등록 간호사', // registered-nurse 추가
    hero: '환자에게 직접적인 간호를 제공하고 건강 회복을 돕는다.',
    highlights: ['환자 사정 및 계획', '투약 관리', '응급처치']
  },

  /* 7) 환경 과학 */
  'env-scientist': {
    field: '환경 과학', title: '환경 과학자',
    hero: '환경 문제의 원인을 파악하고 해결책을 연구한다.',
    highlights: ['데이터 분석', '환경 모델링', '정책 제안']
  },

  /* 8) 항공 우주 */
  'aero-engineer': {
    field: '항공 우주', title: '항공 우주 엔지니어',
    hero: '항공기, 우주선 등 비행체의 설계, 개발, 시험을 담당한다.',
    highlights: ['공기 역학', '구조 역학', '추진 시스템']
  },

  /* 9) 전기차 */
  'ev-engineer': {
    field: '전기차', title: '전기차 엔지니어',
    hero: '전기차의 핵심 부품인 배터리, 모터, 제어 시스템을 개발한다.',
    highlights: ['배터리 시스템', '파워트레인', '자율주행 기술']
  }
};

/** 공통 폴백(모든 테마에서 6권씩 보장) */
export const BOOKS_FALLBACK_BY_GRADE: GradeBooks = {
  elem: [
    { title: '그림으로 배우는 컴퓨터', author: '주니어과학' },
    { title: '쉽게 시작하는 코딩', author: '엔트리연구소' },
    { title: '생활 속 그래프', author: '생각학교' },
    { title: '재미있는 발명 이야기', author: '키즈북' },
    { title: '왜? 과학수학 시리즈(통계편)', author: '와이주니어' },
    { title: '그림으로 보는 직업의 세계', author: '드림키즈' },
  ],
  middle: [
    { title: '클린 코드(청소년 요약)', author: '로버트 C. 마틴' },
    { title: '네트워크 첫걸음', author: 'MIT Press' },
    { title: '데이터 시각화 입문', author: '사이토 고키' },
    { title: '알고리즘 사고력', author: 'CS for Teens' },
    { title: '프로그래머의 뇌', author: 'Felienne Hermans' },
    { title: '왜 공부하는가', author: '류승희' },
  ],
  high: [
    { title: '클린 코드', author: '로버트 C. 마틴' },
    { title: '리팩터링 2판', author: '마틴 파울러' },
    { title: 'HTTP 완벽 가이드', author: '데이비드 고울리 외' },
    { title: '소프트웨어 장인', author: '산드로 만쿠소' },
    { title: 'Practical Statistics', author: 'Peter Bruce' },
    { title: 'Deep Work', author: 'Cal Newport' },
  ],
};

/** 테마별 학년 6권 — 10개 키에 커스텀 제공(그 외는 폴백 병합) */
export const BOOKS_BY_THEME_GRADE: Record<string, Partial<GradeBooks>> = {
  /* 1) data-scientist */
  'data-scientist': {
    elem: [
      { title: '왜? 데이터 사이언스', author: '와이주니어' },
      { title: '수학이 좋아지는 빅데이터', author: '미래주니어' },
      { title: '생활 속 그래프', author: '생각학교' },
      { title: '그림으로 보는 통계', author: '그림책연구소' },
      { title: '숫자는 왜 중요할까', author: '매스키즈' },
      { title: '데이터 탐정단', author: '주니어랩' },
    ],
    middle: [
      { title: '데이터로 말하라', author: '콜 나사붐마 크냅릭' },
      { title: '파이썬 데이터 분석', author: '웨스 맥키니' },
      { title: '데이터 시각화 입문', author: '사이토 고키' },
      { title: '정의란 무엇인가', author: '마이클 샌델', note: '데이터 윤리' },
      { title: '통계 첫걸음', author: 'David Spiegelhalter' },
      { title: 'Effective Pandas', author: 'Matt Harrison' },
    ],
    high: [
      { title: '핸즈온 머신러닝', author: '오렐리앙 제롱' },
      { title: 'Feature Engineering', author: 'Alice Zheng' },
      { title: 'The Data Warehouse Toolkit', author: 'Ralph Kimball' },
      { title: 'Practical Statistics for Data Scientists', author: 'Peter Bruce' },
      { title: 'Designing ML Systems', author: 'Chip Huyen' },
      { title: 'Deep Learning with Python', author: 'François Chollet' },
    ],
  },

  /* 2) frontend */
  'frontend': {
    elem: [
      { title: '코딩을 처음 만나는 아이들을 위한 웹', author: '코딩쌤' },
      { title: '그림으로 배우는 인터넷', author: '주니어IT' },
      { title: 'UI/UX가 뭐예요?', author: '키즈디자인' },
      { title: '색채 감각 키우기', author: '컬러스쿨' },
      { title: '폰트와 글자의 비밀', author: '타이포키즈' },
      { title: '웹툰으로 배우는 HTML', author: '웹툰랩' },
    ],
    middle: [
      { title: '모던 자바스크립트 입문', author: '이소라' },
      { title: '타입스크립트 초급', author: '길벗' },
      { title: '리액트 첫걸음', author: 'Velopert' },
      { title: 'UI 디자인 패턴', author: 'Jenifer Tidwell' },
      { title: '접근성 가이드 A11y', author: 'W3C 번역팀' },
      { title: 'CSS 그리드/플렉스', author: 'Rachel Andrew' },
    ],
    high: [
      { title: 'You Don’t Know JS Yet', author: 'Kyle Simpson' },
      { title: 'Refactoring UI', author: 'Adam Wathan' },
      { title: 'JavaScript Patterns', author: 'Stoyan Stefanov' },
      { title: 'Designing Interface', author: 'Jenifer Tidwell' },
      { title: 'React in Action', author: 'Mark T. Thomas' },
      { title: 'TypeScript Deep Dive', author: 'Basarat Ali Syed' },
    ],
  },

  /* 3) backend */
  'backend': {
    elem: [
      { title: '그림으로 이해하는 서버', author: '주니어IT' },
      { title: '컴퓨터는 어떻게 동작할까요', author: '포켓과학' },
      { title: '데이터가 오가는 길', author: '네트워크키즈' },
      { title: '그림으로 배우는 데이터베이스', author: '주니어DB' },
      { title: '암호화의 비밀', author: '키즈보안' },
      { title: '그림으로 배우는 클라우드', author: '주니어클라우드' },
    ],
    middle: [
      { title: '그림으로 배우는 HTTP', author: '일본만화 IT' },
      { title: '운영체제 첫걸음', author: 'CS 스쿨' },
      { title: '데이터베이스 입문', author: 'Silberschatz 요약' },
      { title: '알고리즘 문제풀이', author: '백준 길잡이' },
      { title: '리눅스 커맨드 가이드', author: 'Linux Docs' },
      { title: 'API 디자인 입문', author: 'O\'Reilly' },
    ],
    high: [
      { title: 'HTTP 완벽 가이드', author: '데이비드 고울리 외' },
      { title: '클린 아키텍처', author: '로버트 C. 마틴' },
      { title: '데이터 집중 애플리케이션 설계', author: 'Martin Kleppmann' },
      { title: '실전 쿠버네티스', author: 'Kelsey Hightower' },
      { title: 'High Performance MySQL', author: 'Baron Schwartz' },
      { title: 'gRPC 입문', author: 'O\'Reilly' },
    ],
  },

  /* 4) robot-engineer */
  'robot-engineer': {
    elem: [
      { title: '로봇은 어떻게 움직일까?', author: '키즈로봇' },
      { title: '그림으로 배우는 센서', author: '주니어전자' },
      { title: '빛과 소리의 과학', author: '과학그림책' },
      { title: '레고로 만드는 로봇', author: 'LEGO Edu' },
      { title: '간단한 전기회로', author: '주니어전자' },
      { title: '움직이는 장난감 만들기', author: '메이커키즈' },
    ],
    middle: [
      { title: '아두이노 입문', author: 'Arduino Korea' },
      { title: '로봇공학 기초', author: 'MIT OCW 요약' },
      { title: '센서 융합 첫걸음', author: 'Robotics Lab' },
      { title: '초보자를 위한 제어', author: 'Control 101' },
      { title: 'ROS2 시작하기', author: 'The Construct' },
      { title: '라이다와 SLAM', author: 'Robotics 책' },
    ],
    high: [
      { title: 'Modern Robotics', author: 'Lynch & Park' },
      { title: 'Probabilistic Robotics', author: 'Thrun' },
      { title: 'Planning Algorithms', author: 'LaValle' },
      { title: 'Robotics, Vision and Control', author: 'Peter Corke' },
      { title: 'ROS2 실전', author: 'Off-Book' },
      { title: '제어공학', author: 'Ogata' },
    ],
  },

  /* 5) vr-designer */
  'vr-designer': {
    elem: [
      { title: '가상현실이 뭐에요?', author: '키즈메타' },
      { title: '3D로 보는 세상', author: '입체연구소' },
      { title: '색과 공간', author: '컬러스쿨' },
      { title: '놀이로 배우는 인터랙션', author: '키즈UX' },
      { title: '만들어보는 종이 헤드셋', author: '메이커키즈' },
      { title: '게임을 디자인해볼까', author: '키즈게임' },
    ],
    middle: [
      { title: 'The VR Book(요약)', author: 'Jason Jerald' },
      { title: '유니티 교과서', author: '하토야마' },
      { title: 'Don’t Make Me Think', author: 'Steve Krug' },
      { title: 'Game Feel', author: 'Steve Swink' },
      { title: 'UX Sketch Note', author: 'UX Studio' },
      { title: '3D 수학 기초', author: '수학연구소' },
    ],
    high: [
      { title: 'Game Programming Patterns', author: 'Robert Nystrom' },
      { title: 'Real-Time Rendering', author: 'Akenine-Möller 외' },
      { title: 'Unity in Action', author: 'Joseph Hocking' },
      { title: 'Level Design', author: 'Chris Totten' },
      { title: 'Human–Computer Interaction', author: 'Dix' },
      { title: 'Shader Graph 입문', author: 'Unity' },
    ],
  },

  /* 6) doctor */
  'doctor': {
    elem: [
      { title: '몸은 어떻게 움직일까?', author: '키즈바이오' },
      { title: '병원은 무엇을 할까?', author: '주니어의학' },
      { title: '손 씻기의 과학', author: '위생연구소' },
      { title: '응급상황 대처', author: '안전키즈' },
      { title: '우리 몸 지도', author: '해부학그림책' },
      { title: '건강한 습관', author: '키즈헬스' },
    ],
    middle: [
      { title: '의학의 역사', author: 'Roy Porter' },
      { title: '기초 생물학', author: 'Campbell 요약' },
      { title: '면역이란 무엇인가', author: 'New Scientist' },
      { title: '바이러스와 박테리아', author: 'DK' },
      { title: '임상의사 커뮤니케이션', author: 'MedComm' },
      { title: '의학윤리 개론', author: 'Beauchamp & Childress 요약' },
    ],
    high: [
      { title: 'Robbins 병리학 요약', author: 'Robbins' },
      { title: 'Harrison 내과학 요약', author: 'Harrison' },
      { title: '임상술기 핸드북', author: 'Elsevier' },
      { title: '근거중심의학', author: 'Sackett' },
      { title: '의료윤리', author: 'Beauchamp & Childress' },
      { title: '해부학 아틀라스', author: 'Netter' },
    ],
  },

  /* 7) registered-nurse */
  'registered-nurse': {
    elem: [
      { title: '병원에서 일하는 사람들', author: '그림책' },
      { title: '몸의 신호를 알아요', author: '헬스키즈' },
      { title: '감염 예방 동화', author: '안전키즈' },
      { title: '나의 하루 일기(위생)', author: '생활책' },
      { title: '친절한 마음', author: '인성교육' },
      { title: '약은 어떻게 쓸까?', author: '약초키즈' },
    ],
    middle: [
      { title: '간호학 개론(요약)', author: '국시원 요약' },
      { title: '바이탈사인 이해', author: 'Nursing Lab' },
      { title: '의사소통 스킬', author: 'NurseTalk' },
      { title: '감염관리 입문', author: 'CDC 요약' },
      { title: '투약 기본', author: '간호스쿨' },
      { title: '기록과 인계', author: '간호기록' },
    ],
    high: [
      { title: 'Fundamentals of Nursing', author: 'Potter & Perry' },
      { title: 'Clinical Nursing Skills', author: 'Taylor' },
      { title: 'Infection Control', author: 'WHO' },
      { title: 'Pharmacology Made Easy', author: 'Elsevier' },
      { title: 'Nursing Care Plans', author: 'Doenges' },
      { title: 'NANDA 진단', author: 'NANDA' },
    ],
  },

  /* 8) env-scientist */
  'env-scientist': {
    elem: [
      { title: '깨끗한 공기, 맑은 물', author: '환경키즈' },
      { title: '지구를 지켜요', author: '그린키즈' },
      { title: '분리수거의 비밀', author: '환경동화' },
      { title: '기후변화란?', author: '기후학교' },
      { title: '숲과 바다 이야기', author: '생태연구소' },
      { title: '작은 과학 실험', author: '메이커키즈' },
    ],
    middle: [
      { title: '기후변화 과학', author: 'IPCC 요약' },
      { title: '물과 공기 오염', author: '환경학 입문' },
      { title: '환경데이터 분석', author: 'R for Env' },
      { title: '생태계 서비스', author: '환경경제' },
      { title: 'LCA 기초', author: 'ISO 요약' },
      { title: '환경정책 이해', author: '정책학' },
    ],
    high: [
      { title: '환경공학 개론', author: 'Metcalf & Eddy 요약' },
      { title: '대기오염 제어', author: 'Seinfeld' },
      { title: '수질분석', author: 'Standard Methods 요약' },
      { title: '지속가능성 지표', author: 'UN SDGs' },
      { title: '환경모델링', author: 'Wiley' },
      { title: 'GIS와 환경', author: 'Esri' },
    ],
  },

  /* 9) aero-engineer */
  'aero-engineer': {
    elem: [
      { title: '비행기는 왜 날까?', author: '키즈항공' },
      { title: '하늘을 나는 원리', author: '과학그림책' },
      { title: '로켓과 우주', author: '우주키즈' },
      { title: '바람과 공기의 힘', author: '과학놀이' },
      { title: '프로펠러 만들기', author: '메이커키즈' },
      { title: '종이비행기 실험', author: '놀이과학' },
    ],
    middle: [
      { title: '항공역학 입문', author: 'John D. Anderson 요약' },
      { title: '구조/재료 기초', author: 'Mechanics 101' },
      { title: '풍동실험 첫걸음', author: 'AeroLab' },
      { title: 'CAD/CAE 맛보기', author: 'Autodesk' },
      { title: '항공전자 개론', author: 'Avionics' },
      { title: '시뮬레이션 입문', author: 'MATLAB 요약' },
    ],
    high: [
      { title: 'Fundamentals of Aerodynamics', author: 'Anderson' },
      { title: 'Aircraft Structures', author: 'Megson' },
      { title: 'Flight Dynamics', author: 'Etkin' },
      { title: 'Introduction to Flight', author: 'Anderson' },
      { title: 'Composite Materials', author: 'Jones' },
      { title: 'Gas Turbine Engineering', author: 'Boyce' },
    ],
  },

  /* 10) ev-engineer */
  'ev-engineer': {
    elem: [
      { title: '전기는 어떻게 움직일까?', author: '주니어전자' },
      { title: '움직이는 자동차 만들기', author: '메이커키즈' },
      { title: '배터리의 비밀', author: '키즈과학' },
      { title: '자석과 모터', author: '자석연구소' },
      { title: '친환경 에너지', author: '그린키즈' },
      { title: '교통과 안전', author: '안전키즈' },
    ],
    middle: [
      { title: 'EV의 원리', author: '전기차 입문' },
      { title: '배터리 기초', author: 'Battery 101' },
      { title: '모터/인버터', author: 'Powertrain Lab' },
      { title: '충전 인프라', author: 'Smart Grid' },
      { title: '안전 규격', author: 'ISO/SAE 요약' },
      { title: 'EV 제어', author: 'Control Basics' },
    ],
    high: [
      { title: 'Advanced Battery Technology', author: 'M.M. Rahman' },
      { title: 'Electric Vehicle Power Systems', author: 'Ali Emadi' },
      { title: 'Vehicle Control Systems', author: 'Uwe Kiencke' },
      { title: 'Automotive Cybersecurity', author: 'Mark Stamp' },
      { title: 'Power Electronics', author: 'Ned Mohan' },
      { title: 'Thermal Management of EVs', author: 'C.Y. Wang' },
    ],
  },
};

export function getBooksByGrade(themeKey: string): GradeBooks {
  const override = BOOKS_BY_THEME_GRADE[themeKey] || {};
  const merge = (grade: GradeKey): Book[] => {
    const a = override[grade] ?? [];
    const b = BOOKS_FALLBACK_BY_GRADE[grade];
    const merged: Book[] = [...a];
    for (const item of b) {
      if (merged.length >= 6) break;
      if (!merged.some(m => m.title === item.title && m.author === item.author)) {
        merged.push(item);
      }
    }
    return merged.slice(0, 6);
  };
  return { elem: merge('elem'), middle: merge('middle'), high: merge('high') };
}
