import jsonp from 'commons/js/jsonp'
import { commonParams, RANKING_LIST_URL, options, FULL_RANKING_LIST_URL } from './config'

export function getTopList () {
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(RANKING_LIST_URL, data, options)
}

export function getTopListFull (topid) {
  const data = Object.assign({}, commonParams, {
    topid,
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    type: 'top',
    tpl: 3
  })
  return jsonp(FULL_RANKING_LIST_URL, data, options)
}
