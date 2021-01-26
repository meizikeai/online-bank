import jwt from 'jsonwebtoken'
import { Context } from 'koa'

import logger from '../libs/logger'
import { emailRule, secretKey } from '../config/env'
import { getWhoishe, handleAuthenticate } from '../models/login'
import { getEncryption } from '../models/admin'

export default class Login {
  public static async home(ctx: Context) {
    ctx.state = {
      title: '登录 - bank',
    }

    // 目前不开放注册
    // 半个密钥 及 密码生成方法
    const result = getEncryption({})
    console.log(result)

    await ctx.render('login')
  }

  // 默认帐号 admin@bank.com
  // 默认密码 bank@123
  public static async login(ctx: Context) {
    const result = {
      code: 401,
      data: { token: '', type: 0 },
      message: '登录失败，账号或密码错误!',
    }

    try {
      const { email, password } = ctx.request.body

      if (!email || !password || !emailRule.test(email)) {
        return false
      }

      const people = await getWhoishe({ email })
      // console.log(people)

      if (!(people && people.password)) {
        return false
      }

      if (people && people.status !== 1) {
        return false
      }

      const verify = handleAuthenticate({
        storageSalt: people.salt,
        storagePassword: people.password,
        password,
      })
      // console.log(verify)

      if (verify) {
        result.code = 200
        result.message = '登录成功'

        if (people.cipher === 1) {
          result.code = 302
        }

        result.data.type = people.type
        result.data.token = jwt.sign(
          {
            email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5,
          },
          secretKey
        )
      }
    } catch (err) {
      logger.error(err, { notice: 'login.ts -> login' })
    } finally {
      ctx.body = result
    }
  }
}
