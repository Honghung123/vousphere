import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "export", // client-only SPA
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true,
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
