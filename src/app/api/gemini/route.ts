// src/app/api/gemini/route.ts
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export const runtime = 'nodejs'; // Vercel/Node 환경 보장

export async function POST(req: Request) {
  try {
    if (!env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY가 설정되지 않았습니다.' },
        { status: 400 }
      );
    }

    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'prompt가 필요합니다.' }, { status: 400 });
    }

    // Google Generative Language API (Gemini 1.5 Flash)
    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
      + `?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }]}],
      // JSON이 필요하면: generationConfig: { response_mime_type: 'application/json' }
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text();
      return NextResponse.json({ error: `Gemini API 오류: ${txt}` }, { status: r.status });
    }

    const data = await r.json();
    // 일반 텍스트 뽑기
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') ?? '';

    return NextResponse.json({ text, raw: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}