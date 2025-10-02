/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fra.cloud.appwrite.io", "localhost"],
  },
  experimental: {
    optimizeCss: false, // disable Lightning CSS
  },
};

export default nextConfig;
