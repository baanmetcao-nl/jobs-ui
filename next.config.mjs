/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jobs-dry-breeze-1010.fly.dev',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
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
