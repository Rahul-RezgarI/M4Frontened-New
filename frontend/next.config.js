// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "rezgari-bucket.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vps54436.inmotionhosting.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://rezgariserver.vercel.app/api/v1/",
    // NEXT_PUBLIC_API_URL: "http://localhost:5000/api/v1/",
  },
};

module.exports = nextConfig;
