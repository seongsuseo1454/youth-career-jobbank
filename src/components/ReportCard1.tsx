// [제목] 체험 결과 표준 보고서 (QR + 카카오 공유)
'use client';

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode'; // npm i qrcode

type Props = {
  shareUrl: string;  // QR에 넣을 URL (학생 전용 요약 페이지/짧은 URL 등)
  student: { name: string; school: string; grade: string; classroom: string; goal: string; interests: string[] };
  theme: {
    category: string; title: string; summary: string;
    duties: string[]; skills: string[]; tools: string[];
    salary: { junior: string; mid: string; senior: string };
    study: { books: string[]; courses: string[]; activities: string[] };
  };
  missionOutput: string;   // 학생이 체험 미션에 입력한 결과
  feedback: string;        // 템플릿으로 생성된 피드백
};

export default function ReportCard({ shareUrl, student, theme, missionOutput, feedback }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, shareUrl, { width: 140, margin: 1 }).catch(()=>{});
    }
  }, [shareUrl]);

  const shareKakao = () => {
    // 카카오 SDK가 로드되어 있고 APP_KEY가 연결되어 있어야 동작합니다.
    // window.Kakao?.Share.sendDefault(...) 형태로 붙이면 됩니다. (지금은 가드만)
    if (typeof window !== 'undefined' && (window as any).Kakao?.isInitialized?.()) {
      (window as any).Kakao.Share.sendDefault({
        objectType: 'text',
        text: `[진로체험 보고서]\n${student.name} - ${theme.title}\n${shareUrl}`,
        link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
      });
    } else {
      alert('카카오 SDK가 초기화되지 않았습니다. (APP_KEY 설정 필요)');
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl border p-6">
      <header className="flex items-start justify-between gap-6 border-b pb-4">
        <div>
          <h2 className="text-2xl font-extrabold">{theme.title}</h2>
          <p className="text-gray-600 mt-1">{theme.summary}</p>
          <div className="mt-2 text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 inline-block">{theme.category}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <div className="font-semibold">QR로 휴대폰에 저장</div>
            <canvas ref={canvasRef} className="mt-1 border rounded-md" />
          </div>
          <button
            onClick={shareKakao}
            className="h-10 px-4 rounded-md bg-yellow-400 hover:bg-yellow-500 font-bold text-black"
            title="카카오톡으로 공유"
          >
            카카오톡 공유
          </button>
        </div>
      </header>

      {/* 학생 기본 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-gray-500">학생</div>
          <div className="font-semibold">{student.name}</div>
          <div className="text-sm">{student.school} {student.grade}학년 {student.classroom}반</div>
          <div className="text-sm mt-1">목표: <span className="font-medium">{student.goal}</span></div>
          <div className="text-sm">관심분야: {student.interests.join(', ') || '-'}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-gray-500">예상 연봉(참고)</div>
          <div className="text-sm">신입: <b>{theme.salary.junior}</b></div>
          <div className="text-sm">경력: <b>{theme.salary.mid}</b></div>
          <div className="text-sm">시니어: <b>{theme.salary.senior}</b></div>
        </div>
      </div>

      {/* 직무/역량 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="rounded-lg border p-4">
          <div className="font-semibold mb-2">주요 업무</div>
          <ul className="list-disc pl-5 text-sm space-y-1">{theme.duties.map((d,i)=><li key={i}>{d}</li>)}</ul>
        </div>
        <div className="rounded-lg border p-4">
          <div className="font-semibold mb-2">필요 역량</div>
          <ul className="list-disc pl-5 text-sm space-y-1">{theme.skills.map((s,i)=><li key={i}>{s}</li>)}</ul>
        </div>
        <div className="rounded-lg border p-4">
          <div className="font-semibold mb-2">도구/스택</div>
          <ul className="list-disc pl-5 text-sm space-y-1">{theme.tools.map((t,i)=><li key={i}>{t}</li>)}</ul>
        </div>
      </div>

      {/* 체험 제출물 */}
      <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <div className="font-semibold mb-1">체험 제출물</div>
        <pre className="text-sm whitespace-pre-wrap">{missionOutput || '(제출 내용 없음)'}</pre>
      </div>

      {/* 피드백(자동 생성) */}
      <div className="mt-4 rounded-lg bg-indigo-50 border border-indigo-200 p-4">
        <div className="font-semibold mb-1">코치 피드백</div>
        <pre className="text-sm whitespace-pre-wrap">{feedback}</pre>
      </div>

      {/* 처방(학습 가이드) */}
      <div className="mt-4 rounded-lg border p-4">
        <div className="font-semibold mb-1">학습 처방 (책/강의/활동)</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <div className="font-semibold text-gray-700 mb-1">도서</div>
            <ul className="list-disc pl-5 space-y-1">{theme.study.books.map((b,i)=><li key={i}>{b}</li>)}</ul>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">강의/코스</div>
            <ul className="list-disc pl-5 space-y-1">{theme.study.courses.map((c,i)=><li key={i}>{c}</li>)}</ul>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">실천 활동</div>
            <ul className="list-disc pl-5 space-y-1">{theme.study.activities.map((a,i)=><li key={i}>{a}</li>)}</ul>
          </div>
        </div>
      </div>

      <footer className="mt-6 text-xs text-gray-500">
        ※ 연봉·자료는 참고용 추정치입니다. 최신 정보는 기관·기업·노동통계 등을 확인하세요.
      </footer>
    </section>
  );
}
