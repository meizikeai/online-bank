import { Context } from 'koa'

import authorize from '../../libs/authorize'
import logger from '../../libs/logger'
import { getWhoishe } from '../../models/login'

export default class Admin {
  public static async type(ctx: Context) {
    const result = { code: 400, data: false, message: '普通用户' }

    try {
      const decoded = authorize(ctx)

      if (decoded && decoded.email) {
        const people = await getWhoishe({ email: decoded.email })

        if (people.type === 2) {
          result.code = 200
          result.data = true
          result.message = '管理员'
        }
      }
    } catch (err) {
      logger.error(err, { notice: 'share.ts -> type' })
    } finally {
      ctx.body = result
    }
  }
}
