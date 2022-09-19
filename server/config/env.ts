// 开发、测试、正式环境
const env = process.env.NODE_ENV
export const isLocal = env === 'local'
export const isDev = env === 'development'
export const isPro = env === 'production'

// 在本地使用线上数据库
const dev = process.env.NODE_DEV
export const isLocalPro = dev === 'localPro'

// zookeeper
export const useZookeeper = false
export const release = ['127.0.0.1:2181', '127.0.0.1:2181', '127.0.0.1:2181']
export const test = ['127.0.0.1:2181', '127.0.0.1:2181', '127.0.0.1:2181']

// 邮箱规则
export const emailRule = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

// 密码密钥
export const encryptKey = 'CuEBljGfLaQC6y5p28tGyd=='

// token密钥
export const secretKey = '9vak7FB2HcWL6V9E2afrHurb7HM368eYdevQcedo'

// 默认密码
export const passwordKey = 'bank@123'
