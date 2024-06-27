/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
        console.log(`Running in ${process.env.NODE_ENV} mode`)
        return config;
    },
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
};

module.exports = nextConfig;
