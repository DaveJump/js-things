const withCss = require('@zeit/next-css')
const CONFIG = require('./config')

const config = {
  // 编译后文件输出目录
  distDir: '.next',
  // 为每个路由（文件）生成 Etag
  generateEtags: true,
  // 页面内容缓存配置
  onDemandEntries: {
    // 内容在内存中缓存的时长（ms）
    maxInactiveAge: 25 * 1000,
    // 同时缓存页面数量
    pagesBufferLength: 2
  },
  // 在 pages 目录下会被解析成页面的文件后缀
  pageExtensions: ['jsx', 'js'],
  // 配置 buildId
  generateBuildId: async () => {
    const buildId = process.env.YOUR_BUILD_ID
    if (buildId) {
      return buildId
    }
    // 返回 null 使用默认的 unique id
    return null
  },
  // 手动修改 webpack 配置
  webpack(config, options) {
    return config
  },
  // 修改 webpackDevMiddleware 配置
  webpackDevMiddleware(config) {
    return config
  },
  // 环境变量（注入到每个页面），通过 process.env.xxx 获取
  env: {
    customValue: 'value'
  },
  // 服务端运行时配置（通过 next/getConfig 获取）
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET
  },
  // 服务端和客户端运行时配置（通过 next/getConfig 获取）
  publicRuntimeConfig: {
    staticFolder: '/static'
  }
}

if (typeof require !== 'undefined') {
  // 改写 node 默认的导入 css 模块的方法，避免与 next-css 插件冲突
  require.extensions['.css'] = file => {}
}

// module.exports = withCss(config)

const { url, scope, client_id } = CONFIG.githubOAuth

module.exports = withCss({
  publicRuntimeConfig: {
    OAUTH_URL: `${url}?client_id=${client_id}&scope=${scope}`
  }
})