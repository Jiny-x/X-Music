import * as types from './mutation-types'

const mutations = {
  [types.SET_SONGLIST] (state, songList) {
    state.songList = songList
  },
  [types.ADD_SONGLISTDETAIL] (state, songListDetail) {
    state.songList.tracks = songListDetail
  }
}

export default mutations