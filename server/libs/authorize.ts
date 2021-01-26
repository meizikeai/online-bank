import { Context } from 'koa'
import jwt from 'jsonwebtoken'

import { secretKey } from '../config/env'

export default (ctx: Context) => {
  const { authorization } = ctx.request.header
  const decoded: any = jwt.verify(authorization, secretKey)

  return decoded
}
