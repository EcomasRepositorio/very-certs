/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true, // Habilita el modo estricto para encontrar problemas.
  swcMinify: true, // Usa el minificador SWC de Next.js para optimización.
  output: 'standalone', // Útil si despliegas en contenedores.

  // Configuración para imágenes externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backclassroom.verycerts.com', // Dominio de la imagen
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
