/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fra.cloud.appwrite.io", "localhost"],
  },
  experimental: {
    optimizeCss: false, // disable Lightning CSS
    useLightningcss: false,
  },
  eslint: {
    // This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
