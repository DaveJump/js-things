const Redis = require('ioredis')
const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  family: 4,
  db: 0
})

async function getKeys() {
  const keys = await redis.keys('*')
  console.log(keys, '--keys--')
}

getKeys()