<template>
  <div class="user-playlist-wrap" v-show="showState" @click="hidden">
    <transition name="fade">
      <div class="user-playlist" v-if="showState" @click.stop>
        <div class="head">播放列表</div>
        <scroll class="playlist"
          ref="scroll"
          :data="sequenceList"
          @scrollToTop="close"
          :pulldown="pulldown">
          <div class="playlist-container">
            <div class="song" v-for="(item, index) of sequenceList" ref="song" :key="item.id">
              <div class="song-name" @click="songClick(item, index)">
                <em class="play-icon iconfont" v-show="playingIcon(item)">&#xe620;</em>
                <h3 class="name" :class="{'name-active': item.id === currentSong.id}">{{ item.name }}</h3>
                <p class="singer" :class="{'singer-active': item.id === currentSong.id}">{{ ' - ' + item.singer }}</p>
              </div>
              <em class="delete iconfont" @click.stop="deleteItem(item)">&#xe662;</em>
            </div>
          </div>
        </scroll>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex'
import Scroll from 'base/scroll/Scroll'

export default {
  components: {
    Scroll
  },
  computed: {
    ...mapGetters([
      'sequenceList',
      'currentSong'
    ])
  },
  data () {
    return {
      showState: false,
      pulldown: true
    }
  },
  methods: {
    deleteItem(song) {
      console.log(song)
      this.deleteSong(song)
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      this.$refs.scroll.scrollToElement(this.$refs.song[index], 200)
    },
    songClick(item, index) {
      this.selectPlay({
        list: this.sequenceList,
        index
      })
    },
    close() {
      console.log(11111)
      this.hidden()
    },
    playingIcon(item) {
      return item.id === this.currentSong.id ? 1 : 0
    },
    show() {
      console.log(this.currentSong)
      this.showState = true
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.scrollToCurrent(this.currentSong)
      })
    },
    hidden() {
      this.showState = false
    },
    ...mapActions([
      'selectPlay',
      'deleteSong'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showState || newSong.id === oldSong.id) { return }
      this.scrollToCurrent(newSong)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
  .user-playlist-wrap
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.2)
    z-index: 12
    .user-playlist
      position: absolute
      top: 50%
      left: 0
      right: 0
      bottom: 0
      border-top: .01rem solid
      background: #000000
      border-radius: .5rem .5rem 0 0 / .4rem .4rem 0 0
    .head
      height: .5rem
      text-align: center
      line-height: .5rem
    .playlist
      position: absolute
      top: .5rem
      bottom: 0
      width: 100%
      overflow: hidden
      .song
        display: flex
        justify-content: space-between
        width: 100%
        .song-name
          width: 80%
          height: .5rem
          padding-left: .2rem
          overflow: hidden
          .play-icon
            height: .5rem
            padding-right: .06rem
            line-height: .5rem
            font-size: $font-size-large
            vertical-align: top
          .name
            display: inline-block
            line-height: .5rem
            color: $color-text-d
            font-size: $font-size-medium-x
            no-wrap()
            &.name-active
              color: $color-theme
          .singer
            display: inline-block
            color: $color-text-dd
            line-height: .14rem
            padding-bottom: .17rem
            font-size: $font-size-small
            no-wrap()
            &.singer-active
              color: $color-text-d
        .delete
          padding-right: .2rem
          line-height: .5rem
          font-size: $font-size-large-l
    .fade-enter-active, .fade-leave-active
      transition: all .3s
    .fade-enter, .fade-leave-to
      transform: translateY(100%)
      opacity: 0
</style>
