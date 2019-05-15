import * as types from './mutation-types'

const mutations = {
  [types.SET_SONGLIST] (state, songList) {
    state.songList = songList
  },
  [types.SET_SONGURL] (state, url) {
    state.playList[state.currentIndex].songUrl = url
  },
  [types.SET_SONGLYRIC] (state, lyric) {
    state.playList[state.currentIndex].lyric = lyric
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
    try {
      localStorage.playList = JSON.stringify(list)
    } catch (e) {}
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
    try {
      localStorage.sequenceList = JSON.stringify(list)
    } catch (e) {}
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
    try {
      localStorage.currentIndex = index
    } catch (e) {}
  }
}

export default mutations