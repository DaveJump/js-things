const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9010,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts)$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader',
          'ts-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlPlugin({
      template: './src/index.html'
    })
  ]
}
