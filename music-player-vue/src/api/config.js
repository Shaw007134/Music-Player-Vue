export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0;

// 部分 ajax 接口接受 jsonp 请求

export const RECOMMEND_URL = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

export const DISC_URL = '/api/getDiscList'

export const DISC_DETAIL_URL = '/api/getDiscInfo'

// export const VKEY_URL = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

export const SINGER_URL = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

export const SINGER_DETAIL_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

export const LYRIC_URL = '/api/getLyric'

export const RECOMMEND_ITEM_URL = '/api/getRecommendItem'

// 移动端 ranking-list url
export const RANKING_LIST_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

// 桌面端 ranking-list url
// export const RANKING_LIST_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg'

// 桌面端 url（jsonp 请求），若是移动端则是 ajax 请求
export const FULL_RANKING_LIST_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

export const HOTKEY_URL = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

// 移动端 search url
// export const SEARCH_URL = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

export const SEARCH_URL = '/api/search'
