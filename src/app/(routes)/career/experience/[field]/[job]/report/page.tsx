'use client';



import React, { useMemo, useEffect, useState, useCallback } from 'react';



/* ========================================================
0) 프린트/애니 전역 스타일 (중앙정렬 & 인쇄제어 강화)
======================================================== */
const GlobalStyle = () => (
<style jsx global>{`
@page { size: A4 portrait; margin: 12mm; }
@media print {
 html, body { background: #fff !important; }
 .no-print { display: none !important; }
 * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
 .page { width: 210mm !important; margin: 0 auto !important; box-shadow: none !important; }
 .page-break { break-after: page; page-break-after: always; }
}
.page { width: 210mm; margin-left: auto; margin-right: auto; }
@keyframes fadeIn { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform: translateY(0) } }
.fade-in { animation: fadeIn .45s ease-out; }
`}</style>
);



/* ========================================================
1) 채점/유틸 (정규화 가중치 + 잔여보정)
======================================================== */
type CatKey = 'ethics' | 'eda' | 'model' | 'perf' | 'sim';



function gradeLetter(p: number): 'S'|'A'|'B'|'C'|'D' {
if (p >= 90) return 'S';
if (p >= 80) return 'A';
if (p >= 70) return 'B';
if (p >= 60) return 'C';
return 'D';
}
function hashString(s: string) {
let h = 2166136261 >>> 0;
for (let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
return h >>> 0;
}
function seededWeights(n:number, seed:string){
const base = hashString(seed);
const w:number[] = [];
for(let i=0;i<n;i++){
let s = base + i*1013904223;
s ^= s<<13; s ^= s>>>17; s ^= s<<5;
const u = ((s>>>0)%1000)/1000;
w.push(0.6 + u); // 0.6~1.6
}
return w;
}
function spreadPercent(n:number, pct:number, seed:string){
const ws = seededWeights(n, seed);
const sum = ws.reduce((a,b)=>a+b,0);
const raw = ws.map(w => (pct*w)/sum);
const floor = raw.map(v=>Math.floor(v));
let remain = pct - floor.reduce((a,b)=>a+b,0);
const order = raw
.map((v,i)=>({i, frac:v-Math.floor(v)}))
.sort((a,b)=>b.frac-a.frac
);
for(let k=0;k<remain;k++) floor[order[k % n].i] += 1;
return floor;
}
function computeFromQuery(sp: URLSearchParams) {
const name = sp.get('name') ?? '응시자';
// jobTitle은 보고서 표기용, 매칭키는 job 파라미터
const jobTitleFromQuery = sp.get('jobTitle') || '';
const jobKeyRaw = (sp.get('job') || jobTitleFromQuery || 'data-scientist')
.toLowerCase().replace(/\s+/g,'-');



const ansRaw   = sp.get('ans');   // 예: A|B|A|C|B
const scoreRaw = sp.get('score'); // 예: 3
const totalRaw = sp.get('total'); // 예: 5
let correct = 0, total = 0;



if (ansRaw && ansRaw.trim()) {
const arr = (/[|,/\s]/.test(ansRaw) ? ansRaw.split(/[\s,\/|]+/) : ansRaw.split(''))
 .map(x => x.trim().toUpperCase()).filter(Boolean);
total = arr.length || 1;
// 테스트 편의: 'A'만 정답
correct = arr.filter(x => x === 'A').length;
} else {
const s = Number(scoreRaw), t = Number(totalRaw);
if (Number.isFinite(s) && Number.isFinite(t) && t > 0) {
 correct = Math.max(0, s);
 total   = Math.max(1, t);
} else { correct = 0; total = 1; }
}



const percent = Math.max(0, Math.min(100, Math.round((correct/Math.max(1,total))*100)));
const grade   = gradeLetter(percent);



const keys: CatKey[] = ['ethics','eda','model','perf','sim'];
const split = spreadPercent(5, percent, `${name}|${jobKeyRaw}|${percent}`);
const categories = keys.map((k, i) => ({
key: k,
name: k==='ethics'?'데이터 윤리':k==='eda'?'탐색적 분석(EDA)':k==='model'?'모델링':k==='perf'?'성능 평가':'실무 응용',
pct: split[i]
}));



return { name, jobKeyRaw, jobTitleFromQuery, correct, total, percent, grade, categories };
}



/* ========================================================
2) 상담사 / 테마 / 추천도서(4권)
======================================================== */
type CounselorKey = 'sejong'|'ein'|'sofia'|'hakrim'|'mentorK'|'navy';



function pickCounselorFromQuery(): CounselorKey {
if (typeof window === 'undefined') return 'sejong';
const sp = new URLSearchParams(window.location.search);
const v = (sp.get('counselor') || '').toLowerCase();
if (v.includes('세종')) return 'sejong';
if (v.includes('아인')||v.includes('ein')) return 'ein';
if (v.includes('소피')||v.includes('sofia')) return 'sofia';
if (v.includes('학림')) return 'hakrim';
if (v.includes('멘토k')||v.includes('mentork')) return 'mentorK';
if (v.includes('navy')||v.includes('네이비')) return 'navy';
return 'sejong';
}



const COUNSELORS: Record<CounselorKey, {
display: string; title: string; badge: string; quote: string; checklist: string[];
gradient: string; gradeS: string;
}> = {
sejong:  { display:'세종대왕 상담사', title:'고전지혜 기반 코칭', badge:'성실 · 검증 · 기록',
quote:'작은 기록이 큰 재능을 이루나니, 오늘의 한 걸음이 내일의 길을 연다.',
checklist:['오늘 배운 개념 한 줄 요약','가장 어려웠던 문제 복기 3줄','내일 실천 1가지 예약'],
gradient:'from-slate-900 via-slate-800 to-slate-900', gradeS:'from-amber-400 via-orange-500 to-red-500' },
ein:     { display:'아인슈타인 상담사', title:'탐구형 사고 코칭', badge:'호기심 · 실험 · 통찰',
quote:'중요한 것은 질문을 멈추지 않는 것이다. 호기심은 존재 자체의 이유다.',
checklist:['왜?로 시작하는 질문 2개','가설-검증 루프 1회','실험 결과 그림/표 1개'],
gradient:'from-indigo-900 via-blue-800 to-indigo-900', gradeS:'from-yellow-300 via-amber-400 to-orange-500' },
sofia:   { display:'소피아 상담사', title:'디자인 씽킹 코칭', badge:'공감 · 시각화 · 프로토타입',
quote:'배움은 손끝에서 완성된다. 스케치를 두려워하지 말라.',
checklist:['사용자 관점 한 문장','페이퍼 프로토타입 스케치','피드백 1건 반영'],
gradient:'from-fuchsia-900 via-purple-800 to-fuchsia-900', gradeS:'from-pink-400 via-fuchsia-500 to-purple-600' },
hakrim:  { display:'학림 상담사', title:'기초학력 강화 코칭', badge:'기본기 · 반복 · 정확성',
quote:'기본은 최고의 지름길이다. 바탕이 곧 실력이다.',
checklist:['용어 5개 암기','핵심공식 카드 만들기','오답노트 1개 완성'],
gradient:'from-emerald-900 via-green-800 to-emerald-900', gradeS:'from-emerald-400 via-teal-500 to-green-600' },
mentorK: { display:'멘토K', title:'실전 프로젝트 코칭', badge:'현장 · 문제정의 · 결과물',
quote:'결과물은 말보다 강하다. 작은 데모가 세상을 설득한다.',
checklist:['문제정의 1줄','미니데모 1개','성과지표 1개 측정'],
gradient:'from-cyan-900 via-sky-800 to-cyan-900', gradeS:'from-sky-400 via-cyan-500 to-blue-600' },
navy:    { display:'네이비 코치', title:'규율 기반 퍼포먼스 코칭', badge:'규율 · 루틴 · 회복탄력',
quote:'루틴은 재능을 지킨다. 꾸준함은 언제나 이긴다.',
checklist:['주 3회 루틴 계획','집중 25분 타이머 2회','리커버리 10분 스트레칭'],
gradient:'from-zinc-900 via-slate-800 to-zinc-900', gradeS:'from-zinc-400 via-slate-500 to-gray-600' },
};



// 10개 분야 × 3직업 = 30개 (모두 쿼리 키 소문자-하이픈)
type Theme = { field:string; title:string; hero:string; highlights:string[]; };



const THEMES: Record<string, Theme> = {
/* 1) AI·데이터 */
'data-scientist': { field:'AI·데이터', title:'데이터 사이언티스트',
hero:'가설-검증으로 데이터를 근거로 바꾸는 문제 해결가.',
highlights:['가설·A/B 실험','피처 엔지니어링','해석 가능한 모델링']},
'ml-engineer': { field:'AI·데이터', title:'ML 엔지니어',
hero:'학습/추론 파이프라인과 배포 자동화로 가치를 전달.',
highlights:['파이프라인','MLOps 모니터링','성능-비용 최적화']},
'data-analyst': { field:'AI·데이터', title:'데이터 분석가',
hero:'데이터에서 통찰을 뽑아 실질적 결정을 돕는다.',
highlights:['SQL/대시보드','지표 정의','원인 분석(EDA)']},



/* 2) 소프트웨어·앱 */
'frontend': { field:'소프트웨어·앱', title:'프론트엔드 개발자',
hero:'사용자 경험을 코드로 구현하는 인터페이스 장인.',
highlights:['반응형/성능','접근성/테스트','상태관리/아키']},
'backend': { field:'소프트웨어·앱', title:'백엔드 개발자',
hero:'안정적인 API와 데이터를 책임지는 시스템의 심장.',
highlights:['API/DB 설계','보안/권한/로그','확장성/캐시']},
'mobile-dev': { field:'소프트웨어·앱', title:'모바일 앱 개발자',
hero:'손 안의 경험을 네이티브로 빠르고 아름답게.',
highlights:['네이티브 성능','오프라인 동기화','스토어 배포']},



/* 3) 로봇·메카트로닉스 */
'robot-engineer': { field:'로봇·메카트로닉스', title:'로봇 엔지니어',
hero:'센서-제어-동역학을 통합해 움직임을 설계.',
highlights:['SLAM/경로계획','센서 융합','실환경 튜닝']},
'mechatronics-tech': { field:'로봇·메카트로닉스', title:'메카트로닉스 기술자',
hero:'기계·전장을 잇는 현장의 문제 해결사.',
highlights:['기구/전장 통합','시퀀스 제어','안전표준 준수']},
'automation-eng': { field:'로봇·메카트로닉스', title:'자동화 엔지니어',
hero:'반복을 자동화해 품질과 생산성을 올린다.',
highlights:['PLC/SCADA','라인 최적화','장애 대응']},



/* 4) 사이버보안 */
'security-analyst': { field:'사이버보안', title:'보안 분석가',
hero:'위협을 탐지·대응하여 시스템을 지킨다.',
highlights:['로그/이상징후','침해대응','취약점 리포트']},
'pentester': { field:'사이버보안', title:'침투 테스터',
hero:'윤리적 해킹으로 보안 취약을 사전에 제거.',
highlights:['리컨/익스플로잇','재현/리포팅','법·윤리 준수']},
'soc-engineer': { field:'사이버보안', title:'SOC 엔지니어',
hero:'보안 관제의 실시간 방패.',
highlights:['SIEM 튜닝','플레이북 자동화','24x7 운영']},



/* 5) 게임·메타버스 */
'vr-designer': { field:'게임·메타버스', title:'VR 디자이너',
hero:'몰입형 UX를 설계해 가상과 현실을 잇는다.',
highlights:['인터랙션/UX 흐름','프로토타입/테스트','성능·멀미 저감']},
'game-programmer': { field:'게임·메타버스', title:'게임 프로그래머',
hero:'실시간 상호작용을 부드럽게 구현하는 엔진 장인.',
highlights:['엔진/렌더','네트코드','최적화/툴링']},
'tech-artist': { field:'게임·메타버스', title:'테크 아티스트',
hero:'아트와 엔진을 잇는 그래픽 파이프 전문가.',
highlights:['셰이더/머티리얼','리깅/툴','프로파일링']},



/* 6) 의료·바이오 */
'doctor': { field:'의료·바이오', title:'의사',
hero:'근거중심으로 환자 안전과 치료를 설계.',
highlights:['문진/진찰/판독','감염관리','임상윤리/동의']},
'pharmacist': { field:'의료·바이오', title:'약사',
hero:'정확한 복약지도와 상호작용 관리의 전문가.',
highlights:['복약/상호작용','제형/보관','약물감시']},
'clinical-researcher': { field:'의료·바이오', title:'임상 연구원',
hero:'안전·윤리 속에서 근거를 축적.',
highlights:['프로토콜/IRB','데이터 무결성','통계/해석']},



/* 7) 간호·재활 */
'registered-nurse': { field:'간호·재활', title:'간호사',
hero:'환자 상태를 가장 가까이서 지키는 케어 전문가.',
highlights:['바이탈/투약','의사소통/인계','안전/감염']},
'physical-therapist': { field:'간호·재활', title:'물리치료사',
hero:'기능 회복을 돕는 맞춤 재활 설계자.',
highlights:['평가/프로토콜','운동처방','기록/추적']},
'occupational-therapist': { field:'간호·재활', title:'작업치료사',
hero:'일상으로의 복귀를 돕는 실용 재활 코치.',
highlights:['ADL 훈련','보조공학','가정환경 코칭']},



/* 8) 환경·에너지 */
'env-scientist': { field:'환경·에너지', title:'환경 과학자',
hero:'대기·수질 데이터를 과학으로 해석.',
highlights:['시료/전처리','분석/모델','정책 제언']},
'renewable-eng': { field:'환경·에너지', title:'재생에너지 엔지니어',
hero:'탄소중립을 현실로 옮기는 설계자.',
highlights:['태양광/풍력/ESS','효율/경제성','안전/운영']},
'waste-mgmt': { field:'환경·에너지', title:'폐기물 관리',
hero:'순환경제의 첫 단추, 안전한 처리와 재활용.',
highlights:['분류/처리공정','법/안전','자원화']},



/* 9) 우주·항공 */
'aero-engineer': { field:'우주·항공', title:'항공우주 엔지니어',
hero:'체계 설계와 성능해석으로 비상을 그린다.',
highlights:['공력/구조','시험평가','시뮬레이션']},
'satellite-eng': { field:'우주·항공', title:'위성 엔지니어',
hero:'우주에서 데이터를 받아 지구를 돕는다.',
highlights:['탑재체/통신','열/전력/궤도','지상국 연동']},
'mission-ops': { field:'우주·항공', title:'미션 오퍼레이터',
hero:'24시간 임무 운영의 컨트롤 타워.',
highlights:['절차/체크리스트','이상 대응','실시간 협업']},



/* 10) 자동차·모빌리티 */
'ev-engineer': { field:'자동차·모빌리티', title:'EV 엔지니어',
hero:'배터리와 전력으로 새로운 주행을 설계.',
highlights:['BMS/안전','모터/인버터','열관리']},
'autonomous-eng': { field:'자동차·모빌리티', title:'자율주행 엔지니어',
hero:'인지-판단-제어로 안전한 자율주행을 구현.',
highlights:['센서퓨전','경로계획','시뮬/HIL']},
'vehicle-designer': { field:'자동차·모빌리티', title:'차량 디자이너',
hero:'형태와 기능으로 움직임의 아름다움을 만든다.',
highlights:['스케치/클레이','인체공학','CMF/브랜드']},
};

/* --- 학년별 추천도서 6권 세트 ------------------------------------------------ */
type GradeKey = 'elem' | 'middle' | 'high';
type Book = { title: string; author: string; note?: string };
type GradeBooks = Record<GradeKey, Book[]>;



/** 공통 폴백(모든 테마에서 6권씩 보장) */
const BOOKS_FALLBACK_BY_GRADE: GradeBooks = {
elem: [
{ title:'그림으로 배우는 컴퓨터', author:'주니어과학' },
{ title:'쉽게 시작하는 코딩', author:'엔트리연구소' },
{ title:'생활 속 그래프', author:'생각학교' },
{ title:'재미있는 발명 이야기', author:'키즈북' },
{ title:'왜? 과학수학 시리즈(통계편)', author:'와이주니어' },
{ title:'그림으로 보는 직업의 세계', author:'드림키즈' },
],
middle: [
{ title:'클린 코드(청소년 요약)', author:'로버트 C. 마틴' },
{ title:'네트워크 첫걸음', author:'MIT Press' },
{ title:'데이터 시각화 입문', author:'사이토 고키' },
{ title:'알고리즘 사고력', author:'CS for Teens' },
{ title:'프로그래머의 뇌', author:'Felienne Hermans' },
{ title:'왜 공부하는가', author:'류승희' },
],
high: [
{ title:'클린 코드', author:'로버트 C. 마틴' },
{ title:'리팩터링 2판', author:'마틴 파울러' },
{ title:'HTTP 완벽 가이드', author:'데이비드 고울리 외' },
{ title:'소프트웨어 장인', author:'산드로 만쿠소' },
{ title:'Practical Statistics', author:'Peter Bruce' },
{ title:'Deep Work', author:'Cal Newport' },
],
};



/** 테마별 학년 6권 — 10개 키에 커스텀 제공(그 외는 폴백 병합) */
const BOOKS_BY_THEME_GRADE: Record<string, Partial<GradeBooks>> = {
/* 1) data-scientist */
'data-scientist': {
elem: [
{ title:'왜? 데이터 사이언스', author:'와이주니어' },
{ title:'수학이 좋아지는 빅데이터', author:'미래주니어' },
{ title:'생활 속 그래프', author:'생각학교' },
{ title:'그림으로 보는 통계', author:'그림책연구소' },
{ title:'숫자는 왜 중요할까', author:'매스키즈' },
{ title:'데이터 탐정단', author:'주니어랩' },
],
middle: [
{ title:'데이터로 말하라', author:'콜 나사붐마 크냅릭' },
{ title:'파이썬 데이터 분석', author:'웨스 맥키니' },
{ title:'데이터 시각화 입문', author:'사이토 고키' },
{ title:'정의란 무엇인가', author:'마이클 샌델', note:'데이터 윤리' },
{ title:'통계 첫걸음', author:'David Spiegelhalter' },
{ title:'Effective Pandas', author:'Matt Harrison' },
],
high: [
{ title:'핸즈온 머신러닝', author:'오렐리앙 제롱' },
{ title:'Feature Engineering', author:'Alice Zheng' },
{ title:'The Data Warehouse Toolkit', author:'Ralph Kimball' },
{ title:'Practical Statistics for Data Scientists', author:'Peter Bruce' },
{ title:'Designing ML Systems', author:'Chip Huyen' },
{ title:'Deep Learning with Python', author:'François Chollet' },
],
},



/* 2) frontend */
'frontend': {
elem: [
{ title:'코딩을 처음 만나는 아이들을 위한 웹', author:'코딩쌤' },
{ title:'그림으로 배우는 인터넷', author:'주니어IT' },
{ title:'UI/UX가 뭐예요?', author:'키즈디자인' },
{ title:'색채 감각 키우기', author:'컬러스쿨' },
{ title:'폰트와 글자의 비밀', author:'타이포키즈' },
{ title:'웹툰으로 배우는 HTML', author:'웹툰랩' },
],
middle: [
{ title:'모던 자바스크립트 입문', author:'이소라' },
{ title:'타입스크립트 초급', author:'길벗' },
{ title:'리액트 첫걸음', author:'Velopert' },
{ title:'UI 디자인 패턴', author:'Jenifer Tidwell' },
{ title:'접근성 가이드 A11y', author:'W3C 번역팀' },
{ title:'CSS 그리드/플렉스', author:'Rachel Andrew' },
],
high: [
{ title:'You Don’t Know JS Yet', author:'Kyle Simpson' },
{ title:'Refactoring UI', author:'Adam Wathan' },
{ title:'JavaScript Patterns', author:'Stoyan Stefanov' },
{ title:'Designing Interface', author:'Jenifer Tidwell' },
{ title:'React in Action', author:'Mark T. Thomas' },
{ title:'TypeScript Deep Dive', author:'Basarat Ali Syed' },
],
},



/* 3) backend */
'backend': {
elem: [
{ title:'그림으로 이해하는 서버', author:'주니어IT' },
{ title:'컴퓨터는 어떻게 동작할까요', author:'포켓과학' },
{ title:'데이터가 오가는 길', author:'네트워크키즈' },
{ title:'그림으로 배우는 데이터베이스', author:'주니어DB' },
{ title:'암호화의 비밀', author:'키즈보안' },
{ title:'그림으로 배우는 클라우드', author:'주니어클라우드' },
],
middle: [
{ title:'그림으로 배우는 HTTP', author:'일본만화 IT' },
{ title:'운영체제 첫걸음', author:'CS 스쿨' },
{ title:'데이터베이스 입문', author:'Silberschatz 요약' },
{ title:'알고리즘 문제풀이', author:'백준 길잡이' },
{ title:'리눅스 커맨드 가이드', author:'Linux Docs' },
{ title:'API 디자인 입문', author:'O\'Reilly' },
],
high: [
{ title:'HTTP 완벽 가이드', author:'데이비드 고울리 외' },
{ title:'클린 아키텍처', author:'로버트 C. 마틴' },
{ title:'데이터 집중 애플리케이션 설계', author:'Martin Kleppmann' },
{ title:'실전 쿠버네티스', author:'Kelsey Hightower' },
{ title:'High Performance MySQL', author:'Baron Schwartz' },
{ title:'gRPC 입문', author:'O\'Reilly' },
],
},



/* 4) robot-engineer */
'robot-engineer': {
elem: [
{ title:'로봇은 어떻게 움직일까?', author:'키즈로봇' },
{ title:'그림으로 배우는 센서', author:'주니어전자' },
{ title:'빛과 소리의 과학', author:'과학그림책' },
{ title:'레고로 만드는 로봇', author:'LEGO Edu' },
{ title:'간단한 전기회로', author:'주니어전자' },
{ title:'움직이는 장난감 만들기', author:'메이커키즈' },
],
middle: [
{ title:'아두이노 입문', author:'Arduino Korea' },
{ title:'로봇공학 기초', author:'MIT OCW 요약' },
{ title:'센서 융합 첫걸음', author:'Robotics Lab' },
{ title:'초보자를 위한 제어', author:'Control 101' },
{ title:'ROS2 시작하기', author:'The Construct' },
{ title:'라이다와 SLAM', author:'Robotics 책' },
],
high: [
{ title:'Modern Robotics', author:'Lynch & Park' },
{ title:'Probabilistic Robotics', author:'Thrun' },
{ title:'Planning Algorithms', author:'LaValle' },
{ title:'Robotics, Vision and Control', author:'Peter Corke' },
{ title:'ROS2 실전', author:'Off-Book' },
{ title:'제어공학', author:'Ogata' },
],
},



/* 5) vr-designer */
'vr-designer': {
elem: [
{ title:'가상현실이 뭐에요?', author:'키즈메타' },
{ title:'3D로 보는 세상', author:'입체연구소' },
{ title:'색과 공간', author:'컬러스쿨' },
{ title:'놀이로 배우는 인터랙션', author:'키즈UX' },
{ title:'만들어보는 종이 헤드셋', author:'메이커키즈' },
{ title:'게임을 디자인해볼까', author:'키즈게임' },
],
middle: [
{ title:'The VR Book(요약)', author:'Jason Jerald' },
{ title:'유니티 교과서', author:'하토야마' },
{ title:'Don’t Make Me Think', author:'Steve Krug' },
{ title:'Game Feel', author:'Steve Swink' },
{ title:'UX Sketch Note', author:'UX Studio' },
{ title:'3D 수학 기초', author:'수학연구소' },
],
high: [
{ title:'Game Programming Patterns', author:'Robert Nystrom' },
{ title:'Real-Time Rendering', author:'Akenine-Möller 외' },
{ title:'Unity in Action', author:'Joseph Hocking' },
{ title:'Level Design', author:'Chris Totten' },
{ title:'Human–Computer Interaction', author:'Dix' },
{ title:'Shader Graph 입문', author:'Unity' },
],
},



/* 6) doctor */
'doctor': {
elem: [
{ title:'몸은 어떻게 움직일까?', author:'키즈바이오' },
{ title:'병원은 무엇을 할까?', author:'주니어의학' },
{ title:'손 씻기의 과학', author:'위생연구소' },
{ title:'응급상황 대처', author:'안전키즈' },
{ title:'우리 몸 지도', author:'해부학그림책' },
{ title:'건강한 습관', author:'키즈헬스' },
],
middle: [
{ title:'의학의 역사', author:'Roy Porter' },
{ title:'기초 생물학', author:'Campbell 요약' },
{ title:'면역이란 무엇인가', author:'New Scientist' },
{ title:'바이러스와 박테리아', author:'DK' },
{ title:'임상의사 커뮤니케이션', author:'MedComm' },
{ title:'의학윤리 개론', author:'Beauchamp & Childress 요약' },
],
high: [
{ title:'Robbins 병리학 요약', author:'Robbins' },
{ title:'Harrison 내과학 요약', author:'Harrison' },
{ title:'임상술기 핸드북', author:'Elsevier' },
{ title:'근거중심의학', author:'Sackett' },
{ title:'의료윤리', author:'Beauchamp & Childress' },
{ title:'해부학 아틀라스', author:'Netter' },
],
},



/* 7) registered-nurse */
'registered-nurse': {
elem: [
{ title:'병원에서 일하는 사람들', author:'그림책' },
{ title:'몸의 신호를 알아요', author:'헬스키즈' },
{ title:'감염 예방 동화', author:'안전키즈' },
{ title:'나의 하루 일기(위생)', author:'생활책' },
{ title:'친절한 마음', author:'인성교육' },
{ title:'약은 어떻게 쓸까?', author:'약초키즈' },
],
middle: [
{ title:'간호학 개론(요약)', author:'국시원 요약' },
{ title:'바이탈사인 이해', author:'Nursing Lab' },
{ title:'의사소통 스킬', author:'NurseTalk' },
{ title:'감염관리 입문', author:'CDC 요약' },
{ title:'투약 기본', author:'간호스쿨' },
{ title:'기록과 인계', author:'간호기록' },
],
high: [
{ title:'Fundamentals of Nursing', author:'Potter & Perry' },
{ title:'Clinical Nursing Skills', author:'Taylor' },
{ title:'Infection Control', author:'WHO' },
{ title:'Pharmacology Made Easy', author:'Elsevier' },
{ title:'Nursing Care Plans', author:'Doenges' },
{ title:'NANDA 진단', author:'NANDA' },
],
},



/* 8) env-scientist */
'env-scientist': {
elem: [
{ title:'깨끗한 공기, 맑은 물', author:'환경키즈' },
{ title:'지구를 지켜요', author:'그린키즈' },
{ title:'분리수거의 비밀', author:'환경동화' },
{ title:'기후변화란?', author:'기후학교' },
{ title:'숲과 바다 이야기', author:'생태연구소' },
{ title:'작은 과학 실험', author:'메이커키즈' },
],
middle: [
{ title:'기후변화 과학', author:'IPCC 요약' },
{ title:'물과 공기 오염', author:'환경학 입문' },
{ title:'환경데이터 분석', author:'R for Env' },
{ title:'생태계 서비스', author:'환경경제' },
{ title:'LCA 기초', author:'ISO 요약' },
{ title:'환경정책 이해', author:'정책학' },
],
high: [
{ title:'환경공학 개론', author:'Metcalf & Eddy 요약' },
{ title:'대기오염 제어', author:'Seinfeld' },
{ title:'수질분석', author:'Standard Methods 요약' },
{ title:'지속가능성 지표', author:'UN SDGs' },
{ title:'환경모델링', author:'Wiley' },
{ title:'GIS와 환경', author:'Esri' },
],
},



/* 9) aero-engineer */
'aero-engineer': {
elem: [
{ title:'비행기는 왜 날까?', author:'키즈항공' },
{ title:'하늘을 나는 원리', author:'과학그림책' },
{ title:'로켓과 우주', author:'우주키즈' },
{ title:'바람과 공기의 힘', author:'과학놀이' },
{ title:'프로펠러 만들기', author:'메이커키즈' },
{ title:'종이비행기 실험', author:'놀이과학' },
],
middle: [
{ title:'항공역학 입문', author:'John D. Anderson 요약' },
{ title:'구조/재료 기초', author:'Mechanics 101' },
{ title:'풍동실험 첫걸음', author:'AeroLab' },
{ title:'CAD/CAE 맛보기', author:'Autodesk' },
{ title:'항공전자 개론', author:'Avionics' },
{ title:'시뮬레이션 입문', author:'MATLAB 요약' },
],
high: [
{ title:'Fundamentals of Aerodynamics', author:'Anderson' },
{ title:'Aircraft Structures', author:'Megson' },
{ title:'Flight Dynamics', author:'Etkin' },
{ title:'Introduction to Flight', author:'Anderson' },
{ title:'Composite Materials', author:'Jones' },
{ title:'Gas Turbine Engineering', author:'Boyce' },
],
},



/* 10) ev-engineer */
'ev-engineer': {
elem: [
{ title:'전기는 어떻게 움직일까?', author:'주니어전자' },
{ title:'움직이는 자동차 만들기', author:'메이커키즈' },
{ title:'배터리의 비밀', author:'키즈과학' },
{ title:'자석과 모터', author:'자석연구소' },
{ title:'친환경 에너지', author:'그린키즈' },
{ title:'교통과 안전', author:'안전키즈' },
],
middle: [
{ title:'EV의 원리', author:'전기차 입문' },
{ title:'배터리 기초', author:'Battery 101' },
{ title:'모터/인버터', author:'Powertrain Lab' },
{ title:'충전 인프라', author:'Smart Grid' },
{ title:'안전 규격', author:'ISO/SAE 요약' },
{ title:'EV 제어', author:'Control Basics' },
],
high: [
{ title:'Battery Management Systems', author:'Gregory L. Plett' },
{ title:'Hybrid Electric Vehicles', author:'Iqbal Husain' },
{ title:'Power Electronics', author:'Ned Mohan' },
{ title:'Automotive SPICE', author:'Intland' },
{ title:'Functional Safety(ISO 26262)', author:'SAE' },
{ title:'열관리 공학', author:'Incropera' },
],
},
};



/** 테마 + 학년별 6권을 항상 채워서 반환(폴백 병합) */
function getBooksByGrade(themeKey: string): GradeBooks {
const override = BOOKS_BY_THEME_GRADE[themeKey] || {};
// 각 학년 6권씩 보장(오버라이드 + 폴백 merge)
const merge = (grade: GradeKey): Book[] => {
const a = override[grade] ?? [];
const b = BOOKS_FALLBACK_BY_GRADE[grade];
// a를 우선으로, 부족하면 b에서 보충하여 6권 채우기
const merged = [...a];
for (const item of b) {
if (merged.length >= 6) break;
merged.push(item);
}
return merged.slice(0, 6);
};
return { elem: merge('elem'), middle: merge('middle'), high: merge('high') };
}


/* ========================================================
3) 메인(1~2페이지)
======================================================== */
export default function CareerReport() {
const [sp, setSp] = useState<URLSearchParams | null>(null);
useEffect(() => { if (typeof window!=='undefined') setSp(new URLSearchParams(window.location.search)); }, []);
const ready = !!sp;
const now = useMemo(()=> new Date().toLocaleDateString('ko-KR', {year:'numeric', month:'2-digit', day:'2-digit'}),[]);
const computed = useMemo(()=> sp ? computeFromQuery(sp) : null, [sp]);



const counselorKey = pickCounselorFromQuery();
const C = COUNSELORS[counselorKey];



const themeKey = (computed?.jobKeyRaw || 'data-scientist');
const theme = THEMES[themeKey] || THEMES['data-scientist'];



// 보고서 표기 직업명: 쿼리 jobTitle가 있으면 우선, 없으면 theme.title
const jobTitle = (computed?.jobTitleFromQuery?.trim()) ? computed!.jobTitleFromQuery : theme.title;



const name = computed?.name ?? '응시자';
const percent = computed?.percent ?? 0;
const grade = computed?.grade ?? 'D';
const correct = computed?.correct ?? 0;
const total = computed?.total ?? 1;
const categories = computed?.categories ?? [];



const [shareUrl, setShareUrl] = useState('');
useEffect(()=>{ if (typeof window!=='undefined') setShareUrl(window.location.href); },[]);



const goHome = useCallback(()=>{ if (typeof window!=='undefined') location.href='/' },[]);
/** 뒤로가기(히스토리 없으면 /quiz/1로 안전 이동) */
const goBack = useCallback(()=>{
if (typeof window === 'undefined') return;
const hasHistory = window.history.length > 1 || document.referrer !== '';
if (hasHistory) {
 window.history.back();
} else {
 window.location.href = '/quiz/1';
}
},[]);
const copyLink = useCallback(async ()=>{
try{ await navigator.clipboard.writeText(shareUrl); alert('링크 복사 완료!'); }catch{}
},[shareUrl]);


// ⛔ 잘못: cconst goNext = useCallback(() => {
const goNext = useCallback(() => {
if (typeof window === 'undefined') return;
const url = new URL(window.location.href);
url.pathname = '/report1';     // ← 다음 페이지 경로만 바꾸면 됨
window.location.assign(url.toString());
}, []);





if (!ready || !computed) {
return (
 <main className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
   <GlobalStyle/>
   <div className="text-slate-600">보고서 생성 중…</div>
 </main>
);
}



const gradeGrad =
grade==='S' ? C.gradeS :
grade==='A' ? 'from-blue-400 via-indigo-500 to-purple-500' :
grade==='B' ? 'from-green-400 via-emerald-500 to-teal-500' :
grade==='C' ? 'from-violet-400 via-fuchsia-500 to-pink-500' :
             'from-gray-400 via-slate-500 to-zinc-500';



// per-theme + 폴백 병합 헬퍼 사용 — 상단에서 생성된 GradeBooks 중 high(또는 필요에 따라 elem/middle)를 4권만 추천
const books = (getBooksByGrade(themeKey).high ?? BOOKS_FALLBACK_BY_GRADE.high).slice(0, 4);



// 추가: QR src를 미리 계산 (템플릿/인코딩으로 인한 파서 오류 방지)
const qrSrc = (() => {
  if (!shareUrl) return '';
  const cert = String(hashString(`${shareUrl}|${name}|${now}`)).slice(0, 6);
  const data = `${shareUrl}&cert=${cert}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(data)}`;
})();



return (
<main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 print:bg-white">
 <GlobalStyle/>



 {/* ================== PAGE 1 ================== */}
 <div className="page mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 fade-in">



   {/* 네비 */}
   <div className="no-print flex justify-end gap-2 mb-6">
     <button onClick={goHome} className="rounded-full bg-white border-2 border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700">🏠 홈</button>
     <button onClick={goBack} className="rounded-full bg-white border-2 border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700">⬅ 뒤로</button>
     <button onClick={copyLink} className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 text-sm font-semibold">🔗 링크복사</button>
     </div>



   {/* 헤더 */}
   <section className="mb-8">
     <div className={`relative rounded-3xl bg-gradient-to-br ${C.gradient} text-white px-10 py-10 shadow-2xl overflow-hidden`}>
       <div className="absolute inset-0 opacity-10" style={{backgroundImage:
         `repeating-linear-gradient(45deg, transparent, transparent 36px, rgba(255,255,255,.12) 36px, rgba(255,255,255,.12) 72px)`}}/>
       <div className="relative z-10">
         <div className="flex items-start justify-between mb-6">
           <div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-1">{jobTitle}</h1>
             <p className="text-white/85 text-lg">{theme.field} 체험 성과 종합 분석 보고서</p>
           </div>
           <div className="text-right">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full">
               <span className="text-sm text-white/70">평가일</span>
               <span className="text-white font-semibold">{now}</span>
             </div>
           </div>
         </div>



         <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-white/20">
           <div className="space-y-2">
             <div className="flex items-center gap-3">
               <span className="text-white/60">응시자</span>
               <span className="text-xl font-bold">{name}</span>
             </div>
             <div className="flex items-center gap-3">
               <span className="text-white/60">평가 분야</span>
               <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">{theme.field}</span>
             </div>
           </div>
           <div className="space-y-2">
             <div className="flex items-center gap-3">
               <span className="text-white/60">상담사</span>
               <span className="font-semibold">{C.display} · {C.title}</span>
             </div>
             <div className="flex items-center gap-3">
               <span className="text-white/60">테마</span>
               <span className="text-white/90">{theme.hero}</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>



   {/* I. 성취 카드(같은 카드 섹션 내부 정렬) */}
   <section className="mb-8">
     <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
       <span className="text-4xl">📊</span><span>I. 상담사 종합평가 분석 및 성취도</span>
       <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
     </h2>



     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       {/* 등급 */}
       <div className="group relative">
         <div className={`relative h-44 rounded-3xl bg-gradient-to-br ${gradeGrad} p-1 shadow-2xl`}>
           <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur p-6 flex flex-col items-center justify-center text-white">
             <p className="text-sm opacity-90 mb-1">최종 성취 등급</p>
             <div className="text-7xl font-black tracking-tight">{grade}</div>
             <p className="text-xs mt-2 opacity-95">{C.badge}</p>
           </div>
         </div>
       </div>



       {/* 점수/막대/해설 */}
<div className="lg:col-span-2">
<div
 className="
   bg-gradient-to-br from-white to-slate-50
   rounded-3xl border-2 border-slate-200 p-6 shadow-xl
   flex flex-col gap-3
   min-h-[11rem]   /* ⬅ 고정 높이 대신 최소 높이 */
   overflow-hidden /* ⬅ 넘치면 잘라서 카드 밖으로 안 나가게 */
 "
>
 <div>
   <div className="flex items-baseline gap-4">
     <div className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
       {percent}%
     </div>
     <div className="text-xl text-slate-600 font-medium">{correct} / {total} 문제 정답</div>
   </div>



   <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden shadow-inner mt-3">
     <div
       className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
         grade==='S' ? C.gradeS :
         grade==='A' ? 'from-blue-400 via-indigo-500 to-purple-500' :
         grade==='B' ? 'from-green-400 via-emerald-500 to-teal-500' :
         grade==='C' ? 'from-violet-400 via-fuchsia-500 to-pink-500' :
                       'from-gray-400 via-slate-500 to-zinc-500'
       }`}
       style={{ width: `${percent}%` }}   /* ⬅ % 단위 유지 필수 */
     />
   </div>
 </div>



 <p className="text-slate-800 leading-relaxed whitespace-normal break-words">
   <b className="text-slate-900">{name}</b> 학생은 <b className="text-indigo-600">{jobTitle}</b> 테마에서
   <b className="mx-1">{percent}%</b> 성취를 보였습니다. {theme.title} 직무는 {theme.highlights.join(' · ')} 역량이 특히 중요합니다.
           </p>
         </div>
       </div>
     </div>
   </section>



   {/* II. 핵심역량 */}
   <section className="mb-6">
     <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
       <span className="text-4xl">🎯</span><span>II. 핵심 역량 심층 진단</span>
       <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
     </h2>
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
       {categories.map((c)=>(
         <div key={c.key} className="group bg-white rounded-2xl border-2 border-slate-200 p-5 hover:shadow-xl transition-all">
           <div className="flex items-start justify-between mb-3">
             <div className="flex items-center gap-3">
               <span className="text-3xl">
                 {c.key==='ethics'?'⚖️':c.key==='eda'?'📊':c.key==='model'?'🔧':c.key==='perf'?'📈':'🎮'}
               </span>
               <div>
                 <h3 className="font-bold text-slate-800">{c.name}</h3>
                 <p className="text-xs text-slate-500 mt-0.5">{c.pct >= 80 ? '강점' : c.pct >=60 ? '양호' : '보강 필요'}</p>
               </div>
             </div>
             <div className={`text-2xl font-black ${c.pct>=80?'text-red-500':c.pct>=60?'text-indigo-600':c.pct>=40?'text-yellow-600':'text-slate-400'}`}>{c.pct}%</div>
           </div>
           <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
             <div className={`absolute inset-y-0 left-0 ${
               c.pct>=80?'bg-gradient-to-r from-red-400 to-red-600':
               c.pct>=60?'bg-gradient-to-r from-indigo-400 to-indigo-600':
               c.pct>=40?'bg-gradient-to-r from-yellow-400 to-yellow-600':
                         'bg-gradient-to-r from-slate-300 to-slate-400'
             }`} style={{width:`${c.pct}%`}}/>
           </div>
         </div>
       ))}
     </div>
   </section>



   {/* 성장 메시지 */}
   <section className="mt-6 relative rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 overflow-hidden">
     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_18%_18%,white,transparent_60%)]"></div>
     <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
       <span className="text-2xl">🌱</span> 성장 메시지 & 잠재력 조언
     </h3>
     <p className="text-slate-800 leading-relaxed mb-4">
       <b>{name}</b> 학생은 이번 <b>{theme.title}</b> 체험을 통해 <b className="text-indigo-600">가능성</b>을 증명했습니다.
       배움의 목적은 점수가 아니라 <b className="text-purple-600">깊은 이해와 실천</b>입니다.
     </p>
     <div className="grid md:grid-cols-2 gap-4">
       <div className="rounded-2xl border border-indigo-200 bg-white/80 p-5 shadow-sm">
         <h4 className="text-lg font-semibold text-indigo-700 mb-2">🌟 {C.display}의 한마디</h4>
         <p className="text-slate-700 text-sm leading-relaxed">“{C.quote}”</p>
       </div>
       <div className="rounded-2xl border border-purple-200 bg-white/80 p-5 shadow-sm">
         <h4 className="text-lg font-semibold text-purple-700 mb-2">💎 오늘의 성장 체크리스트</h4>
         <ul className="list-disc pl-5 text-slate-700 text-sm space-y-1">
           {C.checklist.map((t,i)=>(<li key={i}>{t}</li>))}
         </ul>
       </div>
     </div>
     <div className="page-break h-2" />
   </section>
 </div>



 {/* ================== PAGE 2 ================== */}
 <div className="page mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">



   {/* III. 진로 로드맵 */}
   <section className="mb-8">
     <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
       <span className="text-4xl">🚀</span><span>III. 진로 로드맵 & 구체 행동</span>
       <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
     </h2>
     <div className="grid md:grid-cols-3 gap-6">
       {theme.highlights.map((h, idx)=>(
         <div key={idx} className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition"></div>
           <div className="relative bg-white rounded-2xl p-6 border-2 border-indigo-200">
             <div className="w-12 h-12 bg-indigo-100 rounded-full grid place-items-center text-2xl mb-3">#{idx+1}</div>
             <h3 className="text-lg font-bold text-indigo-900 mb-2">핵심 포인트</h3>
             <p className="text-slate-700">{h}</p>
           </div>
         </div>
       ))}
     </div>
   </section>



   {/* 추천도서 4권 */}
   <section className="mb-8">
     <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
       <span className="text-4xl">📚</span><span>추천 도서 (4권)</span>
       <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
     </h2>
     <div className="rounded-2xl border-2 border-slate-200 p-5 bg-gradient-to-br from-slate-50 to-white">
       <p className="text-xs text-slate-500 mb-3">
         ※ 초등학생은 난도가 높을 수 있어요. 대신 만화/그림설명서/동영상 강의로 같은 개념을 먼저 접한 뒤 읽으면 좋아요.
       </p>
       <ul className="grid md:grid-cols-2 gap-3">
         {books.map((b, i)=>(
           <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-slate-200">
             <span className="text-xl">📖</span>
             <div className="text-slate-800">
               <div className="font-semibold">{b.title}</div>
               <div className="text-xs text-slate-500">저자: {b.author}</div>
               {b.note && <div className="text-xs text-amber-700 mt-1">Tip: {b.note}</div>}
             </div>
           </li>
         ))}
       </ul>
     </div>
   </section>



   {/* 핵심 개념 한눈에 */}
   <section className="mb-8">
     <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
       <span className="text-4xl">💡</span><span>핵심 개념 한눈에</span>
       <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
     </h2>
     <div className="grid md:grid-cols-2 gap-4">
       {[
         {icon:'⚖️', t:'데이터/윤리', b:'출처 표기, 개인정보/저작권 보호, 안전수칙 준수.'},
         {icon:'📊', t:'EDA', b:'분포·이상치·패턴 탐색, 시각화와 요약통계.'},
         {icon:'🔧', t:'모델링/프로토타입', b:'문제정의→설계→검증의 반복.'},
         {icon:'📈', t:'성능 해석', b:'정확도·정밀도·재현율과 과적합 점검.'},
         {icon:'🎮', t:'실무 응용', b:'가상환경·테스트베드에서 안전하게 실험/개선.'},
       ].map((c,i)=>(
         <div key={i} className="group bg-white rounded-2xl border-2 border-slate-200 p-5 hover:shadow-lg transition-all">
           <div className="flex items-start gap-4">
             <span className="text-3xl flex-shrink-0">{c.icon}</span>
             <div className="flex-1">
               <h3 className="font-bold text-slate-800 mb-2">{c.t}</h3>
               <p className="text-sm text-slate-600 leading-relaxed">{c.b}</p>
             </div>
           </div>
         </div>
       ))}
     </div>
   </section>

       {/* VI. 체험 인증 + 결과 전송 */}
<section id="cert" className="no-print mt-8">
  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
    <span>🔐</span>
    <span>VI. 체험 인증 및 결과 전송</span>
  </h2>


  <div className="grid md:grid-cols-2 gap-6">
    {/* 좌측: 체험 인증서 */}
    <div className="rounded-2xl border-2 border-slate-200 p-6 bg-white">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <span>📜</span>
        <span>체험 인증서</span>
      </h3>

      <p className="text-slate-700 text-sm leading-relaxed mb-6">
        본 인증서는 <strong className="text-slate-900">{name}</strong> 학생이{" "}
        <strong className="text-slate-900">{theme.title}</strong> 진로체험 프로그램을
        성실히 수행했음을 증명합니다.
      </p>

      <div className="space-y-1 text-sm text-slate-600">
        <div>발급일: {now}</div>
        <div>인증번호: {String(hashString(`${shareUrl}|${name}|${now}`)).slice(0, 6)}</div>
      </div>
    </div>


    {/* 우측: QR 인증 */}
    <div className="rounded-2xl border-2 border-indigo-200 p-6 bg-gradient-to-br from-indigo-50 to-white">
      <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
        <span>🔒</span>
        <span>QR 인증</span>
      </h3>


      {shareUrl ? (
        <div className="flex items-center gap-4">
          {/* QR 코드 */}
          <div className="p-3 bg-white rounded-xl shadow-md">
            <img
              alt="인증 QR 코드"
              className="w-32 h-32"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=
${encodeURIComponent(
                `${shareUrl}&cert=${String(hashString(`${shareUrl}|${name}|${now}`)).slice(0, 6)}`
              )}`}
            />
          </div>


          {/* 설명 + 버튼 */}
          <div className="flex-1 space-y-3">
            <p className="text-sm text-slate-600 leading-relaxed">
              QR 스캔 시 이 보고서의 진위 여부를 서버에서 확인합니다.
            </p>
            <button
              onClick={copyLink}
              className="rounded-xl px-5 py-2.5 font-semibold text-white shadow-md bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>🔗</span>
              <span>링크 복사</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="h-40 grid place-items-center text-slate-400">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin text-2xl">⏳</div>
            <div className="text-sm">링크 준비 중…</div>
          </div>
        </div>
      )}
    </div>
  </div>


  {/* 하단: 카카오톡 전송 */}
  <div className="mt-6 rounded-2xl border-2 border-slate-200 p-6 bg-white">
    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
      <span>💬</span>
      <span>카카오톡으로 결과 전송</span>
    </h3>

    <div className="flex flex-col md:flex-row gap-4">
      {/* 입력 영역 */}
      <div className="flex-1 space-y-3">
        <div>
          <label htmlFor="kakaoPhone" className="block text-sm text-slate-600 mb-1.5">
            전화번호 (선택)
          </label>
          <input
            id="kakaoPhone"
            type="tel"
            placeholder="예: 010-1234-5678"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            id="kakaoAgree"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>결과(인증 QR 포함)를 카카오톡으로 전송하는 것에 동의합니다.</span>
        </label>
      </div>


      {/* 버튼 */}
      <div className="flex items-end">
        <button
          onClick={() => {
            const phone = (document.getElementById('kakaoPhone') as HTMLInputElement)?.value || '';
            const agree = (document.getElementById('kakaoAgree') as HTMLInputElement)?.checked;
            if (!agree) {
              alert('카카오톡 전송에 동의가 필요합니다.');
              return;
            }
            alert(`카카오톡으로 전송했습니다.\n전화번호: ${phone || '(미입력)'}\nURL: ${shareUrl}`);
          }}
          className="rounded-xl px-6 py-3 font-semibold text-white shadow-lg bg-slate-900 hover:bg-black transition-all active:scale-95 whitespace-nowrap"
        >
          카카오톡으로 전송하기
        </button>
      </div>
    </div>
  </div>
</section>


{/* 인쇄용 2탄 안내 */}
<section className="print-only mt-10">
  <div className="rounded-2xl border-2 border-slate-300 p-6 bg-slate-50 text-center">
    <h3 className="text-lg font-bold text-slate-800 mb-3">
      🎯 진로체험 2탄 — AI 포트폴리오 미션 예고
    </h3>
    <p className="text-slate-700 text-sm leading-relaxed mb-2">
      다음 단계에서는 나만의 진로 포트폴리오를 완성합니다.<br />
      체험한 직업을 바탕으로 AI가 추천하는 경로와<br />
      진로 로드맵을 함께 설계하세요.
    </p>
    <p className="text-xs text-slate-500">
      ※ 체험 인증자에 한해 참여 가능합니다.
    </p>
  </div>
</section>


{/* 푸터 */}
<footer className="mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
  <p className="font-semibold">© 2024 진로 체험 평가 시스템</p>
  <p className="mt-1">
    본 보고서는 교육 목적으로 제공되며, 전문 상담을 대체하지 않습니다.
  </p>
</footer>
   </div>
   </main>
 );
}