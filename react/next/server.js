const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const PORT = 3000
const session = require('koa-session')
const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')
const redisClient = new Redis()
const auth = require('./server/auth')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// 获取处理响应的实例
const handler = app.getRequestHandler()

// 等待 next 将 pages 里的页面编译完成再响应请求
app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // 加盐加密 cookie 的 keys
  server.keys = ['DaveJump haha']
  const SESSION_CONFIG = {
    key: 'ssid', // cookie 的 key
    // maxAge: 60 * 1000,
    // 没有 store 的情况下，ctx.session 以加密 cookie 的方式保存在客户端，因此需要保存敏感信息则需要提供 store
    // store 提供了3个钩子函数：get, set, destroy。如果配置了 maxAge，则过期后会调用 destroy 方法
    store: new RedisSessionStore(redisClient)
  }
  server.use(session(SESSION_CONFIG, server))

  // 处理 oAuth
  auth(server)

  // koa, next routes dispensing
  router.get('/A/:id', async (ctx) => {
    const id = ctx.params.id
    await handler(ctx.req, ctx.res, {
      pathname: `/A`,
      query: { id },
    })
    ctx.respond = false
  })
  router.get('/test/B/:id', async (ctx) => {
    const id = ctx.params.id
    await handler(ctx.req, ctx.res, {
      pathname: '/test/B',
      query: { id },
    })
    ctx.respond = false
  })
  router.get('/set/user', async (ctx, next) => {
    ctx.session.user = {
      name: 'dave',
      age: 23
    }
    ctx.body = 'session "user" set'
  })
  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'need login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    await handler(ctx.req, ctx.res)
    console.log(ctx.session, '---session---')
    ctx.respond = false
  })

  server.listen(PORT, () => {
    console.log(`koa server listening on port ${PORT}`)
  })
})
