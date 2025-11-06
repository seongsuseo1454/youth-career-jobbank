// src/app/layout.tsx
import "./../styles/globals.css"; // 상대경로 주의! src/app -> src/styles
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}