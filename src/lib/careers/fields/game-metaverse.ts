import { CareerFieldModule } from '../types';

export const FIELD_KEY = 'game-metaverse';

// ✅ 정답 분산(랜덤 회전) 패치: A/B/C/D가 균등 분산되도록 회전
type Key = 'A'|'B'|'C'|'D';
const ROT: Key[] = ['A','B','C','D'];
const pick = (i: number) => ROT[i % ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
  /* ─────────────────────────────────────────────────────────────
   * 1) 게임 개발자 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'game-developer': {
    title: '게임 개발자',
    desc: '게임 기획·엔진·그래픽·네트워크 구현',
    items: [
      // ── 초등(5)
      { id:'gd-el-1', grade:'초', stem:'게임을 만들 때 핵심 뼈대 역할을 하는 것은?', choices:[
        {key:'A',label:'게임 엔진',footnote:'Unity/Unreal'},
        {key:'B',label:'지우개'},
        {key:'C',label:'색연필'},
        {key:'D',label:'자'},
      ], answerKey: pick(0), hint:'그래픽·물리·사운드가 포함됩니다.', explanation:'엔진은 렌더링/물리/오디오 등 핵심 시스템을 제공합니다.'},
      { id:'gd-el-2', grade:'초', stem:'캐릭터가 움직이도록 만드는 작업은?', choices:[
        {key:'A',label:'애니메이션',footnote:'Animation'},
        {key:'B',label:'복사'},
        {key:'C',label:'붙여넣기'},
        {key:'D',label:'삭제'},
      ], answerKey: pick(1), hint:'키프레임·리깅을 떠올려 보세요.', explanation:'애니메이션은 포즈/관절 정보를 시간에 따라 변화시킵니다.'},
      { id:'gd-el-3', grade:'초', stem:'게임에서 점수, 체력 같은 정보를 보여주는 UI를 무엇이라 할까요?', choices:[
        {key:'A',label:'HUD',footnote:'Head-Up Display'},
        {key:'B',label:'MP3'},
        {key:'C',label:'PDF'},
        {key:'D',label:'DNS'},
      ], answerKey: pick(2), hint:'화면 위쪽에 자주 보입니다.', explanation:'HUD는 사용자에게 핵심 정보를 즉시 제공합니다.'},
      { id:'gd-el-4', grade:'초', stem:'플레이어 입력(키보드/터치)을 처리하는 시스템은?', choices:[
        {key:'A',label:'입력 시스템',footnote:'Input System'},
        {key:'B',label:'날씨 시스템'},
        {key:'C',label:'메일 시스템'},
        {key:'D',label:'프린터'},
      ], answerKey: pick(3), hint:'키/마우스/패드를 읽어옵니다.', explanation:'입력 시스템은 조작을 이벤트로 변환해 게임 로직에 전달합니다.'},
      { id:'gd-el-5', grade:'초', stem:'게임에서 “버그”란?', choices:[
        {key:'A',label:'의도하지 않은 오류/문제',footnote:'Bug'},
        {key:'B',label:'점수'},
        {key:'C',label:'캐릭터'},
        {key:'D',label:'배경음'},
      ], answerKey: pick(4), hint:'테스트로 찾아서 고칩니다.', explanation:'버그는 플레이 경험을 해치므로 QA가 중요합니다.'},

      // ── 중등(5)
      { id:'gd-mid-1', grade:'중', stem:'게임 루프(Game Loop)의 핵심 단계가 아닌 것은?', choices:[
        {key:'A',label:'프린트 스풀링'},
        {key:'B',label:'입력 처리',footnote:'Input'},
        {key:'C',label:'업데이트',footnote:'Update'},
        {key:'D',label:'렌더링',footnote:'Render'},
      ], answerKey: pick(5), hint:'프레임마다 반복되는 3단계를 생각하세요.', explanation:'일반 루프는 입력→업데이트→렌더 순으로 반복됩니다.'},
      { id:'gd-mid-2', grade:'중', stem:'2D 충돌 판정의 대표 기법은?', choices:[
        {key:'A',label:'AABB/원 충돌',footnote:'Axis-Aligned Bounding Box'},
        {key:'B',label:'워드 아트'},
        {key:'C',label:'폰트 교체'},
        {key:'D',label:'색 보정'},
      ], answerKey: pick(6), hint:'경계 박스/반지름', explanation:'간단하고 빠르며 널리 사용됩니다.'},
      { id:'gd-mid-3', grade:'중', stem:'네트워크 멀티플레이에서 지연 보정을 위해 쓰는 것은?', choices:[
        {key:'A',label:'예측/보간',footnote:'Client Prediction/Interpolation'},
        {key:'B',label:'해상도 업스케일'},
        {key:'C',label:'이미지 포맷 변경'},
        {key:'D',label:'폰트 렌더링'},
      ], answerKey: pick(7), hint:'핑이 커도 부드럽게 보이게', explanation:'클라 예측과 보간으로 체감 지연을 줄입니다.'},
      { id:'gd-mid-4', grade:'중', stem:'셰이더(Shader)의 역할은?', choices:[
        {key:'A',label:'화면에 픽셀을 계산/표현',footnote:'GPU Program'},
        {key:'B',label:'문서 인쇄'},
        {key:'C',label:'오디오 녹음'},
        {key:'D',label:'압축 해제'},
      ], answerKey: pick(8), hint:'GPU에서 실행', explanation:'버텍스/프래그먼트 단계에서 시각 효과를 만듭니다.'},
      { id:'gd-mid-5', grade:'중', stem:'게임 최적화에서 “드로우콜”을 줄이는 이유는?', choices:[
        {key:'A',label:'렌더링 부하 감소',footnote:'Batching/Instancing'},
        {key:'B',label:'음질 향상'},
        {key:'C',label:'문법 검사'},
        {key:'D',label:'파일 이름 정리'},
      ], answerKey: pick(9), hint:'GPU/CPU 오버헤드 완화', explanation:'배칭/인스턴싱으로 호출 횟수를 줄입니다.'},

      // ── 고등(5)
      { id:'gd-hi-1', grade:'고', stem:'상태기계(State Machine)가 유용한 이유는?', choices:[
        {key:'A',label:'캐릭터 상태 전이 관리',footnote:'FSM/Behavior Tree'},
        {key:'B',label:'색상 전이'},
        {key:'C',label:'폰트 전이'},
        {key:'D',label:'파일 전이'},
      ], answerKey: pick(10), hint:'걷기→점프→피격 등', explanation:'전이 조건과 행동을 명확히 설계합니다.'},
      { id:'gd-hi-2', grade:'고', stem:'ECS(Entity-Component-System)의 장점은?', choices:[
        {key:'A',label:'조합성/캐싱/병렬성',footnote:'Data-Oriented'},
        {key:'B',label:'오타 감소만'},
        {key:'C',label:'색상 증가'},
        {key:'D',label:'메모장 호환'},
      ], answerKey: pick(11), hint:'데이터 중심 설계', explanation:'컴포넌트는 데이터, 시스템은 처리 로직을 담당합니다.'},
      { id:'gd-hi-3', grade:'고', stem:'경로 탐색의 대표 알고리즘은?', choices:[
        {key:'A',label:'A*',footnote:'Heuristic Search'},
        {key:'B',label:'LZMA'},
        {key:'C',label:'H.264'},
        {key:'D',label:'JSON'},
      ], answerKey: pick(12), hint:'그래프 최단 경로', explanation:'휴리스틱으로 탐색 효율을 높입니다.'},
      { id:'gd-hi-4', grade:'고', stem:'라이브서비스(운영형) 게임 지표로 핵심이 아닌 것은?', choices:[
        {key:'A',label:'화면 밝기'},
        {key:'B',label:'DAU/리텐션/ARPU',footnote:'운영 KPI'},
        {key:'C',label:'결제 전환율'},
        {key:'D',label:'유저 유입경로'},
      ], answerKey: pick(13), hint:'운영/비즈 KPI', explanation:'시각 품질보다 행동/과금/잔존이 핵심입니다.'},
      { id:'gd-hi-5', grade:'고', stem:'빌드 파이프라인(CI/CD)을 쓰는 주된 이유는?', choices:[
        {key:'A',label:'자동화·일관성·속도',footnote:'CI/CD'},
        {key:'B',label:'문서만 이쁨'},
        {key:'C',label:'디버그 불가'},
        {key:'D',label:'수동 배포만'},
      ], answerKey: pick(14), hint:'배포 안정화', explanation:'테스트/패키징/배포를 자동화합니다.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 2) 메타버스 기획자 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'metaverse-planner': {
    title: '메타버스 기획자',
    desc: '가상공간 기획·경제/커뮤니티 설계',
    items: [
      // ── 초등(5)
      { id:'mp-el-1', grade:'초', stem:'메타버스의 핵심 특징은?', choices:[
        {key:'A',label:'실시간 상호작용/공간성',footnote:'Presence/Sync'},
        {key:'B',label:'정지 화면'},
        {key:'C',label:'오프라인만'},
        {key:'D',label:'단방향 방송'},
      ], answerKey: pick(0), hint:'사람들이 함께 행동합니다.', explanation:'동시성/아바타/경제가 핵심 구성 요소입니다.'},
      { id:'mp-el-2', grade:'초', stem:'아바타란?', choices:[
        {key:'A',label:'사용자 분身 캐릭터',footnote:'Avatar'},
        {key:'B',label:'파일 확장자'},
        {key:'C',label:'프린트'},
        {key:'D',label:'빨대'},
      ], answerKey: pick(1), hint:'나를 대신하는 표현', explanation:'정체성과 커뮤니케이션의 중심입니다.'},
      { id:'mp-el-3', grade:'초', stem:'가상경제에서 쓰이는 화폐는?', choices:[
        {key:'A',label:'인게임 토큰/코인',footnote:'Virtual Currency'},
        {key:'B',label:'우표'},
        {key:'C',label:'영수증'},
        {key:'D',label:'자'},
      ], answerKey: pick(2), hint:'재화 거래', explanation:'아이템 구매/거래에 사용됩니다.'},
      { id:'mp-el-4', grade:'초', stem:'콘텐츠 이용규칙/매너를 정리한 것은?', choices:[
        {key:'A',label:'커뮤니티 가이드',footnote:'Code of Conduct'},
        {key:'B',label:'지도'},
        {key:'C',label:'자석'},
        {key:'D',label:'전등'},
      ], answerKey: pick(3), hint:'안전한 공간을 위해', explanation:'신고/경고/제재 정책 포함.'},
      { id:'mp-el-5', grade:'초', stem:'친구와 함께 미션을 깨는 활동은?', choices:[
        {key:'A',label:'협동 플레이',footnote:'Co-op'},
        {key:'B',label:'혼잣말'},
        {key:'C',label:'정지'},
        {key:'D',label:'일시중지'},
      ], answerKey: pick(4), hint:'함께 하는 재미', explanation:'사회적 몰입과 학습효과를 높입니다.'},

      // ── 중등(5)
      { id:'mp-mid-1', grade:'중', stem:'UGC(User Generated Content)의 장점은?', choices:[
        {key:'A',label:'확장성·창의성·참여',footnote:'UGC'},
        {key:'B',label:'파일 크기 감소'},
        {key:'C',label:'배터리 절약'},
        {key:'D',label:'프린트 속도'},
      ], answerKey: pick(5), hint:'사용자가 창작자', explanation:'생태계 활성화/라이프사이클 연장.'},
      { id:'mp-mid-2', grade:'중', stem:'세션 동기화가 중요한 이유는?', choices:[
        {key:'A',label:'모두 같은 상태를 보게 함',footnote:'State Sync'},
        {key:'B',label:'폰트 미리보기'},
        {key:'C',label:'색상 일괄 변경'},
        {key:'D',label:'파일 백업'},
      ], answerKey: pick(6), hint:'멀티 사용자 일관성', explanation:'충돌/지연 보정과 함께 설계합니다.'},
      { id:'mp-mid-3', grade:'중', stem:'온보딩 튜토리얼의 목적은?', choices:[
        {key:'A',label:'초기 이탈 감소/몰입 촉진',footnote:'Onboarding'},
        {key:'B',label:'파일 압축'},
        {key:'C',label:'이미지 리사이즈'},
        {key:'D',label:'문서 포맷'},
      ], answerKey: pick(7), hint:'첫 경험이 중요', explanation:'핵심 조작과 보상을 빠르게 학습시킵니다.'},
      { id:'mp-mid-4', grade:'중', stem:'가상 부동산의 가치가 생기는 이유는?', choices:[
        {key:'A',label:'희소성/위치/유틸리티',footnote:'Scarcity/Utility'},
        {key:'B',label:'색상 화려'},
        {key:'C',label:'폰트 귀여움'},
        {key:'D',label:'이름 길이'},
      ], answerKey: pick(8), hint:'경제학 기본', explanation:'공급-수요와 기능성에 의해 결정됩니다.'},
      { id:'mp-mid-5', grade:'중', stem:'행동 데이터 기반 추천의 장점은?', choices:[
        {key:'A',label:'개인화·참여 증대',footnote:'Recommendation'},
        {key:'B',label:'용량 증가'},
        {key:'C',label:'오류 증가'},
        {key:'D',label:'속도 저하'},
      ], answerKey: pick(9), hint:'취향 파악', explanation:'비슷한 사용자/아이템 임베딩을 활용합니다.'},

      // ── 고등(5)
      { id:'mp-hi-1', grade:'고', stem:'가상자산 경제에서 인플레이션을 억제하는 수단은?', choices:[
        {key:'A',label:'발행량/소각/싱크 설계',footnote:'Sink/Source'},
        {key:'B',label:'폰트 사이즈 확대'},
        {key:'C',label:'색상 반전'},
        {key:'D',label:'자간 조절'},
      ], answerKey: pick(10), hint:'경제 밸런싱', explanation:'소비처(싱크)를 충분히 마련합니다.'},
      { id:'mp-hi-2', grade:'고', stem:'멀티 디바이스(모바일/PC/VR) 지원 시 고려할 점은?', choices:[
        {key:'A',label:'입력/성능/UX 차이',footnote:'Cross-Platform'},
        {key:'B',label:'종이 질감'},
        {key:'C',label:'스캐너 해상도'},
        {key:'D',label:'프린터 속도'},
      ], answerKey: pick(11), hint:'플랫폼 특성 최적화', explanation:'컨트롤/자원/레이아웃을 조정합니다.'},
      { id:'mp-hi-3', grade:'고', stem:'실시간 음성/공간 오디오는 어떤 기술이 필요할까요?', choices:[
        {key:'A',label:'스트리밍/3D 포지셔닝',footnote:'VoIP/Spatial Audio'},
        {key:'B',label:'워드 아트'},
        {key:'C',label:'CSV 정렬'},
        {key:'D',label:'PNG 알파'},
      ], answerKey: pick(12), hint:'거리감/방향감', explanation:'지연/에코 처리가 중요합니다.'},
      { id:'mp-hi-4', grade:'고', stem:'안전/신뢰 문제를 줄이기 위한 기본 원칙은?', choices:[
        {key:'A',label:'모더레이션/신고/차단',footnote:'Safety'},
        {key:'B',label:'밝기 고정'},
        {key:'C',label:'음량 고정'},
        {key:'D',label:'해상도 고정'},
      ], answerKey: pick(13), hint:'규칙과 도구', explanation:'인권/프라이버시 고려가 필수입니다.'},
      { id:'mp-hi-5', grade:'고', stem:'메타버스 KPI로 보기 어려운 것은?', choices:[
        {key:'A',label:'종이 두께'},
        {key:'B',label:'세션길이/재방문/UGC수',footnote:'Engagement'},
        {key:'C',label:'동시접속/전환율'},
        {key:'D',label:'커뮤니티 기여도'},
      ], answerKey: pick(14), hint:'행동/참여 중심', explanation:'물리 매개변수는 KPI가 아닙니다.'},
    ],
  },

  /* ─────────────────────────────────────────────────────────────
   * 3) VR 디자이너 (초5 · 중5 · 고5 = 15문항)
   * ───────────────────────────────────────────────────────────── */
  'vr-designer': {
    title: 'VR 디자이너',
    desc: '3D 공간·인터랙션·몰입형 UX 설계',
    items: [
      // ── 초등(5)
      { id:'vr-el-1', grade:'초', stem:'VR에서 어지러움을 줄이려면?', choices:[
        {key:'A',label:'부드러운 이동/가속 제한',footnote:'Comfort Locomotion'},
        {key:'B',label:'갑작스런 회전'},
        {key:'C',label:'깜빡임 효과'},
        {key:'D',label:'랜덤 흔들기'},
      ], answerKey: pick(0), hint:'멀미(시뮬레이터 멀미) 대비', explanation:'텔레포트/스냅턴을 고려합니다.'},
      { id:'vr-el-2', grade:'초', stem:'손 존재감을 주는 장치는?', choices:[
        {key:'A',label:'컨트롤러/핸드트래킹',footnote:'Tracked Input'},
        {key:'B',label:'스피커'},
        {key:'C',label:'프린터'},
        {key:'D',label:'마우스패드'},
      ], answerKey: pick(1), hint:'포즈 추적', explanation:'손동작이 상호작용 몰입을 높입니다.'},
      { id:'vr-el-3', grade:'초', stem:'시야각(FOV)이 넓으면 좋은 점은?', choices:[
        {key:'A',label:'몰입감 증가',footnote:'Field of View'},
        {key:'B',label:'용량 증가'},
        {key:'C',label:'밝기 증가'},
        {key:'D',label:'폰트 증가'},
      ], answerKey: pick(2), hint:'광학 설계', explanation:'시야각이 넓을수록 현실감이 커집니다.'},
      { id:'vr-el-4', grade:'초', stem:'양안 시차로 깊이를 느끼는 기술은?', choices:[
        {key:'A',label:'스테레오스코픽',footnote:'Stereo 3D'},
        {key:'B',label:'모노 사운드'},
        {key:'C',label:'흑백 화면'},
        {key:'D',label:'정지 영상'},
      ], answerKey: pick(3), hint:'양 눈 정보 차이', explanation:'입체감을 형성해 거리 인지를 돕습니다.'},
      { id:'vr-el-5', grade:'초', stem:'VR 씬의 프레임이 낮으면?', choices:[
        {key:'A',label:'멀미·끊김 증가',footnote:'Low FPS'},
        {key:'B',label:'문서 품질 향상'},
        {key:'C',label:'음질 향상'},
        {key:'D',label:'배터리 증가'},
      ], answerKey: pick(4), hint:'최적화 필수', explanation:'안정적인 프레임 유지가 중요합니다.'},

      // ── 중등(5)
      { id:'vr-mid-1', grade:'중', stem:'룸스케일 한계에서 이동을 확장하는 방법은?', choices:[
        {key:'A',label:'텔레포트/리디렉티드 워킹',footnote:'Locomotion'},
        {key:'B',label:'문서 병합'},
        {key:'C',label:'글꼴 내보내기'},
        {key:'D',label:'색상 팔레트'},
      ], answerKey: pick(5), hint:'물리 공간 제약 완화', explanation:'사용자 안전 경계를 고려합니다.'},
      { id:'vr-mid-2', grade:'중', stem:'인터랙션 피드백을 강화하는 요소는?', choices:[
        {key:'A',label:'햅틱/사운드/하이라이트',footnote:'Feedback'},
        {key:'B',label:'해상도만'},
        {key:'C',label:'파일명만'},
        {key:'D',label:'아이콘만'},
      ], answerKey: pick(6), hint:'즉각성', explanation:'피드백은 학습과 만족도를 높입니다.'},
      { id:'vr-mid-3', grade:'중', stem:'성능 최적화를 위한 드로우콜 감축 기법은?', choices:[
        {key:'A',label:'배칭/인스턴싱/LOD',footnote:'Rendering'},
        {key:'B',label:'배경음 끄기'},
        {key:'C',label:'폰트 줄이기'},
        {key:'D',label:'이미지 압축만'},
      ], answerKey: pick(7), hint:'GPU/CPU 부하', explanation:'LOD로 멀리 있는 오브젝트의 복잡도를 낮춥니다.'},
        { id:'vr-mid-4', grade:'중', stem:'VR UX에서 손 닿는 거리 내 버튼 크기는?', choices:[
        {key:'A',label:'충분한 크기·간격',footnote:'Touch Target'},
        {key:'B',label:'가능한 작게'},
        {key:'C',label:'격자 무시'},
        {key:'D',label:'랜덤 배치'},
      ], answerKey: pick(8), hint:'미스 클릭 감소', explanation:'피츠의 법칙을 고려합니다.'},
      { id:'vr-mid-5', grade:'중', stem:'컨트롤러 맵핑 문서화가 필요한 이유는?', choices:[
        {key:'A',label:'일관성/학습성 확보',footnote:'Mapping'},
        {key:'B',label:'용량 절감'},
        {key:'C',label:'색공간 변환'},
        {key:'D',label:'폰트 캐싱'},
      ], answerKey: pick(9), hint:'가이드/튜토리얼 연계', explanation:'변경 시 변경내역을 함께 제공합니다.'},

      // ── 고등(5)
      { id:'vr-hi-1', grade:'고', stem:'렌더링 타깃 해상도를 동적으로 조절하는 기술은?', choices:[
        {key:'A',label:'DLSS/FSR/해상도 스케일',footnote:'Upscaling'},
        {key:'B',label:'압축 포맷 변경'},
        {key:'C',label:'문서 분리'},
        {key:'D',label:'색상 반전'},
      ], answerKey: pick(10), hint:'성능/품질 균형', explanation:'업스케일링으로 프레임을 확보합니다.'},
      { id:'vr-hi-2', grade:'고', stem:'오클루전 컬링의 목적은?', choices:[
        {key:'A',label:'가려진 물체 미렌더',footnote:'Culling'},
        {key:'B',label:'음량 최소화'},
        {key:'C',label:'밝기 자동'},
        {key:'D',label:'문서 자동'},
      ], answerKey: pick(11), hint:'불필요 연산 제거', explanation:'가시성 계산으로 효율을 높입니다.'},
      { id:'vr-hi-3', grade:'고', stem:'머리/손 추적 데이터 노이즈를 줄이는 방법은?', choices:[
        {key:'A',label:'필터/스무딩',footnote:'Kalman/EMA'},
        {key:'B',label:'색상 교체'},
        {key:'C',label:'폰트 교체'},
        {key:'D',label:'배경 교체'},
      ], answerKey: pick(12), hint:'지터 감소', explanation:'필터로 안정성과 반응성 균형 유지.'},
      { id:'vr-hi-4', grade:'고', stem:'멀티유저 동기화에서 충돌 해결 방식은?', choices:[
        {key:'A',label:'마스터 권한/CRDT',footnote:'Conflict Resolution'},
        {key:'B',label:'랜덤 삭제'},
        {key:'C',label:'임의 덮어쓰기'},
        {key:'D',label:'무시'},
      ], answerKey: pick(13), hint:'최종 일관성', explanation:'권한 모델/알고리즘 설계가 필요합니다.'},
      { id:'vr-hi-5', grade:'고', stem:'프라이버시 보호를 위한 기본은?', choices:[
        {key:'A',label:'최소수집/동의/암호화',footnote:'Privacy by Design'},
        {key:'B',label:'무제한 수집'},
        {key:'C',label:'평문 저장'},
        {key:'D',label:'동의 생략'},
      ], answerKey: pick(14), hint:'법/윤리 준수', explanation:'목적 제한과 보안조치가 필수입니다.'},
    ],
  },
};
