const createMDX = require('@next/mdx')

const withMDX = createMDX({
  extension: /\.mdx$/,
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)
