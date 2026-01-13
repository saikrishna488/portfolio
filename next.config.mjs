/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://saikrishna.is-a.dev/:path*',
        permanent: true, // This sends a 308 Permanent Redirect for SEO
      },
    ]
  },
}

export default nextConfig;
