import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        APP_URL: process.env.APP_URL,
        APP_DOMAIN: process.env.APP_DOMAIN,
        SERVER_URL: process.env.SERVER_URL
    },
};

module.exports = {
    images: {
        remotePatterns: [new URL('https://image.fonwall.ru/avatars/noavatar.png')],
    },
}

export default nextConfig;
