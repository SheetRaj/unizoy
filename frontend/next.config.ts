import type { NextConfig } from "next";

declare const process: { env: Record<string, string | undefined> };

const nextConfig: NextConfig = {
  async rewrites() {
    // In production (Vercel), /api is same-origin (serverless in this project). Only proxy in dev.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      return [
        {
          source: "/api/:path*",
          destination: `${apiUrl}/api/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
