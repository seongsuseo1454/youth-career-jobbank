// src/app/admin/page.tsx  ← 여기에 복사-붙여넣기만 하세요
"use client";

import { useState } from 'react';

export default function AdminPage() {
  const [schoolName, setSchoolName] = useState('강남고등학교');
  const [startNum, setStartNum] = useState('100');
  const [endNum, setEndNum] = useState('110');
  const [codes, setCodes] = useState<string[]>([]);

  const generateCodes = () => {
    const start = parseInt(startNum);
    const end = parseInt(endNum);
    const newCodes = [];

    for (let i = start; i <= end; i++) {
      newCodes.push(`${schoolName.replace(/고등학교|중학교|초등학교/g, '')}${i}`);
    }
    setCodes(newCodes);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(codes.join('\n'));
    alert('모든 코드가 복사되었습니다! 엑셀에 붙여넣기만 하세요');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">진로야 체험관 관리자 페이지</h1>
      
      <div className="bg-gray-800 p-8 rounded-2xl max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-xl mb-2">학교명</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-xl"
              placeholder="예: 강남고등학교"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xl mb-2">시작 번호</label>
              <input
                type="number"
                value={startNum}
                onChange={(e) => setStartNum(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-xl"
              />
            </div>
            <div>
              <label className="block text-xl mb-2">끝 번호</label>
              <input
                type="number"
                value={endNum}
                onChange={(e) => setEndNum(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-xl"
              />
            </div>
          </div>

          <button
            onClick={generateCodes}
            className="w-full bg-purple-600 hover:bg-purple-700 py-5 text-2xl font-bold rounded-xl"
          >
            코드 생성하기
          </button>

          {codes.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl">총 {codes.length}개 코드 생성됨</p>
                <button
                  onClick={copyAll}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-xl"
                >
                  모두 복사
                </button>
              </div>
              <textarea
                value={codes.join('\n')}
                readOnly
                className="w-full h-64 bg-gray-900 p-4 rounded-lg font-mono"
              />
            </div>
          )}
        </div>
      </div>

      <p className="mt-10 text-gray-400">
        접속 주소 → https://youth-experience.vercel.app/admin
      </p>
    </div>
  );
}