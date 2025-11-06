'use client';

import Link from 'next/link';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_70%_-20%,#c7d2fe_0%,transparent_50%),linear-gradient(180deg,#f8fafc,white)]">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight">청소년 진로 체험관</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link href="/career/level" className="hover:underline">시작</Link>
            <Link href="/career/interests" className="hover:underline">관심분야</Link>
            <Link href="/career/result" className="hover:underline">결과보고</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

      <footer className="mt-16 border-t">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-gray-500">
          © 2025 Youth Career Studio · 상담·분석·체험·보고서 자동 진행
        </div>
      </footer>
    </div>
  );
}
