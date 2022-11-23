/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.pexels.com',
      'img.freepik.com',
      'img-s-msn-com.akamaized.net',
    ],
  },
};

module.exports = nextConfig;
