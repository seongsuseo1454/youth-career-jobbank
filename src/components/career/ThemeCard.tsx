'use client';
import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  desc?: string;
  field?: string;   // ex) 'medical-bio'
  job?: string;     // ex) 'doctor'
  query?: string;   // ex) sp.toString()
};

export default function ThemeCard({ title, desc, field, job, query }: Props) {
  const href =
    field && job
      ? `/career/experience/${field}/${job}${query ? `?${query}` : ''}`
      : '/career/themes'; // ← 안전 폴백: 절대 undefined 금지

  return (
    <article
      className="group rounded-2xl border bg-white/60 backdrop-blur-sm p-5 hover:shadow-xl transition
                 focus-within:ring-2 focus-within:ring-indigo-500"
      tabIndex={-1}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500 mt-1">{desc || '초·중·고 5문항 체험'}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
          ● 초·중·고 5문항
        </span>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          체험 시작 →
        </Link>
      </div>

      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="mt-3 text-xs text-gray-400">
        집중·성실·탐구 — 성장 여정에 맞춘 체험을 제공합니다.
      </div>
    </article>
  );
}
