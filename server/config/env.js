// environments
export const env = process.env.NODE_ENV
export const isDev = env === 'development'
export const isPro = env === 'production'

// zookeeper
export const useZookeeper = false
export const release = ['127.0.0.1:2181', '127.0.0.1:2181', '127.0.0.1:2181']
export const test = ['127.0.0.1:2181', '127.0.0.1:2181', '127.0.0.1:2181']

// email rule
export const emailRule = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

// password secret key
export const encryptKey = 'CuEBljGfLaQC6y5p28tGyd=='

// token secret key
export const secretKey = '9vak7FB2HcWL6V9E2afrHurb7HM368eYdevQcedo'

// default password
export const passwordKey = 'bank@123'
