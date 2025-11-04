import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/products-app-next",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;
