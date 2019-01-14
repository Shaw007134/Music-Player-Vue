import jsonp from 'commons/js/jsonp';
import {commonParams, options, VKEY_URL} from 'api/config.js';
import axios from 'axios'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}


export function createSong(musicData,songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // 歌源url
    // url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`
    // url: `http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${songVkey}&guid=6442406400&uin=0&fromtag=66`

    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}/${musicData.songid}.m4a?guid=263427534&fromtag
  })
}

export function getMusic(mid) {
  const url = '/api/music'
  const data = Object.assign({},commonParams, {
    // g_tk: 1418093288,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: 6442406400,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    cid:205361747,
    format: 'json',
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })

}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  //注意边界处理
  singer.forEach((s)=>{
    ret.push(s.name)
  })
  return ret.join('/')
}