import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dateks.lv",
      },
      {
        protocol: "https",
        hostname: "laptopisland.lk",
      },
      {
        protocol: "https",
        hostname: "www.laptopmag.com",
      },
    ],
  },
};

export default nextConfig;
