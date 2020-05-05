const path = require('path')
const webpack = require('webpack')

const isProd = !!(process.argv.slice(-1)[0].match(/production$/))

const entry = ['./js/index.js']

if (!isProd) {
  entry.unshift('webpack-hot-middleware/client?noInfo=true&reload=true&timeout=100')
}

const plugins = []

if (!isProd) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, '/static/'),
    filename: 'index.min.js'
  },
  mode: 'development',
  plugins
}
