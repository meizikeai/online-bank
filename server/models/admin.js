import crypto from 'crypto'
import log from '../libs/log.js'
import getMysqlClient from '../libs/mysql.js'
import { encryptKey, passwordKey } from '../config/env.js'

// 初始化密钥/密码 - 数据库
function getEncryption({ salt = '', password = '' }) {
  const random = salt || crypto.randomBytes(16).toString('base64')
  const salts = Buffer.from(`${random}${encryptKey}`, 'base64')
  const hashedPassword = crypto.pbkdf2Sync(password || passwordKey, salts, 10000, 64, 'sha512').toString('base64')

  return {
    salt: random,
    password: hashedPassword,
  }
}

// 更新用户密码
async function updatePassWord({ email, password }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
    UPDATE users 
    SET password = '${password}', cipher = 0
    WHERE email = '${email}'
  `
  // console.log(sql)
  await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'admin.ts -> updatePassWord' })
  })
}

// 获取用户信息
async function getUserInfo({ email }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
    SELECT id, name, national, gender, idcard, phone, address, postcode
    FROM userinfo
    WHERE email = '${email}'
  `

  // console.log(sql)
  const [[result]] = await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'admin.ts -> getUserInfo' })
  })

  return result
}

// 更新用户信息
async function setUserInfo({ email, name, national, gender, idcard, phone, address, postcode }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
    UPDATE userinfo 
    SET name = '${name}', national = '${national}', gender = '${gender}', idcard = '${idcard}', phone = '${phone}', address = '${address}', postcode = '${postcode}'
    WHERE email = '${email}'
  `
  // console.log(sql)
  await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'admin.ts -> setUserInfo' })
  })
}

// 获取帐户总览信息
async function getBalance({ email }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
    SELECT id, card, money, earning, financial, gold, available, overdraft, repayment
    FROM balance
    WHERE email = '${email}'
  `

  // console.log(sql)
  const [[result]] = await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'admin.ts -> getBalance' })
  })

  return result
}

// 转帐-更新余额
async function updateBalance({ email, money }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
    UPDATE balance 
    SET money = '${money}'
    WHERE email = '${email}'
  `
  // console.log(sql)
  await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'admin.ts -> updateBalance' })
  })
}

// 转帐-交易记录
async function addTransfer({ email, account, money, card, channel, purpose }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
    INSERT INTO trading 
      (id, email, uses, money, card, channel, type,  note)
    VALUES
      (null, '${email}', '${account}', ${money}, '${card}', '${channel}', '${purpose || '转帐'}', '/')
    `
  // console.log(sql)
  await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'admin.ts -> addTransfer' })
  })
}

// 获取交易记录
async function geTransfer({ email }) {
  const defaultMySQL = getMysqlClient('default')
  const sql = `
      SELECT id, uses, money, card, channel, type, note, datetime
      FROM trading
      WHERE email = '${email}'
      ORDER BY datetime DESC
    `
  // console.log(sql)
  const [result] = await defaultMySQL.query(sql).catch((err) => {
    log.error(err, { tips: 'admin.ts -> geTransfer' })
  })

  return result
}

export { setUserInfo, updatePassWord, addTransfer, getBalance, geTransfer, getEncryption, getUserInfo, updateBalance }
