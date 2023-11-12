/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // allows react-beautiful-dnd to work in dev mode
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
    }
};

module.exports = nextConfig;
