import crypto from 'crypto'

import logger from '../libs/logger'
import { encryptKey } from '../config/env'
import { mysqlClient } from '../libs/connect'

// 获取用户信息
async function getWhoishe({ email }: { email: string }) {
  const defaultMySQL = mysqlClient('default')
  const sql = `
    SELECT id, name, email, type, status, cipher, salt, password, createtime
    FROM users
    WHERE email = '${email}'
  `
  // console.log(sql)
  const [result] = await defaultMySQL.query(sql).catch((err: any) => {
    logger.error(err, { tips: 'login.ts -> getWhoishe' })
  })

  return result
}

// 判断密码是否一致
interface HandleAuthenticate {
  storageSalt: string
  storagePassword: string
  password: string
}
function handleAuthenticate({ storageSalt, storagePassword, password }: HandleAuthenticate) {
  let result = false

  const salts = Buffer.from(`${storageSalt}${encryptKey}`, 'base64')
  const hashedPassword = crypto.pbkdf2Sync(password, salts, 10000, 64, 'sha512').toString('base64')

  if (storagePassword === hashedPassword) {
    result = true
  }

  return result
}

export { getWhoishe, handleAuthenticate }
