// next.config.ts
import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "3000-firebase-my-nextjs-app-1765356299225.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev"],
    },
  },
};


export default nextConfig;