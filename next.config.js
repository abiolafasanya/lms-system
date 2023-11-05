/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        pathname: 'https',
        hostname: '**',
      },
    ],
    domains: ['utfs.io'],
  },
};

module.exports = nextConfig;
