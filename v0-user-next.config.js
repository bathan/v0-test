/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `http://localhost:${process.env.PORT || 3000}/:path*`
      }
    ]
  },
  env: {
    PORT: process.env.PORT
  }
}

module.exports = nextConfig
