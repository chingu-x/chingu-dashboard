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
    logging: {
        fetches: {
            fullUrl: true,
        },
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
    experimental: {
        optimizePackageImports: [] // put folders with barrel imports here
    }
};

module.exports = nextConfig;
