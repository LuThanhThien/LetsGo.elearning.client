/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_VERSION: process.env.APP_VERSION,
    },
    // compiler: {
    //     removeConsole: {
    //         exclude: ['error'],
    //     },
    // },
};

export default nextConfig;
