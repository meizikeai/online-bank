import log from '../../libs/log.js'
import tool from '../../libs/tool.js'
import utils from '../utils.js'
import { getBalance } from '../../models/admin.js'

export default {
  async balance(ctx) {
    ctx.state = {
      title: '余额查询 - bank',
    }

    await ctx.render('admin/balance')
  },

  async getBalance(ctx) {
    const result = { code: 400, data: false, message: '' }

    try {
      const { authorization } = ctx.request.header
      const uid = utils.GetUid(authorization)

      if (uid.length > 0) {
        const people = await getBalance({ email: uid })
        // console.log(people)

        if (people) {
          people.card = tool.ToPretty(people.card)
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
      log.error(err, { notice: 'balance.ts -> getBalance' })
    } finally {
      ctx.body = result
    }
  },
}
