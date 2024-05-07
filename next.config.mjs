/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     ppr: true,
    // },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
        }, ],
    },
};

export default nextConfig;
