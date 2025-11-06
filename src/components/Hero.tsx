'use client';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-40" aria-hidden />

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          AI 상담사와 함께<br />
          <span className="text-yellow-300">나에게 맞는 미래 직업</span>을 탐험하세요
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          상담 → 분석 → 체험 → 결과보고서까지 한 번에.<br />
          현장은 자동 감지, 공유는 QR/카카오톡으로 편리하게!
        </p>

        {/* 버튼들 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/career/start"
            className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
          >
            🚀 지금 시작하기
          </a>
          <a
            href="/career/interest"
            className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-transform transform hover:scale-105"
          >
            🎯 관심분야 보기
          </a>
          <a
            href="/career/result"
            className="bg-white text-purple-700 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            📑 결과 샘플 보기
          </a>
        </div>
      </div>
    </section>
  );
}
