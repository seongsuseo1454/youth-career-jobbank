// src/app/api/sign/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const runtime = 'nodejs'            // jsonwebtoken은 Edge에서 동작 안 함
export const dynamic = 'force-dynamic'     // 캐시 방지(토큰은 매번 새로 발급)

// 간단한 바디 타입
type Body = { reportId?: string; tenant?: string }

export async function POST(req: Request) {
  try {
    const { reportId, tenant } = (await req.json()) as Body

    // 입력 검증
    if (!reportId || !tenant) {
      return NextResponse.json(
        { error: 'Missing reportId or tenant' },
        { status: 400 }
      )
    }

    const secret = process.env.JWT_SECRET
    if (!secret || secret.length < 32) {
      // 배포 전 .env에 충분히 긴 랜덤 시크릿 설정
      return NextResponse.json(
        { error: 'JWT secret not configured' },
        { status: 500 }
      )
    }

    // 필요한 정보만 최소로 넣기(과다한 개인정보 금지)
    const payload = { rid: reportId, t: tenant }

    const token = jwt.sign(payload, secret, {
      expiresIn: '7d',
      issuer: 'passview-ycs',
      audience: tenant,          // 검증 시 일치여부 확인 가능
      notBefore: '0s',
    })

    return NextResponse.json({ token })
  } catch (err) {
    // JSON 파싱/기타 오류 대응
    return NextResponse.json(
      { error: 'Failed to sign token' },
      { status: 500 }
    )
  }
}
