/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

  images: {
    remotePatterns: [
      // Dominio original
      {
        protocol: 'https',
        hostname: 'backclassroom.verycerts.com',
        pathname: '/**',
      },
      // Dominio nuevo
      {
        protocol: 'https',
        hostname: 'backclassroom.ecomas.pe',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
