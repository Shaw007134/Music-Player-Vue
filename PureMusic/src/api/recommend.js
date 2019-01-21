import jsonp from 'commons/js/jsonp';
import {commonParams, options, DISC_URL, RECOMMEND_URL} from './config';
import axios from 'axios';

export function getRecommend() {
  const data = Object.assign({},commonParams,{
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(RECOMMEND_URL,data,options)
}


export function getDiscList() {
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    needNewCode: 0,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(DISC_URL, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


