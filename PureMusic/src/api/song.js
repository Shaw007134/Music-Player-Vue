import { commonParams, MUSIC_URL } from 'api/config.js'
import axios from 'axios'

export function getMusic (mid) {
  const data = Object.assign({}, commonParams, {
    // g_tk: 1418093288,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: 6442406400,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    cid: 205361747,
    format: 'json'
  })
  return axios.get(MUSIC_URL, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
