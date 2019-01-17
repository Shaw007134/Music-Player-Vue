import jsonp from 'commons/js/jsonp'
import { commonParams, options, SEARCH_URL, HOTKEY_URL } from './config'
import axios from 'axios'

export function getHotKey() {
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(HOTKEY_URL,data,options)
}