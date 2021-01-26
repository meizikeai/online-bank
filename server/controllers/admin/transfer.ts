import { Context } from 'koa'

import authorize from '../../libs/authorize'
import logger from '../../libs/logger'
import { getBalance, addTransfer, updateBalance } from '../../models/admin'
import { getWhoishe } from '../../models/login'

export default class AdminTransfer {
  public static async transfer(ctx: Context) {
    ctx.state = {
      title: '转帐汇款 - bank',
    }

    await ctx.render('admin/transfer')
  }

  public static async setTransfer(ctx: Context) {
    const result = { code: 200, data: {}, message: '转帐成功' }

    try {
      const { name, account, bank, money, phone, purpose } = ctx.request.body
      const decoded = authorize(ctx)
      const pass = Boolean(name && account && bank && money)

      console.log(name, account, bank, money, phone, purpose)

      if (pass && decoded && decoded.email) {
        const [meInfo, meBalance, targetInfo, targetBalance] = await Promise.all([
          await getWhoishe({ email: decoded.email }),
          await getBalance({ email: decoded.email }),
          await getWhoishe({ email: account }),
          await getBalance({ email: account }),
        ])
        // console.log(meInfo, meBalance, targetInfo, targetBalance)

        if (meInfo && targetInfo && meBalance && meBalance.money > money) {
          await Promise.all([
            await addTransfer({
              email: decoded.email,
              account,
              money,
              card: meBalance.card,
              channel: '中国银联',
              purpose: '',
            }),
            await updateBalance({ email: decoded.email, money: meBalance.money - money }),
            await updateBalance({ email: account, money: Number(targetBalance.money) + Number(money) }),
          ])
        } else {
          result.code = 400
          result.message = '转帐失败'
        }
      }
    } catch (err) {
      result.code = 400
      result.message = '转帐失败'

      logger.error(err, { notice: 'transfer.ts -> setTransfer' })
    } finally {
      ctx.body = result
    }
  }
}
