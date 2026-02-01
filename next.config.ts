import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" }, // Google
      { hostname: "avatars.githubusercontent.com" }, // GitHub
      { hostname: "utfs.io" },
      {
        protocol: "https",
        hostname: "jrgxq33rwp.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
