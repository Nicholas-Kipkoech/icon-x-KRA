/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        port: "",
        pathname: "",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "",
      },
      {
        protocol: "https",
        hostname: "intraafrica.co.ke",
      },
    ],
  },
  env: {
    PROD_URL: process.env.NEXT_PROD_URL,
  },
};

module.exports = nextConfig;
