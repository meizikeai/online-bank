import log from '../../libs/log.js'
import utils from '../utils.js'
import { getEncryption, updatePassWord } from '../../models/admin.js'
import { getWhoishe, handleAuthenticate } from '../../models/login.js'

export default {
  async password(ctx) {
    ctx.state = {
      title: '修改密码 - bank',
    }

    await ctx.render('admin/password')
  },

  async change(ctx) {
    const result = { code: 400, message: '密码修改失败！' }

    try {
      const body = ctx.request.body
      const oldpassword = String(body.oldpassword)
      const newpassword = String(body.newpassword)
      // console.log(authorization, oldpassword, newpassword)

      if (oldpassword === newpassword) {
        return false
      }

      const { authorization } = ctx.request.header
      const uid = utils.GetUid(authorization)

      if (uid.length > 0) {
        const people = await getWhoishe({ email: uid })
        const verify = handleAuthenticate({
          storageSalt: people.salt,
          storagePassword: people.password,
          password: oldpassword,
        })
        // console.log(people, verify)

        if (verify) {
          const { password } = getEncryption({ salt: people.salt, password: newpassword })

          await updatePassWord({ email: uid, password })

          result.code = 200
          result.message = '密码修改成功，请从新登录！'
        }
      }
    } catch (err) {
      log.error(err, { notice: 'password.ts -> change' })
    } finally {
      ctx.body = result
    }
  },
}
