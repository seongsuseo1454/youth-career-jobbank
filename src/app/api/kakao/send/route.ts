import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { access_token, text } = await req.json();
  if (!access_token) return new Response('missing token', { status: 400 });

  const r = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      template_object: JSON.stringify({
        object_type: 'text',
        text: text || 'PassView 진로체험 결과',
        link: { web_url: process.env.NEXT_PUBLIC_APP_BASE_URL, mobile_web_url: process.env.NEXT_PUBLIC_APP_BASE_URL },
        button_title: '열어보기',
      }),
    }),
  });
  const data = await r.json();
  if (!r.ok) return new Response(JSON.stringify(data), { status: r.status });
  return Response.json({ ok: true, data });
}