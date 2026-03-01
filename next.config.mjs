/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/jobs/:path*",
        destination: "/vacatures/:path*",
        permanent: true, // 301 redirect
      },
      {
        source: "/jobs",
        destination: "/vacatures",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
