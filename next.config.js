/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "png.pngtree.com"
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com"
            }, 
            {
                protocol:"https", 
                hostname: "gravatar.com"
            }
        ]
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
        ];
      },
};

module.exports = nextConfig;
