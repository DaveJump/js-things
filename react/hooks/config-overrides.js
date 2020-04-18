const {
  override,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')
const resolvePath = src => path.resolve(__dirname, src)

module.exports = override(
  addWebpackAlias({
    '@': resolvePath('src'),
    'components': resolvePath('src/components'),
    'styles': resolvePath('src/assets/styles')
  })
)