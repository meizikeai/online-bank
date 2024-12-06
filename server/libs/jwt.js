import jwt from 'jsonwebtoken'
import tool from './tool.js'
import { env } from '../config/env.js'

// generate jwt key
// openssl genrsa -out private.key 2048
// openssl rsa -in private.key -pubout -out public.key
const jwtRsaKey = {
  development: {
    private:
      'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRFl6cmpNaWdJWkhQN0EKZFowZ0lUeXd6c2QzZ09mdEVXODZaRlVtMG9tN3BVZ2FqK3BvS21Od29NZUtPQWt0Y3B3MHhNRzNQWUEyY05pTgpZNDN1KzhZYThqZnRaUjlsWXQzSFJjY1prOVpzMGFFellNdlk2UXdmN0R4S29JL1RUY25ZRk84ajRZeHlpckl0Cmc4Q1Z2VUZncDdDZ1RrVjRZTjJPMXRlZmdndDhBSmZTdld1bEVISklCRGRnL3N3dHN3UnNYdk5DVnFRcDVjV3kKVkJzL0U4VzBPaHozUGJwbS8zZS8xd2pXanAwcjhYTDNhSmtjSm8yajg5bi8zRmRTZnRIMzUrWE1RRW01VDB5agpNUlVJZnRxeHVFZVN1aHdjdGlyUitadzZvZDBtY0c2aGRtVC9kNkErOTFraElFWXE5R0kwQzZYNUhwQzRrdlZwCnB2WnBzTW1QQWdNQkFBRUNnZ0VBU1FvWGdyekpxU2sxLzZOLzNDZW1XUkJJYlkrTlVyWHBhVndNdmNmMjQ3THkKWUJSMHpVUGVmVDZGQ3FFSElucjJlZWFCTmxpdlBXZjE1R2dTRkYxWXA1SkxXaHdUb0NYVy9qK1pMQm84aGl0MwpLYVpsOWp6SXUyWnNCMTRoSmZnU1ZFdjFKbnJoUkdOS1ZJQUszTWRGNDZpS25lN1FnNVhxZmlrTnVpeG03dzVyClQrQjM2OVQwanFyclMzVkl2emVWdnRGT2N3d3FhSTI0aUY5VURZTHpFR2ZWMVp2QWJLK3RtUU9FOWh6aDlyL3UKREc4TkxEYVNCQ0NSUWJCMzR6OGg1bzRIU3lSeUlyVUlRUmt2eUpkWjNtZHpEeEdLWjdkVUR0OTRTMEl5NzBpdApJdGIvUXY3Y2J0SVhyQ3c1dXd0STA1akQrYTh4Z3NJN0grOHg3QlZVclFLQmdRRHhKR1VRSE84YTZERnRmWkhTCmdDcmwvMzFZOTNrRjk5VVgwVktpZXVXNE10VjYvVHY2NmpneEltbmFIWHpaclV3YXc2ZkNFb09xMmZRUmpTa0gKQUo1eVBVQjRaY0w3MG5XczJTd2xOS3RsK1RkZHdxKzRIYXFPelBnNCs0UGhQaFpaT0JDc1loNUFlVk0vaWpBMQpWTDdWUklvYU9ubDRGSDhxR0d1ZG5MZGlyUUtCZ1FEbUtuMU5NT29GM0MrTWltdnZaNWsxMWpRcFo4SlM2Q0RSCmhWWmRocGZUd2g0VWlTYmJmWE1pTE9zLzFHMzQwQSt6c2FyODdWQU1jcFBua09jZEROSi9zenZxSUN5M1JQdHAKbEw4dFM0bHpqVzRuTDByVEEreVQvTmtYMlBRb25NQlN5aU43ekl1TDVRaSttejhaTFIwTHg4VFpJVmhtSUFCMApnbTUwRmhWZ3F3S0JnRkFWZXk3WHZSemRnaFRQd0E3OW04R1lrUU5yNUpoenp5UkMwME84dHUvdWlmRjNpbVR4ClJrb2pHSzVrWHFOWUowODRMVTJKb29xcUthRnVsUEtMWlJPaGZmaStLdnhBeiszZ2pnV3BNVWNEZGp6QVBHVlUKRE9HeDlybk41ZVYzSGlyeE1MQmZRWmE5OUVURTJ1L0xQamxMc3VXMUI4UTJZbWtUaFNIcCt3bGRBb0dBV1BBYQpNdld2dUV2NDQ2bXBRMzBZcXNEMnJ2azFFYXc0NGoxUHZod0FGd2R2Y0NmL0o5azE0QUxUZEhxMWMrdVI1YkhGCmpLNTJ2QmlhSm1UTHFXSUhCT2xSUVlybFBId2ZXaERzUHFodG1JVVNCM295dzQ5RW4zcVl1S3BRemxDajBGbmoKbERiWnhWamZKQ2dCSGMxYzUreHRtQ2xXYXovNmJRcnBlMW45TUxrQ2dZRUFsc2M2UW9QVGgzLzdqZ0lqNy9HagoyNUhWUlhOMWNlVnh2WmtVL0dkS0lBcjlZZ00wYUhpem9lejFnWktpVngvVzErUjhoZWZ3dXFRT0drVzc0VnJUClJaU0V3aVNCV1hEbVFNYkFCcTl5b3krcklFM3o5WXluWThlMWxlWFV5bENoWTByclkzS2lDT0pSOVN3SkI1R3UKNkZXbzA5bHI2cmE4bm1jSzY0bkJJakk9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K',
    public:
      'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUEyTTY0eklvQ0dSeit3SFdkSUNFOApzTTdIZDREbjdSRnZPbVJWSnRLSnU2VklHby9xYUNwamNLREhpamdKTFhLY05NVEJ0ejJBTm5EWWpXT043dnZHCkd2STM3V1VmWldMZHgwWEhHWlBXYk5HaE0yREwyT2tNSCt3OFNxQ1AwMDNKMkJUdkkrR01jb3F5TFlQQWxiMUIKWUtld29FNUZlR0RkanRiWG40SUxmQUNYMHIxcnBSQnlTQVEzWVA3TUxiTUViRjd6UWxha0tlWEZzbFFiUHhQRgp0RG9jOXoyNlp2OTN2OWNJMW82ZEsvRnk5MmlaSENhTm8vUFovOXhYVW43UjkrZmx6RUJKdVU5TW96RVZDSDdhCnNiaEhrcm9jSExZcTBmbWNPcUhkSm5CdW9YWmsvM2VnUHZkWklTQkdLdlJpTkF1bCtSNlF1SkwxYWFiMmFiREoKandJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==',
  },
  production: {
    private: '',
    public: '',
  },
}

function HandleJsonWebTokenEncrypt(uid, expiration) {
  let exp = expiration

  if (expiration <= 0) {
    exp = 3196800
  }

  const secret = tool.Base64ToBinary(jwtRsaKey[env].private).toString('utf-8')
  const times = Math.floor(Date.now() / 1000)
  const result = jwt.sign(
    {
      app: 1,
      exp: times + exp,
      iat: times,
      uid: uid,
    },
    secret,
    { algorithm: 'RS256' }
  )

  return result
}

function HandleJsonWebTokenDecrypt(token) {
  let decoded = null
  const cert = tool.Base64ToBinary(jwtRsaKey[env].public).toString('utf-8')

  try {
    decoded = jwt.verify(token, cert)
  } catch (err) {
    console.log(err)
  }

  return decoded
}

export default { HandleJsonWebTokenEncrypt, HandleJsonWebTokenDecrypt }
