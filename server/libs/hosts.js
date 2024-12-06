import { getCache, getRandom } from './cache.js'

function getClient(key) {
  const client = getCache('hosts')
  const index = getRandom(client[key].length)

  return client[key][index]
}

export default getClient
