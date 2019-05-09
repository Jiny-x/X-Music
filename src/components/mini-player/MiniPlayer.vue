<template>
  <div class="mini-player border-top" v-show="!fullScreen && playList.length">
    <img class="song-img" :src="`${currentSong.picUrl}?param=100y100`">
    <div class="song-mes">
      <h2 class="song-name">{{ currentSong.name }}</h2>
      <p class="singer">{{ currentSong.singer }}</p>
    </div>
    <span class="icon play-icon iconfont">&#xe61a;</span>
    <span class="icon play-list iconfont">&#xe61b;</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MiniPlayer',
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong'
    ])
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

