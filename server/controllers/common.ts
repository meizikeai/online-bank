import { Context } from 'koa'
import jwt from 'jsonwebtoken'

import { getWhoishe } from '../models/login'
import { secretKey } from '../config/env'

export default class GeneralController {
  public static async home(ctx: Context) {
    ctx.state = {
      title: '网上银行门户-首页',
    }

    await ctx.render('home')
  }

  public static async notfound(ctx: Context, next: () => void) {
    const accepts = ctx.accepts('html', 'json')

    if (accepts === 'html') {
      ctx.state = {
        status: '404',
        message: 'Page Not Found',
      }
      await ctx.render('error')
      await next()
    } else if (accepts === 'json') {
      ctx.body = {
        code: 404,
        message: 'Page Not Found',
      }
    } else {
      ctx.type = 'text'
      ctx.body = 'Page Not Found'
    }
  }

  public static async forbidden(ctx: Context, next: () => void) {
    const accepts = ctx.accepts('html', 'json')

    if (accepts === 'html') {
      ctx.state = {
        status: '403',
        message: 'Forbidden',
      }
      await ctx.render('error')
      await next()
    } else if (accepts === 'json') {
      ctx.body = {
        code: 403,
        message: 'Forbidden',
      }
    } else {
      ctx.type = 'text'
      ctx.body = 'Forbidden'
    }
  }

  public static async auth(ctx: Context, next: () => void) {
    const { authorization } = ctx.request.header
    const { method } = ctx.request

    if (method !== ' OPTIONS') {
      let verified = false

      if (authorization && authorization !== 'null') {
        try {
          // 请不要使用jwt.verify的第三个参数
          // 如果存在第三个参数（回调），则此方法为异步操作
          // https://www.npmjs.com/package/jsonwebtoken
          const decoded: any = jwt.verify(authorization, secretKey)
          const people = await getWhoishe({ email: decoded.email })
          // console.log(people)
          // console.log(decoded)

          if (people.status === 1) {
            verified = true
          }
        } catch (error) {
          console.error(error)
        }
      }

      if (!verified) {
        ctx.body = {
          code: 401,
          message: 'Invalid login credentials, please log in again.',
        }

        return false
      }

      await next()
    } else {
      await next()
    }
  }
}
