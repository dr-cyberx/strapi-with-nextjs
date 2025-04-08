import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"],
    // If you have other domains already configured, add localhost to the array
    // domains: ['example.com', 'another-domain.com', 'localhost'],
  },
};

export default nextConfig;
