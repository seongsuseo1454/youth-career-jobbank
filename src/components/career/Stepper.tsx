'use client';
import React from 'react';

export default function Stepper({ total, current }:{ total:number; current:number }) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current}>
      {Array.from
({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${i < current ? 'bg-blue-600 w-12' : 'bg-gray-200 w-8'}`}
          aria-hidden
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">{current} / {total}</span>
    </div>
  );
}