/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
