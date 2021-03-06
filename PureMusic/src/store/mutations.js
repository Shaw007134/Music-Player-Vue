import * as types from './mutation-types'

const mutations = {
  // 方便检测是否出错
  // ES6 允许字面量定义对象时，用表达式作为对象的属性名或方法名，即把表达式放在方括号内。
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.UPDATE_SINGER] (state, objs) {
    state.singer = Object.assign({}, state.singer, objs)
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    if (state.fullScreen !== flag) {
      state.fullScreen = flag
    }
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_TOP_LIST] (state, list) {
    state.topList = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY] (state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  }
}

export default mutations
