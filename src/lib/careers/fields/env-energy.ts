// src/lib/careers/fields/env-energy.ts
import { CareerFieldModule } from '../types';

/**
 * 환경·에너지 분야 문제은행 (3개 직업)
 * - 정답은 pick(i)로 A/B/C/D 순환(항상 1번 보이는 문제 방지)
 * - 문법/쉼표/따옴표 전부 점검 완료
 */
export const FIELD_KEY = 'env-energy';

type Key = 'A' | 'B' | 'C' | 'D';
const ROT: Key[] = ['A', 'B', 'C', 'D'];
const pick = (i: number): Key => ROT[i % ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
  /* ────────────────────────────────────────────────
   * 1) 환경공학기술사 (초5 · 중5 · 고5)
   * ──────────────────────────────────────────────── */
  'environmental-engineer': {
    title: '환경공학기술사',
    desc: '대기·수질·폐기물 종합 설계·인허가·관리',
    items: [
      // 초(5)
      { id: 'ee-el-1', grade: '초', stem: '깨끗한 공기를 위해 가장 먼저 할 일은?', choices: [
        { key: 'A', label: '먼지/매연을 줄인다', footnote: '배출 저감' },
        { key: 'B', label: '색칠한다' },
        { key: 'C', label: '소리를 낸다' },
        { key: 'D', label: '향수를 뿌린다' },
      ], answerKey: pick(0), hint: '배출원 관리가 핵심', explanation: '오염물질을 줄이면 공기가 깨끗해집니다.' },

      { id: 'ee-el-2', grade: '초', stem: '쓰레기를 줄이는 가장 좋은 방법은?', choices: [
        { key: 'A', label: '재사용/재활용', footnote: '3R' },
        { key: 'B', label: '불태우기만 하기' },
        { key: 'C', label: '그냥 버리기' },
        { key: 'D', label: '묻기' },
      ], answerKey: pick(1), hint: '감량이 최우선', explanation: '재활용보다 감량이 우선입니다.' },

      { id: 'ee-el-3', grade: '초', stem: '강에 기름이 흘렀다면 먼저 해야 할 일은?', choices: [
        { key: 'A', label: '막고 흡착한다', footnote: 'Boom/Absorbent' },
        { key: 'B', label: '섞이게 저어준다' },
        { key: 'C', label: '냄새만 맡는다' },
        { key: 'D', label: '색을 바꾼다' },
      ], answerKey: pick(2), hint: '확산 차단', explanation: '유출 차단 후 수거가 기본입니다.' },

      { id: 'ee-el-4', grade: '초', stem: '미세먼지가 많은 날 실내에서 할 일은?', choices: [
        { key: 'A', label: '창문 닫고 공기청정기 사용' },
        { key: 'B', label: '밖에 나간다' },
        { key: 'C', label: '향만 뿌린다' },
        { key: 'D', label: '소리를 지른다' },
      ], answerKey: pick(3), hint: '노출 최소화', explanation: '필터 관리가 중요합니다.' },

      { id: 'ee-el-5', grade: '초', stem: '하수처리장의 목적은?', choices: [
        { key: 'A', label: '더러운 물을 깨끗하게', footnote: 'BOD/SS 저감' },
        { key: 'B', label: '색칠 연습' },
        { key: 'C', label: '소리 키우기' },
        { key: 'D', label: '향 만들기' },
      ], answerKey: pick(4), hint: '정화가 핵심', explanation: '생물학적 처리로 오염 제거.' },

      // 중(5)
      { id: 'ee-mid-1', grade: '중', stem: '대기오염 방지시설 중 “백필터”의 역할은?', choices: [
        { key: 'A', label: '분진 포집', footnote: 'Particulate removal' },
        { key: 'B', label: '색상 변경' },
        { key: 'C', label: '소리 증폭' },
        { key: 'D', label: '냄새 첨가' },
      ], answerKey: pick(5), hint: '섬유 여과 방식', explanation: '미세먼지 제거용.' },

      { id: 'ee-mid-2', grade: '중', stem: '악취 저감에 효과적인 공정은?', choices: [
        { key: 'A', label: '세정/흡착/바이오필터', footnote: 'Scrubber/Carbon/Bio' },
        { key: 'B', label: '가열만 하기' },
        { key: 'C', label: '색 바꾸기' },
        { key: 'D', label: '진공 포장' },
      ], answerKey: pick(6), hint: '성상별 조합', explanation: '수용성/난용성에 따라 처리 다름.' },

      { id: 'ee-mid-3', grade: '중', stem: '매립지 침출수의 주요 성분은?', choices: [
        { key: 'A', label: '유기물/암모니아/중금속', footnote: 'Leachate' },
        { key: 'B', label: '증류수' },
        { key: 'C', label: '무색무취수' },
        { key: 'D', label: '식수 수준' },
      ], answerKey: pick(7), hint: '고농도 오염수', explanation: '생물학적 처리 필요.' },

      { id: 'ee-mid-4', grade: '중', stem: 'T-N/T-P 저감에 사용되는 화학적 침전의 장점은?', choices: [
        { key: 'A', label: '빠른 반응·안정된 제거', footnote: 'Coagulation/Precipitation' },
        { key: 'B', label: '항상 비용 無' },
        { key: 'C', label: '완전 자동' },
        { key: 'D', label: '부산물 無' },
      ], answerKey: pick(8), hint: 'BNR 보완', explanation: '슬러지 증가 주의.' },

      { id: 'ee-mid-5', grade: '중', stem: '소음·진동 관리에서 dB는?', choices: [
        { key: 'A', label: '소리의 상대적 크기(로그척도)' },
        { key: 'B', label: '색의 진하기' },
        { key: 'C', label: '온도의 단위' },
        { key: 'D', label: '길이의 단위' },
      ], answerKey: pick(9), hint: '3dB 상승=에너지 2배', explanation: '로그 스케일 단위.' },

      // 고(5)
      { id: 'ee-hi-1', grade: '고', stem: '대기 배출허용기준 준수 확인에 사용하는 측정은?', choices: [
        { key: 'A', label: '자기측정·공정시험기준', footnote: 'Stack sampling' },
        { key: 'B', label: '색상 테스트' },
        { key: 'C', label: '향기 테스트' },
        { key: 'D', label: '청각 테스트' },
      ], answerKey: pick(10), hint: '법정 측정 절차', explanation: '주기적 검증 필요.' },

      { id: 'ee-hi-2', grade: '고', stem: '소각로의 DRE(분해제거효율) 향상 요소는?', choices: [
        { key: 'A', label: '온도·시간·교반', footnote: '3T: Temperature/Time/Turbulence' },
        { key: 'B', label: '색·향·소리' },
        { key: 'C', label: '전압·전류·저항' },
        { key: 'D', label: '길이·넓이·높이' },
      ], answerKey: pick(11), hint: '연소 3요소', explanation: '완전연소 확보.' },

      { id: 'ee-hi-3', grade: '고', stem: '환경영향평가(EIA)에서 대안 검토의 목적은?', choices: [
        { key: 'A', label: '환경영향 최소화 방안 비교' },
        { key: 'B', label: '사업 속도만 증가' },
        { key: 'C', label: '색상 결정' },
        { key: 'D', label: '가격만 산정' },
      ], answerKey: pick(12), hint: '합리적 의사결정', explanation: '입지·규모 대안 비교.' },

      { id: 'ee-hi-4', grade: '고', stem: '연속수질측정기기(TMS)의 이점은?', choices: [
        { key: 'A', label: '실시간 감시·이상탐지', footnote: 'Tele-Monitoring' },
        { key: 'B', label: '휴대성 우수' },
        { key: 'C', label: '색상 예쁨' },
        { key: 'D', label: '소리 출력' },
      ], answerKey: pick(13), hint: '실시간 감시', explanation: '누출·우회탐지 가능.' },

      { id: 'ee-hi-5', grade: '고', stem: '온실가스 인벤토리 관리의 핵심은?', choices: [
        { key: 'A', label: '활동자료·배출계수 정확성', footnote: 'Activity data/EF' },
        { key: 'B', label: '색 표준화' },
        { key: 'C', label: '향 표준화' },
        { key: 'D', label: '소리 표준화' },
      ], answerKey: pick(14), hint: 'MRV 체계', explanation: '모니터링·보고·검증 일관성 확보.' },
    ],
  },

  /* ────────────────────────────────────────────────
   * 2) 신재생에너지 엔지니어 (초5 · 중5 · 고5)
   * ──────────────────────────────────────────────── */
  'renewable-eng': {
    title: '신재생에너지 엔지니어',
    desc: '태양광·풍력·수소·ESS 설계/운영/안전',
    items: [
      // 초(5)
      { id: 're-el-1', grade: '초', stem: '재생에너지는 어떤 에너지를 말하나요?', choices: [
        { key: 'A', label: '태양·바람·물처럼 다시 써도 채워지는 에너지' },
        { key: 'B', label: '한 번 쓰면 끝나는 에너지' },
        { key: 'C', label: '색이 예쁜 에너지' },
        { key: 'D', label: '소리가 큰 에너지' },
      ], answerKey: pick(0), hint: '고갈되지 않음', explanation: '자연에서 반복적으로 얻습니다.' },

      { id: 're-el-2', grade: '초', stem: '태양광 패널이 만드는 전기는 보통?', choices: [
        { key: 'A', label: '직류(DC)', footnote: '인버터로 교류화' },
        { key: 'B', label: '교류(AC)' },
        { key: 'C', label: '소리' },
        { key: 'D', label: '색' },
      ], answerKey: pick(1), hint: '인버터가 필요', explanation: '계통연계 시 AC로 변환.' },

      { id: 're-el-3', grade: '초', stem: '풍차(풍력터빈)가 잘 돌아가려면 가장 중요한 것은?', choices: [
        { key: 'A', label: '바람의 세기(풍속)' },
        { key: 'B', label: '색상' },
        { key: 'C', label: '향기' },
        { key: 'D', label: '소리' },
      ], answerKey: pick(2), hint: '세제곱 비례', explanation: '발전량 ∝ 풍속³.' },

      { id: 're-el-4', grade: '초', stem: '에너지를 아끼는 가장 쉬운 방법은?', choices: [
        { key: 'A', label: '안 쓰는 전기 끄기' },
        { key: 'B', label: '불필요하게 켜두기' },
        { key: 'C', label: '색칠하기' },
        { key: 'D', label: '소리 키우기' },
      ], answerKey: pick(3), hint: '절약이 최고의 발전', explanation: '수요관리도 중요.' },

      { id: 're-el-5', grade: '초', stem: 'ESS는 무엇의 약자일까요?', choices: [
        { key: 'A', label: 'Energy Storage System' },
        { key: 'B', label: 'Easy Sound System' },
        { key: 'C', label: 'Earth Sun Source' },
        { key: 'D', label: 'Electric Soft Sensor' },
      ], answerKey: pick(4), hint: '저장 장치', explanation: '배터리 기반 전력 저장.' },

      // 중(5)
      { id: 're-mid-1', grade: '중', stem: '수소의 “그린/블루/그레이” 구분 기준은?', choices: [
        { key: 'A', label: '생산 방식/배출', footnote: 'Electrolysis/CCS' },
        { key: 'B', label: '색깔' },
        { key: 'C', label: '향' },
        { key: 'D', label: '소리' },
      ], answerKey: pick(5), hint: '배출량이 핵심', explanation: '그린=재생전력 전기분해.' },

      { id: 're-mid-2', grade: '중', stem: '풍력 발전량을 크게 좌우하는 인자는?', choices: [
        { key: 'A', label: '풍속', footnote: 'Power ∝ v^3' },
        { key: 'B', label: '터빈 색' },
        { key: 'C', label: '탑 모양' },
        { key: 'D', label: '나사 색' },
      ], answerKey: pick(6), hint: '세제곱 비례', explanation: '입지·난류 고려.' },

      { id: 're-mid-3', grade: '중', stem: '태양광 인버터의 역할은?', choices: [
        { key: 'A', label: '직류→교류 변환', footnote: 'DC-AC' },
        { key: 'B', label: '온도 상승' },
        { key: 'C', label: '색 변환' },
        { key: 'D', label: '소리 변환' },
      ], answerKey: pick(7), hint: '계통 연계', explanation: 'MPPT로 효율 최적화.' },

      { id: 're-mid-4', grade: '중', stem: 'ESS 운영에서 BMS가 하는 일은?', choices: [
        { key: 'A', label: '셀 전압/온도 모니터링·안전', footnote: 'Battery Management System' },
        { key: 'B', label: '음악 재생' },
        { key: 'C', label: '색 조절' },
        { key: 'D', label: '폰트 조절' },
      ], answerKey: pick(8), hint: '안전이 최우선', explanation: 'SOH/SOC 관리.' },

      { id: 're-mid-5', grade: '중', stem: '재생에너지 변동성 대응책은?', choices: [
        { key: 'A', label: '저장/수요관리/스마트그리드', footnote: 'Flexibility' },
        { key: 'B', label: '색상조정' },
        { key: 'C', label: '문서조정' },
        { key: 'D', label: '음향조정' },
      ], answerKey: pick(9), hint: '유연성 자원', explanation: '가격 신호·DR 연계.' },

      // 고(5)
      { id: 're-hi-1', grade: '고', stem: '전력계통의 주파수 안정화에 기여하는 것은?', choices: [
        { key: 'A', label: '관성·가상관성·예비력', footnote: 'Inertia/Reserve' },
        { key: 'B', label: '패널 색상' },
        { key: 'C', label: '타워 도색' },
        { key: 'D', label: '볼트 윤색' },
      ], answerKey: pick(10), hint: '주파수 유지', explanation: '인버터 기반 가상관성 기술.' },

      { id: 're-hi-2', grade: '고', stem: 'LCOE(균등화발전비용)를 낮추는 방법은?', choices: [
        { key: 'A', label: '효율↑·수명↑·CAPEX/OPEX↓', footnote: 'Levelized cost' },
        { key: 'B', label: '색↑' },
        { key: 'C', label: '소리↑' },
        { key: 'D', label: '향↑' },
      ], answerKey: pick(11), hint: '총비용/총발전량', explanation: '기술개선/규모의 경제.' },

      { id: 're-hi-3', grade: '고', stem: 'RE100은 무엇을 의미하나?', choices: [
        { key: 'A', label: '전력 100% 재생에너지 사용', footnote: 'Corporate initiative' },
        { key: 'B', label: '효율 100%' },
        { key: 'C', label: '저장 100%' },
        { key: 'D', label: '수소 100%' },
      ], answerKey: pick(12), hint: '기업 주도 캠페인', explanation: '스코프2 감축과 연결.' },

      { id: 're-hi-4', grade: '고', stem: '태양광 “열화(Degradation)”의 주요 원인은?', choices: [
        { key: 'A', label: 'UV/열·습기/물질 열화', footnote: 'PID/LID' },
        { key: 'B', label: '색상 저하' },
        { key: 'C', label: '소리 저하' },
        { key: 'D', label: '향 저하' },
      ], answerKey: pick(13), hint: '수명 관리', explanation: '보증곡선 고려.' },

      { id: 're-hi-5', grade: '고', stem: '수소 안전에서 가장 중요한 것은?', choices: [
        { key: 'A', label: '누설 감지/환기/방폭', footnote: 'Safety' },
        { key: 'B', label: '색칠' },
        { key: 'C', label: '음악' },
        { key: 'D', label: '향수' },
      ], answerKey: pick(14), hint: '경량·확산 빠름', explanation: '센서·환기·차단 장치.' },
    ],
  },

  /* ────────────────────────────────────────────────
   * 3) 수질분석 기사 (초5 · 중5 · 고5)
   * ──────────────────────────────────────────────── */
  'water-quality-analyst': {
    title: '수질분석 기사',
    desc: '시료 채취·전처리·분석·품질관리',
    items: [
      // 초(5)
      { id: 'wa-el-1', grade: '초', stem: '깨끗한 물의 대표 지표는?', choices: [
        { key: 'A', label: '탁도 낮음/색·냄새 없음', footnote: 'Turbidity/Color/Odor' },
        { key: 'B', label: '색 화려' },
        { key: 'C', label: '소리 큼' },
        { key: 'D', label: '향 강함' },
      ], answerKey: pick(0), hint: '감각+수치', explanation: '법정 기준 존재.' },

      { id: 'wa-el-2', grade: '초', stem: '수돗물 염소 소독의 목적은?', choices: [
        { key: 'A', label: '병원성 미생물 제거', footnote: 'Disinfection' },
        { key: 'B', label: '향 추가' },
        { key: 'C', label: '색 추가' },
        { key: 'D', label: '소리 추가' },
      ], answerKey: pick(1), hint: '잔류염소 관리', explanation: '과·부족 모두 문제.' },

      { id: 'wa-el-3', grade: '초', stem: '비가 많이 오면 강물이?', choices: [
        { key: 'A', label: '흙탕물→탁도↑', footnote: 'Runoff' },
        { key: 'B', label: '색상 일정' },
        { key: 'C', label: '냄새 진해짐' },
        { key: 'D', label: '소리 작아짐' },
      ], answerKey: pick(2), hint: '부유물 증가', explanation: '유출수가 탁도를 높임.' },

      { id: 'wa-el-4', grade: '초', stem: '강가에 쓰레기를 버리면?', choices: [
        { key: 'A', label: '수질/생태 악화', footnote: 'Pollution' },
        { key: 'B', label: '사진 좋아짐' },
        { key: 'C', label: '색 좋아짐' },
        { key: 'D', label: '향 좋아짐' },
      ], answerKey: pick(3), hint: '불법 투기 금지', explanation: '환경범죄입니다.' },

      { id: 'wa-el-5', grade: '초', stem: '정수장에서 물을 깨끗하게 하는 과정은?', choices: [
        { key: 'A', label: '응집→침전→여과→소독', footnote: 'Water treatment' },
        { key: 'B', label: '색칠' },
        { key: 'C', label: '음악' },
        { key: 'D', label: '그림' },
      ], answerKey: pick(4), hint: '기본 공정', explanation: '입자 제거→미생물 제어.' },

      // 중(5)
      { id: 'wa-mid-1', grade: '중', stem: '시료 채취에서 대표성을 높이려면?', choices: [
        { key: 'A', label: '혼합 채수/적정 지점·시간', footnote: 'Composite sampling' },
        { key: 'B', label: '임의 지점' },
        { key: 'C', label: '한 번만' },
        { key: 'D', label: '깊이 무시' },
      ], answerKey: pick(5), hint: '공간·시간 반영', explanation: '표준 절차 준수.' },

      { id: 'wa-mid-2', grade: '중', stem: 'pH 전극 보정이 필요한 이유는?', choices: [
        { key: 'A', label: '정확도 확보', footnote: 'Calibration' },
        { key: 'B', label: '색 일치' },
        { key: 'C', label: '소리 일치' },
        { key: 'D', label: '향 일치' },
      ], answerKey: pick(6), hint: '표준 용액 사용', explanation: '온도 보정 병행.' },

      { id: 'wa-mid-3', grade: '중', stem: '총인(TP)/총질소(TN) 저감 공정은?', choices: [
        { key: 'A', label: '생물학적 제거/화학침전', footnote: 'BNR/Chemical' },
        { key: 'B', label: '색 조정' },
        { key: 'C', label: '음향 조정' },
        { key: 'D', label: '문서 조정' },
      ], answerKey: pick(7), hint: '부영양화 방지', explanation: '알갈 블룸 억제.' },

      { id: 'wa-mid-4', grade: '중', stem: '금속 분석에 쓰는 기기?', choices: [
        { key: 'A', label: 'AAS/ICP-OES/ICP-MS', footnote: 'Spectrometry' },
        { key: 'B', label: '스피커' },
        { key: 'C', label: '프린터' },
        { key: 'D', label: '카메라' },
      ], answerKey: pick(8), hint: '감도/정확도', explanation: '전처리/희석 주의.' },

      { id: 'wa-mid-5', grade: '중', stem: 'QA/QC 문서화 목적은?', choices: [
        { key: 'A', label: '추적성/재현성 확보', footnote: 'Quality assurance/control' },
        { key: 'B', label: '색상 기록' },
        { key: 'C', label: '음향 기록' },
        { key: 'D', label: '향 기록' },
      ], answerKey: pick(9), hint: '검교정/블랭크/표준물질', explanation: '데이터 신뢰 보증.' },

      // 고(5)
      { id: 'wa-hi-1', grade: '고', stem: 'TOC 분석이 의미하는 것은?', choices: [
        { key: 'A', label: '총유기탄소—유기오염 지표', footnote: 'Total Organic Carbon' },
        { key: 'B', label: '총산소 소비' },
        { key: 'C', label: '총질소 측정' },
        { key: 'D', label: '총염분' },
      ], answerKey: pick(10), hint: '산화→CO₂ 측정', explanation: '유기물 총량 평가.' },

      { id: 'wa-hi-2', grade: '고', stem: 'LOD/LOQ는 무엇을 뜻하나?', choices: [
        { key: 'A', label: '검출/정량 한계', footnote: 'Limit of detection/quantitation' },
        { key: 'B', label: '색/향 한계' },
        { key: 'C', label: '음/진동 한계' },
        { key: 'D', label: '압력 한계' },
      ], answerKey: pick(11), hint: '민감도 지표', explanation: '신호대잡음 기준.' },

      { id: 'wa-hi-3', grade: '고', stem: '크로마토그래피 피크가 꼬리질 때(테일링) 조치는?', choices: [
        { key: 'A', label: '컬럼/이동상 조건 최적화', footnote: 'Peak tailing' },
        { key: 'B', label: '색 강화' },
        { key: 'C', label: '소리 강화' },
        { key: 'D', label: '향 강화' },
      ], answerKey: pick(12), hint: '분리 효율 개선', explanation: 'pH/용매/컬럼 관리.' },

      { id: 'wa-hi-4', grade: '고', stem: '불확도(uncertainty) 산정이 필요한 이유는?', choices: [
        { key: 'A', label: '결과 신뢰 범위 제시', footnote: 'Measurement uncertainty' },
        { key: 'B', label: '색상 표현' },
        { key: 'C', label: '음량 표현' },
        { key: 'D', label: '향 표현' },
      ], answerKey: pick(13), hint: '품질 표시', explanation: 'KOLAS/ISO 요구.' },

      { id: 'wa-hi-5', grade: '고', stem: '수질 기준 초과 시 우선 조치는?', choices: [
        { key: 'A', label: '재시료/원인 조사/시정', footnote: 'Corrective action' },
        { key: 'B', label: '문서만 작성' },
        { key: 'C', label: '무시' },
        { key: 'D', label: '색만 변경' },
      ], answerKey: pick(14), hint: '원인 규명', explanation: '공정/배출원 점검.' },
    ],
  },
};