import { CareerFieldModule } from '../types';

export const FIELD_KEY = 'mobility';

// ✅ 정답 분산(회전) 유틸
type Key = 'A'|'B'|'C'|'D';
const ROT: Key[] = ['A','B','C','D'];
const pick = (i: number) => ROT[i % ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
  /* ─────────────────────────────────────────────────────────────
   * 1) 자동차공학자 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'automotive-engineer': {
    title: '자동차공학자',
    desc: '차체/섀시/파워트레인 설계·시험',
    items: [
      // ── 초(5)
      { id:'au-el-1', grade:'초', stem:'자동차 바퀴가 도는 이유는?', choices:[
        {key:'A',label:'엔진이나 모터가 힘을 주기 때문',footnote:'Powertrain'},
        {key:'B',label:'색이 예뻐서'},
        {key:'C',label:'바람 때문'},
        {key:'D',label:'음악 때문'},
      ], answerKey: pick(0), hint:'동력 전달.', explanation:'기어/축을 통해 바퀴로 토크 전달.'},
      { id:'au-el-2', grade:'초', stem:'브레이크는 무엇을 줄일까요?', choices:[
        {key:'A',label:'속도',footnote:'Deceleration'},
        {key:'B',label:'색상'},
        {key:'C',label:'향기'},
        {key:'D',label:'소리'},
      ], answerKey: pick(1), hint:'마찰력 활용.', explanation:'패드-디스크 마찰로 운동에너지 감소.'},
      { id:'au-el-3', grade:'초', stem:'안전벨트를 하는 이유는?', choices:[
        {key:'A',label:'몸을 지켜주기 위해',footnote:'Restraint'},
        {key:'B',label:'멋있어 보여서'},
        {key:'C',label:'사진 찍기 위해'},
        {key:'D',label:'노래 부르기 위해'},
      ], answerKey: pick(2), hint:'사고 시 보호.', explanation:'에어백과 함께 탑승자 보호.'},
      { id:'au-el-4', grade:'초', stem:'타이어 공기압이 너무 낮으면?', choices:[
        {key:'A',label:'연비/안전 저하',footnote:'Rolling resistance'},
        {key:'B',label:'빛남'},
        {key:'C',label:'향↑'},
        {key:'D',label:'소리↑'},
      ], answerKey: pick(3), hint:'정기 점검.', explanation:'마모/발열/제동거리 악화.'},
      { id:'au-el-5', grade:'초', stem:'깜빡이(방향지시등)의 역할은?', choices:[
        {key:'A',label:'진로 변경 예고',footnote:'Turn signal'},
        {key:'B',label:'음악 재생'},
        {key:'C',label:'냄새 발산'},
        {key:'D',label:'색 바꾸기'},
      ], answerKey: pick(4), hint:'소통이 안전.', explanation:'주변 차량과 의사표시.'},

      // ── 중(5)
      { id:'au-mid-1', grade:'중', stem:'서스펜션의 주 역할은?', choices:[
        {key:'A',label:'승차감/조종 안정성 확보',footnote:'Suspension'},
        {key:'B',label:'색상 연출'},
        {key:'C',label:'향 연출'},
        {key:'D',label:'소리 연출'},
      ], answerKey: pick(5), hint:'스프링/댐퍼.', explanation:'노면 충격 흡수와 타이어 접지.'},
      { id:'au-mid-2', grade:'중', stem:'디스크 브레이크의 열 페이드 방지는?', choices:[
        {key:'A',label:'환기/재질/크기 최적화',footnote:'Fade'},
        {key:'B',label:'색칠'},
        {key:'C',label:'향 추가'},
        {key:'D',label:'음 추가'},
      ], answerKey: pick(6), hint:'열관리.', explanation:'통풍 디스크/패드 소재.'},
      { id:'au-mid-3', grade:'중', stem:'연비에 직접 영향이 큰 것은?', choices:[
        {key:'A',label:'차량 중량/공기저항',footnote:'Mass/CdA'},
        {key:'B',label:'차량 색상'},
        {key:'C',label:'라벨 디자인'},
        {key:'D',label:'휠 캡 로고'},
      ], answerKey: pick(7), hint:'물리 기반.', explanation:'질량과 공력저항이 핵심 변수.'},
      { id:'au-mid-4', grade:'중', stem:'ABS 기능은?', choices:[
        {key:'A',label:'급제동 시 휠 잠김 방지',footnote:'Anti-lock Brake'},
        {key:'B',label:'색상 보정'},
        {key:'C',label:'음향 보정'},
        {key:'D',label:'향 보정'},
      ], answerKey: pick(8), hint:'조향성 유지.', explanation:'제동 시 미끄러짐 감소.'},
      { id:'au-mid-5', grade:'중', stem:'ICE 엔진에서 터보차저의 역할은?', choices:[
        {key:'A',label:'흡기 압축으로 출력 향상',footnote:'Turbocharger'},
        {key:'B',label:'색상 증폭'},
        {key:'C',label:'향 증폭'},
        {key:'D',label:'소리 증폭'},
      ], answerKey: pick(9), hint:'배기가스 에너지 재활용.', explanation:'부스트 압력으로 체적효율↑.'},

      // ── 고(5)
      { id:'au-hi-1', grade:'고', stem:'차량 동역학에서 언더스티어란?', choices:[
        {key:'A',label:'조향각 대비 회두 부족',footnote:'Understeer'},
        {key:'B',label:'과도 회두'},
        {key:'C',label:'직진 강화'},
        {key:'D',label:'제자리 회전'},
      ], answerKey: pick(10), hint:'전륜 그립 한계.', explanation:'세팅/타이어/하중이 영향.'},
      { id:'au-hi-2', grade:'고', stem:'CdA를 낮추면 얻는 이점은?', choices:[
        {key:'A',label:'고속 연비/최고속 향상',footnote:'Drag area'},
        {key:'B',label:'색 향상'},
        {key:'C',label:'향 향상'},
        {key:'D',label:'소리 향상'},
      ], answerKey: pick(11), hint:'공력 효율.', explanation:'Cd와 전면투영면적 모두 중요.'},
      { id:'au-hi-3', grade:'고', stem:'브레이크 바이와이어의 장점은?', choices:[
        {key:'A',label:'제어 정밀/통합 제어 용이',footnote:'BBW'},
        {key:'B',label:'무조건 가벼움'},
        {key:'C',label:'색상 자유'},
        {key:'D',label:'향 자유'},
      ], answerKey: pick(12), hint:'ESP/ADAS 연계.', explanation:'페달 감각 재현 기술 필요.'},
      { id:'au-hi-4', grade:'고', stem:'타이어 컴파운드 “그립-마모” 관계는?', choices:[
        {key:'A',label:'그립↑ ↔ 수명↓ 경향',footnote:'Trade-off'},
        {key:'B',label:'완전 무관'},
        {key:'C',label:'반비례 없음'},
        {key:'D',label:'늘 수명↑'},
      ], answerKey: pick(13), hint:'사용 목적 맞춤.', explanation:'온도창/노면 조건 최적화.'},
      { id:'au-hi-5', grade:'고', stem:'차체 강성 증대의 효과는?', choices:[
        {key:'A',label:'조종성/진동내구 개선',footnote:'Body stiffness'},
        {key:'B',label:'색상 증가'},
        {key:'C',label:'향 증가'},
        {key:'D',label:'소리 증가'},
      ], answerKey: pick(14), hint:'정밀 섀시 세팅.', explanation:'NVH/정확한 서스펜션 작동.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 2) 전기차 파워트레인 엔지니어 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'ev-powertrain-engineer': {
    title: '전기차 파워트레인 엔지니어',
    desc: '모터·인버터·배터리 시스템 개발',
    items: [
      // 초(5)
      { id:'ev-el-1', grade:'초', stem:'전기차가 움직이게 하는 것은?', choices:[
        {key:'A',label:'전기 모터',footnote:'Traction motor'},
        {key:'B',label:'모래'},
        {key:'C',label:'바람'},
        {key:'D',label:'색'},
      ], answerKey: pick(0), hint:'전기에너지 → 운동.', explanation:'인버터가 교류로 구동.'},
      { id:'ev-el-2', grade:'초', stem:'회생제동은 무엇을 하나요?', choices:[
        {key:'A',label:'감속 에너지를 전기로 회수',footnote:'Regeneration'},
        {key:'B',label:'향 저장'},
        {key:'C',label:'색 저장'},
        {key:'D',label:'소리 저장'},
      ], answerKey: pick(1), hint:'효율 향상.', explanation:'배터리 충전에 활용.'},
      { id:'ev-el-3', grade:'초', stem:'배터리 과열을 막는 장치는?', choices:[
        {key:'A',label:'냉각 시스템',footnote:'Thermal management'},
        {key:'B',label:'스피커'},
        {key:'C',label:'램프'},
        {key:'D',label:'와이퍼'},
      ], answerKey: pick(2), hint:'온도 관리.', explanation:'수명/성능/안전 직결.'},
      { id:'ev-el-4', grade:'초', stem:'충전소에서 하는 일은?', choices:[
        {key:'A',label:'배터리 충전',footnote:'EVSE'},
        {key:'B',label:'세차'},
        {key:'C',label:'공기 주입'},
        {key:'D',label:'음악 듣기'},
      ], answerKey: pick(3), hint:'전력 공급.', explanation:'전압/커넥터 규격 다양.'},
      { id:'ev-el-5', grade:'초', stem:'플러그를 꽂을 때 중요한 것은?', choices:[
        {key:'A',label:'정확한 커넥터/잠금',footnote:'Connector'},
        {key:'B',label:'그림'},
        {key:'C',label:'스티커'},
        {key:'D',label:'색'},
      ], answerKey: pick(4), hint:'접촉 저항.', explanation:'안전 락/통신 프로토콜.'},

      // 중(5)
      { id:'ev-mid-1', grade:'중', stem:'BMS의 핵심 기능은?', choices:[
        {key:'A',label:'전압/전류/온도 관리',footnote:'Battery Management'},
        {key:'B',label:'라이트 쇼'},
        {key:'C',label:'바람 조절'},
        {key:'D',label:'색 조절'},
      ], answerKey: pick(5), hint:'SOC/SOH 추정.', explanation:'셀 밸런싱 포함.'},
      { id:'ev-mid-2', grade:'중', stem:'인버터의 역할은?', choices:[
        {key:'A',label:'DC→AC 변환/모터 제어',footnote:'Inverter'},
        {key:'B',label:'온도 표시'},
        {key:'C',label:'색 표시'},
        {key:'D',label:'향 표시'},
      ], answerKey: pick(6), hint:'PWM/벡터제어.', explanation:'스위칭 소자 손실 관리.'},
      { id:'ev-mid-3', grade:'중', stem:'배터리 팩 에너지(kWh)를 늘리려면?', choices:[
        {key:'A',label:'용량↑ 또는 전압↑',footnote:'Capacity/Voltage'},
        {key:'B',label:'색↑'},
        {key:'C',label:'향↑'},
        {key:'D',label:'소리↑'},
      ], answerKey: pick(7), hint:'셀 직병렬 구성.', explanation:'안전/중량/공간 고려.'},
      { id:'ev-mid-4', grade:'중', stem:'충전 속도를 좌우하는 요소는?', choices:[
        {key:'A',label:'전력(kW)/열관리/배터리 상태',footnote:'CCS/Chademo'},
        {key:'B',label:'차 색상'},
        {key:'C',label:'휠 색상'},
        {key:'D',label:'로고 크기'},
      ], answerKey: pick(8), hint:'충전 곡선.', explanation:'온도/SoC에 따른 제한.'},
      { id:'ev-mid-5', grade:'중', stem:'셀 밸런싱의 목적은?', choices:[
        {key:'A',label:'셀 간 전압 편차 완화',footnote:'Active/Passive'},
        {key:'B',label:'색 균형'},
        {key:'C',label:'향 균형'},
        {key:'D',label:'소리 균형'},
      ], answerKey: pick(9), hint:'수명/안전.', explanation:'최대 용량 활용.'},

      // 고(5)
      { id:'ev-hi-1', grade:'고', stem:'모터 토크를 높이는 방법이 아닌 것은?', choices:[
        {key:'A',label:'공극 크게 하여 자속 감소'},
        {key:'B',label:'전류/자속 최적화',footnote:'Field weakening'},
        {key:'C',label:'극수/권선 설계'},
        {key:'D',label:'냉각 개선'},
      ], answerKey: pick(10), hint:'공극↑은 토크↓.', explanation:'설계/제어/열 관리가 복합 영향.'},
      { id:'ev-hi-2', grade:'고', stem:'열 폭주(Thermal runaway) 예방은?', choices:[
        {key:'A',label:'감지·격리·냉각·차단',footnote:'Safety'},
        {key:'B',label:'색 바꾸기'},
        {key:'C',label:'향 바꾸기'},
        {key:'D',label:'소리 바꾸기'},
      ], answerKey: pick(11), hint:'조기 탐지.', explanation:'모듈/팩 수준 안전장치.'},
      { id:'ev-hi-3', grade:'고', stem:'SiC 전력반도체의 장점은?', choices:[
        {key:'A',label:'고전압/고효율/고온',footnote:'Silicon Carbide'},
        {key:'B',label:'색상 향상'},
        {key:'C',label:'향상 향상'},
        {key:'D',label:'소리 향상'},
      ], answerKey: pick(12), hint:'스위칭 손실↓.', explanation:'인버터 효율/소형화.'},
      { id:'ev-hi-4', grade:'고', stem:'V2G의 의미는?', choices:[
        {key:'A',label:'차량→그리드 전력 공급',footnote:'Vehicle-to-Grid'},
        {key:'B',label:'색→그리드'},
        {key:'C',label:'향→그리드'},
        {key:'D',label:'소리→그리드'},
      ], answerKey: pick(13), hint:'양방향.', explanation:'수요응답/피크 저감.'},
      { id:'ev-hi-5', grade:'고', stem:'배터리 수명에 불리한 조건은?', choices:[
        {key:'A',label:'고온/고SoC 장시간',footnote:'Calendar aging'},
        {key:'B',label:'적정 온도 관리'},
        {key:'C',label:'적정 SoC 범위'},
        {key:'D',label:'완만한 충방전'},
      ], answerKey: pick(14), hint:'화학 열화.', explanation:'열/전기 스트레스 관리.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 3) 자율주행 엔지니어 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'autonomous-driving-engineer': {
    title: '자율주행 엔지니어',
    desc: '인지·판단·제어(센서/지도/AI) 통합',
    items: [
      // 초(5)
      { id:'ad-el-1', grade:'초', stem:'자율주행차가 “눈”처럼 쓰는 것은?', choices:[
        {key:'A',label:'카메라/라이다/레이다',footnote:'Sensors'},
        {key:'B',label:'색연필'},
        {key:'C',label:'마이크'},
        {key:'D',label:'향수'},
      ], answerKey: pick(0), hint:'센서 융합.', explanation:'각 센서의 장단점을 결합.'},
      { id:'ad-el-2', grade:'초', stem:'차선 유지 기능은 무엇을 돕나요?', choices:[
        {key:'A',label:'차가 중앙을 달리도록',footnote:'LKA'},
        {key:'B',label:'음악 소리'},
        {key:'C',label:'향기'},
        {key:'D',label:'색상'},
      ], answerKey: pick(1), hint:'카메라 인식.', explanation:'조향 토크로 보조.'},
      { id:'ad-el-3', grade:'초', stem:'신호등 인식 실패 시 중요한 태도는?', choices:[
        {key:'A',label:'사람이 즉시 개입',footnote:'Driver takeover'},
        {key:'B',label:'무시'},
        {key:'C',label:'계속 주행'},
        {key:'D',label:'사진 찍기'},
      ], answerKey: pick(2), hint:'책임 운전.', explanation:'레벨3 이하 감독 필요.'},
      { id:'ad-el-4', grade:'초', stem:'지도(HD Map)는 무엇에 도움?', choices:[
        {key:'A',label:'정밀 위치/경로 계획',footnote:'Localization/Planning'},
        {key:'B',label:'색 정리'},
        {key:'C',label:'향 정리'},
        {key:'D',label:'소리 정리'},
      ], answerKey: pick(3), hint:'정밀 참조.', explanation:'차선/경계/제한속도 정보.'},
      { id:'ad-el-5', grade:'초', stem:'안전 확보에 가장 중요한 원칙은?', choices:[
        {key:'A',label:'항상 주변 확인·방어운전',footnote:'Safety first'},
        {key:'B',label:'빨리 달리기'},
        {key:'C',label:'크게 울리기'},
        {key:'D',label:'색 칠하기'},
      ], answerKey: pick(4), hint:'인간 감독.', explanation:'예측 불가 상황 대비.'},

      // 중(5)
      { id:'ad-mid-1', grade:'중', stem:'센서퓨전에서 칼만필터의 역할은?', choices:[
        {key:'A',label:'노이즈 속 상태 추정',footnote:'Kalman Filter'},
        {key:'B',label:'색 추정'},
        {key:'C',label:'향 추정'},
        {key:'D',label:'소리 추정'},
      ], answerKey: pick(5), hint:'확률 추정.', explanation:'측정/모델 결합 추정.'},
      { id:'ad-mid-2', grade:'중', stem:'객체 검출 성능 평가 지표는?', choices:[
        {key:'A',label:'mAP/IoU',footnote:'Detection metrics'},
        {key:'B',label:'RGB'},
        {key:'C',label:'BPM'},
        {key:'D',label:'DPI'},
      ], answerKey: pick(6), hint:'정밀/재현 종합.', explanation:'임계값/매칭 기준 포함.'},
      { id:'ad-mid-3', grade:'중', stem:'경로 계획에서 비용함수는?', choices:[
        {key:'A',label:'안전/쾌적/법규 위반 최소화',footnote:'Cost function'},
        {key:'B',label:'색 최소'},
        {key:'C',label:'향 최소'},
        {key:'D',label:'소리 최소'},
      ], answerKey: pick(7), hint:'제약 만족.', explanation:'도로 규칙/가용 공간 고려.'},
      { id:'ad-mid-4', grade:'중', stem:'V2X 통신의 이점은?', choices:[
        {key:'A',label:'차량-인프라 협력 인지',footnote:'Cooperative'},
        {key:'B',label:'색 교환'},
        {key:'C',label:'향 교환'},
        {key:'D',label:'소리 교환'},
      ], answerKey: pick(8), hint:'가시선 밖 정보.', explanation:'신호/사고/공사 상황 공유.'},
      { id:'ad-mid-5', grade:'중', stem:'시뮬레이션이 필요한 이유는?', choices:[
        {key:'A',label:'드문 위험 상황을 안전히 시험',footnote:'Scenario coverage'},
        {key:'B',label:'도색 시험'},
        {key:'C',label:'향 시험'},
        {key:'D',label:'소리 시험'},
      ], answerKey: pick(9), hint:'커버리지.', explanation:'현실에서 재현 어려운 상황 검증.'},

      // 고(5)
      { id:'ad-hi-1', grade:'고', stem:'End-to-End 학습 접근의 과제는?', choices:[
        {key:'A',label:'설명가능성/데이터 요구',footnote:'XAI/Data hunger'},
        {key:'B',label:'색상 부족'},
        {key:'C',label:'향 부족'},
        {key:'D',label:'소리 부족'},
      ], answerKey: pick(10), hint:'검증 난도.', explanation:'모듈 분해형 대비 장단점.'},
      { id:'ad-hi-2', grade:'고', stem:'레벨4의 정의에 가까운 것은?', choices:[
        {key:'A',label:'조건부 영역에서 완전 자율',footnote:'Operational Design Domain'},
        {key:'B',label:'운전자 상시 감독'},
        {key:'C',label:'완전 수동'},
        {key:'D',label:'수동조향만'},
      ], answerKey: pick(11), hint:'ODD 제한.', explanation:'비상 시 안전정지.'},
      { id:'ad-hi-3', grade:'고', stem:'신뢰성 인증을 위해 필요한 것은?', choices:[
        {key:'A',label:'데이터/테스트/안전표준 준수',footnote:'ISO 26262/21448'},
        {key:'B',label:'색 규정'},
        {key:'C',label:'향 규정'},
        {key:'D',label:'소리 규정'},
      ], answerKey: pick(12), hint:'기능안전/SOTIF.', explanation:'위험분석/추적성.'},
      { id:'ad-hi-4', grade:'고', stem:'SLAM에서 루프클로저의 역할은?', choices:[
        {key:'A',label:'누적 오차 보정',footnote:'Loop closure'},
        {key:'B',label:'색 오차'},
        {key:'C',label:'향 오차'},
        {key:'D',label:'소리 오차'},
      ], answerKey: pick(13), hint:'지도 정합.', explanation:'그래프 기반 최적화.'},
      { id:'ad-hi-5', grade:'고', stem:'운전자 모니터링(DMS)의 목적은?', choices:[
        {key:'A',label:'졸음/부주의 감지',footnote:'Driver monitoring'},
        {key:'B',label:'색 감지'},
        {key:'C',label:'향 감지'},
        {key:'D',label:'소리 감지'},
      ], answerKey: pick(14), hint:'HMI 안전.', explanation:'경고/개입 트리거.'},
    ],
  },
};