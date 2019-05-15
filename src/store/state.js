import {playMode} from 'common/js/config'

let playList = []
let currentIndex = -1
let sequenceList = []
try {
  if (localStorage.playList) {
    playList = JSON.parse(localStorage.playList)
    sequenceList = JSON.parse(localStorage.sequenceList)
    currentIndex = localStorage.currentIndex
  }
} catch (e) {}
const state = {
  songList: {},
  playing: false,
  fullScreen: false,
  playList: playList,
  sequenceList: sequenceList,
  mode: playMode.sequence,
  currentIndex: currentIndex
}

export default state