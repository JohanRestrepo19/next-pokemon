/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [{ source: '/', destination: '/pokemon', permanent: true }]
  }
}

module.exports = nextConfig
