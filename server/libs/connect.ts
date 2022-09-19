import getMysqlClient from './mysql'
import getRedisClient from './redis'
import getserverClient from './server'

const mysqlClient = (key: string) => {
  return getMysqlClient(key)
}

const redisClient = (key: string) => {
  return getRedisClient(key)
}

const serverClient = (key: string) => {
  return getserverClient(key)
}

export { mysqlClient, redisClient, serverClient }
