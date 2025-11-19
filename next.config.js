// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',        // 이 한 줄이 제일 중요
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;