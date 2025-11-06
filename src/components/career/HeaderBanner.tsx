'use client';
import React from 'react';

export default function HeaderBanner({
  title, subtitle, onBack, onHome,
}: { title: string; subtitle?: string; onBack?: () => void; onHome?: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="text-white/85 mt-1">{subtitle}</p>}
      </div>

      <div className="absolute right-4 top-4 flex gap-2">
        {onBack && (
          <button onClick={onBack}
                  className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm">← 뒤로가기</button>
        )}
        {onHome && (
          <button onClick={onHome}
                  className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm">🏠 홈으로</button>
        )}
      </div>
    </div>
  );
}