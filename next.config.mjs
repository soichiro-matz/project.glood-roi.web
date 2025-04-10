/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ✅ middleware を Edge Function として有効にするオプション（明示的に）
  experimental: {
    serverActions: false, // これは明示しなくてもOKだけど、念のため
  },
};

export default nextConfig;
