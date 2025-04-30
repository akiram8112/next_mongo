import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains:['picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Allow images from this domain
      },
      {
        protocol: 'https',
        hostname: 'www.w3schools.com', // Allow images from this domain
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allow images from this domain
      },
    ],
  },
};

export default nextConfig;
