import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "silex2.s3.eu-west-3.amazonaws.com",
            "placehold.co", // Ajout du domaine pour les images fictives
        ],
    },
};

export default nextConfig;
module.exports = nextConfig;