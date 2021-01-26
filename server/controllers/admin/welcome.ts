import { Context } from 'koa'

export default class AdminHome {
  public static async welcome(ctx: Context) {
    ctx.state = {
      title: '管理中心 - bank',
    }

    await ctx.render('admin/welcome')
  }
}
