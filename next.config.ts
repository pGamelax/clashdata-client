import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-assets.clashofclans.com",
        port: "",
        pathname: "/**", // Permite todas as imagens deste host
      },
    ],
  },
};

export default nextConfig;
