import { Context } from 'koa'

import authorize from '../../libs/authorize'
import logger from '../../libs/logger'
import { getBalance } from '../../models/admin'
import { toPretty } from '../../libs/to-string'

export default class AdminHome {
  public static async balance(ctx: Context) {
    ctx.state = {
      title: '余额查询 - bank',
    }

    await ctx.render('admin/balance')
  }

  public static async getBalance(ctx: Context) {
    const result = { code: 400, data: false, message: '' }

    try {
      const decoded = authorize(ctx)

      if (decoded && decoded.email) {
        const people = await getBalance({ email: decoded.email })
        console.log(people)

        if (people) {
          people.card = toPretty(people.card)
          people.money = parseFloat(people.money)
          people.earning = parseFloat(people.earning)
          people.financial = parseFloat(people.financial)
          people.gold = parseFloat(people.gold)
          people.available = parseFloat(people.available)
          people.overdraft = parseFloat(people.overdraft)
          people.repayment = parseFloat(people.repayment)

          result.code = 200
          result.data = people
        }
      }
    } catch (err) {
      logger.error(err, { notice: 'balance.ts -> getBalance' })
    } finally {
      ctx.body = result
    }
  }
}
