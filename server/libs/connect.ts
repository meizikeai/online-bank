import createMySQLClient from 'ai-mysql-client'
import createRedisClient from 'ai-redis-client'
import releaseMySQL from '../config/release-mysql'
import releaseRedis from '../config/release-redis'
import testMySQL from '../config/test-mysql'
import testRedis from '../config/test-redis'
import { isPro, isLocalPro } from '../config/env'

const mysqlClient = (key: string) => {
  let datum = testMySQL

  if (isPro || isLocalPro) {
    datum = releaseMySQL
  }

  if (!datum[key]) {
    throw new Error(`Can not find the key: [${key}]`)
  }

  return createMySQLClient(datum[key], key)()
}

const redisClient = (key: string) => {
  let datum = testRedis

  if (isPro || isLocalPro) {
    datum = releaseRedis
  }

  if (!datum[key]) {
    throw new Error(`Can not find the key: [${key}]`)
  }

  return createRedisClient(datum[key], key)()
}

export { mysqlClient, redisClient }
