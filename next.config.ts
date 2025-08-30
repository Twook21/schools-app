import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'i.pinimg.com',
      'id.pinterest.com',
    ],
  },
};

export default nextConfig;
