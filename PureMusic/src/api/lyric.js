import axios from 'axios'
import { commonParams, LYRIC_URL } from './config'

export function getLyric (mid) {
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(LYRIC_URL, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
