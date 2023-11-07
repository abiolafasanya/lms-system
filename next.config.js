/** @type {import('next').NextConfig} */
const nextConfig = {
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
