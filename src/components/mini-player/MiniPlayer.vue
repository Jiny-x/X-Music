<template>
  <div class="mini-player border-top" v-show="!fullScreen && playList.length">
    <img class="song-img" :src="`${currentSong.picUrl}?param=100y100`">
    <div class="song-mes">
      <h2 class="song-name">{{ currentSong.name }}</h2>
      <p class="singer">{{ currentSong.singer }}</p>
    </div>
    <span class="icon play-icon iconfont" @click="playToggle" v-html="playIcon"></span>
    <span class="icon play-list iconfont">&#xe61b;</span>
    <audio :src="currentSong.songUrl" ref="audio"></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getSongUrl} from 'api/song'

export default {
  name: 'MiniPlayer',
  data() {
    return {
      playIcon: '&#xe61a;'
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing'
    ])
  },
  methods: {
    ...mapMutations({
      setSongUrl: 'SET_SONGURL',
      setPlayState: 'SET_PLAYING_STATE'
    }),
    _getSongUrl(id) {
      getSongUrl(id).then(res => {
        if(res.status === 200 && res.statusText === 'OK') {
          let url = res.data.data[0].url
          this.setSongUrl(url)
        }
      })
    },
    playToggle() {
      this.setPlayState(!this.playing)
    }
  },
  watch: {
    currentSong() {
      console.log(this.currentSong)
      this._getSongUrl(this.currentSong.id)
      this.$nextTick(() => {
        this.$refs.audio.play()
        console.log(this.playing)
      })
    },
    playing(playState) {
      console.log(playState)
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (playState) {
          console.log(playState)
          audio.play()
          this.playIcon = '&#xe619;'
        } else {
          console.log(playState)
          audio.pause()
          this.playIcon = '&#xe61a;'
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'

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
</style>

