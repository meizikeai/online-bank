export default {
  async welcome(ctx) {
    ctx.state = {
      title: '管理中心 - bank',
    }

    await ctx.render('admin/welcome')
  },
}
