import type { NextConfig } from "next";
// @ts-ignore
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.ibb.co", "images.unsplash.com"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) config.plugins = [...config.plugins, new PrismaPlugin()];
    return config;
  },
  transpilePackages:['recharts'],
};

export default nextConfig;
