function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  // 获取 redis 中存储的 session 数据
  async get(sid) {
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch(e) {
      console.error(e)
    }
  }

  // 存储 session 数据到 redis
  async set(sid, sess, ttl) {
    const id = getRedisSessionId(sid)
    if (typeof ttl === 'number') {
      // 传入 redis 的过期时间单位为秒，koa-session 的过期时间为毫秒，需转换
      ttl = Math.ceil(ttl / 1000)
    }
    try {
      const sessionStr = JSON.stringify(sess)
      if (ttl) {
        await this.client.setex(id, ttl, sessionStr)
      } else {
        await this.client.set(id, sessionStr)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // 销毁 redis 中的 session
  async destroy(sid) {
    const id = getRedisSessionId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore