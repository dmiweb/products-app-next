import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'products-app-next';

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}/` : '',
};

export default nextConfig;
