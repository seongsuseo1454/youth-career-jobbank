// src/lib/geminiClient.ts
export async function askGemini(prompt: string) {
  const r = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.error || 'Gemini 호출 실패');
  return j.text as string;
}