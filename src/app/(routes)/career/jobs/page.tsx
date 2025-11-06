// [제목] 직업테마 선택(관심분야 기반 · 30개 테마 링크)
// 경로: src/app/career/jobs/page.tsx

import Link from "next/link";

// 관심분야 10개 × 테마 3개 = 30개
const THEME_MAP: Record<string, { key: string; title: string }[]> = {
  "AI·데이터": [
    { key: "data-scientist", title: "데이터 사이언티스트" },
    { key: "ai-researcher", title: "인공지능 연구원" },
    { key: "bigdata-analyst", title: "빅데이터 분석가" },
  ],
  "소프트웨어·앱": [
    { key: "web-dev", title: "웹 개발자" },
    { key: "mobile-dev", title: "모바일 앱 개발자" },
    { key: "cloud-engineer", title: "클라우드 엔지니어" },
  ],
  "로봇·메카트로닉스": [
    { key: "robot-programmer", title: "로봇 프로그래머" },
    { key: "automation-engineer", title: "자동화 엔지니어" },
    { key: "drone-dev", title: "드론 개발자" },
  ],
  "사이버보안": [
    { key: "white-hat", title: "화이트해커" },
    { key: "security-consultant", title: "보안 컨설턴트" },
    { key: "network-security", title: "네트워크 보안 관리자" },
  ],
  "게임·메타버스": [
    { key: "game-planner", title: "게임 기획자" },
    { key: "metaverse-creator", title: "메타버스 크리에이터" },
    { key: "vr-ar-dev", title: "VR/AR 개발자" },
  ],
  "의료·바이오": [
    { key: "doctor", title: "의사" },
    { key: "pharmacist", title: "약사" },
    { key: "clinical-researcher", title: "임상 연구원" },
  ],
  "간호·재활": [
    { key: "nurse", title: "간호사" },
    { key: "physical-therapist", title: "물리치료사" },
    { key: "occupational-therapist", title: "작업치료사" },
  ],
  "환경·에너지": [
    { key: "env-consultant", title: "환경 컨설턴트" },
    { key: "renewable-engineer", title: "신재생에너지 엔지니어" },
    { key: "netzero-expert", title: "탄소중립 정책 전문가" },
  ],
  "우주·항공": [
    { key: "pilot", title: "항공기 조종사" },
    { key: "satellite-dev", title: "위성 개발자" },
    { key: "space-scientist", title: "우주 과학자" },
  ],
  "자동차·모빌리티": [
    { key: "auto-design", title: "자동차 설계 엔지니어" },
    { key: "autonomous-system", title: "자율주행 시스템 개발자" },
    { key: "mobility-planner", title: "모빌리티 서비스 기획자" },
  ],
};

// 안전 파서
function getStr(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}
function getInterests(v: string | string[] | undefined) {
  const s = getStr(v);
  return [...new
 Set(s.split(",").map((x) => x.trim()).filter(Boolean))];
}

export default function Page({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  // 쿼리 파라미터
  const counselor = getStr(searchParams.counselor
);
  const name = getStr(searchParams.name
);
  const school = getStr(searchParams.school);
  const grade = getStr(searchParams.grade
);
  const classroom = getStr(searchParams.classroom);
  const goal = getStr(searchParams.goal
);
  const interests = getInterests(searchParams.interests
); // ["AI·데이터", "게임·메타버스", ...]

  const noInterests = interests.length === 0;

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold">직업테마 선택</h1>
        <div className="flex gap-2">
          <Link href="/" className="px-3 py-2 rounded-md bg-gray-800 text-white">
            홈으로
          </Link>
          {/* 필요 시: 화상/자기소개 페이지로 돌아가기 */}
          <Link
            href="/career/intro"
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-700"
          >
            이전 단계
          </Link>
        </div>
      </div>

      {/* 요약 */}
      <p className="text-gray-600 mt-2">
        상담사: <b>{counselor || "미지정"}</b> · 학생:{" "}
        <b>{name || "이름 미입력"}</b> ·{" "}
        {school ? `${school} ${grade || "?"}학년 ${classroom || "?"}반` : "학교정보 미입력"}
      </p>
      {goal && <p className="text-gray-600">목표: {goal}</p>}

      {/* 선택한 관심분야 */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">선택한 관심분야</h2>
        <div className="flex flex-wrap gap-2">
          {noInterests ? (
            <span className="text-gray-500">없음 (이전 단계에서 선택해 주세요)</span>
          ) : (
            interests.map((v) => (
              <span
                key={v}
                className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                {v}
              </span>
            ))
          )}
        </div>
      </div>

      {/* 경고/안내 */}
      {noInterests && (
        <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
          관심분야가 전달되지 않았습니다.{" "}
          <Link href="/career/intro" className="underline font-semibold">
            화상+자기소개 단계
          </Link>
          에서 관심분야를 선택한 뒤 다시 오세요.
        </div>
      )}

      {/* 섹션: 각 관심분야별 추천 3개 */}
      {!noInterests && (
        <div className="mt-8 space-y-8">
          {interests.map((cat) => {
            const list = THEME_MAP[cat] || [];
            if (!list.length) return null;
            return (
              <section key={cat}>
                <h3 className="text-lg font-semibold mb-3">{cat} · 추천 체험(3)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {list.map((item) => (
                    <Link
                      key={item.key}
                      href={`/career/experience/${encodeURIComponent(item.key)}`}
                      className="block rounded-xl border p-4 hover:shadow-md transition bg-white"
                    >
                      <div className="text-base font-bold">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-1">클릭하여 체험으로 이동</div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}