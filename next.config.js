// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',           // 이게 핵심!
  trailingSlash: true,            // 슬래시 없이도 접속되게
  images: {
    unoptimized: true             // Cloudflare 이미지 오류 방지
  },
  experimental: {
    // 이거 추가하면 정적 파일 100% 생성됩니다
    outputFileTracingRoot: undefined,
  },
};

module.exports = nextConfig;