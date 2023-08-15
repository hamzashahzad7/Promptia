/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
  
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  module.exports = {
    // Other Next.js configurations
    env: {
      NEXTAUTH_DEBUG: "true",
    },
  };
  module.exports = nextConfig