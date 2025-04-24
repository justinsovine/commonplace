import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        domains: ['localhost'], // Allows images to be accessed from localhost
    },
};

export default nextConfig;
