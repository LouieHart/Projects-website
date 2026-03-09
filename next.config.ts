import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Projects-website',
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
