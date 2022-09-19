import { Context } from 'koa'

import authorize from '../../libs/authorize'
import logger from '../../libs/logger'
import { getUserInfo, setUserInfo } from '../../models/admin'

export default class Admin {
  public static async user(ctx: Context) {
    ctx.state = {
      title: '个人资料 - bank',
    }

    await ctx.render('admin/user')
  }

  public static async getInfo(ctx: Context) {
    const result = { code: 400, data: false, message: '' }

    try {
      const decoded = authorize(ctx)
      const people = await getUserInfo({ email: decoded.email })

      if (people) {
        result.code = 200
        result.data = people
      }
    } catch (err) {
      logger.error(err, { notice: 'user.ts -> getInfo' })
    } finally {
      ctx.body = result
    }
  }

  public static async setInfo(ctx: Context) {
    const result = { code: 200, data: {}, message: '更新成功' }

    try {
      const body = ctx.request.body
      const decoded = authorize(ctx)

      const name = String(body.name)
      const national = String(body.national)
      const gender = String(body.gender)
      const idcard = String(body.idcard)
      const phone = String(body.phone)
      const address = String(body.address)
      const postcode = String(body.postcode)

      const pass = Boolean(name && national && gender && idcard && phone && address && postcode)

      if (pass && decoded && decoded.email) {
        await setUserInfo({
          email: decoded.email,
          name,
          national,
          gender,
          idcard,
          phone,
          address,
          postcode,
        })
      }
    } catch (err) {
      result.code = 400
      result.message = '更新失败'

      logger.error(err, { notice: 'user.ts -> setInfo' })
    } finally {
      ctx.body = result
    }
  }
}
