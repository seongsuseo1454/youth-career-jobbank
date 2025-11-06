'use client';

import Link from 'next/link';

type Item = {
  title: string;
  desc: string;
  href: string;
  icon?: string;
};

type SectionProps =
  | { items: Item[] } // 구버전 호환: items 배열을 넘기는 방식
  | Item;             // 신버전: 단일 카드 props(title, desc, href, icon)

/** 단일 카드 컴포넌트 */
function Card({ title, desc, href, icon }: Item) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="text-2xl">{icon ?? '➡️'}</div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-gray-500">{desc}</p>
      <div className="mt-4 text-indigo-600 group-hover:translate-x-0.5 transition">
        바로가기 →
      </div>
    </Link>
  );
}

export default function MenuSection(props: SectionProps) {
  // items 배열이 오면(구버전) 리스트 렌더링
  if ('items' in props && Array.isArray(props.items
)) {
    const items = props.items
 ?? [];
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <Card key={idx} {...it
} />
        ))}
      </div>
    );
  }

  // 단일 카드 렌더링(신버전: Home에서 사용하는 방식)
  const { title, desc, href, icon } = props as Item;
  return <Card title={title} desc={desc} href={href} icon={icon} />;
}