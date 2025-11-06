// src/hooks/useLicenseGuard.ts
'use client';
import { useEffect, useState } from 'react';   // ✅ react에서 이 두 개만 import!

export function useLicenseGuard() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: 실제 라이선스/권한 체크 로직
    // 서버에서 토큰 검증하거나, 로컬 저장소 값을 읽는 등
    setOk(true); // 임시 통과
  }, []);

  return ok; // true/false/null 반환
}