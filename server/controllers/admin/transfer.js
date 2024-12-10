import log from '../../libs/log.js'
import utils from '../utils.js'
import { getBalance, addTransfer, updateBalance } from '../../models/admin.js'
import { getWhoishe } from '../../models/login.js'

export default {
  async transfer(ctx) {
    ctx.state = {
      title: '转帐汇款 - bank',
    }

    await ctx.render('admin/transfer')
  },

  async setTransfer(ctx) {
    const result = { code: 200, data: {}, message: '转帐成功' }

    try {
      const { authorization } = ctx.request.header
      const uid = utils.GetUid(authorization)

      const { name, account, bank, money, phone, purpose } = ctx.request.body
      const pass = Boolean(name && account && bank && money)
      console.log(name, account, bank, money, phone, purpose)

      if (pass && uid.length > 0) {
        const [meInfo, meBalance, targetInfo, targetBalance] = await Promise.all([
          await getWhoishe({ email: uid }),
          await getBalance({ email: uid }),
          await getWhoishe({ email: account + '' }),
          await getBalance({ email: account + '' }),
        ])
        // console.log(meInfo, meBalance, targetInfo, targetBalance)

        if (meInfo && targetInfo && meBalance && meBalance.money > money) {
          await Promise.all([
            await addTransfer({
              email: uid,
              account: account + '',
              money: Number(money),
              card: meBalance.card,
              channel: '中国银联',
              purpose: '',
            }),
            await updateBalance({ email: uid, money: meBalance.money - Number(money) }),
            await updateBalance({ email: account + '', money: Number(targetBalance.money) + Number(money) }),
          ])
        } else {
          result.code = 400
          result.message = '转帐失败'
        }
      }
    } catch (err) {
      result.code = 400
      result.message = '转帐失败'

      log.error(err, { notice: 'transfer.ts -> setTransfer' })
    } finally {
      ctx.body = result
    }
  },
}
