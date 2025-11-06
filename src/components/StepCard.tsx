'use client';
import Link from 'next/link';
type Props = {
  title: string;
  desc: string;
  href?: string;            // 이동 링크 (없으면 버튼 숨김)
  disabled?: boolean;       // 잠금
};

export default function StepCard({ title, desc, href, disabled }: Props){
  return (
    <div className="rounded-xl border bg-white/80 p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{desc}</p>
      {!!href && (
        <Link
          href={disabled ? '#' : href}
          className={`inline-block rounded-lg px-4 py-2 text-sm font-medium ${
            disabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          aria-disabled={disabled}
        >
          바로가기 →
        </Link>
      )}
    </div>
  );
}
