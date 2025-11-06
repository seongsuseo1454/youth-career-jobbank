import { CareerFieldModule } from '../types';

export const FIELD_KEY = 'space-aero';

// ✅ 정답 분산(회전) 유틸
type Key = 'A'|'B'|'C'|'D';
const ROT: Key[] = ['A','B','C','D'];
const pick = (i: number) => ROT[i % ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
  /* ─────────────────────────────────────────────────────────────
   * 1) 항공우주공학자 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'aerospace-engineer': {
    title: '항공우주공학자',
    desc: '비행체 공력/구조/추진 설계·해석',
    items: [
      // ── 초(5)
      { id:'ae-el-1', grade:'초', stem:'비행기가 떠 오르는 주된 힘은?', choices:[
        {key:'A',label:'양력',footnote:'Lift'},
        {key:'B',label:'중력'},
        {key:'C',label:'마찰력'},
        {key:'D',label:'탄성력'},
      ], answerKey: pick(0), hint:'윗면/아랫면의 압력 차이.', explanation:'날개가 만드는 압력차와 받음각으로 발생합니다.'},
      { id:'ae-el-2', grade:'초', stem:'로켓이 위로 가려면 아래로 무엇을 뿜을까요?', choices:[
        {key:'A',label:'고온의 가스',footnote:'Action-Reaction'},
        {key:'B',label:'얼음'},
        {key:'C',label:'물감'},
        {key:'D',label:'바람개비'},
      ], answerKey: pick(1), hint:'뉴턴의 작용·반작용.', explanation:'연소가스의 반작용으로 추진력을 얻습니다.'},
      { id:'ae-el-3', grade:'초', stem:'종이비행기가 더 멀리 가게 하려면?', choices:[
        {key:'A',label:'균형 잡힌 접기·부드러운 던지기',footnote:'Trim'},
        {key:'B',label:'물에 적신다'},
        {key:'C',label:'구겨 던진다'},
        {key:'D',label:'날개 찢기'},
      ], answerKey: pick(2), hint:'중심과 각도.', explanation:'무게중심과 받음각이 안정성을 좌우합니다.'},
      { id:'ae-el-4', grade:'초', stem:'항공기 창문이 둥근 이유는?', choices:[
        {key:'A',label:'응력 집중을 줄이기 위해',footnote:'Stress concentration'},
        {key:'B',label:'보기 예뻐서'},
        {key:'C',label:'빛을 굴절하려고'},
        {key:'D',label:'사진 찍기 좋게'},
      ], answerKey: pick(3), hint:'모서리 응력 완화.', explanation:'각진 모서리는 균열이 생기기 쉽습니다.'},
      { id:'ae-el-5', grade:'초', stem:'비행기 날개의 작은 판(플랩)을 내리면?', choices:[
        {key:'A',label:'양력이 늘어 저속 이착륙 도움',footnote:'Flap'},
        {key:'B',label:'엔진이 꺼짐'},
        {key:'C',label:'색이 변함'},
        {key:'D',label:'바퀴가 커짐'},
      ], answerKey: pick(4), hint:'면적/곡률 증가.', explanation:'양력↑, 항력도 함께 증가합니다.'},

      // ── 중(5)
      { id:'ae-mid-1', grade:'중', stem:'드래그(항력)를 줄이는 방법은?', choices:[
        {key:'A',label:'형상 매끈화·유선형',footnote:'Form/Skin friction'},
        {key:'B',label:'돌기 추가'},
        {key:'C',label:'거칠게 만들기'},
        {key:'D',label:'구멍 내기'},
      ], answerKey: pick(5), hint:'경계층 관리.', explanation:'유선형 설계와 표면 품질이 중요합니다.'},
      { id:'ae-mid-2', grade:'중', stem:'초음속에서 충격파가 생기는 이유는?', choices:[
        {key:'A',label:'음속을 넘는 압축성 효과',footnote:'Mach number'},
        {key:'B',label:'온도만 높아서'},
        {key:'C',label:'빛 굴절'},
        {key:'D',label:'색 변화'},
      ], answerKey: pick(6), hint:'마하콘.', explanation:'압축성 유동에서 급격한 압력 변화가 생깁니다.'},
      { id:'ae-mid-3', grade:'중', stem:'비행 안정성에서 중요하지 않은 것은?', choices:[
        {key:'A',label:'날개 색깔'},
        {key:'B',label:'무게중심(CG) 위치',footnote:'Center of gravity'},
        {key:'C',label:'꼬리날개(테일) 모멘트',footnote:'Tail volume'},
        {key:'D',label:'받음각/트림',footnote:'Angle of attack/Trim'},
      ], answerKey: pick(7), hint:'색은 비행과 무관.', explanation:'CG/테일/받음각이 주 안정 요소입니다.'},
      { id:'ae-mid-4', grade:'중', stem:'복합재(탄소섬유)를 쓰는 이유는?', choices:[
        {key:'A',label:'강도 대비 무게 우수',footnote:'Specific strength'},
        {key:'B',label:'색이 예뻐서'},
        {key:'C',label:'소리 큼'},
        {key:'D',label:'향 좋음'},
      ], answerKey: pick(8), hint:'경량화.', explanation:'연료 절감과 하중 성능 향상.'},
      { id:'ae-mid-5', grade:'중', stem:'랜딩기어 타이어가 터지지 않는 이유는?', choices:[
        {key:'A',label:'특수 소재/구조·속도 등급',footnote:'Tire rating'},
        {key:'B',label:'색칠'},
        {key:'C',label:'물뿌리기'},
        {key:'D',label:'접착제'},
      ], answerKey: pick(9), hint:'부하 설계.', explanation:'압력/온도/하중을 견디도록 규격화됩니다.'},

      // ── 고(5)
      { id:'ae-hi-1', grade:'고', stem:'로켓 Δv 예측 공식은?', choices:[
        {key:'A',label:'치올콥스키 방정식',footnote:'Δv = ve ln(m0/mf)'},
        {key:'B',label:'베르누이'},
        {key:'C',label:'훅의 법칙'},
        {key:'D',label:'오옴의 법칙'},
      ], answerKey: pick(10), hint:'연료비/추력/비추력.', explanation:'질량비가 성능을 좌우합니다.'},
      { id:'ae-hi-2', grade:'고', stem:'엔진 비추력(Isp)이 의미하는 것은?', choices:[
        {key:'A',label:'연료 효율 지표',footnote:'Specific impulse'},
        {key:'B',label:'소음 지표'},
        {key:'C',label:'색상 지표'},
        {key:'D',label:'진동 지표'},
      ], answerKey: pick(11), hint:'초 단위.', explanation:'추력/유량 비로 정의합니다.'},
      { id:'ae-hi-3', grade:'고', stem:'유도·제어에서 PID의 D항은?', choices:[
        {key:'A',label:'변화율(미분) 보상',footnote:'Derivative term'},
        {key:'B',label:'비례'},
        {key:'C',label:'적분'},
        {key:'D',label:'무작위'},
      ], answerKey: pick(12), hint:'진동 억제.', explanation:'오버슈트를 줄입니다.'},
      { id:'ae-hi-4', grade:'고', stem:'궤도에서 항력 감쇠가 큰 구간은?', choices:[
        {key:'A',label:'저지구궤도(LEO)',footnote:'Atmospheric drag'},
        {key:'B',label:'정지궤도'},
        {key:'C',label:'라그랑주점'},
        {key:'D',label:'행성간'},
      ], answerKey: pick(13), hint:'희박하지만 영향.', explanation:'고도/태양활동에 따라 달라집니다.'},
      { id:'ae-hi-5', grade:'고', stem:'페이로드 분리 시험에서 중요한 것은?', choices:[
        {key:'A',label:'충격/진동/열 진공 환경 재현',footnote:'S/V/T-Vac'},
        {key:'B',label:'도색 품질'},
        {key:'C',label:'스티커 부착'},
        {key:'D',label:'로고 크기'},
      ], answerKey: pick(14), hint:'환경시험.', explanation:'발사 환경과 유사 조건 검증.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 2) 항공전자 정비사 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'avionics-technician': {
    title: '항공전자 정비사',
    desc: '항공기 전자/항법/통신 시스템 점검',
    items: [
      // 초(5)
      { id:'av-el-1', grade:'초', stem:'항공기 “블랙박스”의 역할은?', choices:[
        {key:'A',label:'비행 데이터/음성 기록',footnote:'FDR/CVR'},
        {key:'B',label:'색 바꾸기'},
        {key:'C',label:'불빛 장식'},
        {key:'D',label:'음악 틀기'},
      ], answerKey: pick(0), hint:'사고 조사.', explanation:'주황색으로 잘 보이게 제작됩니다.'},
      { id:'av-el-2', grade:'초', stem:'무전기로 교신하는 이유는?', choices:[
        {key:'A',label:'관제와 안전한 소통',footnote:'ATC comm'},
        {key:'B',label:'노래 공유'},
        {key:'C',label:'게임'},
        {key:'D',label:'사진'},
      ], answerKey: pick(1), hint:'절차 준수.', explanation:'주파수/콜사인/표준용어 사용.'},
      { id:'av-el-3', grade:'초', stem:'계기판 이상 경고가 뜨면?', choices:[
        {key:'A',label:'체크리스트 따라 조치',footnote:'Checklist'},
        {key:'B',label:'무시'},
        {key:'C',label:'끄기'},
        {key:'D',label:'덮기'},
      ], answerKey: pick(2), hint:'표준 운영.', explanation:'정비 요청과 기록이 중요.'},
      { id:'av-el-4', grade:'초', stem:'GPS는 무엇을 알려줄까요?', choices:[
        {key:'A',label:'위치/시간',footnote:'Global Positioning System'},
        {key:'B',label:'색상'},
        {key:'C',label:'향기'},
        {key:'D',label:'소리'},
      ], answerKey: pick(3), hint:'위성 신호.', explanation:'항법/접근보조에 활용.'},
      { id:'av-el-5', grade:'초', stem:'정비사가 중요하게 보는 문서는?', choices:[
        {key:'A',label:'정비 매뉴얼/서비스 불린',footnote:'AMM/SB'},
        {key:'B',label:'만화책'},
        {key:'C',label:'그림책'},
        {key:'D',label:'동화책'},
      ], answerKey: pick(4), hint:'제조사 절차.', explanation:'승인된 기술자료가 기준입니다.'},

      // 중(5)
      { id:'av-mid-1', grade:'중', stem:'항전 시스템 전원 점검 시 우선 확인은?', choices:[
        {key:'A',label:'전압/접지/퓨즈',footnote:'Power/GND/Fuse'},
        {key:'B',label:'라벨 색'},
        {key:'C',label:'케이블 길이만'},
        {key:'D',label:'볼트만'},
      ], answerKey: pick(5), hint:'기본 전원 무결성.', explanation:'단락·과전류도 확인.'},
      { id:'av-mid-2', grade:'중', stem:'노이즈에 민감한 신호선 처리는?', choices:[
        {key:'A',label:'차폐/트위스트 페어',footnote:'Shield/Twisted pair'},
        {key:'B',label:'색상 덮기'},
        {key:'C',label:'테이프'},
        {key:'D',label:'스티커'},
      ], answerKey: pick(6), hint:'EMI 대책.', explanation:'접지 설계와 함께 고려.'},
      { id:'av-mid-3', grade:'중', stem:'항법장비 시험의 목적은?', choices:[
        {key:'A',label:'정확도/신뢰성 검증',footnote:'Calibration/Verification'},
        {key:'B',label:'도색 확인'},
        {key:'C',label:'의자 배치'},
        {key:'D',label:'간식 확인'},
      ], answerKey: pick(7), hint:'주기 점검.', explanation:'MEL/검사 주기 준수.'},
      { id:'av-mid-4', grade:'중', stem:'비상전원(RAT/배터리)의 용도는?', choices:[
        {key:'A',label:'주전원 상실 시 필수 계통 유지',footnote:'Emergency power'},
        {key:'B',label:'라이트 쇼'},
        {key:'C',label:'사진 촬영'},
        {key:'D',label:'음악 재생'},
      ], answerKey: pick(8), hint:'안전 중심.', explanation:'필수 항전·유압/제어 유지.'},
      { id:'av-mid-5', grade:'중', stem:'정비기록(로그북) 누락의 위험은?', choices:[
        {key:'A',label:'안전/법규 위반',footnote:'Airworthiness'},
        {key:'B',label:'색 저하'},
        {key:'C',label:'소리 저하'},
        {key:'D',label:'향 저하'},
      ], answerKey: pick(9), hint:'추적성 필수.', explanation:'책임소재·이력 관리.'},

      // 고(5)
      { id:'av-hi-1', grade:'고', stem:'ARINC/AFDX는 무엇과 관련?', choices:[
        {key:'A',label:'항공기 데이터 버스',footnote:'Avionics network'},
        {key:'B',label:'연료 종류'},
        {key:'C',label:'타이어 규격'},
        {key:'D',label:'페인트'},
      ], answerKey: pick(10), hint:'통신 표준.', explanation:'지연/대역폭/우선순위 보장.'},
      { id:'av-hi-2', grade:'고', stem:'소프트웨어 레벨 DO-178C에서 A레벨 의미는?', choices:[
        {key:'A',label:'가장 높은 안전 영향',footnote:'Catastrophic'},
        {key:'B',label:'미미'},
        {key:'C',label:'보통'},
        {key:'D',label:'낮음'},
      ], answerKey: pick(11), hint:'검증 엄격.', explanation:'요건 추적/테스트 커버리지.'},
      { id:'av-hi-3', grade:'고', stem:'GNSS 장애 시 대체 항법은?', choices:[
        {key:'A',label:'관성항법/라디오항법',footnote:'INS/VOR/DME'},
        {key:'B',label:'감'},
        {key:'C',label:'운'},
        {key:'D',label:'색'},
      ], answerKey: pick(12), hint:'다중화.', explanation:'센서 융합과 무결성 감시.'},
      { id:'av-hi-4', grade:'고', stem:'정비 인가제 Part-145의 취지는?', choices:[
        {key:'A',label:'승인 조직/절차에 의한 안전 보장',footnote:'Maintenance org'},
        {key:'B',label:'색상 규정'},
        {key:'C',label:'음향 규정'},
        {key:'D',label:'향 규정'},
      ], answerKey: pick(13), hint:'국제 표준.', explanation:'자격/시설/절차 요구.'},
      { id:'av-hi-5', grade:'고', stem:'비행 데이터 분석(FOQA) 목적은?', choices:[
        {key:'A',label:'운항 위험 식별·개선',footnote:'Flight Ops QA'},
        {key:'B',label:'광고 제작'},
        {key:'C',label:'로고 제작'},
        {key:'D',label:'색채 연구'},
      ], answerKey: pick(14), hint:'사고 예방.', explanation:'데이터 기반 안전관리(SMS).'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 3) 우주임무 분석가 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'space-mission-analyst': {
    title: '우주임무 분석가',
    desc: '궤도/임무 설계·링크/열/전력 예산',
    items: [
      // 초(5)
      { id:'sm-el-1', grade:'초', stem:'인공위성은 주로 어디를 돕나요?', choices:[
        {key:'A',label:'통신·기상·탐사',footnote:'Satellites'},
        {key:'B',label:'놀이터'},
        {key:'C',label:'분식집'},
        {key:'D',label:'수족관'},
      ], answerKey: pick(0), hint:'우주에서 서비스.', explanation:'지구 관측/항법 등 활용.'},
      { id:'sm-el-2', grade:'초', stem:'태양전지는 위성에서 무엇을 하나요?', choices:[
        {key:'A',label:'전기 생산',footnote:'Solar array'},
        {key:'B',label:'사진 꾸미기'},
        {key:'C',label:'소리 내기'},
        {key:'D',label:'색 바꾸기'},
      ], answerKey: pick(1), hint:'전력원.', explanation:'배터리 충전/부하 공급.'},
      { id:'sm-el-3', grade:'초', stem:'지구를 한 바퀴 도는 것을?', choices:[
        {key:'A',label:'궤도',footnote:'Orbit'},
        {key:'B',label:'채집'},
        {key:'C',label:'세척'},
        {key:'D',label:'염색'},
      ], answerKey: pick(2), hint:'원/타원 경로.', explanation:'중력과 속도의 균형.'},
      { id:'sm-el-4', grade:'초', stem:'위성 자세를 바꾸는 장치는?', choices:[
        {key:'A',label:'반작용휠/추력기',footnote:'Reaction wheel/Thruster'},
        {key:'B',label:'나침반'},
        {key:'C',label:'자'},
        {key:'D',label:'붓'},
      ], answerKey: pick(3), hint:'토크/추력.', explanation:'센서와 폐루프 제어.'},
      { id:'sm-el-5', grade:'초', stem:'지상국과 위성이 주고받는 것은?', choices:[
        {key:'A',label:'전파 신호',footnote:'Radio link'},
        {key:'B',label:'연필'},
        {key:'C',label:'모래'},
        {key:'D',label:'물'},
      ], answerKey: pick(4), hint:'링크 예산.', explanation:'안테나 이득/경로손실 고려.'},

      // 중(5)
      { id:'sm-mid-1', grade:'중', stem:'케플러 제3법칙은 무엇과 관련?', choices:[
        {key:'A',label:'궤도 주기-반장축 관계',footnote:'T^2 ∝ a^3'},
        {key:'B',label:'소리-색 관계'},
        {key:'C',label:'온도-색 관계'},
        {key:'D',label:'압력-향 관계'},
      ], answerKey: pick(5), hint:'주기 예측.', explanation:'중력계수에 의존.'},
      { id:'sm-mid-2', grade:'중', stem:'링크버짓에서 C/N₀가 높다는 뜻은?', choices:[
        {key:'A',label:'신호 품질이 좋다',footnote:'Carrier-to-Noise'},
        {key:'B',label:'색이 진하다'},
        {key:'C',label:'소리가 크다'},
        {key:'D',label:'향이 강하다'},
      ], answerKey: pick(6), hint:'수신 여유.', explanation:'에러율 감소와 연관.'},
      { id:'sm-mid-3', grade:'중', stem:'열 설계에서 라디에이터의 역할은?', choices:[
        {key:'A',label:'우주로 열 방출',footnote:'Thermal control'},
        {key:'B',label:'색 바꾸기'},
        {key:'C',label:'소리 울림'},
        {key:'D',label:'향 방출'},
      ], answerKey: pick(7), hint:'복사 냉각.', explanation:'일사/그늘 주기 고려.'},
      { id:'sm-mid-4', grade:'중', stem:'지구 동기 정지궤도의 특징은?', choices:[
        {key:'A',label:'지구 자전과 동일 각속',footnote:'GEO 24h'},
        {key:'B',label:'아무렇게나 돈다'},
        {key:'C',label:'엄청 낮다'},
        {key:'D',label:'아주 빠르다(저고도)'},
      ], answerKey: pick(8), hint:'정지위성 방송.', explanation:'적도 상공 약 35,786km.'},
      { id:'sm-mid-5', grade:'중', stem:'태양폭풍 영향 대비는?', choices:[
        {key:'A',label:'방사선 설계·운영 모드',footnote:'Radiation hardening'},
        {key:'B',label:'색상 조정'},
        {key:'C',label:'향 조정'},
        {key:'D',label:'음향 조정'},
      ], answerKey: pick(9), hint:'전자기 영향.', explanation:'안전 모드·쉴딩.'},

      // 고(5)
      { id:'sm-hi-1', grade:'고', stem:'호만 전이의 장점은?', choices:[
        {key:'A',label:'연료 효율적 전이',footnote:'Hohmann transfer'},
        {key:'B',label:'가장 빠름'},
        {key:'C',label:'가장 화려'},
        {key:'D',label:'가장 시끄러움'},
      ], answerKey: pick(10), hint:'Δv 최소.', explanation:'두 번의 점화로 타원 전이.'},
      { id:'sm-hi-2', grade:'고', stem:'위성 자세 결정에 쓰는 센서는?', choices:[
        {key:'A',label:'스타트래커·자이로',footnote:'Attitude sensors'},
        {key:'B',label:'마우스'},
        {key:'C',label:'프린터'},
        {key:'D',label:'스피커'},
      ], answerKey: pick(11), hint:'정밀 센싱.', explanation:'지자기/태양센서도 사용.'},
      { id:'sm-hi-3', grade:'고', stem:'전력 예산에서 Eclipse 구간은?', choices:[
        {key:'A',label:'태양광 불가—배터리로 운용',footnote:'Eclipse'},
        {key:'B',label:'소리 차단'},
        {key:'C',label:'색 차단'},
        {key:'D',label:'향 차단'},
      ], answerKey: pick(12), hint:'방전/충전 관리.', explanation:'심방전 방지 전략 필요.'},
      { id:'sm-hi-4', grade:'고', stem:'TTC 시스템에서 Coding의 목적은?', choices:[
        {key:'A',label:'오류정정/검출',footnote:'FEC/CRC'},
        {key:'B',label:'색상 강화'},
        {key:'C',label:'음향 강화'},
        {key:'D',label:'향 강화'},
      ], answerKey: pick(13), hint:'BER 개선.', explanation:'링크 마진 확보.'},
      { id:'sm-hi-5', grade:'고', stem:'컨스텔레이션 설계에서 Walker 파라미터는?', choices:[
        {key:'A',label:'위성 수/평면/위상',footnote:'Walker delta'},
        {key:'B',label:'색/향/음'},
        {key:'C',label:'온/습/풍'},
        {key:'D',label:'밀/탄/압'},
      ], answerKey: pick(14), hint:'분산 커버리지.', explanation:'커버리지/간섭 최적화.'},
    ],
  },
};