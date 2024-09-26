/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Correctly defined single hostname
      },
      {
        protocol: "https",
        hostname: "static01.nyt.com", // Correctly defined another hostname
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
