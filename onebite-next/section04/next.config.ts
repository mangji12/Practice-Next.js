// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore: Next.js 15의 특정 패치 버전에서 타입 미지원 대응
    allowedDevOrigins: [
      "3000-firebase-my-nextjs-app-1765356299225.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev"
    ]
  } as any, // 타입을 강제로 지정해서 실행 시점에 옵션이 들어가게 함
  logging : {
    fetches : {
      fullUrl: true,
    }
  }
};

export default nextConfig;