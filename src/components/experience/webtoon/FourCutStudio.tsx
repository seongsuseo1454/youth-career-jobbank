'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { R } from '@/lib/routes';

export default function FourCutStudio() {
  const r = useRouter();
  const [panels, setPanels] = useState<string[]>(['', '', '', '']);

  const update = (i: number, v: string) => {
    const np = [...panels];
    np[i] = v;
    setPanels(np);
  };

  const finish = () => {
    localStorage.setItem('ycs.webtoon.panels', JSON.stringify(panels.map(t => ({ text: t }))));
    r.push(R.analysis);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {panels.map((t, i) => (
          <div key={i} className="rounded-xl border p-3 bg-white">
            <div className="text-sm font-semibold mb-1">컷 {i + 1}</div>
            <textarea
              value={t}
              onChange={e => update(i, e.target.value)}
              className="w-full rounded border p-2 text-sm"
              rows={4}
              placeholder={`컷 ${i + 1} 내용`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={finish}
          className="rounded bg-black text-white px-4 py-2"
        >
          분석으로 →
        </button>
      </div>
    </div>
  );
}