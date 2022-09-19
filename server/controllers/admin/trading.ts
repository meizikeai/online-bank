import moment from 'moment'
import { Context } from 'koa'

import authorize from '../../libs/authorize'
import logger from '../../libs/logger'
import { geTransfer } from '../../models/admin'
import { toPretty } from '../../libs/to-string'

export default class AdminHome {
  public static async trading(ctx: Context) {
    ctx.state = {
      title: '交易明细 - bank',
    }

    await ctx.render('admin/trading')
  }

  public static async getTrading(ctx: Context) {
    const result = { code: 400, data: false, message: '' }

    try {
      const decoded = authorize(ctx)

      if (decoded && decoded.email) {
        let data = await geTransfer({ email: decoded.email })
        // console.log(data)

        if (data && data.length > 0) {
          data = data.map((item: any, index: number) => {
            item.id = index + 1
            item.datetime = moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')
            item.card = toPretty(item.card)
            item.money = `¥${item.money.toFixed(2)}`

            return item
          })
          // console.log(data)

          result.code = 200
          result.data = data
        }
      }
    } catch (err) {
      logger.error(err, { notice: 'trading.ts -> getTrading' })
    } finally {
      ctx.body = result
    }
  }
}
