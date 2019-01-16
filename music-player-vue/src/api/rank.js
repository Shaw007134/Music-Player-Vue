import jsonp from 'commons/js/jsonp'
import {commonParams, options, RANKING_LIST_URL} from './config'

export function getTopList() {
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
  })

  return jsonp(RANKING_LIST_URL, data, options)
}

