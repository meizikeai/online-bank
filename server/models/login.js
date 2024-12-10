import crypto from 'crypto'
import log from '../libs/log.js'
import { encryptKey } from '../config/env.js'
import getMysqlClient from '../libs/mysql.js'

// 获取用户信息
async function getWhoishe({ email }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
    SELECT id, name, email, type, status, cipher, salt, password, createtime
    FROM users
    WHERE email = '${email}'
  `
  // console.log(sql)
  const [[result]] = await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'login.ts -> getWhoishe' })
  })
  // console.log(result)

  return result
}

// 判断密码是否一致
function handleAuthenticate({ storageSalt, storagePassword, password }) {
  let result = false

  const salts = Buffer.from(`${storageSalt}${encryptKey}`, 'base64')
  const hashedPassword = crypto.pbkdf2Sync(password, salts, 10000, 64, 'sha512').toString('base64')

  if (storagePassword === hashedPassword) {
    result = true
  }

  return result
}

export { getWhoishe, handleAuthenticate }
