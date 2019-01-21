import jsonp from 'commons/js/jsonp'
import { commonParams, options, SEARCH_URL, HOTKEY_URL } from './config'
import axios from 'axios'

export function getHotKey () {
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(HOTKEY_URL, data, options)
}

export function search (query, page, zhida, perpage) {
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    perpage,
    n: perpage,
    uin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    _: +new Date()
  })
  return axios.get(SEARCH_URL, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
