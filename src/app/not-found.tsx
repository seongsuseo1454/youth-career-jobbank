import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-gray-600">메뉴에서 다시 선택해주세요.</p>
      <Link href="/" className="inline-block mt-6 px-4 py-2 rounded bg-black text-white">
        메인으로
      </Link>
    </main>
  );
}