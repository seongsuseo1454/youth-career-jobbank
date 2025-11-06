// [제목] 대기모드 배경(애니메이티드 그라데이션+글로우 파티클)
'use client';

export default function IdleBackground() {
  // ✔️ 한 줄짜리 SVG 노이즈 (data-URL)
  const noiseSvg =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0.3'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

  return (
    <div className="absolute inset-0 -z-10">
      {/* 그라데이션 레이어 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 700px at 20% 30%, rgba(16,185,129,.18), transparent),' + // emerald
            'radial-gradient(900px 600px at 80% 40%, rgba(59,130,246,.16), transparent),' +  // blue
            'radial-gradient(1000px 800px at 50% 90%, rgba(99,102,241,.16), transparent)',   // indigo
        }}
      />

      {/* 느린 흐름(부드러운 컬러 웨이브) */}
      <div className="absolute inset-0 opacity-50 mix-blend-screen">
        <div className="absolute -inset-[20%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.08)_90deg,transparent_180deg,rgba(255,255,255,0.06)_270deg,transparent_360deg)]" />
      </div>

      {/* 글로우 파티클 */}
      {Array.from({ length: 18 }).map((_, i) => {
        const size = 8 + ((i * 7) % 18);
        const left = (i * 53) % 100;
        const top = (i * 29) % 100;
        const delay = (i * 0.6) % 5;
        const dur = 8 + (i % 6);
        return (
          <div
            key={i}
            className="absolute rounded-full blur-[6px] animate-float"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background:
                'radial-gradient(circle, rgba(255,255,255,.7), rgba(255,255,255,0))',
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              opacity: 0.6,
            }}
          />
        );
      })}

      {/* 얇은 라인 그리드(은은) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 노이즈 필름 */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      {/* 키프레임 */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(6px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}