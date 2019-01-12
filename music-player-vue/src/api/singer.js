import jsonp from 'commons/js/jsonp';
import {commonParams, options, SINGER_URL, SINGER_DETAIL_URL} from './config';

export function getSingerList() {
  const data = Object.assign({}, commonParams,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 1471438518,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  console.log('getsinger')
  return jsonp(SINGER_URL, data, options)
}

export function getSingerDetail(singerId) {
  const data = Object.assign({}, {
    g_tk: 1471438518,
    loginUin: 0,
    hostUin: 0,
    format: jsonp,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 200,
    songstatus: 1
  })
  return jsonp(SINGER_DETAIL_URL, data, options)
}