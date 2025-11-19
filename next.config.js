/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,  // ← 이 줄 추가!
  images: {
    unoptimized: true,  // Cloudflare 이미지 최적화 우회
  },
};

module.exports = nextConfig;
