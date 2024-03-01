/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["png.pngtree.com", "img.freepik.com", "intraafrica.co.ke"],
  },
  env: {
    PROD_URL: process.env.NEXT_PROD_URL,
  },
};

module.exports = nextConfig;
