// src/app/enter-code/page.tsx
"use client";

import { useState, useEffect } from 'react';
import IdleMain from '../../components/IdleMain';

export default function Home() {
  const [input, setInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const VALID_CODES = ['TEST123', '123', 'TEST', 'JINROYA', 'GANGNAM25'];
  const SESSION_KEY = 'youth_career_authenticated';

  // 페이지 로드 시 세션 확인
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem(SESSION_KEY);
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = () => {
    const code = input.trim().toUpperCase();
    if (VALID_CODES.some(c => code.includes(c) || c.includes(code))) {
      // 세션 스토리지에 인증 상태 저장
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsLoggedIn(true);
    } else {
      alert('코드를 확인해 주세요');
      setInput('');
    }
  };

  // 세션 확인 중일 때는 빈 화면 표시
  if (isChecking) {
    return null;
  }

  // 이미 로그인된 경우 메인 화면 표시
  if (isLoggedIn) {
    return <IdleMain />;
  }

  // 로그인 화면
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
      <h1 className="mb-12 text-8xl font-bold">진로야 체험관</h1>
      <p className="mb-10 text-4xl">기관 전용 코드 입력</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="TEST123"
        autoFocus
        className="w-96 rounded-3xl border-4 border-white/30 bg-white/10 px-10 py-8 text-center text-5xl font-bold tracking-widest text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-white"
      />

      <p className="mt-12 text-3xl font-bold text-yellow-300">
        테스트 → TEST 또는 123
      </p>
    </div>
  );
}