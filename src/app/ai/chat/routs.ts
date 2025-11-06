import { NextRequest } from 'next/server';
import { env } from '@/lib/env'; // 상대경로 맞게 조정해주세요

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages, useGemini } = await req.json();

    // ✅ Gemini API 사용
    if (useGemini && env.GEMINI_API_KEY && env.GEMINI_BASE_URL) {
      const gbody = {
        model: env.GEMINI_MODEL || 'gemini-1.5-flash',
        messages,
        temperature: 0.7,
      };

      const gr = await fetch(`${env.GEMINI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gbody),
      });

      if (!gr.ok) {
        const txt = await gr.text();
        return new Response(JSON.stringify({ error: txt }), { status: gr.status });
      }

      const gdata = await gr.json();
      return Response.json({ output: gdata.choices?.[0]?.message?.content
 ?? '' });
    }

    // ✅ 기본 OpenAI 사용 (백업)
    const { messages: msgs } = await req.json();
    const body = {
      model: env.AI_MODEL || 'gpt-4o-mini',
      messages: msgs ?? [],
      temperature: 0.7,
      stream: false,
    };

    const r = await fetch(`${env.AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const text = await r.text();
      return new Response(JSON.stringify({ error: text }), { status: r.status });
    }

    const data = await r.json();
    return Response.json({ output: data.choices?.[0]?.message?.content
 ?? '' });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message
 || '서버 오류' }), { status: 500 });
  }
}