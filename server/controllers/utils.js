import jwt from '../libs/jwt.js'
import secret from '../libs/secret.js'

export default {
  GetUid(data) {
    const authorization = data.split(' ')

    if (authorization.length !== 2) {
      return ''
    }

    const bearer = authorization[0]
    const tokenDecrypt = authorization[1]

    if (bearer.toLowerCase() != 'bearer' || tokenDecrypt.trim() == '') {
      return ''
    }

    const token = secret.HandleServiceDecrypt(tokenDecrypt)
    const claims = jwt.HandleJsonWebTokenDecrypt(token)

    return claims.uid
  },
}
