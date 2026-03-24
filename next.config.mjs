/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true, // For now, during migration
  },
  eslint: {
    ignoreDuringBuilds: true, // For now, during migration
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vxpktmtyzogpvgvofkqu.supabase.co', // Assuming from previous Supabase projects or I'll verify
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/mot', destination: '/services/mot-preparation', permanent: true },
      { source: '/diagnostics', destination: '/services/engine-diagnostics', permanent: true },
      { source: '/air-conditioning', destination: '/services/air-conditioning', permanent: true },
      { source: '/brake-service', destination: '/services/brake-repairs', permanent: true },
      { source: '/clutch-replacement', destination: '/services/clutch-replacement', permanent: true },
      { source: '/dpf', destination: '/services/dpf-cleaning', permanent: true },
      { source: '/suspension-repairs', destination: '/services/suspension-repairs', permanent: true },
      { source: '/routine-servicing', destination: '/services/car-servicing', permanent: true },
      { source: '/timing-chains-belts', destination: '/services/cam-belt-replacement', permanent: true },
      { source: '/tyre-installation', destination: '/services/wheel-alignment', permanent: true },
    ]
  },
};

export default nextConfig;
