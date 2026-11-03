import type { NextConfig } from 'next'

// Old URLs from the previous site structure -> new equivalents (301) so
// existing search rankings and inbound links are preserved.
const legacyRedirects: [string, string][] = [
  ['/ventures', '/about'],
  ['/ventures/technology', '/services'],
  ['/ventures/technology/services/software-web-platforms', '/services/custom-software-development'],
  ['/ventures/technology/services/application-development', '/services/mobile-app-development'],
  ['/ventures/technology/services/cloud-system-architecture', '/services/cloud-devops'],
  ['/ventures/technology/services/iot-smart-solutions', '/iot-and-software-solutions'],
  ['/ventures/technology/services/digital-transformation', '/services/it-consulting'],
  ['/services/digital-solutions/web-platform-development', '/services/web-development'],
  ['/services/digital-solutions/application-development', '/services/mobile-app-development'],
  ['/services/digital-solutions/cloud-infrastructure', '/services/cloud-devops'],
  ['/services/digital-solutions/digital-transformation', '/services/it-consulting'],
  ['/services/integration/erp-implementation', '/work/erp-implementation'],
  ['/services/integration/hospital-management-system', '/work/hospital-management-system'],
  ['/services/integration/enterprise-system-integration', '/work/enterprise-integration-hub'],
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Strict mode for catching subtle bugs
  reactStrictMode: true,
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
}

export default nextConfig
