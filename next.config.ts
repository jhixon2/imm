/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"], // allow Next.js to optimize Sanity images
  },
  // any other existing options
};

export default nextConfig;