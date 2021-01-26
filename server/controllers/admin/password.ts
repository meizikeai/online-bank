import { Context } from 'koa'

import authorize from '../../libs/authorize'
import logger from '../../libs/logger'
import { getEncryption, updatePassWord } from '../../models/admin'
import { getWhoishe, handleAuthenticate } from '../../models/login'

export default class Admin {
  public static async password(ctx: Context) {
    ctx.state = {
      title: '修改密码 - bank',
    }

    await ctx.render('admin/password')
  }

  public static async change(ctx: Context) {
    const result = { code: 400, message: '密码修改失败！' }

    try {
      const { oldpassword, newpassword } = ctx.request.body
      // console.log(authorization, oldpassword, newpassword)

      if (oldpassword === newpassword) {
        return false
      }

      const decoded = authorize(ctx)

      if (decoded && decoded.email) {
        const people = await getWhoishe({ email: decoded.email })
        const verify = handleAuthenticate({
          storageSalt: people.salt,
          storagePassword: people.password,
          password: oldpassword,
        })
        // console.log(people, verify)

        if (verify) {
          const { password } = getEncryption({ salt: people.salt, password: newpassword })

          await updatePassWord({ email: decoded.email, password })

          result.code = 200
          result.message = '密码修改成功，请从新登录！'
        }
      }
    } catch (err) {
      logger.error(err, { notice: 'password.ts -> change' })
    } finally {
      ctx.body = result
    }
  }
}
