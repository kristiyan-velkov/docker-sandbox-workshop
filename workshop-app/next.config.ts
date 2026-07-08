import type { NextConfig } from "next";

const platformBase =
  process.env.NEXT_PUBLIC_PLATFORM_URL?.replace(/\/$/, "") ??
  "https://nextjs-26f1-3000.prg1.zerops.app";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/learn", destination: `${platformBase}/learn`, permanent: false },
      { source: "/learn/:path*", destination: `${platformBase}/learn/:path*`, permanent: false },
      { source: "/yolo", destination: `${platformBase}/learn/yolo`, permanent: false },
      { source: "/security", destination: `${platformBase}/learn/security`, permanent: false },
    ];
  },
};

export default nextConfig;
