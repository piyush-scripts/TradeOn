import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental : {
    nodeMiddleware : true,
  },
  images: {
    domains :['i.ibb.co']
  }
};

export default nextConfig;
