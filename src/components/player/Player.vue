<template>
  <transition name="col-fade">
    <div class="player">
      <div class="bg-img" ref="bg"></div>
      <div class="back-icon iconfont" @click="back">&#xe602;</div>
      <h2 class="song-name">{{ currentSong.name }}</h2>
      <p class="singer">{{ currentSong.singer }}</p>
      <div class="song-img-wrap">
        <div :class="rotate" class="song-img">
        <img class="song-pic" :src="`${currentSong.picUrl}?param=300y300`">
        </div>
      </div>
      <div class="control-area">
        <span class="iconfont">&#xe61d;</span>
        <span class="iconfont" @click="prev">&#xe61f;</span>
        <span class="play-icon iconfont" @click="playToggle" v-html="playIcon"></span>
        <span class="iconfont" @click="next">&#xe615;</span>
        <span class="iconfont">&#xe61b;</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'

export default {
  name: 'Player',
  data() {
    return {
      playIcon: '&#xe61a;'
    }
  },
  computed: {
    rotate() {
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayState: 'SET_PLAYING_STATE'
    }),
    prev() {

    },
    next() {

    },
    playToggle() {
      this.setPlayState(!this.playing)
    },
    back() {
      this.$router.back()
      this.setFullScreen(false)
    },
    init() {
      this.$refs.bg.style['background-image'] = `url(${this.currentSong.picUrl}?param=300y300)`
      this.playing ? this.playIcon = '&#xe619;' : this.playIcon = '&#xe61a;'
    }
  },
  watch: {
    currentSong() {
      this.$refs.bg.style['background-image'] = `url(${this.currentSong.picUrl}?param=300y300)`
      console.log(this.currentSong)
    },
    playing(playState) {
      console.log(playState)
      this.$nextTick(() => {
        if (playState) {
          this.playIcon = '&#xe619;'
        } else {
          this.playIcon = '&#xe61a;'
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
  .player
    position: relative
    height: 100%
    .bg-img
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-size: cover
      background-repeat: no-repeat
      background-position: 50%
      filter: blur(12px) brightness(50%)
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
      top: 1rem
      left: 50%
      width: 60%
      padding-top: 60%
      transform: translateX(-50%)
      .song-img
        position: absolute
        top: 0
        left: 0
        width: 100%
        padding-top: 100%
        border: 2px solid $color-theme
        border-radius: 50%
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
    .control-area
      position: absolute
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
  .col-fade-enter-active
    transition: all .5s .15s
  .col-fade-leave-active
    transition: all .5s
  .col-fade-enter, .col-fade-leave-to
    transform: translateY(100%)
    opacity: 0
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

