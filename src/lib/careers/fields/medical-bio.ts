import { CareerFieldModule } from '../types';

export const FIELD_KEY = 'medical-bio';

// ✅ 정답 분산(랜덤 회전) 패치: A/B/C/D가 균등 분산되도록 회전
type Key = 'A'|'B'|'C'|'D';
const ROT: Key[] = ['A','B','C','D'];
const pick = (i: number) => ROT[i % ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
  /* ─────────────────────────────────────────────────────────────
   * 1) 임상병리사 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'medical-technologist': {
    title: '임상병리사',
    desc: '검체 채취·분석·품질관리',
    items: [
      // ── 초등(5)
      { id:'mt-el-1', grade:'초', stem:'병원 검사실에서 “혈액형”을 확인하는 이유는?', choices:[
        {key:'A',label:'수혈 시 안전하게 맞추기 위해',footnote:'ABO/Rh typing'},
        {key:'B',label:'색을 고르려고'},
        {key:'C',label:'장식하려고'},
        {key:'D',label:'그림을 그리려고'},
      ], answerKey: pick(0), hint:'수혈 안전의 핵심입니다.', explanation:'혈액형이 맞지 않으면 응집·용혈 등 심각한 부작용이 생깁니다.'},
      { id:'mt-el-2', grade:'초', stem:'검체를 담는 “튜브 뚜껑 색”이 다른 이유는?', choices:[
        {key:'A',label:'각기 다른 첨가제가 들어있기 때문',footnote:'EDTA/Clot activator 등'},
        {key:'B',label:'기분 전환'},
        {key:'C',label:'멋있어 보이려고'},
        {key:'D',label:'행사 때문'},
      ], answerKey: pick(1), hint:'검사 목적에 맞춰 선택합니다.', explanation:'예: 혈액학은 EDTA(보라), 생화학은 혈청(빨강/노랑) 등.'},
      { id:'mt-el-3', grade:'초', stem:'검체 라벨에 꼭 필요한 정보는?', choices:[
        {key:'A',label:'이름/식별번호/채취시간',footnote:'Patient ID'},
        {key:'B',label:'좋아하는 음식'},
        {key:'C',label:'별자리'},
        {key:'D',label:'게임 아이디'},
      ], answerKey: pick(2), hint:'동일인 식별이 최우선.', explanation:'오표본·오분석을 막기 위해 정확한 라벨링이 필수입니다.'},
      { id:'mt-el-4', grade:'초', stem:'현미경으로 세포를 보는 이유는?', choices:[
        {key:'A',label:'눈으로는 작은 구조를 볼 수 없어서',footnote:'Microscopy'},
        {key:'B',label:'색을 바꾸려고'},
        {key:'C',label:'소리를 듣기 위해'},
        {key:'D',label:'냄새를 맡기 위해'},
      ], answerKey: pick(3), hint:'배율을 높여 관찰합니다.', explanation:'염색(예: Giemsa) 후 형태학적 이상을 확인합니다.'},
      { id:'mt-el-5', grade:'초', stem:'검사실에서 손을 자주 씻는 이유는?', choices:[
        {key:'A',label:'감염을 막기 위해',footnote:'Infection control'},
        {key:'B',label:'손이 심심해서'},
        {key:'C',label:'손에 그림을 그리려고'},
        {key:'D',label:'물놀이를 좋아해서'},
      ], answerKey: pick(4), hint:'기본 위생 수칙입니다.', explanation:'표준주의(손 위생)는 감염 예방의 기본입니다.'},

      // ── 중등(5)
      { id:'mt-mid-1', grade:'중', stem:'혈액 도말표본에서 백혈구 감별계수를 보는 목적은?', choices:[
        {key:'A',label:'염증/감염/혈액질환 단서 확인',footnote:'Differential count'},
        {key:'B',label:'피부색 판별'},
        {key:'C',label:'키 측정'},
        {key:'D',label:'시력 검사'},
      ], answerKey: pick(5), hint:'분획 비율을 확인합니다.', explanation:'호중구/림프구/단구/호산구/호염구 비율로 상태를 파악합니다.'},
      { id:'mt-mid-2', grade:'중', stem:'소변검사의 “시험지 스트립”으로 측정하기 어려운 것은?', choices:[
        {key:'A',label:'세균 배양 동정',footnote:'Culture 필요'},
        {key:'B',label:'pH'},
        {key:'C',label:'포도당'},
        {key:'D',label:'단백질'},
      ], answerKey: pick(6), hint:'배양/동정은 별도 과정.', explanation:'스트립은 선별 검사로, 확진은 현미경/배양이 필요합니다.'},
      { id:'mt-mid-3', grade:'중', stem:'PCR 검사가 민감한 이유는?', choices:[
        {key:'A',label:'특정 유전자를 수백만 배 증폭',footnote:'Polymerase Chain Reaction'},
        {key:'B',label:'현미경 확대가 커서'},
        {key:'C',label:'색이 진해서'},
        {key:'D',label:'냄새가 강해서'},
      ], answerKey: pick(7), hint:'표적 서열만 증폭.', explanation:'프라이머 특이성에 따라 고감도로 검출합니다.'},
      { id:'mt-mid-4', grade:'중', stem:'검체 운송 시 “콜드체인”이 필요한 이유는?', choices:[
        {key:'A',label:'분해/변성을 늦추기 위해',footnote:'Cold chain'},
        {key:'B',label:'간식 보관'},
        {key:'C',label:'색 보정'},
        {key:'D',label:'소음 감소'},
      ], answerKey: pick(8), hint:'온도 유지가 핵심.', explanation:'효소/단백 등 온도 민감 물질 보호를 위해 필요합니다.'},
      { id:'mt-mid-5', grade:'중', stem:'검사 결과 “품질관리(QC)”에서 양질의 지표는?', choices:[
        {key:'A',label:'정확도·정밀도·재현성',footnote:'Accuracy/Precision'},
        {key:'B',label:'문서 길이'},
        {key:'C',label:'그림 개수'},
        {key:'D',label:'폰트 종류'},
      ], answerKey: pick(9), hint:'오차를 관리합니다.', explanation:'내/외부정도관리로 체계적으로 관리합니다.'},

      // ── 고등(5)
      { id:'mt-hi-1', grade:'고', stem:'혈액 응고검사에서 PT/aPTT 연장은 무엇을 시사할 수 있는가?', choices:[
        {key:'A',label:'응고인자 결핍/항응고제 영향',footnote:'Coagulation'},
        {key:'B',label:'시력 저하'},
        {key:'C',label:'청력 저하'},
        {key:'D',label:'체온 상승'},
      ], answerKey: pick(10), hint:'경로별 해석 필요.', explanation:'내인성/외인성 경로 이상, 항응고제 모니터링과 연결됨.'},
      { id:'mt-hi-2', grade:'고', stem:'qPCR에서 Ct 값이 낮다는 의미는?', choices:[
        {key:'A',label:'표적 농도가 높다',footnote:'Threshold Cycle'},
        {key:'B',label:'표적이 없다'},
        {key:'C',label:'장비가 정지했다'},
        {key:'D',label:'색이 바뀌었다'},
      ], answerKey: pick(11), hint:'초기량과 반비례.', explanation:'Ct↓ = 초기 템플릿↑ (지표 해석에 주의).'},
      { id:'mt-hi-3', grade:'고', stem:'면역검사(ELISA)의 원리는?', choices:[
        {key:'A',label:'항원-항체 결합의 특이성',footnote:'Enzyme-Linked ImmunoSorbent Assay'},
        {key:'B',label:'빛의 굴절'},
        {key:'C',label:'소리의 반사'},
        {key:'D',label:'열의 대류'},
      ], answerKey: pick(12), hint:'특이 결합을 측정.', explanation:'효소 반응으로 신호를 읽어 정량/정성 분석합니다.'},
      { id:'mt-hi-4', grade:'고', stem:'혈액 배양 양성 알림 후 조치는?', choices:[
        {key:'A',label:'그람염색/동정·감수성 검사',footnote:'ID/AST'},
        {key:'B',label:'색칠하기'},
        {key:'C',label:'파일 복사'},
        {key:'D',label:'인쇄'},
      ], answerKey: pick(13), hint:'패혈증 대응 속도 중요.', explanation:'원인균 동정과 항생제 감수성 결과 제공.'},
      { id:'mt-hi-5', grade:'고', stem:'검사실 인증(KOLAS/ISO15189)의 목적은?', choices:[
        {key:'A',label:'품질/신뢰성 보증',footnote:'Laboratory accreditation'},
        {key:'B',label:'포스터 전시'},
        {key:'C',label:'조명 설치'},
        {key:'D',label:'배경 음악'},
      ], answerKey: pick(14), hint:'표준화된 절차.', explanation:'환자 안전과 결과 신뢰도를 제도적으로 보증합니다.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 2) 생명공학 연구원 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'biomedical-researcher': {
    title: '생명공학 연구원',
    desc: '실험 설계·분자생물학·데이터 해석',
    items: [
      // ── 초등(5)
      { id:'br-el-1', grade:'초', stem:'현미경으로 세균을 볼 때 필요한 처리?', choices:[
        {key:'A',label:'염색',footnote:'Staining'},
        {key:'B',label:'소금 뿌리기'},
        {key:'C',label:'노래 부르기'},
        {key:'D',label:'그림 그리기'},
      ], answerKey: pick(0), hint:'대비를 높입니다.', explanation:'그람염색 등으로 구조를 더 잘 보이게 합니다.'},
      { id:'br-el-2', grade:'초', stem:'실험에서 “대조군”이 필요한 이유는?', choices:[
        {key:'A',label:'변화의 원인을 비교하기 위해',footnote:'Control'},
        {key:'B',label:'친구와 나누려고'},
        {key:'C',label:'색을 맞추려고'},
        {key:'D',label:'멋을 내려고'},
      ], answerKey: pick(1), hint:'비교 대상이 기준입니다.', explanation:'실험군과 대조군의 차이로 효과를 판단합니다.'},
      { id:'br-el-3', grade:'초', stem:'DNA를 자르는 효소는?', choices:[
        {key:'A',label:'제한효소',footnote:'Restriction enzyme'},
        {key:'B',label:'소화효소'},
        {key:'C',label:'도색약'},
        {key:'D',label:'세제'},
      ], answerKey: pick(2), hint:'특정 염기서열 인식.', explanation:'재조합·클로닝 등에 활용됩니다.'},
      { id:'br-el-4', grade:'초', stem:'배양접시에 미생물이 자라도록 도와주는 것은?', choices:[
        {key:'A',label:'배지',footnote:'Culture medium'},
        {key:'B',label:'색연필'},
        {key:'C',label:'풀'},
        {key:'D',label:'테이프'},
      ], answerKey: pick(3), hint:'영양 공급.', explanation:'필요한 영양·pH·온도를 제공합니다.'},
      { id:'br-el-5', grade:'초', stem:'실험 노트를 쓰는 가장 큰 이유는?', choices:[
        {key:'A',label:'재현성과 기록 보존',footnote:'Reproducibility'},
        {key:'B',label:'그림 모음'},
        {key:'C',label:'색상 정리'},
        {key:'D',label:'스티커 붙이기'},
      ], answerKey: pick(4), hint:'누가 해도 다시 되게.', explanation:'조건/결과/해석을 정확히 남깁니다.'},

      // ── 중등(5)
      { id:'br-mid-1', grade:'중', stem:'전기영동에서 밴드가 더 멀리 이동했다는 뜻은?', choices:[
        {key:'A',label:'분자량(길이)이 더 작다',footnote:'Gel electrophoresis'},
        {key:'B',label:'온도가 높다'},
        {key:'C',label:'사진이 선명하다'},
        {key:'D',label:'노래가 빠르다'},
      ], answerKey: pick(5), hint:'작을수록 잘 이동.', explanation:'겔의 망사 구조에서 작은 분자가 더 빨리 이동합니다.'},
      { id:'br-mid-2', grade:'중', stem:'플라스미드 클로닝에서 필수 요소가 아닌 것은?', choices:[
        {key:'A',label:'라벨 프린터'},
        {key:'B',label:'복제 기점(ori)',footnote:'Origin of replication'},
        {key:'C',label:'선택 마커',footnote:'Antibiotic resistance'},
        {key:'D',label:'다중 클로닝 부위',footnote:'MCS'},
      ], answerKey: pick(6), hint:'벡터 기본 구성.', explanation:'ori/마커/MCS로 증식과 선별이 가능합니다.'},
      { id:'br-mid-3', grade:'중', stem:'CRISPR-Cas9의 역할은?', choices:[
        {key:'A',label:'특정 DNA를 절단/편집',footnote:'Genome editing'},
        {key:'B',label:'사진 보정'},
        {key:'C',label:'음악 편집'},
        {key:'D',label:'문서 정렬'},
      ], answerKey: pick(7), hint:'가이드 RNA 필요.', explanation:'표적 서열에 결합해 Cas9이 절단합니다.'},
      { id:'br-mid-4', grade:'중', stem:'단백질 정량에 쓰는 BCA/Bradford의 공통점은?', choices:[
        {key:'A',label:'색 변화로 농도 측정',footnote:'Colorimetric assay'},
        {key:'B',label:'소리로 농도 측정'},
        {key:'C',label:'냄새로 판단'},
        {key:'D',label:'촉감으로 판단'},
      ], answerKey: pick(8), hint:'흡광도 기반.', explanation:'표준곡선으로 정량합니다.'},
      { id:'br-mid-5', grade:'중', stem:'세포배양 오염을 줄이는 기본 수칙은?', choices:[
        {key:'A',label:'무균 조작·장비 소독',footnote:'Aseptic technique'},
        {key:'B',label:'대화 많이 하기'},
        {key:'C',label:'조명 바꾸기'},
        {key:'D',label:'색 연하게'},
      ], answerKey: pick(9), hint:'클린벤치 사용.', explanation:'에탄올 소독/화염 멸균 등 표준 수칙 준수.'},

      // ── 고등(5)
      { id:'br-hi-1', grade:'고', stem:'RNA-Seq에서 차등 발현 유전자(DEG)를 찾는 통계 절차는?', choices:[
        {key:'A',label:'정규화·다중검정 보정',footnote:'Normalization/FDR'},
        {key:'B',label:'이미지 크기 조절'},
        {key:'C',label:'폰트 패키지'},
        {key:'D',label:'색상 팔레트'},
      ], answerKey: pick(10), hint:'표준화와 FDR.', explanation:'라이브러리 크기/조성 차이를 보정 후 검정합니다.'},
      { id:'br-hi-2', grade:'고', stem:'단백질체(Proteomics) 분석에서 MS/MS가 필요한 이유는?', choices:[
        {key:'A',label:'펩타이드 서열 확인',footnote:'Mass spectrometry'},
        {key:'B',label:'소리 녹음'},
        {key:'C',label:'사진 인화'},
        {key:'D',label:'문서 프린트'},
      ], answerKey: pick(11), hint:'질량-전하 비 탐지.', explanation:'스펙트럼 매칭으로 동정합니다.'},
      { id:'br-hi-3', grade:'고', stem:'실험 설계에서 블라인드/랜덤화가 필요한 이유는?', choices:[
        {key:'A',label:'편향을 줄여 신뢰성 향상',footnote:'Bias control'},
        {key:'B',label:'문서 꾸미기'},
        {key:'C',label:'배경음'},
        {key:'D',label:'아이콘'},
      ], answerKey: pick(12), hint:'내적 타당도 확보.', explanation:'교란 요인을 통제합니다.'},
      { id:'br-hi-4', grade:'고', stem:'단백질 정제에 크로마토그래피를 쓰는 이유는?', choices:[
        {key:'A',label:'특성 차이로 분리',footnote:'Affinity/Ion exchange/Size-exclusion'},
        {key:'B',label:'색상 정렬'},
        {key:'C',label:'음량 정렬'},
        {key:'D',label:'파일 정렬'},
      ], answerKey: pick(13), hint:'친화/전하/크기 이용.', explanation:'다단계로 순도를 높입니다.'},
      { id:'br-hi-5', grade:'고', stem:'연구 데이터 관리의 핵심 원칙은?', choices:[
        {key:'A',label:'FAIR(찾기·접근·상호운용·재사용)',footnote:'FAIR principles'},
        {key:'B',label:'무작위 저장'},
        {key:'C',label:'암호 미사용'},
        {key:'D',label:'버전 미관리'},
      ], answerKey: pick(14), hint:'메타데이터/버전/보안.', explanation:'재현성과 공유를 높입니다.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 3) 임상시험 코디네이터 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'clinical-research-coordinator': {
    title: '임상시험 코디네이터',
    desc: '피험자 관리·프로토콜·데이터 품질',
    items: [
      // ── 초등(5)
      { id:'crc-el-1', grade:'초', stem:'임상시험에서 “동의서”가 중요한 이유는?', choices:[
        {key:'A',label:'참여자가 충분히 이해하고 동의했음을 확인',footnote:'Informed consent'},
        {key:'B',label:'색상 선택'},
        {key:'C',label:'그림 장식'},
        {key:'D',label:'게임 시작'},
      ], answerKey: pick(0), hint:'윤리의 핵심.', explanation:'자발성·이해·서명이 충족되어야 합니다.'},
      { id:'crc-el-2', grade:'초', stem:'피험자의 일정/검사를 기록하는 표는?', choices:[
        {key:'A',label:'방문 스케줄(SoA)',footnote:'Schedule of Activities'},
        {key:'B',label:'도색 계획'},
        {key:'C',label:'음악 목록'},
        {key:'D',label:'사진첩'},
      ], answerKey: pick(1), hint:'무엇을 언제 하는지.', explanation:'프로토콜에 정의된 방문/검사 일정을 따릅니다.'},
      { id:'crc-el-3', grade:'초', stem:'시험에서 약을 가짜로 주는 방법은?', choices:[
        {key:'A',label:'플라시보',footnote:'Placebo'},
        {key:'B',label:'사진'},
        {key:'C',label:'소리'},
        {key:'D',label:'그림'},
      ], answerKey: pick(2), hint:'대조를 위해 사용.', explanation:'효과 비교를 위한 통제 수단입니다.'},
      { id:'crc-el-4', grade:'초', stem:'개인정보를 지키기 위해 하는 조치는?', choices:[
        {key:'A',label:'식별자 가림/코딩',footnote:'De-identification'},
        {key:'B',label:'확성기 사용'},
        {key:'C',label:'현수막 설치'},
        {key:'D',label:'배경음 재생'},
      ], answerKey: pick(3), hint:'민감정보 보호.', explanation:'식별정보는 별도로 보호·관리합니다.'},
      { id:'crc-el-5', grade:'초', stem:'부작용을 기록하는 문서는?', choices:[
        {key:'A',label:'이상사례 보고서',footnote:'Adverse event'},
        {key:'B',label:'그림 일기'},
        {key:'C',label:'색상표'},
        {key:'D',label:'스티커북'},
      ], answerKey: pick(4), hint:'중대성 분류.', explanation:'중대한 이상사례는 즉시 보고합니다.'},

      // ── 중등(5)
      { id:'crc-mid-1', grade:'중', stem:'CRF(Case Report Form)의 목적은?', choices:[
        {key:'A',label:'시험 데이터 표준 수집',footnote:'CDASH/SDTM'},
        {key:'B',label:'사진 편집'},
        {key:'C',label:'음악 편집'},
        {key:'D',label:'문서 편집'},
      ], answerKey: pick(5), hint:'전자 CRF가 일반적.', explanation:'일관된 구조로 데이터 품질을 높입니다.'},
      { id:'crc-mid-2', grade:'중', stem:'프로토콜 편차(Deviation) 발생 시 우선 조치?', choices:[
        {key:'A',label:'원인 기록·영향 평가·보고',footnote:'Deviation handling'},
        {key:'B',label:'삭제'},
        {key:'C',label:'숨김'},
        {key:'D',label:'무시'},
      ], answerKey: pick(6), hint:'문서화가 먼저.', explanation:'재발 방지 대책과 함께 보고합니다.'},
      { id:'crc-mid-3', grade:'중', stem:'무작위 배정(Randomization)의 목적은?', choices:[
        {key:'A',label:'교란요인 균형화',footnote:'Bias reduction'},
        {key:'B',label:'색 균형'},
        {key:'C',label:'소리 균형'},
        {key:'D',label:'조명 균형'},
      ], answerKey: pick(7), hint:'내적 타당도 향상.', explanation:'군 간 비교 가능성을 높입니다.'},
      { id:'crc-mid-4', grade:'중', stem:'시험 중 중도 탈락(Withdrawal) 데이터 처리는?', choices:[
        {key:'A',label:'사유 기록·가능한 범위 분석 포함',footnote:'ITT/PP 고려'},
        {key:'B',label:'모두 삭제'},
        {key:'C',label:'무조건 0점'},
        {key:'D',label:'숨김'},
      ], answerKey: pick(8), hint:'해석 주의.', explanation:'분석 계획서에 따라 처리합니다.'},
      { id:'crc-mid-5', grade:'중', stem:'모니터링(Clinical Monitoring)의 목적은?', choices:[
        {key:'A',label:'현장 데이터·윤리·안전 확인',footnote:'GCP'},
        {key:'B',label:'배경음 조절'},
        {key:'C',label:'사진 미리보기'},
        {key:'D',label:'글꼴 교체'},
      ], answerKey: pick(9), hint:'품질 보증.', explanation:'원자료 대조(SDV) 등 절차를 수행합니다.'},

      // ── 고등(5)
      { id:'crc-hi-1', grade:'고', stem:'비열등성 시험에서 마진(Δ)을 정하는 이유는?', choices:[
        {key:'A',label:'임상적으로 허용 가능한 차이를 정의',footnote:'Non-inferiority margin'},
        {key:'B',label:'문서 길이 정하기'},
        {key:'C',label:'색상 정하기'},
        {key:'D',label:'음량 정하기'},
      ], answerKey: pick(10), hint:'통계·임상 근거.', explanation:'참조 치료 대비 허용 한계를 사전에 명시합니다.'},
      { id:'crc-hi-2', grade:'고', stem:'중간분석(Interim analysis)에서 유의수준 조정이 필요한 이유는?', choices:[
        {key:'A',label:'다중검정 오류(Type I) 제어',footnote:'Alpha spending'},
        {key:'B',label:'사진 왜곡 보정'},
        {key:'C',label:'문서 자동화'},
        {key:'D',label:'색공간 변환'},
      ], answerKey: pick(11), hint:'오류율 관리.', explanation:'O’Brien-Fleming 등 지출 함수 사용.'},
      { id:'crc-hi-3', grade:'고', stem:'전자 임상데이터 표준(전자제출)을 위해 쓰는 모델은?', choices:[
        {key:'A',label:'CDISC SDTM/ADaM',footnote:'Regulatory submission'},
        {key:'B',label:'RGB 색상'},
        {key:'C',label:'PDF 표준'},
        {key:'D',label:'MIDI 규격'},
      ], answerKey: pick(12), hint:'표준 모델.', explanation:'SDTM(수집/도메인), ADaM(분석)으로 구성됩니다.'},
      { id:'crc-hi-4', grade:'고', stem:'실제진료자료(RWD)·실세계근거(RWE)가 중요한 이유는?', choices:[
        {key:'A',label:'현실 적용성·외적 타당도 향상',footnote:'Real-world data/evidence'},
        {key:'B',label:'색상 대비 향상'},
        {key:'C',label:'해상도 향상'},
        {key:'D',label:'폰트 향상'},
      ], answerKey: pick(13), hint:'임상 의사결정 보조.', explanation:'임상시험 한계를 보완합니다.'},
      { id:'crc-hi-5', grade:'고', stem:'민감정보/유전체 데이터 처리 원칙은?', choices:[
        {key:'A',label:'최소수집·동의·비식별·암호화',footnote:'Privacy/GDPR/HIPAA'},
        {key:'B',label:'무제한 공유'},
        {key:'C',label:'평문 저장'},
        {key:'D',label:'동의 생략'},
      ], answerKey: pick(14), hint:'윤리·법 준수.', explanation:'접근권한/로그 관리 포함.'},
    ],
  },
};
