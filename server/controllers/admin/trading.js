import dayjs from 'dayjs'
import log from '../../libs/log.js'
import utils from '../utils.js'
import { geTransfer } from '../../models/admin.js'
import tool from '../../libs/tool.js'

export default {
  async trading(ctx) {
    ctx.state = {
      title: '交易明细 - bank',
    }

    await ctx.render('admin/trading')
  },

  async getTrading(ctx) {
    const result = { code: 400, data: false, message: '' }

    try {
      const { authorization } = ctx.request.header
      const uid = utils.GetUid(authorization)

      if (uid.length > 0) {
        let data = await geTransfer({ email: uid })
        // console.log(data)

        if (data && data.length > 0) {
          data = data.map((item, index) => {
            item.id = index + 1
            item.datetime = dayjs(item.datetime).format('YYYY-MM-DD HH:mm:ss')
            item.card = tool.ToPretty(item.card)
            item.money = `¥${Number(item.money).toFixed(2)}`

            return item
          })
          // console.log(data)

          result.code = 200
          result.data = data
        }
      }
    } catch (err) {
      log.error(err, { notice: 'trading.ts -> getTrading' })
    } finally {
      ctx.body = result
    }
  },
}
