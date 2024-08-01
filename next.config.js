const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  // Otras configuraciones si las hay
}

module.exports = withBundleAnalyzer(config)