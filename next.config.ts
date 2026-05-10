import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    poweredByHeader: false,
    compress: true,
    output: 'standalone',
};

export default nextConfig;