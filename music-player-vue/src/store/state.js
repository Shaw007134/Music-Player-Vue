import {playMode} from 'commons/js/config'
import {loadSearch} from 'commons/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: true,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}

export default state