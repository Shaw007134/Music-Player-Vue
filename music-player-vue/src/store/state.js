import {playMode} from 'commons/js/config'

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
  searchHistory: []
}

export default state