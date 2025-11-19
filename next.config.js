/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,        // 슬래시 자동 추가
  images: {
    unoptimized: true         // Cloudflare 이미지 오류 방지
  },
};

module.exports = nextConfig;