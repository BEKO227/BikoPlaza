import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ecommerce.routemisr.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
