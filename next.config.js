/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  env: {
    PORT: 3001,
  },
};

module.exports = nextConfig;
