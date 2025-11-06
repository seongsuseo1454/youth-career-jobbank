import { CareerFieldModule } from '../types';

export const FIELD_KEY = 'nursing-rehab';

// ✅ 정답 분산(회전) 유틸: A/B/C/D 순환
type Key = 'A'|'B'|'C'|'D';
const ROT: Key[] = ['A','B','C','D'];
const pick = (i: number) => ROT[i % ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
  /* ─────────────────────────────────────────────────────────────
   * 1) 간호사 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'registered-nurse': {
    title: '간호사',
    desc: '환자 사정·투약·기본/전문 간호·교육',
    items: [
      // ── 초(5)
      { id:'rn-el-1', grade:'초', stem:'체 온 을 재는 이유는?', choices:[
        {key:'A',label:'건강 상태 변화를 빨리 알기 위해',footnote:'Vital signs'},
        {key:'B',label:'색을 고르기 위해'},
        {key:'C',label:'그림 그리기 위해'},
        {key:'D',label:'장식하려고'},
      ], answerKey: pick(0), hint:'활력징후는 기본 관찰입니다.', explanation:'체온·맥박·호흡·혈압은 급격한 악화를 조기 발견하게 해요.'},
      { id:'rn-el-2', grade:'초', stem:'손 위생이 중요한 가장 큰 이유는?', choices:[
        {key:'A',label:'감염을 예방하기 위해',footnote:'Hand hygiene'},
        {key:'B',label:'손을 시원하게'},
        {key:'C',label:'그림이 예뻐서'},
        {key:'D',label:'소리가 나서'},
      ], answerKey: pick(1), hint:'가장 싸고 강력한 감염관리예요.', explanation:'WHO 5 moments에 따라 손 씻기가 기본입니다.'},
      { id:'rn-el-3', grade:'초', stem:'환자에게 약을 줄 때 가장 먼저 확인할 것은?', choices:[
        {key:'A',label:'이름/등록번호',footnote:'Patient Identification'},
        {key:'B',label:'좋아하는 색'},
        {key:'C',label:'키/별자리'},
        {key:'D',label:'게임 점수'},
      ], answerKey: pick(2), hint:'오투약을 막아야 합니다.', explanation:'두 가지 이상 식별자로 환자 확인이 원칙입니다.'},
      { id:'rn-el-4', grade:'초', stem:'침대 난간을 올리는 이유는?', choices:[
        {key:'A',label:'낙상을 예방하기 위해',footnote:'Fall prevention'},
        {key:'B',label:'멋있어 보여서'},
        {key:'C',label:'사진 찍기 위해'},
        {key:'D',label:'소리를 내려고'},
      ], answerKey: pick(3), hint:'안전 간호의 핵심입니다.', explanation:'낙상은 흔한 병원 사고라 사전 예방이 중요합니다.'},
        { id:'rn-el-5', grade:'초', stem:'물 많이 마시기 교육이 필요한 경우는?', choices:[
        {key:'A',label:'변비/탈수 예방 등',footnote:'Hydration'},
        {key:'B',label:'색 칠하기'},
        {key:'C',label:'사진 모으기'},
        {key:'D',label:'악보 외우기'},
      ], answerKey: pick(4), hint:'연령/질환에 맞추어 지도.', explanation:'수분 섭취는 순환/배설에 중요합니다.'},

      // ── 중(5)
      { id:'rn-mid-1', grade:'중', stem:'투약 “5Right”에 포함되지 않는 것은?', choices:[
        {key:'A',label:'올바른 색'},
        {key:'B',label:'올바른 환자',footnote:'Right patient'},
        {key:'C',label:'올바른 약',footnote:'Right drug'},
        {key:'D',label:'올바른 용량·시간·경로',footnote:'Dose/Time/Route'},
      ], answerKey: pick(5), hint:'기본 안전 원칙입니다.', explanation:'Right documentation까지 6/7 Right로 확장합니다.'},
      { id:'rn-mid-2', grade:'중', stem:'통증사정 도구(NRS/FLACC)의 목적은?', choices:[
        {key:'A',label:'객관적으로 통증 정도를 파악',footnote:'Pain assessment'},
        {key:'B',label:'사진 점수'},
        {key:'C',label:'색상 점수'},
        {key:'D',label:'음악 점수'},
      ], answerKey: pick(6), hint:'중재 전후 비교가 핵심.', explanation:'숫자/표정/행동기반 도구를 환자에 맞추어 사용합니다.'},
      { id:'rn-mid-3', grade:'중', stem:'욕창 예방 간호로 적절한 것은?', choices:[
        {key:'A',label:'2시간마다 체위 변경·피부 관찰',footnote:'Pressure ulcer prevention'},
        {key:'B',label:'베개 제거'},
        {key:'C',label:'물 섭취 금지'},
        {key:'D',label:'체위 고정'},
      ], answerKey: pick(7), hint:'압력/습기/마찰 관리.', explanation:'영양·수분도 중요한 요소입니다.'},
      { id:'rn-mid-4', grade:'중', stem:'수술 후 심호흡/기침 교육의 목표는?', choices:[
        {key:'A',label:'무기폐/폐합병증 예방',footnote:'Pulmonary care'},
        {key:'B',label:'음량 증가'},
        {key:'C',label:'색상 향상'},
        {key:'D',label:'폰트 변경'},
      ], answerKey: pick(8), hint:'폐 확장·분비물 배출.', explanation:'인센티브 스피로미터를 함께 사용합니다.'},
      { id:'rn-mid-5', grade:'중', stem:'격리주의(접촉/비말/공기)에서 공통 핵심은?', choices:[
        {key:'A',label:'적절한 PPE와 손 위생',footnote:'Isolation/PPE'},
        {key:'B',label:'조명 변경'},
        {key:'C',label:'배경음 변경'},
        {key:'D',label:'벽지 변경'},
      ], answerKey: pick(9), hint:'전파 경로 차단.', explanation:'환자/환경/보호구 사용 교육이 중요합니다.'},

      // ── 고(5)
      { id:'rn-hi-1', grade:'고', stem:'정맥주사 인필트레이션 의심 소견은?', choices:[
        {key:'A',label:'부종/냉감/통증·주입지연',footnote:'Infiltration'},
        {key:'B',label:'색상 변화'},
        {key:'C',label:'음량 변화'},
        {key:'D',label:'향기 변화'},
      ], answerKey: pick(10), hint:'즉시 중지/거상/냉/온 적용.', explanation:'혈관외 유출은 조직 손상 위험이 있습니다.'},
      { id:'rn-hi-2', grade:'고', stem:'흡인성 폐렴 예방 교육은?', choices:[
        {key:'A',label:'식후 머리 30°상승·구강위생',footnote:'Aspiration prevention'},
        {key:'B',label:'물 금지'},
        {key:'C',label:'누운 자세 유지'},
        {key:'D',label:'기침 금지'},
      ], answerKey: pick(11), hint:'연하능 고려.', explanation:'식이 농도/섭취 속도 지도도 포함됩니다.'},
      { id:'rn-hi-3', grade:'고', stem:'만성질환 자기관리에 중요한 것은?', choices:[
        {key:'A',label:'교육·동기강화·자가모니터링',footnote:'Self-management'},
        {key:'B',label:'색상 기록'},
        {key:'C',label:'음악 감상'},
        {key:'D',label:'그림 감상'},
      ], answerKey: pick(12), hint:'행동 변화가 핵심.', explanation:'혈당·혈압·체중 등 자가측정과 피드백.'},
      { id:'rn-hi-4', grade:'고', stem:'의사소통 SBAR의 장점은?', choices:[
        {key:'A',label:'상황·배경·평가·제안의 구조화',footnote:'SBAR'},
        {key:'B',label:'문장 길이 증가'},
        {key:'C',label:'색상 증가'},
        {key:'D',label:'폰트 증가'},
      ], answerKey: pick(13), hint:'의료진 간 정확 전달.', explanation:'핵심 정보 손실을 줄입니다.'},
      { id:'rn-hi-5', grade:'고', stem:'근거기반간호(EBN)의 핵심?', choices:[
        {key:'A',label:'최신 근거+임상전문성+환자선호',footnote:'Evidence-based nursing'},
        {key:'B',label:'경험만 의존'},
        {key:'C',label:'관습만 따름'},
        {key:'D',label:'추측'},
      ], answerKey: pick(14), hint:'체계적 검토/적용.', explanation:'표준지침과 품질평가를 활용합니다.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 2) 물리치료사 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'physical-therapist': {
    title: '물리치료사',
    desc: '운동/수기치료·전기치료·보행훈련',
    items: [
      // 초(5)
      { id:'pt-el-1', grade:'초', stem:'허리를 굽히지 않고 물건 드는 방법은?', choices:[
        {key:'A',label:'무릎을 굽혀 들어 올린다',footnote:'Body mechanics'},
        {key:'B',label:'허리만 굽힌다'},
        {key:'C',label:'한 손으로 번쩍'},
        {key:'D',label:'발끝으로 민다'},
      ], answerKey: pick(0), hint:'허리 보호 자세.', explanation:'하지·코어 사용이 중요합니다.'},
      { id:'pt-el-2', grade:'초', stem:'균형 훈련이 필요한 경우는?', choices:[
        {key:'A',label:'넘어지기 쉬운 어르신',footnote:'Balance training'},
        {key:'B',label:'그림 그릴 때'},
        {key:'C',label:'책 읽을 때'},
        {key:'D',label:'사진 찍을 때'},
      ], answerKey: pick(1), hint:'낙상 예방.', explanation:'보행보조기와 병행합니다.'},
      { id:'pt-el-3', grade:'초', stem:'스트레칭의 효과는?', choices:[
        {key:'A',label:'근육 유연성 향상',footnote:'Flexibility'},
        {key:'B',label:'색상 향상'},
        {key:'C',label:'음량 향상'},
        {key:'D',label:'향기 향상'},
      ], answerKey: pick(2), hint:'부상 예방.', explanation:'운동 전후 정기적으로 시행합니다.'},
      { id:'pt-el-4', grade:'초', stem:'물리치료실의 러닝머신은 주로 무엇에 쓰일까요?', choices:[
        {key:'A',label:'보행·지구력 훈련',footnote:'Gait/endurance'},
        {key:'B',label:'그림 출력'},
        {key:'C',label:'음악 재생'},
        {key:'D',label:'문서 편집'},
      ], answerKey: pick(3), hint:'트레드밀.', explanation:'속도/경사 조절로 훈련합니다.'},
      { id:'pt-el-5', grade:'초', stem:'냉찜질(아이스)은 언제 사용하나요?', choices:[
        {key:'A',label:'급성 염좌 부기/통증 감소',footnote:'Cryotherapy'},
        {key:'B',label:'피부 건조할 때'},
        {key:'C',label:'색칠 공부'},
        {key:'D',label:'사진 수정'},
      ], answerKey: pick(4), hint:'20분 이내 권장.', explanation:'혈류 감소·부종 완화 목적입니다.'},

      // 중(5)
      { id:'pt-mid-1', grade:'중', stem:'전기자극치료(TENS)의 주 목적은?', choices:[
        {key:'A',label:'통증 조절',footnote:'Transcutaneous Electrical Nerve Stimulation'},
        {key:'B',label:'근육 파괴'},
        {key:'C',label:'뼈 성장'},
        {key:'D',label:'피부 착색'},
      ], answerKey: pick(5), hint:'Gate control theory.', explanation:'저주파 자극으로 통증 완화.'},
      { id:'pt-mid-2', grade:'중', stem:'ROM(관절운동범위) 증진에 도움이 되는 것은?', choices:[
        {key:'A',label:'수동/능동 관절운동',footnote:'Passive/Active ROM'},
        {key:'B',label:'음악 크기 변경'},
        {key:'C',label:'폰트 크기 변경'},
        {key:'D',label:'색상 변경'},
      ], answerKey: pick(6), hint:'구축 예방.', explanation:'통증/염증 고려하여 단계적 진행.'},
      { id:'pt-mid-3', grade:'중', stem:'보행훈련 시 올바른 보행보조기 사용 원칙은?', choices:[
        {key:'A',label:'키/팔 길이에 맞게 높이 조절',footnote:'Assistive device'},
        {key:'B',label:'무조건 낮게'},
        {key:'C',label:'무조건 높게'},
        {key:'D',label:'아무렇게나'},
      ], answerKey: pick(7), hint:'상지 20~30도 굴곡.', explanation:'편측 약화 시 반대 손 사용 등.'},
      { id:'pt-mid-4', grade:'중', stem:'저항운동에서 과부하 원칙이 의미하는 것은?', choices:[
        {key:'A',label:'점진적으로 부하를 증가',footnote:'Progressive overload'},
        {key:'B',label:'무게 고정'},
        {key:'C',label:'운동 금지'},
        {key:'D',label:'무작위 증가'},
      ], answerKey: pick(8), hint:'적응을 이끕니다.', explanation:'빈도/강도/시간 조절.'},
      { id:'pt-mid-5', grade:'중', stem:'도수치료(Manual Therapy)의 효과는?', choices:[
        {key:'A',label:'관절가동성/연부조직 이완',footnote:'Mobilization'},
        {key:'B',label:'시력 향상'},
        {key:'C',label:'청력 향상'},
        {key:'D',label:'미각 향상'},
      ], answerKey: pick(9), hint:'통증 감소.', explanation:'근막이완/관절가동술 포함.'},

      // 고(5)
      { id:'pt-hi-1', grade:'고', stem:'편마비 환자 보행 패턴 교정에서 중점은?', choices:[
        {key:'A',label:'대칭성·체중지지 훈련',footnote:'Symmetry/Weight bearing'},
        {key:'B',label:'속도만 상승'},
        {key:'C',label:'팔만 운동'},
        {key:'D',label:'발끝만 보기'},
      ], answerKey: pick(10), hint:'보행 주기 재교육.', explanation:'피드백/거울 치료 등을 병행.'},
      { id:'pt-hi-2', grade:'고', stem:'근력 강화 프로그램 설계 시 초기 강도 권장치는?', choices:[
        {key:'A',label:'1RM의 60~70% 범위',footnote:'Strength training'},
        {key:'B',label:'1%'},
        {key:'C',label:'300%'},
        {key:'D',label:'무작위'},
      ], answerKey: pick(11), hint:'개인화 필요.', explanation:'세트/반복/휴식 주기도 설계.'},
      { id:'pt-hi-3', grade:'고', stem:'만성요통의 비약물 중재 중 근거가 높은 것은?', choices:[
        {key:'A',label:'코어 안정화 운동/교육',footnote:'Core stabilization'},
        {key:'B',label:'향기 흡입'},
        {key:'C',label:'색상 보기'},
        {key:'D',label:'소리 듣기'},
      ], answerKey: pick(12), hint:'기능 회복.', explanation:'자기효능감 향상이 재발 예방에 기여.'},
      { id:'pt-hi-4', grade:'고', stem:'운동처방에서 FITT는 무엇의 약자?', choices:[
        {key:'A',label:'빈도·강도·시간·유형',footnote:'Frequency/Intensity/Time/Type'},
        {key:'B',label:'파일·이미지·텍스트·표'},
        {key:'C',label:'색상·명도·채도·각'},
        {key:'D',label:'앞·뒤·좌·우'},
      ], answerKey: pick(13), hint:'기본 프레임.', explanation:'건강상태/목표에 따라 조정.'},
      { id:'pt-hi-5', grade:'고', stem:'스포츠재활에서 RTP(Return To Play) 판단 기준은?', choices:[
        {key:'A',label:'통증/기능/근력/심리 준비',footnote:'Multifactorial'},
        {key:'B',label:'유니폼 색상'},
        {key:'C',label:'응원소리'},
        {key:'D',label:'스탠드 위치'},
      ], answerKey: pick(14), hint:'안전복귀.', explanation:'객관 지표와 단계적 복귀 프로토콜.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 3) 작업치료사 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'occupational-therapist': {
    title: '작업치료사',
    desc: '일상생활훈련·감각통합·보조공학',
    items: [
      // 초(5)
      { id:'ot-el-1', grade:'초', stem:'버튼 끼우기/신발끈 묶기 같은 훈련은?', choices:[
        {key:'A',label:'미세운동/ADL 훈련',footnote:'Activities of Daily Living'},
        {key:'B',label:'색칠놀이'},
        {key:'C',label:'노래부르기'},
        {key:'D',label:'달리기'},
      ], answerKey: pick(0), hint:'일상 독립성 향상.', explanation:'자조기술 강화가 목표입니다.'},
      { id:'ot-el-2', grade:'초', stem:'감각과민 아동에게 도움이 되는 중재는?', choices:[
        {key:'A',label:'감각통합치료',footnote:'Sensory integration'},
        {key:'B',label:'큰 소리 노출'},
        {key:'C',label:'빛 번쩍임'},
        {key:'D',label:'냄새 강하게'},
      ], answerKey: pick(1), hint:'자극 조절/점진 노출.', explanation:'감각 조절능 향상.'},
      { id:'ot-el-3', grade:'초', stem:'연필 잡기 어려울 때 쓸 수 있는 것은?', choices:[
        {key:'A',label:'보조연필그립',footnote:'Assistive grip'},
        {key:'B',label:'향수'},
        {key:'C',label:'스티커'},
        {key:'D',label:'테이프'},
      ], answerKey: pick(2), hint:'보조도구 활용.', explanation:'손 기능에 맞춘 적응기기 제공.'},
      { id:'ot-el-4', grade:'초', stem:'시간 관리 훈련에 쓰는 도구는?', choices:[
        {key:'A',label:'시각 타이머/체크리스트',footnote:'Visual schedule'},
        {key:'B',label:'색종이'},
        {key:'C',label:'크레파스'},
        {key:'D',label:'도장'},
      ], answerKey: pick(3), hint:'일과 예측/준비.', explanation:'실행기능 향상에 도움.'},
      { id:'ot-el-5', grade:'초', stem:'한 손 약한 아이에게 컵 잡기 돕는 방법은?', choices:[
        {key:'A',label:'양손 핸들 컵',footnote:'Adaptive equipment'},
        {key:'B',label:'색 바꾸기'},
        {key:'C',label:'향 바꾸기'},
        {key:'D',label:'노래 바꾸기'},
      ], answerKey: pick(4), hint:'안전/독립성.', explanation:'손 기능 보조기 사용.'},

      // 중(5)
      { id:'ot-mid-1', grade:'중', stem:'작업분석(Occupation analysis)의 목적은?', choices:[
        {key:'A',label:'과제 요구·환경·능력 매칭',footnote:'Task analysis'},
        {key:'B',label:'색 평가'},
        {key:'C',label:'음향 평가'},
        {key:'D',label:'조명 평가'},
      ], answerKey: pick(5), hint:'참여가능 전략.', explanation:'수정/분절/보조도구를 설계.'},
      { id:'ot-mid-2', grade:'중', stem:'자폐스펙트럼 아동 사회성 향상 전략은?', choices:[
        {key:'A',label:'사회적 이야기/롤플레이',footnote:'Social story'},
        {key:'B',label:'소리 크게'},
        {key:'C',label:'빛 번쩍'},
        {key:'D',label:'냄새 강하게'},
      ], answerKey: pick(6), hint:'예측가능성 제공.', explanation:'상황별 대응 연습.'},
      { id:'ot-mid-3', grade:'중', stem:'뇌졸중 후 어깨 아픈 환자 보호법은?', choices:[
        {key:'A',label:'어깨 아탈구 예방 자세/수기',footnote:'Subluxation care'},
        {key:'B',label:'강하게 당김'},
        {key:'C',label:'팔 끌기'},
        {key:'D',label:'무시'},
      ], answerKey: pick(7), hint:'지지·포지셔닝.', explanation:'슬링/테이핑 활용.'},
      { id:'ot-mid-4', grade:'중', stem:'인지재활에서 외부보조기억의 예는?', choices:[
        {key:'A',label:'메모/알람/일정앱',footnote:'External memory aids'},
        {key:'B',label:'향수'},
        {key:'C',label:'색종이'},
        {key:'D',label:'배경음'},
      ], answerKey: pick(8), hint:'보상 전략.', explanation:'메타인지 훈련과 병행.'},
      { id:'ot-mid-5', grade:'중', stem:'ADL 독립성 평가 지표는?', choices:[
        {key:'A',label:'바델 지수/카츠 지수',footnote:'Barthel/Katz'},
        {key:'B',label:'RGB 지수'},
        {key:'C',label:'BPM 지수'},
        {key:'D',label:'DPI 지수'},
      ], answerKey: pick(9), hint:'기능 수준 비교.', explanation:'목표 설정/퇴원 계획에 반영.'},

      // 고(5)
      { id:'ot-hi-1', grade:'고', stem:'보조공학(Assistive Technology)의 목표는?', choices:[
        {key:'A',label:'활동 참여·독립성 극대화',footnote:'Participation'},
        {key:'B',label:'장식'},
        {key:'C',label:'수집'},
        {key:'D',label:'진열'},
      ], answerKey: pick(10), hint:'개별 맞춤.', explanation:'환경·기술·과제의 적합성을 봅니다.'},
      { id:'ot-hi-2', grade:'고', stem:'상지 기능 평가로 널리 쓰이는 것은?', choices:[
        {key:'A',label:'아르메드/박스&블럭',footnote:'ARAT/Box&Block'},
        {key:'B',label:'시력표'},
        {key:'C',label:'청력검사'},
        {key:'D',label:'미각검사'},
      ], answerKey: pick(11), hint:'표준화 검사.', explanation:'신뢰도/타당도가 확보된 도구 사용.'},
      { id:'ot-hi-3', grade:'고', stem:'작업치료 목표 설정 시 SMART 원칙의 S는?', choices:[
        {key:'A',label:'구체적(Specific)',footnote:'SMART goal'},
        {key:'B',label:'무작위'},
        {key:'C',label:'감성적'},
        {key:'D',label:'즉흥적'},
      ], answerKey: pick(12), hint:'측정가능·현실적 이어야.', explanation:'시간기한·관련성 포함.'},
      { id:'ot-hi-4', grade:'고', stem:'편측무시 환자 훈련 전략은?', choices:[
        {key:'A',label:'시각 탐색 훈련/프리즘',footnote:'Neglect training'},
        {key:'B',label:'무시 지속'},
        {key:'C',label:'눈 감기'},
        {key:'D',label:'빛 끄기'},
      ], answerKey: pick(13), hint:'주의 전환.', explanation:'감각 단서 제공.'},
      { id:'ot-hi-5', grade:'고', stem:'퇴원 계획에서 중요한 것은?', choices:[
        {key:'A',label:'주거환경·돌봄자원·교육',footnote:'Discharge planning'},
        {key:'B',label:'포스터 색상'},
        {key:'C',label:'앨범 정리'},
        {key:'D',label:'폰트 교체'},
      ], answerKey: pick(14), hint:'연속성 보장.', explanation:'가정 내 안전/보조도구 점검.'},
    ],
  },
};
