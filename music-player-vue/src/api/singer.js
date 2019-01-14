import jsonp from 'commons/js/jsonp';
import {commonParams, options, SINGER_URL, SINGER_DETAIL_URL} from './config';

export function getSingerList() {
  const data = Object.assign({}, commonParams,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 200,
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
  const data = Object.assign({}, commonParams,{
    g_tk: 1471438518,
    uin: 0,
    // loginUin: 0,
    // hostUin: 0,
    format: jsonp,
    platform: 'h5page',
    needNewCode: 1,
    singermid: singerId,
    order: 'listen',
    from: 'h5',
    begin: 0,
    num: 100,
    songstatus: 1
  })
  //根据歌手id获取其mid，以及其100首歌曲(res.data.list)中
  return jsonp(SINGER_DETAIL_URL, data, options)
}