import logger from '../libs/logger'
import { mysqlClient, redisClient } from '../libs/connect'

async function getAnchor() {
  const defaultMySQL = mysqlClient('default')

  const selectSQL = `SELECT * FROM users limit 0 ,10`
  const result = await defaultMySQL.query(selectSQL).catch((err: any) => {
    logger.error(err, { tips: 'common.ts -> getAnchor' })
  })

  logger.info({ notice: result })

  return result
}

async function getUser() {
  const defaultRedis = redisClient('default')

  const result = await defaultRedis.hgetall('u:113').catch((err: any) => {
    logger.error(err, { tips: 'common.ts -> getUser' })
  })

  logger.info({ notice: result })

  return result
}

export { getAnchor, getUser }
