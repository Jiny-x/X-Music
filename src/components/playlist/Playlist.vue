<template>
  <transition name="playlist">
    <div class="playlist">
      <div class="top-container">
        <div class="bg-filter" ref="top"></div>
        <div class="head">
          <span @click="back" class="back-icon iconfont">&#xe602;</span>
        </div>
        <div class="playlist-title">
          <img class="playlist-img" :src="`${songList.picUrl}?param=120y120`">
          <h2 class="palylist-name">{{ songList.name }}</h2>
        </div>
      </div>
      <div class="play-bar" @click="allClick">播放全部</div>
      <scroll class="scroll-wrap" :data="songs" ref="playlist">
        <div class="playlist-container">
          <div class="song-list" v-for="(item, index) of songs" @click="songClick(item, index)" :key="item.id">
            <span class="num">{{ index + 1 }}</span>
            <h3 class="song-name">{{ item.name }}</h3>
            <p class="song-singer">{{ item.singer }} - {{ item.album }}</p>
            <span class="play-icon iconfont">&#xe61a;</span>
          </div>
        </div>
        <div class="loading-wrap" v-show="!songs.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/javascript">
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import {mapGetters, mapActions} from 'vuex'
import {getSongListDetail} from 'api/songList'
import {createSong} from 'common/js/packData'

export default {
  name: 'Playlist',
  data() {
    return {
      songs: []
    }
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    ...mapGetters([
      'songList',
      'playList'
    ])
  },
  methods: {
    ...mapActions([
      'selectPlay',
      'allPlay'
    ]),
    allClick() {
      this.allPlay({
        list: this.songs
      })
    },
    songClick(item, index) {
      this.selectItem(item, index)
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    back() {
      this.$router.back()
    },
    setBgImage() {
      this.$refs.top.style['background-image'] = `url(${this.songList.picUrl}?param=300y300)`
    },
    _getSongListDetail() {
      if (!this.songList.id) {
        this.$router.push({
          path: '/song-list-square'
        })
      }
      getSongListDetail(this.songList.id).then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          let tracks = res.data.playlist.tracks
          let newSongList = []
          tracks.forEach(item => {
            newSongList.push(createSong(item))
          })
          this.songs = newSongList
        }
      })
    }
  },
  created() {
    console.log('created')
    this._getSongListDetail()
  },
  mounted() {
    console.log('mounted')
    this.setBgImage()
  }
}
</script>

<style lang="stylus" rel="stylesheet" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
  .playlist-enter-active
    transition: all .5s
  .playlist-leave-active
    transition: all .2s
  .playlist-enter, .playlist-leave-to
    transform: translateY(100%)
    opacity: 0
  .playlist
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #000000
    z-index: 10
    .head
      position: relative
      width: 100%
      height: .5rem
    .back-icon
      position: absolute
      top: 50%
      left: .1rem
      transform: translateY(-50%)
      font-size: $font-size-large
      font-weight: bold
      vertical-align: middle
    .top-container
      position: relative
      padding-bottom: .3rem
      .bg-filter
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-size: cover
        background-repeat: no-repeat
        background-position: 50% 15%
        filter: blur(12px) brightness(60%)
      .playlist-title
        display: flex
        justify-content: space-around
        height: 1rem
        padding: .1rem 0 0 .2rem
        .playlist-img
          width: 1rem
          z-index: 1
        .palylist-name
          flex-grow: 1
          overflow: hidden
          height: 1rem
          padding: .2rem .2rem
          z-index: 1
    .play-bar
      display: inline-block
      margin: 0 0 .1rem 50%
      transform: translateX(-50%)
      padding: 0 .2rem
      line-height: .32rem
      border-radius: .2rem
      border: 1px solid $color-theme
      font-size: $font-size-medium
    .scroll-wrap
      position: absolute
      overflow: hidden
      top: 2.5rem
      bottom: 0
      width: 100%
      border-radius: .2rem
      .playlist-container
        width: 100%
        padding-bottom: .5rem
        .song-list
          position: relative
          margin: .2rem
          overflow: hidden
        .song-name
          width: 76%
          padding: 0 0 .06rem .3rem
          line-height: .16rem
          font-size: $font-size-medium
          no-wrap()
        .song-singer
          padding-left: .3rem
          width: 76%
          font-size: $font-size-small
          color: $color-text-dd
          no-wrap()
        .num
          position: absolute
          top: 50%
          transform: translateY(-50%)
        .play-icon
          position: absolute
          top: 50%
          right: 3%
          transform: translateY(-50%)
          font-size: $font-size-large-l
      .loading-wrap
        position: absolute
        top: 10%
        left: 50%
        transform: translateX(-50%)
</style>
