'use client';

import { useState } from 'react';

export default function ScenarioWizard({ onReady }: { onReady: () => void }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [style, setStyle] = useState('');
  const [tone, setTone] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const submit = () => {
    const meta = { title, genre, style, tone };
    localStorage.setItem('ycs.webtoon.meta', JSON.stringify(meta));
    localStorage.setItem('ycs.webtoon.synopsis', synopsis);
    onReady();
  };

  return (
    <div className="space-y-3">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="작품 제목"
      />
      <input
        value={genre}
        onChange={e => setGenre(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="장르 (예: 코미디, 드라마)"
      />
      <input
        value={style}
        onChange={e => setStyle(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="만화 스타일 (예: 웹툰, 일본풍)"
      />
      <input
        value={tone}
        onChange={e => setTone(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="분위기/톤 (예: 밝게, 진지하게)"
      />
      <textarea
        value={synopsis}
        onChange={e => setSynopsis(e.target.value)}
        className="w-full border rounded p-3"
        rows={4}
        placeholder="시놉시스 / 줄거리"
      />
      <button
        onClick={submit}
        className="mt-3 rounded bg-black text-white px-4 py-2"
      >
        4컷 구성으로 →
      </button>
    </div>
  );
}
