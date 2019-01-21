import axios from 'axios'
import { commonParams, DISC_DETAIL_URL } from './config'

export function getDiscInfo (disstid) {
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios
    .get(DISC_DETAIL_URL, {
      params: data
    })
    .then(res => {
      console.log(res.data)
      return Promise.resolve(res.data)
    })
}
