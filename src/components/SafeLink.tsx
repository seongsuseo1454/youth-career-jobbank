// src/components/SafeLink.tsx
'use client';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  LinkProps & { href: string | null | undefined; devName?: string };

const SafeLink = forwardRef<HTMLAnchorElement, Props>(function SafeLink(
  { href, devName, ...rest },
  ref
) {
  if (!href || typeof href !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        `[SafeLink] href가 비어있습니다${
          devName ? ` (from ${devName})` : ''
        }. 문자열 경로를 전달하세요.`
      );
    }
    // 개발 중엔 깨지지 않도록 임시로 버튼처럼 렌더
    return (
      <a
        ref={ref}
        aria-disabled
        className={`pointer-events-none opacity-50 ${rest.className ?? ''}`}
      >
        {rest.children}
      </a>
    );
  }
  return <Link ref={ref} href={href} {...rest} />;
});

export default SafeLink;