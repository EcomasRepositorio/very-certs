/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true, // Habilita el modo estricto para encontrar problemas.
  swcMinify: true, // Asegura que se use el nuevo minificador de Next.js.
  output: 'standalone', // Opcional, útil si estás usando contenedores.
};

module.exports = nextConfig;
