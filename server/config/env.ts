// 开发、测试、正式环境
const env = process.env.NODE_ENV
export const isLocal = env === 'local'
export const isDev = env === 'development'
export const isPro = env === 'production'

// 在本地使用线上数据库
const dev = process.env.NODE_DEV
export const isLocalPro = dev === 'localPro'

// 邮箱规则
export const emailRule = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

// 密码密钥
export const encryptKey = 'CuEVLjGfLaqC8y8p9OTGyg=='

// token密钥
export const secretKey = '4vPk7fB0HcwL5V9E2AErHuR19HM389eYqdvQcndM'

// 默认密码
export const passwordKey = 'blued@123'
