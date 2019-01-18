import * as types from './mutation-types'
import {playMode} from "commons/js/config"
import { shuffle } from '../commons/js/util';
import {saveSearch} from 'commons/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = ({commit, state},{list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  }else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}){
  commit(types.SET_PLAY_MODE,playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST,randomList)
  commit(types.SET_CURRENT_INDEX,0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  //记录当前歌曲
  let currentSong = playlist[currentIndex]
  //查找当前列表中是否有该歌曲
  let fpIndex = findIndex(playlist, song) 
  //因为是插入歌曲，所以索引+1
  currentIndex++

  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    if(currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      //因为currentIndex已经加入了，所以删除时fp+1
      playlist.splice(fpIndex+1,1)
    }
  }

  //要插入的元素在当前sequence list的当前歌曲的下一个位置
  let currentSIndex = findIndex(sequenceList,currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if(currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
      //这里不需要currentSIndex--,sq不需要关心currentSIndex
    } else {
      //因为currentSIndex已经加入了，所以删除时fp+1
      sequenceList.splice(fsIndex+1,1)
    }
  }

  commit(types.SET_PLAYLIST,playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit},query) {
  console.log(query)
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}