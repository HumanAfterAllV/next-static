const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  // Otras configuraciones si las hay
}

module.exports = withBundleAnalyzer(config)