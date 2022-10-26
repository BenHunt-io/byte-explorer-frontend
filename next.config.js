/** @type {import('next').NextConfig} */


const securityHeaders = [
  {
    key: "upgrade-insecure-requests",
    value: "0" // false
  },
  {
    key: "referrer-policy",
    value: "unsafe-url" // false
  }
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      }
    ]
  }
}

module.exports = nextConfig

