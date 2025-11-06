//src/lib/careers/fields/cyber-security.ts
import { CareerFieldModule } from '../types';
// (공통) 쿼리 보존
export const FIELD_KEY = 'cyber-security';
type Key = 'A'|'B'|'C'|'D'; const ROT: Key[] = ['A','B','C','D']; const pick=(i:number)=>ROT[i%ROT.length];

export const BANK: CareerFieldModule['BANK'] = {
  'security-analyst': {
    title:'보안 분석가', desc:'로그 분석·위험 식별·대응',
    items:[
      {id:'sa-el-1',grade:'초',stem:'낯선 이메일 링크를 누르면?',choices:[
        {key:'A',label:'피싱 위험',footnote:'Phishing'},
        {key:'B',label:'자동 보상'},
        {key:'C',label:'속도 향상'},
        {key:'D',label:'광고 제거'},
      ],answerKey:pick(0),hint:'출처를 꼭 확인합니다.',explanation:'피싱 링크는 자격증명을 노립니다.'},
      {id:'sa-el-2',grade:'초',stem:'강력한 비밀번호는?',choices:[
        {key:'A',label:'길고 복잡·무작위',footnote:'Length+Entropy'},
        {key:'B',label:'이름1234'},
        {key:'C',label:'1111'},
        {key:'D',label:'password'},
      ],answerKey:pick(1),hint:'사전에 없는 조합',explanation:'패스워드 매니저 사용을 권장합니다.'},
      {id:'sa-el-3',grade:'초',stem:'공용 와이파이에서 안전한 방법은?',choices:[
        {key:'A',label:'VPN 사용',footnote:'Encryption'},
        {key:'B',label:'평문 로그인'},
        {key:'C',label:'모두에게 공유'},
        {key:'D',label:'스크린샷'},
      ],answerKey:pick(2),hint:'암호화 통신이 필요합니다.',explanation:'세션 탈취를 막습니다.'},
      {id:'sa-el-4',grade:'초',stem:'의심스러운 첨부파일은?',choices:[
        {key:'A',label:'백신/샌드박스로 검사',footnote:'Sandbox'},
        {key:'B',label:'즉시 실행'},
        {key:'C',label:'친구에게 무작위 전달'},
        {key:'D',label:'이름만 바꿈'},
      ],answerKey:pick(3),hint:'먼저 검증',explanation:'멜웨어 감염을 방지합니다.'},
      {id:'sa-el-5',grade:'초',stem:'2단계 인증의 이점은?',choices:[
        {key:'A',label:'계정 탈취 난이도 상승',footnote:'MFA'},
        {key:'B',label:'광고 차단'},
        {key:'C',label:'인터넷 속도 증가'},
        {key:'D',label:'용량 무제한'},
      ],answerKey:pick(4),hint:'두 가지 증거 필요',explanation:'비밀번호가 유출돼도 보호됩니다.'},

      {id:'sa-mid-1',grade:'중',stem:'로그에서 의심스러운 IP를 찾는 기법은?',choices:[
        {key:'A',label:'이상치 탐지',footnote:'Anomaly'},
        {key:'B',label:'색상 분석'},
        {key:'C',label:'폰트 비교'},
        {key:'D',label:'무작위 추출'},
      ],answerKey:pick(5),hint:'정상 패턴을 벗어난 점',explanation:'UEBA 등과 함께 사용합니다.'},
      {id:'sa-mid-2',grade:'중',stem:'취약점 스캐닝의 목적은?',choices:[
        {key:'A',label:'패치 필요 지점 식별',footnote:'Vuln Scan'},
        {key:'B',label:'속도 측정'},
        {key:'C',label:'미관 개선'},
        {key:'D',label:'파일 이름 변경'},
      ],answerKey:pick(6),hint:'우선순위를 정합니다.',explanation:'CVSS 기준으로 분류합니다.'},
      {id:'sa-mid-3',grade:'중',stem:'DDoS 방어의 기본은?',choices:[
        {key:'A',label:'대역폭 확보·우회·필터링',footnote:'Scrubbing/CDN'},
        {key:'B',label:'비밀번호 공유'},
        {key:'C',label:'평문 통신'},
        {key:'D',label:'로그 삭제'},
      ],answerKey:pick(7),hint:'흡수/차단이 핵심',explanation:'레이어별 대응이 필요합니다.'},
      {id:'sa-mid-4',grade:'중',stem:'로그 보존 정책이 필요한 이유는?',choices:[
        {key:'A',label:'사건 조사·법적 요구',footnote:'Retention'},
        {key:'B',label:'디자인 때문'},
        {key:'C',label:'음향 개선'},
        {key:'D',label:'랜덤성 증가'},
      ],answerKey:pick(8),hint:'규정 준수',explanation:'감사 추적 가능성이 중요합니다.'},
      {id:'sa-mid-5',grade:'중',stem:'침해지표(IOC)는?',choices:[
        {key:'A',label:'공격 흔적 단서',footnote:'Indicator of Compromise'},
        {key:'B',label:'폰트 모음'},
        {key:'C',label:'이미지 포맷'},
        {key:'D',label:'색상 팔레트'},
      ],answerKey:pick(9),hint:'서명/행위 기반',explanation:'탐지 규칙에 반영합니다.'},

      {id:'sa-hi-1',grade:'고',stem:'제로트러스트의 핵심 원칙은?',choices:[
        {key:'A',label:'기본 불신·지속 검증',footnote:'Never trust, verify'},
        {key:'B',label:'완전 신뢰'},
        {key:'C',label:'항상 허용'},
        {key:'D',label:'한 번만 인증'},
      ],answerKey:pick(10),hint:'망 내/외 구분 최소화',explanation:'아이덴티티 중심 보안입니다.'},
      {id:'sa-hi-2',grade:'고',stem:'SIEM의 역할은?',choices:[
        {key:'A',label:'로그 수집·상관·경보',footnote:'SIEM'},
        {key:'B',label:'이미지 편집'},
        {key:'C',label:'문서 번역'},
        {key:'D',label:'음악 제작'},
      ],answerKey:pick(11),hint:'통합 분석',explanation:'SOAR와 연계해 대응 자동화합니다.'},
      {id:'sa-hi-3',grade:'고',stem:'암호화에서 키 관리가 중요한 이유는?',choices:[
        {key:'A',label:'유출 시 전체 보안 붕괴',footnote:'KMS/HSM'},
        {key:'B',label:'색상 관리'},
        {key:'C',label:'폰트 관리'}, 
        {key:'D',label:'이미지 관리'},
      ],answerKey:pick(12),hint:'비밀은 키에 있습니다.',explanation:'주기적 교체/권한 분리 필요.'},
      {id:'sa-hi-4',grade:'고',stem:'취약점 CVE/CVSS는?',choices:[
        {key:'A',label:'표준 식별/심각도 지표',footnote:'CVE/CVSS'},
        {key:'B',label:'디자인 체계'},
        {key:'C',label:'음향 표준'},
        {key:'D',label:'색상 표준'},
      ],answerKey:pick(13),hint:'우선순위와 맵핑',explanation:'패치 계획 수립에 사용합니다.'},
      {id:'sa-hi-5',grade:'고',stem:'XSS 방지를 위한 서버측 대책은?',choices:[
        {key:'A',label:'입력 검증·출력 이스케이프·CSP',footnote:'Server-side defense'},
        {key:'B',label:'로깅 끄기'},
        {key:'C',label:'평문 저장'},
        {key:'D',label:'쿠키 공개'},
      ],answerKey:pick(14),hint:'다층 방어',explanation:'HttpOnly/SameSite 쿠키도 유효합니다.'},
    ],
  },

  'penetration-tester': {
    title:'침투 테스터', desc:'모의해킹·취약점 검증',
    items:[
      // 초(5) …
      {id:'pt-el-1',grade:'초',stem:'허락 없는 해킹은?',choices:[
        {key:'A',label:'불법',footnote:'Unauthorized'},
        {key:'B',label:'게임'},
        {key:'C',label:'예술'},
        {key:'D',label:'체육'},
      ],answerKey:pick(0),hint:'승인이 필요합니다.',explanation:'윤리적 해킹은 사전 동의가 필수.'},
      {id:'pt-el-2',grade:'초',stem:'웹 취약점의 예는?',choices:[
        {key:'A',label:'SQL 인젝션',footnote:'SQLi'},
        {key:'B',label:'색상 변경'},
        {key:'C',label:'폰트 변경'},
        {key:'D',label:'이미지 저장'},
      ],answerKey:pick(1),hint:'입력이 쿼리로 변하면 위험',explanation:'바인딩/ORM으로 방지.'},
      {id:'pt-el-3',grade:'초',stem:'패킷을 들여다보는 도구는?',choices:[
        {key:'A',label:'와이어샤크',footnote:'Wireshark'},
        {key:'B',label:'그림판'},
        {key:'C',label:'메모장'},
        {key:'D',label:'음악 앱'},
      ],answerKey:pick(2),hint:'네트워크 분석',explanation:'프로토콜/오류를 확인합니다.'},
      {id:'pt-el-4',grade:'초',stem:'기본 비밀번호를 그대로 두면?',choices:[
        {key:'A',label:'위험',footnote:'Default Cred'},
        {key:'B',label:'속도 증가'},
        {key:'C',label:'미관 향상'},
        {key:'D',label:'자동 보안'},
      ],answerKey:pick(3),hint:'바로 변경',explanation:'사고의 주요 원인입니다.'},
      {id:'pt-el-5',grade:'초',stem:'포트를 스캔하는 이유는?',choices:[
        {key:'A',label:'열린 서비스 파악',footnote:'Port Scan'},
        {key:'B',label:'그림 그리기'},
        {key:'C',label:'사진 자르기'},
        {key:'D',label:'메시지 삭제'},
      ],answerKey:pick(4),hint:'공격 표면 인식',explanation:'불필요 서비스는 닫습니다.'},

      // 중(5)
      {id:'pt-mid-1',grade:'중',stem:'버프 오버플로의 핵심은?',choices:[
        {key:'A',label:'경계 초과 쓰기',footnote:'Overflow'},
        {key:'B',label:'색상 조절'},
        {key:'C',label:'폰트 조절'},
        {key:'D',label:'정렬'},
      ],answerKey:pick(5),hint:'메모리 덮어쓰기',explanation:'ASLR/DEP로 완화.'},
      {id:'pt-mid-2',grade:'중',stem:'OWASP Top 10 목적은?',choices:[
        {key:'A',label:'주요 웹 위험 인식',footnote:'Awareness'},
        {key:'B',label:'디자인 모음'},
        {key:'C',label:'오디오 규격'},
        {key:'D',label:'사진 포맷'},
      ],answerKey:pick(6),hint:'베스트 프랙티스',explanation:'정기 갱신됩니다.'},
      {id:'pt-mid-3',grade:'중',stem:'권한 상승의 예는?',choices:[
        {key:'A',label:'일반→관리자 권한 획득',footnote:'Privilege Escalation'},
        {key:'B',label:'해상도 상승'},
        {key:'C',label:'밝기 상승'},
        {key:'D',label:'음량 상승'},
      ],answerKey:pick(7),hint:'취약점 체인',explanation:'취약점 조합으로 발생합니다.'},
      {id:'pt-mid-4',grade:'중',stem:'암호 크래킹 방지책은?',choices:[
        {key:'A',label:'해시+솔트/지연',footnote:'PBKDF2/bcrypt'},
        {key:'B',label:'평문 저장'},
        {key:'C',label:'재사용 권장'},
        {key:'D',label:'공유'},
      ],answerKey:pick(8),hint:'무차별 대입 방지',explanation:'MFA와 병행하면 더 안전.'},
      {id:'pt-mid-5',grade:'중',stem:'리포트에서 재현 절차가 중요한 이유는?',choices:[
        {key:'A',label:'패치/검증 가능',footnote:'Reproduction'},
        {key:'B',label:'디자인 개선'},
        {key:'C',label:'용량 감소'},
        {key:'D',label:'색상 통일'},
      ],answerKey:pick(9),hint:'구체적 단계가 필요',explanation:'POC·증거 스냅샷 포함.'},

      // 고(5)
      {id:'pt-hi-1',grade:'고',stem:'CTF에서 웹 문제를 풀 때 먼저 확인할 것은?',choices:[
        {key:'A',label:'입력 검증/세션/쿠키',footnote:'Checklist'},
        {key:'B',label:'폰트'},
        {key:'C',label:'이미지'},
        {key:'D',label:'음향'},
      ],answerKey:pick(10),hint:'취약점 패턴',explanation:'로그/코드도 함께 확인.'},
      {id:'pt-hi-2',grade:'고',stem:'리버스 엔지니어링 도구는?',choices:[
        {key:'A',label:'IDA/Ghidra',footnote:'Disassembler'},
        {key:'B',label:'포토샵'},
        {key:'C',label:'파워포인트'},
        {key:'D',label:'워드'},
      ],answerKey:pick(11),hint:'바이너리 분석',explanation:'함수 흐름을 파악합니다.'},
      {id:'pt-hi-3',grade:'고',stem:'버그바운티 윤리에서 금지되는 행위는?',choices:[
        {key:'A',label:'서비스 중단 유발 테스트',footnote:'Disruption'},
        {key:'B',label:'리포트 작성'},
        {key:'C',label:'재현 동영상'},
        {key:'D',label:'패치 제안'},
      ],answerKey:pick(12),hint:'운영 중단 금지',explanation:'Scope/규정 준수 필수.'},
      {id:'pt-hi-4',grade:'고',stem:'클라우드 계정 공격 방어의 기본은?',choices:[
        {key:'A',label:'권한 최소화/키 회전',footnote:'IAM/KMS'},
        {key:'B',label:'모두 관리자'},
        {key:'C',label:'키 평문 보관'},
        {key:'D',label:'로그 비활성화'},
      ],answerKey:pick(13),hint:'권한/키가 핵심',explanation:'CloudTrail/Config로 감시.'},
      {id:'pt-hi-5',grade:'고',stem:'SSRF의 핵심 위험은?',choices:[
        {key:'A',label:'내부망 자원 접근',footnote:'Server-Side Request Forgery'},
        {key:'B',label:'폰트 변경'},
        {key:'C',label:'색상 변경'},
        {key:'D',label:'이미지 뒤집기'},
      ],answerKey:pick(14),hint:'메타데이터/내부 엔드포인트',explanation:'요청 대상 검증/차단이 필요.'},
    ],
  },

  'soc-engineer': {
    title:'SOC 엔지니어', desc:'탐지 룰·대응 자동화',
    items:[
      // 초(5) …
      {id:'se-el-1',grade:'초',stem:'경보가 울릴 때 먼저 할 일은?',choices:[
        {key:'A',label:'진위 여부 확인',footnote:'Triage'},
        {key:'B',label:'즉시 삭제'},
        {key:'C',label:'모두 무시'},
        {key:'D',label:'화면 끄기'},
      ],answerKey:pick(0),hint:'오탐/정탐 구분',explanation:'우선순위 큐로 처리합니다.'},
      {id:'se-el-2',grade:'초',stem:'로그를 모아 한 곳에서 보는 시스템은?',choices:[
        {key:'A',label:'집중 로깅',footnote:'Centralized Log'},
        {key:'B',label:'사진첩'},
        {key:'C',label:'메모장'},
        {key:'D',label:'음악앱'},
      ],answerKey:pick(1),hint:'관찰 가능성',explanation:'공격 추적이 쉬워집니다.'},
      {id:'se-el-3',grade:'초',stem:'정책을 바꿀 때 필요한 과정은?',choices:[
        {key:'A',label:'변경 관리',footnote:'Change Mgmt'},
        {key:'B',label:'즉흥 적용'},
        {key:'C',label:'비밀 배포'},
        {key:'D',label:'무시'},
      ],answerKey:pick(2),hint:'검토/승인 절차',explanation:'장애/사고를 막습니다.'},
      {id:'se-el-4',grade:'초',stem:'취약점 공지 후 해야 할 일은?',choices:[
        {key:'A',label:'패치/우회책 적용',footnote:'Patch/Workaround'},
        {key:'B',label:'그냥 둔다'},
        {key:'C',label:'색 바꿈'},
        {key:'D',label:'폰트 바꿈'},
      ],answerKey:pick(3),hint:'악용 전 대응',explanation:'자산 관리와 연계됩니다.'},
      {id:'se-el-5',grade:'초',stem:'사고 대응 문서에 포함될 항목은?',choices:[
        {key:'A',label:'역할·연락처·절차',footnote:'IR Plan'},
        {key:'B',label:'그림'},
        {key:'C',label:'노래'},
        {key:'D',label:'배경화면'},
      ],answerKey:pick(4),hint:'훈련도 중요',explanation:'모의훈련으로 검증합니다.'},

      // … (중5, 고5는 위 패턴대로 채움)
      // 중(5)
      {id:'se-mid-1',grade:'중',stem:'Playbook의 목적은?',choices:[
        {key:'A',label:'반복 대응 자동화',footnote:'SOAR'},
        {key:'B',label:'미관'},
        {key:'C',label:'용량'},
        {key:'D',label:'랜덤'},
      ],answerKey:pick(5),hint:'시간 단축',explanation:'일관된 품질 유지.'},
      {id:'se-mid-2',grade:'중',stem:'IOC 공유 표준은?',choices:[
        {key:'A',label:'STIX/TAXII',footnote:'Threat Intel'},
        {key:'B',label:'RGB'},
        {key:'C',label:'WAV'},
        {key:'D',label:'BMP'},
      ],answerKey:pick(6),hint:'협업/공유',explanation:'생태계 연동.'},
      {id:'se-mid-3',grade:'중',stem:'EDR의 역할은?',choices:[
        {key:'A',label:'엔드포인트 탐지/대응',footnote:'EDR'},
        {key:'B',label:'폰트 관리'},
        {key:'C',label:'디자인'},
        {key:'D',label:'사진 보정'},
      ],answerKey:pick(7),hint:'행위 기반 탐지',explanation:'격리/치료 기능 포함.'},
      {id:'se-mid-4',grade:'중',stem:'허위 양성(오탐)을 줄이는 방법은?',choices:[
        {key:'A',label:'룰 정밀화·화이트리스트',footnote:'Tuning'},
        {key:'B',label:'로깅 끄기'},
        {key:'C',label:'모두 차단'},
        {key:'D',label:'랜덤'},
      ],answerKey:pick(8),hint:'정밀 조사',explanation:'정상 행위를 학습합니다.'},
      {id:'se-mid-5',grade:'중',stem:'위협 헌팅에서 먼저 정하는 것은?',choices:[
        {key:'A',label:'가설/가정',footnote:'Hypothesis'},
        {key:'B',label:'배경색'},
        {key:'C',label:'폰트'},
        {key:'D',label:'아이콘'},
      ],answerKey:pick(9),hint:'가설 기반 탐색',explanation:'도메인 지식이 필요.'},

      // 고(5)
      {id:'se-hi-1',grade:'고',stem:'NIST CSF의 5기능은?',choices:[
        {key:'A',label:'식별·보호·탐지·대응·복구',footnote:'Identify/Protect/Detect/Respond/Recover'},
        {key:'B',label:'복사·붙여넣기·삭제·취소·저장'},
        {key:'C',label:'RGB·CMYK·HSV·LAB·YCbCr'},
        {key:'D',label:'읽기·쓰기·실행·숨김·보호'},
      ],answerKey:pick(10),hint:'거버넌스 프레임',explanation:'성숙도 향상에 사용.'},
      {id:'se-hi-2',grade:'고',stem:'MITRE ATT&CK의 용도는?',choices:[
        {key:'A',label:'공격 전술·기술의 분류',footnote:'TTP'},
        {key:'B',label:'디자인 패턴'},
        {key:'C',label:'오디오 포맷'},
        {key:'D',label:'색상 모델'},
      ],answerKey:pick(11),hint:'행위 기반 매핑',explanation:'탐지 룰과 연결.'},
      {id:'se-hi-3',grade:'고',stem:'로그 무결성을 높이는 방법은?',choices:[
        {key:'A',label:'서명/체인/불변저장',footnote:'Integrity'},
        {key:'B',label:'압축'},
        {key:'C',label:'색변경'},
        {key:'D',label:'숨김'},
      ],answerKey:pick(12),hint:'증거성 유지',explanation:'제3자 보관도 고려.'},
      {id:'se-hi-4',grade:'고',stem:'클라우드 워크로드 보안에서 중요한 것은?',choices:[
        {key:'A',label:'이미지 서명·런타임 정책',footnote:'CSPM/CWPP'},
        {key:'B',label:'평문 비밀'},
        {key:'C',label:'모두 퍼블릭'},
        {key:'D',label:'감사 비활성'},
      ],answerKey:pick(13),hint:'IaC 스캔 포함',explanation:'CICD에 통합.'},
      {id:'se-hi-5',grade:'고',stem:'공급망(Supply Chain) 보안 핵심은?',choices:[
        {key:'A',label:'SBOM·서명·의존성 점검',footnote:'Supply Chain'},
        {key:'B',label:'감'},
        {key:'C',label:'운'},
        {key:'D',label:'색'},
      ],answerKey:pick(14),hint:'서드파티 리스크',explanation:'빌드·배포 체인 보호.'},
    ],
  },
};
