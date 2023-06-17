/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: '',
        pathname: '/api/portraits/**'
      },
    ],
  },
  transpilePackages: ['jotai-devtools'],
}

module.exports = nextConfig
