//src/lib/careers/fields/robot-mechatronics.ts
import { CareerFieldModule } from '../types';

export const FIELD_KEY = 'robot-mechatronics';

type Key = 'A'|'B'|'C'|'D';
const ROT: Key[] = ['A','B','C','D'];
const pick = (i:number): Key => ROT[i % ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
 /* ─────────────────────────────────────────────────────────────
  * 1) 로봇공학자 (초5 · 중5 · 고5)
  * ───────────────────────────────────────────────────────────── */
 'robot-engineer': {
   title: '로봇공학자',
   desc: '센서·구동·제어·지능 통합 설계',
   items: [
     // ── 초(5)
     { id:'re-el-1', grade:'초', stem:'로봇이 바닥 선을 따라가려면 필요한 것은?',
       choices:[
         {key:'A',label:'센서로 선을 감지',footnote:'IR/카메라'},
         {key:'B',label:'색칠놀이'},
         {key:'C',label:'소리만 크게'},
         {key:'D',label:'아무 부품 없이'},
       ], answerKey: pick(0), hint:'주변을 느껴야 움직일 수 있어요.',
       explanation:'센서가 있어야 경로를 인식해 제어할 수 있습니다.'},
     { id:'re-el-2', grade:'초', stem:'바퀴를 돌려 주는 장치는?',
       choices:[
         {key:'A',label:'모터',footnote:'DC/서보/스테핑'},
         {key:'B',label:'지우개'},
         {key:'C',label:'색종이'},
         {key:'D',label:'자석만'},
       ], answerKey: pick(1), hint:'회전력을 만드는 부품입니다.',
       explanation:'모터가 로봇의 구동을 담당합니다.'},
     { id:'re-el-3', grade:'초', stem:'로봇팔이 물건을 정확히 옮기려면 필요한 생각은?',
       choices:[
         {key:'A',label:'좌표와 경로',footnote:'위치/자세'},
         {key:'B',label:'그림 그리기'},
         {key:'C',label:'소리 지르기'},
         {key:'D',label:'무작위 흔들기'},
       ], answerKey: pick(2), hint:'어디서 어디로가 중요해요.',
       explanation:'좌표계와 경로 계획이 핵심입니다.'},
     { id:'re-el-4', grade:'초', stem:'벽을 피하려면 무엇이 필요할까요?',
       choices:[
         {key:'A',label:'거리 센서',footnote:'초음파/ToF'},
         {key:'B',label:'도형 스티커'},
         {key:'C',label:'색연필'},
         {key:'D',label:'종이접기'},
       ], answerKey: pick(3), hint:'먼저 감지해야 피합니다.',
       explanation:'장애물 감지가 회피 제어의 시작입니다.'},
     { id:'re-el-5', grade:'초', stem:'로봇이 자기 위치를 아는 기술은?',
       choices:[
         {key:'A',label:'SLAM',footnote:'동시 위치추정/지도작성'},
         {key:'B',label:'색상 팔레트'},
         {key:'C',label:'스티커북'},
         {key:'D',label:'도장찍기'},
       ], answerKey: pick(4), hint:'지도와 위치를 함께 구해요.',
       explanation:'SLAM은 이동 로봇의 핵심 기술입니다.'},

     // ── 중(5)
     { id:'re-mid-1', grade:'중', stem:'피드백 제어에서 현재 오차를 줄이는 항은?',
       choices:[
         {key:'A',label:'P 제어',footnote:'Proportional'},
         {key:'B',label:'HTML'},
         {key:'C',label:'PNG'},
         {key:'D',label:'DNS'},
       ], answerKey: pick(5), hint:'오차에 비례해 출력합니다.',
       explanation:'P는 즉각적인 보정에 기여합니다.'},
     { id:'re-mid-2', grade:'중', stem:'서보모터 제어 신호의 대표 형식은?',
       choices:[
         {key:'A',label:'PWM',footnote:'펄스폭 변조'},
         {key:'B',label:'JPEG'},
         {key:'C',label:'CSS'},
         {key:'D',label:'CSV'},
       ], answerKey: pick(6), hint:'펄스 폭으로 각도를 지정합니다.',
       explanation:'취미/산업 모두 널리 쓰입니다.'},
     { id:'re-mid-3', grade:'중', stem:'경로 계획에서 A* 알고리즘이 쓰이는 이유는?',
       choices:[
         {key:'A',label:'최단경로 탐색',footnote:'Heuristic'},
         {key:'B',label:'이미지 저장'},
         {key:'C',label:'음악 재생'},
         {key:'D',label:'문서 편집'},
       ], answerKey: pick(7), hint:'휴리스틱으로 빠르게 찾습니다.',
       explanation:'A*는 효율적으로 최단경로를 탐색합니다.'},
     { id:'re-mid-4', grade:'중', stem:'로봇 관절 각도를 표현하는 값은?',
       choices:[
         {key:'A',label:'조인트 각도',footnote:'Joint Angle'},
         {key:'B',label:'픽셀 수'},
         {key:'C',label:'폰트 크기'},
         {key:'D',label:'파일 용량'},
       ], answerKey: pick(8), hint:'자유도마다 하나씩 가집니다.',
       explanation:'로봇팔의 자세를 정의합니다.'},
     { id:'re-mid-5', grade:'중', stem:'ROS의 핵심 통신 단위는?',
       choices:[
         {key:'A',label:'토픽/메시지',footnote:'Publish/Subscribe'},
         {key:'B',label:'CSS 셀렉터'},
         {key:'C',label:'CDN'},
         {key:'D',label:'GIF'},
       ], answerKey: pick(9), hint:'노드 간 데이터를 주고받습니다.',
       explanation:'ROS는 모듈형 로봇 SW 프레임워크입니다.'},

     // ── 고(5)
     { id:'re-hi-1', grade:'고', stem:'모델링된 로봇의 동역학을 풀 때 자주 쓰는 행렬은?',
       choices:[
         {key:'A',label:'자코비안',footnote:'Jacobian'},
         {key:'B',label:'RGB'},
         {key:'C',label:'ASCII'},
         {key:'D',label:'URL'},
       ], answerKey: pick(10), hint:'속도/힘 변환에 사용됩니다.',
       explanation:'말단-조인트 간 미분 관계입니다.'},
     { id:'re-hi-2', grade:'고', stem:'관성/마찰 불확실성이 큰 시스템엔 어떤 제어가 유리한가?',
       choices:[
         {key:'A',label:'강인 제어',footnote:'Robust Control'},
         {key:'B',label:'무제어'},
         {key:'C',label:'랜덤 추정'},
         {key:'D',label:'색 바꾸기'},
       ], answerKey: pick(11), hint:'모델 불확실성에 견딥니다.',
       explanation:'H∞, 슬라이딩모드 등 기법이 있습니다.'},
     { id:'re-hi-3', grade:'고', stem:'다관절 로봇의 특이점(singularity)은?',
       choices:[
         {key:'A',label:'자유도가 줄어드는 자세',footnote:'Determinant≈0'},
         {key:'B',label:'색이 바뀌는 현상'},
         {key:'C',label:'음량 증가'},
         {key:'D',label:'해상도 상승'},
       ], answerKey: pick(12), hint:'자코비안이 퇴화합니다.',
       explanation:'제어불능/불안정 구간을 피해야 합니다.'},
     { id:'re-hi-4', grade:'고', stem:'SLAM에서 루프 클로저의 역할은?',
       choices:[
         {key:'A',label:'누적 오차 보정',footnote:'Loop Closure'},
         {key:'B',label:'이미지 필터'},
         {key:'C',label:'배경 음악'},
         {key:'D',label:'폰트 적용'},
       ], answerKey: pick(13), hint:'과거 위치 재인식',
       explanation:'지도 일관성을 크게 높여 줍니다.'},
     { id:'re-hi-5', grade:'고', stem:'경로 추종에 흔한 제어법은?',
       choices:[
         {key:'A',label:'PID',footnote:'Proportional-Integral-Derivative'},
         {key:'B',label:'GIF'},
         {key:'C',label:'ZIP'},
         {key:'D',label:'CSV'},
       ], answerKey: pick(14), hint:'간단·효과적인 표준',
       explanation:'튜닝으로 넓은 범위 적용이 가능합니다.'},
   ],
 },

 /* ─────────────────────────────────────────────────────────────
  * 2) 자동화 엔지니어
  * ───────────────────────────────────────────────────────────── */
 'automation-engineer': {
   title: '자동화 엔지니어',
   desc: '산업용 로봇·PLC·센서 네트워크',
   items: [
     // 초(5)
     { id:'ae-el-1', grade:'초', stem:'컨베이어 속도를 바꾸는 장치는?',
       choices:[
         {key:'A',label:'컨트롤러',footnote:'제어기'},
         {key:'B',label:'풀'},
         {key:'C',label:'크레용'},
         {key:'D',label:'앨범'},
       ], answerKey: pick(0), hint:'제어 신호를 냅니다.',
       explanation:'속도/정지/방향을 제어합니다.'},
     { id:'ae-el-2', grade:'초', stem:'물체 유무를 감지하는 센서는?',
       choices:[
         {key:'A',label:'포토 센서',footnote:'광센서'},
         {key:'B',label:'리본'},
         {key:'C',label:'테이프'},
         {key:'D',label:'스탬프'},
       ], answerKey: pick(1), hint:'빛의 반사를 이용합니다.',
       explanation:'물류 자동화에 널리 쓰입니다.'},
     { id:'ae-el-3', grade:'초', stem:'공장의 “두뇌” 역할을 하는 것은?',
       choices:[
         {key:'A',label:'PLC',footnote:'Programmable Logic Controller'},
         {key:'B',label:'연필깎이'},
         {key:'C',label:'필통'},
         {key:'D',label:'스케치북'},
       ], answerKey: pick(2), hint:'제어 로직을 실행합니다.',
       explanation:'입출력을 연결해 자동화합니다.'},
     { id:'ae-el-4', grade:'초', stem:'비상 상황에서 눌러야 하는 버튼은?',
       choices:[
         {key:'A',label:'긴급 정지',footnote:'E-Stop'},
         {key:'B',label:'음악'},
         {key:'C',label:'배경화면'},
         {key:'D',label:'그림 교체'},
       ], answerKey: pick(3), hint:'안전이 최우선입니다.',
       explanation:'즉시 동작을 멈춥니다.'},
     { id:'ae-el-5', grade:'초', stem:'로봇과 사람이 만나는 구역의 이름은?',
       choices:[
         {key:'A',label:'협업 영역',footnote:'Cobot Zone'},
         {key:'B',label:'휴게실'},
         {key:'C',label:'도서관'},
         {key:'D',label:'운동장'},
       ], answerKey: pick(4), hint:'안전 규정 준수가 필요합니다.',
       explanation:'속도/힘 제한 등 방호 전략이 필요합니다.'},

     // 중(5)
     { id:'ae-mid-1', grade:'중', stem:'센서 신호 노이즈를 줄이는 방법은?',
       choices:[
         {key:'A',label:'필터링',footnote:'저역/이동평균'},
         {key:'B',label:'무작위 증폭'},
         {key:'C',label:'색 바꾸기'},
         {key:'D',label:'텍스트 굵게'},
       ], answerKey: pick(5), hint:'신호대잡음비 개선',
       explanation:'필터는 안정적 제어에 중요합니다.'},
     { id:'ae-mid-2', grade:'중', stem:'현장 기기를 네트워크로 묶는 산업 표준은?',
       choices:[
         {key:'A',label:'필드버스',footnote:'Fieldbus/Profinet'},
         {key:'B',label:'RGB'},
         {key:'C',label:'GIF'},
         {key:'D',label:'HTML'},
       ], answerKey: pick(6), hint:'장비 간 통신 표준',
       explanation:'프로토콜에 따라 구성합니다.'},
     { id:'ae-mid-3', grade:'중', stem:'SCADA의 주된 역할은?',
       choices:[
         {key:'A',label:'모니터링·제어',footnote:'Supervisory Control'},
         {key:'B',label:'사진 편집'},
         {key:'C',label:'게임 실행'},
         {key:'D',label:'문서 인쇄'},
       ], answerKey: pick(7), hint:'상태 시각화/제어',
       explanation:'HMI와 함께 운영자가 사용합니다.'},
     { id:'ae-mid-4', grade:'중', stem:'장비 유지보수에서 MTBF는?',
       choices:[
         {key:'A',label:'평균 고장 간격',footnote:'Mean Time Between Failures'},
         {key:'B',label:'화면 밝기'},
         {key:'C',label:'글꼴 크기'},
         {key:'D',label:'색상 수'},
       ], answerKey: pick(8), hint:'신뢰성 지표입니다.',
       explanation:'예지보전에 활용합니다.'},
     { id:'ae-mid-5', grade:'중', stem:'버퍼/큐를 쓰는 이유는?',
       choices:[
         {key:'A',label:'속도 차이 완충',footnote:'Buffering'},
         {key:'B',label:'보안 약화'},
         {key:'C',label:'랜덤 지연'},
         {key:'D',label:'용량 감소'},
       ], answerKey: pick(9), hint:'공정 균형',
       explanation:'생산 흐름을 안정화합니다.'},

     // 고(5)
     { id:'ae-hi-1', grade:'고', stem:'PLC 스캔 주기에서 입력-논리-출력 순서가 중요한 이유는?',
       choices:[
         {key:'A',label:'결정적 동작 보장',footnote:'Deterministic Scan'},
         {key:'B',label:'색상 안정'},
         {key:'C',label:'폰트 매칭'},
         {key:'D',label:'이미지 포맷'},
       ], answerKey: pick(10), hint:'예측 가능성 확보',
       explanation:'제어 시스템 신뢰성의 핵심입니다.'},
     { id:'ae-hi-2', grade:'고', stem:'PID 튜닝에서 ZN 방법의 목적은?',
       choices:[
         {key:'A',label:'빠르고 안정적인 응답',footnote:'Ziegler–Nichols'},
         {key:'B',label:'랜덤 동작'},
         {key:'C',label:'색채 조정'},
         {key:'D',label:'텍스트 꾸미기'},
       ], answerKey: pick(11), hint:'경험적 파라미터 설정',
       explanation:'초기값을 얻는 대표 기법입니다.'},
     { id:'ae-hi-3', grade:'고', stem:'안전 무결성 레벨(SIL)을 올리는 조치는?',
       choices:[
         {key:'A',label:'이중화/자기진단',footnote:'Redundancy/Diagnostics'},
         {key:'B',label:'문서 색상 변경'},
         {key:'C',label:'해상도 증가'},
         {key:'D',label:'폰트 교체'},
       ], answerKey: pick(12), hint:'위험 저감 설계',
       explanation:'안전 표준(IEC 61508)에 맞춥니다.'},
     { id:'ae-hi-4', grade:'고', stem:'예지보전에서 진동 분석이 유용한 이유는?',
       choices:[
         {key:'A',label:'베어링/기어 이상 조기 검출',footnote:'Vibration'},
         {key:'B',label:'색감 보정'},
         {key:'C',label:'음량 조절'},
         {key:'D',label:'정렬만'},
       ], answerKey: pick(13), hint:'미세 변화 탐지',
       explanation:'설비 가동 중에도 진단 가능합니다.'},
     { id:'ae-hi-5', grade:'고', stem:'로봇 셀에서 안전펜스 대신 협동로봇을 쓸 때 조건은?',
       choices:[
         {key:'A',label:'속도/힘 제한·안전정지',footnote:'ISO/TS 15066'},
         {key:'B',label:'무방비 운용'},
         {key:'C',label:'사용자 임의'},
         {key:'D',label:'경고음만'},
       ], answerKey: pick(14), hint:'작업자 보호가 최우선',
       explanation:'리스크 평가 후 적정 보호기능이 필수입니다.'},
   ],
 },

 /* ─────────────────────────────────────────────────────────────
  * 3) 메카트로닉스 기술자
  * ───────────────────────────────────────────────────────────── */
 'mechatronics-tech': {
   title: '메카트로닉스 기술자',
   desc: '기계·전자·소프트 통합 유지보수',
   items: [
     // 초(5)
     { id:'mt-el-1', grade:'초', stem:'전원을 안전히 끄는 기본 절차는?',
       choices:[
         {key:'A',label:'차단기 내림/전원 분리',footnote:'Lockout/Tagout'},
         {key:'B',label:'함부로 만지기'},
         {key:'C',label:'몰래 두기'},
         {key:'D',label:'무시하기'},
       ], answerKey: pick(0), hint:'감전/오동작 방지',
       explanation:'LOTO는 안전의 기본입니다.'},
     { id:'mt-el-2', grade:'초', stem:'기계 부품을 조일 때 쓰는 도구는?',
       choices:[
         {key:'A',label:'렌치/드라이버',footnote:'Torque'},
         {key:'B',label:'크레파스'},
         {key:'C',label:'테이프'},
         {key:'D',label:'종이'},
       ], answerKey: pick(1), hint:'규정 토크가 중요합니다.',
       explanation:'풀림/파손을 방지합니다.'},
     { id:'mt-el-3', grade:'초', stem:'도면을 볼 때 중요한 것은?',
       choices:[
         {key:'A',label:'치수/공차',footnote:'Tolerance'},
         {key:'B',label:'색감'},
         {key:'C',label:'음악'},
         {key:'D',label:'냄새'},
       ], answerKey: pick(2), hint:'허용 범위를 확인합니다.',
       explanation:'조립/가공 정확도에 필요합니다.'},
     { id:'mt-el-4', grade:'초', stem:'베어링 윤활의 목적은?',
       choices:[
         {key:'A',label:'마찰/마모 감소',footnote:'Lubrication'},
         {key:'B',label:'색칠'},
         {key:'C',label:'소리 키우기'},
         {key:'D',label:'두드리기'},
       ], answerKey: pick(3), hint:'수명/효율 향상',
       explanation:'정기 윤활/청결 유지가 중요합니다.'},
     { id:'mt-el-5', grade:'초', stem:'멀티미터로 측정 가능한 것은?',
       choices:[
         {key:'A',label:'전압/전류/저항',footnote:'V/A/Ω'},
         {key:'B',label:'사진 해상도'},
         {key:'C',label:'폰트 크기'},
         {key:'D',label:'색상 수'},
       ], answerKey: pick(4), hint:'전기 기본 측정',
       explanation:'고장 진단의 필수 도구입니다.'},

     // 중(5)
     { id:'mt-mid-1', grade:'중', stem:'스텝모터와 서보모터 차이로 옳은 것은?',
       choices:[
         {key:'A',label:'서보는 피드백 포함 정밀 제어',footnote:'Encoder/Closed-loop'},
         {key:'B',label:'둘 다 무작위 구동'},
         {key:'C',label:'둘 다 피드백 없음'},
         {key:'D',label:'둘 다 DC만'},
       ], answerKey: pick(5), hint:'피드백 유무가 핵심입니다.',
       explanation:'서보는 위치/속도/토크 제어가 정밀합니다.'},
     { id:'mt-mid-2', grade:'중', stem:'기계 진동의 공진을 피하려면?',
       choices:[
         {key:'A',label:'고유진동수와 구동 주파수 분리',footnote:'Tuning/Damping'},
         {key:'B',label:'색맞춤'},
         {key:'C',label:'그림 확대'},
         {key:'D',label:'랜덤 이동'},
       ], answerKey: pick(6), hint:'구조/조건을 조정합니다.',
       explanation:'댐핑/질량/강성 조절이 방법입니다.'},
     { id:'mt-mid-3', grade:'중', stem:'PCB에서 납땜 불량을 줄이는 방법은?',
       choices:[
         {key:'A',label:'온도·시간·플럭스 관리',footnote:'Soldering profile'},
         {key:'B',label:'손으로 아무렇게나'},
         {key:'C',label:'색상 변경'},
         {key:'D',label:'종이로 고정'},
       ], answerKey: pick(7), hint:'프로파일 관리가 중요합니다.',
       explanation:'브릿지/냉땜을 방지합니다.'},
     { id:'mt-mid-4', grade:'중', stem:'볼스크류의 특징으로 옳은 것은?',
       choices:[
         {key:'A',label:'높은 효율/정밀 직선운동',footnote:'Ball Screw'},
         {key:'B',label:'색상 변환'},
         {key:'C',label:'음량 증가'},
         {key:'D',label:'텍스트 꾸밈'},
       ], answerKey: pick(8), hint:'서보 축에 흔합니다.',
       explanation:'백래시 관리도 중요합니다.'},
     { id:'mt-mid-5', grade:'중', stem:'정비에서 5S가 의미하는 것은?',
       choices:[
         {key:'A',label:'정리·정돈·청소·청결·습관',footnote:'5S'},
         {key:'B',label:'색·선·소리·손맛·숨결'},
         {key:'C',label:'사진·음악·영상·문서·그림'},
         {key:'D',label:'임의 조합'},
       ], answerKey: pick(9), hint:'현장 기본입니다.',
       explanation:'품질/안전/효율을 높입니다.'},

     // 고(5)
     { id:'mt-hi-1', grade:'고', stem:'유압과 공압의 차이로 옳은 것은?',
       choices:[
         {key:'A',label:'유압은 액체로 높은 힘, 공압은 기체로 빠른 응답',footnote:'Hydraulic vs Pneumatic'},
         {key:'B',label:'둘 다 동일'},
         {key:'C',label:'유압만 사용 금지'},
         {key:'D',label:'공압만 사용 금지'},
       ], answerKey: pick(10), hint:'용도에 맞게 선택합니다.',
       explanation:'힘/정밀도/속도에서 차이가 있습니다.'},
     { id:'mt-hi-2', grade:'고', stem:'정밀 위치 결정을 높이는 피드백 장치는?',
       choices:[
         {key:'A',label:'엔코더/리졸버',footnote:'Encoder/Resolver'},
         {key:'B',label:'스피커'},
         {key:'C',label:'램프'},
         {key:'D',label:'마우스패드'},
       ], answerKey: pick(11), hint:'각도/위치를 읽습니다.',
       explanation:'폐루프 제어에 핵심입니다.'},
     { id:'mt-hi-3', grade:'고', stem:'예방정비(PM)의 장점은?',
       choices:[
         {key:'A',label:'돌발 고장 감소·수명 연장',footnote:'Preventive Maintenance'},
         {key:'B',label:'무조건 비용 증가'},
         {key:'C',label:'품질 악화'},
         {key:'D',label:'안전 저하'},
       ], answerKey: pick(12), hint:'계획적 관리',
       explanation:'TCO를 낮추고 가동률을 올립니다.'},
     { id:'mt-hi-4', grade:'고', stem:'전류가 과하게 흐를 때 회로를 보호하는 부품은?',
       choices:[
         {key:'A',label:'퓨즈/차단기',footnote:'Fuse/Breaker'},
         {key:'B',label:'스티커'},
         {key:'C',label:'빗'},
         {key:'D',label:'상자'},
       ], answerKey: pick(13), hint:'과전류 차단',
       explanation:'화재/고장을 예방합니다.'},
     { id:'mt-hi-5', grade:'고', stem:'정밀 조립에서 토크 관리가 필요한 이유는?',
       choices:[
         {key:'A',label:'풀림 방지·변형 최소화',footnote:'Torque spec'},
         {key:'B',label:'색상 통일'},
         {key:'C',label:'문서 미관'},
         {key:'D',label:'사진 선별'},
       ], answerKey: pick(14), hint:'규정 준수가 품질입니다.',
       explanation:'너무 약/강하면 불량이 납니다.'},
   ],
 },
};