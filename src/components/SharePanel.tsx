// [제목] 결과 공유 패널(QR 플레이스홀더 · 카카오 모의 전송 · 텍스트 다운로드)
'use client';
import React, { useMemo, useState } from 'react';

export default function SharePanel({ title='결과 보고서', summary='결과 요약 본문이 여기에 표시됩니다.' }:{title?:string; summary?:string;}){
  const [agree,setAgree]=useState(false);
  const [phone,setPhone]=useState('');
  const [showQR,setShowQR]=useState(false);

  const payload=useMemo(()=>[`📄 ${title}`,'--------------------------------',summary.trim(),'','전송: PassView Youth Career Studio'].join('\n'),[title,summary]);

  const downloadTxt=()=>{ const blob=new Blob([payload],{type:'text/plain;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`${sanitize(title)}.txt`; a.click(); URL.revokeObjectURL(url); };
  const sendKakao=()=>{ if(!agree) return alert('카카오톡 전송 동의에 체크해 주세요.'); if(!/^\d{10,11}$/.test(phone)) return alert('전화번호(숫자만 10~11자리)를 입력해 주세요.'); alert(`카카오 전송 요청 완료\n수신: ${formatPhone(phone)}\n(실연동은 운영 단계에서 처리)`); };

  return (
    <div className="rounded-xl border p-4 space-y-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <pre className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{summary}</pre>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">QR 코드</div>
            <button onClick={()=>setShowQR(s=>!s)} className="px-3 py-1.5 rounded bg-gray-800 text-white text-sm">{showQR?'QR 닫기':'QR 보기'}</button>
          </div>
          {showQR
            ? <div className="aspect-square border rounded flex items-center justify-center bg-white text-gray-500 text-sm text-center px-4"><div><div className="font-semibold mb-1">QR Placeholder</div>실연동 시 결과 링크/요약을 QR로 생성합니다.</div></div>
            : <div className="text-sm text-gray-500">버튼을 눌러 QR 미리보기를 열 수 있습니다.</div>}
        </div>

        <div className="rounded-lg border p-4">
          <div className="font-semibold mb-3">카카오톡 전송</div>
          <label className="block text-sm text-gray-600 mb-1">전화번호 (숫자만)</label>
          <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))} placeholder="예: 01012345678" className="w-full border rounded px-3 py-2" inputMode="numeric" maxLength={11}/>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/><span>카카오톡 전송에 동의합니다.</span>
          </label>
          <button onClick={sendKakao} disabled={!agree} className={`mt-3 w-full px-4 py-2 rounded text-white ${agree?'bg-yellow-500 hover:bg-yellow-600':'bg-gray-300 cursor-not-allowed'}`}>카카오톡으로 전송</button>
          <div className="border-t mt-4 pt-4">
            <button onClick={downloadTxt} className="w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">결과 텍스트 다운로드(.txt)</button>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">※ QR/카카오 연동은 운영 단계에서 API 연결 후 활성화됩니다.</p>
    </div>
  );
}

function sanitize(name:string){ return name.replace(/[\\/:*?"<>|]/g,'_').slice(0,60)||'result'; }
function formatPhone(p:string){ return p.length===11?`${p.slice(0,3)}-${p.slice(3,7)}-${p.slice(7)}`:p.length===10?`${p.slice(0,3)}-${p.slice(3,6)}-${p.slice(6)}`:p; }