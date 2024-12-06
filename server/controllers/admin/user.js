import log from '../../libs/log.js'
import utils from '../utils.js'
import { getUserInfo, setUserInfo } from '../../models/admin.js'

export default {
  async user(ctx) {
    ctx.state = {
      title: '个人资料 - bank',
    }

    await ctx.render('admin/user')
  },

  async getInfo(ctx) {
    const result = { code: 400, data: false, message: '' }

    try {
      const { authorization } = ctx.request.header
      const uid = utils.GetUid(authorization)
      const people = await getUserInfo({ email: uid })

      if (people) {
        result.code = 200
        result.data = people
      }
    } catch (err) {
      log.error(err, { notice: 'user.ts -> getInfo' })
    } finally {
      ctx.body = result
    }
  },

  async setInfo(ctx) {
    const result = { code: 200, data: {}, message: '更新成功' }

    try {
      const { authorization } = ctx.request.header
      const uid = utils.GetUid(authorization)

      const body = ctx.request.body
      const name = String(body.name)
      const national = String(body.national)
      const gender = String(body.gender)
      const idcard = String(body.idcard)
      const phone = String(body.phone)
      const address = String(body.address)
      const postcode = String(body.postcode)

      const pass = Boolean(name && national && gender && idcard && phone && address && postcode)

      if (pass && uid.length > 0) {
        await setUserInfo({
          email: uid,
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

      log.error(err, { notice: 'user.ts -> setInfo' })
    } finally {
      ctx.body = result
    }
  },
}
