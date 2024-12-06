import jwt from '../libs/jwt.js'
import secret from '../libs/secret.js'
import log from '../libs/log.js'
import { emailRule } from '../config/env.js'
import { getWhoishe, handleAuthenticate } from '../models/login.js'
// import { getEncryption } from '../models/admin.js'

export default {
  async home(ctx) {
    ctx.state = {
      title: '登录 - bank',
    }

    // 目前不开放注册
    // 半个密钥 及 密码生成方法
    // const result = getEncryption({})
    // console.log(result)

    await ctx.render('login')
  },

  // 默认帐号 admin@bank.com / test@bank.com
  // 默认密码 bank@123
  async login(ctx) {
    const result = {
      code: 401,
      data: { token: '', type: 0 },
      message: '登录失败，账号或密码错误!',
    }

    try {
      const body = ctx.request.body
      const email = String(body.email)
      const password = String(body.password)
      // console.log(email, password)

      if (!email || !password || !emailRule.test(email)) {
        return false
      }

      const people = await getWhoishe({ email: email })

      if (!(people && people.password)) {
        return false
      }

      if (people && people.status !== 1) {
        return false
      }

      const verify = handleAuthenticate({
        storageSalt: people.salt,
        storagePassword: people.password,
        password: password,
      })

      if (verify) {
        const j = jwt.HandleJsonWebTokenEncrypt(email, 3196800)
        const token = secret.HandleServiceEncrypt('bf5d', j)

        result.code = 200
        result.message = '登录成功'

        if (people.cipher === 1) {
          result.code = 302
        }

        result.data.type = people.type
        result.data.token = token
      }
    } catch (err) {
      log.error(err, { notice: 'login.ts -> login' })
    } finally {
      ctx.body = result
    }
  },
}
