import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Ignoring ESLINT warnings while BUILD */
  eslint: {
    ignoreDuringBuilds: true
  },

  // Ignoring TypeScript Errors while build
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;