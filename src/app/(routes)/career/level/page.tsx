"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LevelPage() {
  const r = useRouter();
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold">AI 진로상담 시작</h1>
      <p className="text-gray-600">
        현장 자동 감지 후 질서 있게 진행돼요. 다음으로 넘어가 상담사 아바타를 선택해 주세요.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => r.push("/career/consultant")}
          className="px-5 py-3 rounded bg-black text-white"
        >
          아바타 선택으로 →
        </button>
        <Link href="/" className="px-5 py-3 rounded border bg-white">메인</Link>
      </div>
    </main>
  );
}