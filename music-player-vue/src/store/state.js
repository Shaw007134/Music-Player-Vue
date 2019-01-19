import {playMode} from 'commons/js/config'
import {loadSearch,loadPlay} from 'commons/js/cache'
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
  searchHistory: loadSearch(),
  playHistory: loadPlay()
}

export default state