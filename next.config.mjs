/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      // Old GoDaddy pages → new Next.js equivalents
      { source: "/m/login", destination: "/membership/members-only", permanent: true },
      { source: "/ols/products", destination: "/membership/why-join", permanent: true },
      { source: "/q-%26-a-delivered", destination: "/faq", permanent: true },
      { source: "/ride-leader", destination: "/rides/levels", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/photos", destination: "/rides/photos", permanent: true },
      { source: "/waiver-of-liability", destination: "/more/waiver", permanent: true },
      { source: "/code-of-conduct", destination: "/more/code-of-conduct", permanent: true },
      { source: "/ms-150-team", destination: "/rides/ms150", permanent: true },
      { source: "/ride-level", destination: "/rides/levels", permanent: true },
      { source: "/helpful-videos", destination: "/", permanent: true },
      { source: "/us", destination: "/about", permanent: true },
    ];
  },
};
export default nextConfig;
