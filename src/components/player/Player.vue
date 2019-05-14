<template>
  <div class="player" v-show="playerShow" ref="playBg">
    <transition name="col-fade">
      <div class="full-player" v-show="fullScreen">
        <div class="bg-img-wrap" ref="bg">
          <img :src="`${currentSong.picUrl}?param=300y500`" class="bg-img">
        </div>
        <div class="back-icon iconfont" @click="back">&#xe602;</div>
        <h2 class="song-name">{{ currentSong.name }}</h2>
        <p class="singer">{{ currentSong.singer }}</p>
        <div class="song-img-wrap" ref="songImg">
          <div :class="rotate" class="song-img">
          <img class="song-pic" :src="`${currentSong.picUrl}?param=300y300`">
          </div>
        </div>
        <div class="lyric-mini-wrap" v-show="!lyricShow"  :class="{'lyric-show': lyricShow}">
          <div class="lyric-mini">{{ lyricSingle }}</div>
        </div>
        <scroll class="lyric" ref="lyr" :data="currentLyric && currentLyric.lines">
          <div class="lyric-wrap">
            <div class="text-wrap" @click="lyricFull" :class="{'lyric-show': !lyricShow}">
              <p class="text" ref="lyricLine"
                  v-for="(item, index) of currentLyric.lines"
                  :class="{'current': currentLineNum === index}"
                  :key="item.id"
              >{{ item.txt }}</p>
            </div>
          </div>
        </scroll>
        <div class="progress">
          <div class="time-l time">{{ currentTime }}</div>
          <div class="progress-bar-wrap">
            <progress-bar :widthPercent="widthPercent" @setPercentW="changePercent"></progress-bar>
          </div>
          <div class="time-r time">{{ duration }}</div>
        </div>
        <div class="control-area">
          <span class="iconfont" v-html="modeIcon" @click="modeChange"></span>
          <span class="iconfont" @click="prev">&#xe61f;</span>
          <span class="play-icon iconfont" @click="playToggle" v-html="playIcon"></span>
          <span class="iconfont" @click="next">&#xe615;</span>
          <span class="iconfont" @click="userPlaylistShow">&#xe61b;</span>
        </div>
      </div>
    </transition>
    <transition name="mini-fade">
      <div class="mini-player border-top" v-show="!fullScreen && playList.length">
        <img class="song-img" :src="`${currentSong.picUrl}?param=100y100`">
        <div class="song-mes" @click="fullPlayer">
          <h2 class="song-name">{{ currentSong.name }}</h2>
          <p class="singer">{{ currentSong.singer }}</p>
        </div>
        <span class="icon play-icon iconfont" @click="playToggle" v-html="playIcon"></span>
        <span class="icon play-list iconfont" @click="userPlaylistShow">&#xe61b;</span>
      </div>
    </transition>
    <user-playlist ref="userPl"></user-playlist>
    <audio :src="currentSong.songUrl" ref="audio"
      @canplay="canplay"
      @ended="next"
      @error="error"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script type="text/javascript">
import {mapGetters, mapMutations} from 'vuex'
import {getSongUrl, getSongLyric} from 'api/song'
import ProgressBar from 'base/progress-bar/ProgressBar'
import {playMode} from 'common/js/config.js'
import {shuffle} from 'common/js/util.js'
import Lyric from 'lyric-parser'
import Scroll from 'base/scroll/Scroll'
import UserPlaylist from 'components/user-playlist/UserPlaylist'

export default {
  name: 'Player',
  components: {
    ProgressBar,
    UserPlaylist,
    Scroll
  },
  data() {
    return {
      playerShow: false,
      canplayState: false,
      playIcon: '&#xe61a;',
      modeIcon: '&#xe61d;',
      currentTime: '00:00',
      duration: '00:00',
      widthPercent: 0,
      currentLineNum: 0,
      currentLyric: [],
      lyricShow: false,
      lyricSingle: '',
      userPlaylist: false
    }
  },
  computed: {
    rotate() {
      return {
        'play': this.playing,
        'play pause': !this.playing,
        'lyric-show': this.lyricShow
      }
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    ...mapMutations({
      setSongUrl: 'SET_SONGURL',
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    _getSongUrl(id) {
      getSongUrl(id).then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          let url = res.data.data[0].url
          this.setSongUrl(url)
        }
      })
      getSongLyric(id).then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }
      }).catch(() => {
        this.currentLyric = []
        this.lyricShow = false
        this.lyricSingle = ''
        this.currentLineNum = 0
      })
    },
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineMid = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyr.scrollToElement && this.$refs.lyr.scrollToElement(lineMid, 1000)
      } else {
        this.$refs.lyr.scrollToElement && this.$refs.lyr.scrollToElement(this.$refs.lyricLine[0], 1000)
      }
      this.lyricSingle = txt
    },
    lyricFull() {
      this.lyricShow = !this.lyricShow
    },
    setDuration() {
      this.$nextTick(() => {
        this.duration = this.format(this.$refs.audio.duration)
      })
    },
    canplay() {
      console.log('canplay')
      this.setDuration()
      this.canplayState = true
      this.$refs.audio.play()
    },
    error() {
      this.canplayState = true
    },
    prev() { // 上一曲
      if (!this.canplayState) { return }
      if (this.playList.length === 1) {
        this.$refs.audio.loop()
      }
      let index = this.currentIndex
      index = index === 0 ? this.playList.length - 1 : --index
      setTimeout(() => {
        this.setCurrentIndex(index)
      }, 20)
      if (!this.playing) this.playToggle()
      this.canplayState = false
    },
    next() { // 下一曲
      if (!this.canplayState) { return }
      if (this.playList.length === 1) {
        this.loop()
      }
      let index = this.currentIndex
      index = index === this.playList.length - 1 ? 0 : ++index
      setTimeout(() => {
        this.setCurrentIndex(index)
      }, 20)
      if (!this.playing) this.playToggle()
      this.$refs.lyr.y = 0
      this.canplayState = false
    },
    loop() {
      this.$refs.audio.currentTime = 0
    },
    modeChange() { // 播放模式切换
      const mode = (this.mode + 1) % 2
      this.setPlayMode(mode)
      this.mode === playMode.sequence ? this.modeIcon = '&#xe61d;' : this.modeIcon = '&#xe61e;'
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.saveCurrentSong(list) // 播放模式切换时保证当前播放的歌曲不切换
      this.setPlayList(list)
    },
    saveCurrentSong(list) {
      let index = list.findIndex(item => {
        return this.currentSong.id === item.id
      })
      this.setCurrentIndex(index)
    },
    playToggle() { // 播放开关
      this.setPlayState(!this.playing)
      if (this.currentLyric.togglePlay) {
        this.currentLyric.togglePlay()
      }
    },
    setProgressPercent(cur, dur) {
      this.widthPercent = (cur / dur) * 100
    },
    changePercent(percentW) { // 改变进度条百分比
      const curentTime = percentW / 100 * this.$refs.audio.duration
      this.$refs.audio.currentTime = percentW / 100 * this.$refs.audio.duration
      if (!this.playing) this.playToggle()
      if (this.currentLyric.seek) {
        this.currentLyric.seek(curentTime * 1000)
      }
    },
    updateTime(e) {
      let currentTime = e.target.currentTime
      this.currentTime = this.format(currentTime)
      this.setProgressPercent(currentTime, e.target.duration)
    },
    back() {
      this.setFullScreen(false)
    },
    fullPlayer() {
      this.setFullScreen(true)
    },
    userPlaylistShow() {
      console.log('userplaylist')
      this.$refs.userPl.show()
    },
    format(time) {
      time = time | 0
      let min = this._pad(time / 60 | 0)
      let sec = this._pad(time % 60)
      return `${min}:${sec}`
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    init() {
      this.currentLyric = []
      this.playing ? this.playIcon = '&#xe619;' : this.playIcon = '&#xe61a;'
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) { return }
      if (newSong.id === oldSong.id) { return }
      if (this.currentLyric.stop) {
        this.currentLyric.stop()
      }
      this._getSongUrl(newSong.id)
      if (oldSong.songUrl === this.$refs.audio.src) { return }
      this.$nextTick(() => {
        this.init()
        this.$refs.audio.play()
      })
      this.setDuration()
    },
    playing(playState) {
      console.log('playing')
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (playState) {
          audio.play()
          this.playIcon = '&#xe619;'
        } else {
          audio.pause()
          this.playIcon = '&#xe61a;'
        }
      })
    },
    playList() {
      this.$nextTick(() => {
        this.playerShow = true
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="stylus" rel="stylesheet" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
  .player
    position: fixed
    bottom: 0
    z-index: 10
    .full-player
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: #000000
      .bg-img-wrap
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        filter: blur(12px) brightness(50%)
        .bg-img
          width: 100%
          height: 100%
          background-image: url('~common/image/logo-loading.png')
      .back-icon
        position: absolute
        top: 9
        left: .1rem
        line-height: .5rem
        font-size: $font-size-large-l
      .song-name
        position: relative
        width: 80%
        text-align: center
        margin: 0 auto
        height: .5rem
        line-height: .5rem
        font-size: $font-size-large
        no-wrap()
      .singer
        position: relative
        width: 80%
        text-align: center
        margin: 0 auto
        font-size: $font-size-small
        color: $color-text-d
        no-wrap()
      .song-img-wrap
        position: absolute
        top: 18%
        left: 50%
        width: 60%
        padding-top: 60%
        transform: translateX(-50%)
        .song-img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          border: 2px solid $color-theme
          border-radius: 50%
          transition: opacity 1s
          background-image: url('~common/image/logo-loading.png')
          background-repeat: no-repeat
          background-position: center
          &.lyric-show
            opacity: 0
          &.play
            animation: rotate 20s linear infinite
          &.pause
            animation-play-state: paused
          .song-pic
            position: absolute
            top: 0
            left: 0
            width: 100%
            border-radius: 50%
      .lyric-mini-wrap
        position: absolute
        bottom: 34%
        width:100%
        text-align: center
        transition: all 1s
        &.lyric-show
          bottom: 50%
          opacity: 0
      .lyric
        position: absolute
        top: .8rem
        left: 0
        right: 0
        bottom: 1.3rem
        overflow: hidden
        z-index: 100
        .lyric-wrap
          text-align: center
          padding-bottom: 5rem
          .text-wrap
            transition: opacity 1s
            &.lyric-show
              opacity: 0
            .text
              margin: .18rem
              line-height: .18rem
              font-size: $font-size-medium-x
              color: $color-text-dd
            .current
              color: $color-theme
      .progress
        position: absolute
        bottom: 15%
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        font-size: $font-size-medium-x
        .progress-bar-wrap
          width: 60%
          padding: 0 .12rem
        .time
          box-sizing: border-box
          width: .45rem
          text-align: center
      .control-area
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        display: flex
        justify-content: space-around
        padding: .2rem 0
        span
          font-size: $font-size-large-xx
          line-height: .32rem
        .play-icon
          font-size: 42px
    .mini-player
      display: flex
      justify-content: space-around
      align-items: center
      position: fixed
      bottom: 0
      width: 100%
      height: .5rem
      background: $color-background
      z-index: 10
    .song-img
      width: .4rem
      height: .4rem
      border-radius: 50%
    .song-mes
      width: 50%
      // padding-left: .1rem
      .song-name
        width: 100%
        font-size: $font-size-medium
        padding-bottom: .04rem
        line-height: .16rem
        no-wrap()
      .singer
        width: 100%
        font-size: $font-size-small-s
        color: $color-text-dd
        line-height: .12rem
        no-wrap()
    .icon
      font-size: $font-size-large-x
  .col-fade-enter-active, .col-fade-leave-active
    transition: all .5s
  .col-fade-enter, .col-fade-leave-to
    transform: translateY(100%)
    opacity: 0
  .mini-fade-enter-active, .mini-fade-leave-active
    transition: all .5s
  .mini-fade-enter, .mini-fade-leave-to
    transform: translateY(100%)
    opacity: 0
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
