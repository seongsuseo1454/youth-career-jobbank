// src/components/UiVariantWrapper.tsx
'use client';
import type { ReactNode } from 'react';

export default function UiVariantWrapper({ children }: { children: ReactNode }) {
  // 필요 시 테마/폰트/레이아웃 공통 래핑에 사용. 지금은 패스스루.
  return <>{children}</>;
}