/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    outputStandalone: process.env.DOCKER_BUILD == 1 ? true : false,
  },
})

module.exports = nextConfig
