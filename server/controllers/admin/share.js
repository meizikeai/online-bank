import log from '../../libs/log.js'
import utils from '../utils.js'
import { getWhoishe } from '../../models/login.js'

export default {
  async type(ctx) {
    const result = { code: 400, data: false, message: '普通用户' }

    try {
      const { authorization } = ctx.request.header
      const uid = utils.GetUid(authorization)

      if (uid.length > 0) {
        const people = await getWhoishe({ email: uid })

        if (people.type === 2) {
          result.code = 200
          result.data = true
          result.message = '管理员'
        }
      }
    } catch (err) {
      log.error(err, { notice: 'share.ts -> type' })
    } finally {
      ctx.body = result
    }
  },
}
