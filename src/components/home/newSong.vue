<template>
  <div class="new-song">
    <div class="new-song-head">新歌速递</div>
    <div class="new-song-list">
      <div class="new-song-item" v-for="item of newSong" :key="item.id">
        <div class="new-song-img">
          <img v-lazy="item.picUrl + '?param=100y100'">
        </div>
        <div class="new-song-info border-bottom">
          <div class="new-song-mes">
            <h3>{{ item.songName }}</h3>
            <p>{{ item.singerMes }}</p>
          </div>
          <div class="play-icon iconfont">&#xe61a;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Newsong',
  props: {
    newSong: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable.styl';
  @import '~common/styles/mixin.styl'
  .new-song-head
    padding: .18rem .1rem
    font-weight: bold
  .new-song-list
    position: relative
  .new-song-item
    height: .5rem
    margin: 0 .1rem
    margin-bottom: .12rem
    .new-song-img
      float: left
      width: .5rem
      height: .5rem
      img
        width: 100%
        height: 100%
    .new-song-info
      overflow: hidden
      height: .5rem
      margin-left: .6rem
      vertical-align: top
      .new-song-mes
        float: left
        width: 80%
        padding-top: .05rem
        h3
          no-wrap()
        p
          line-height: .3rem
          font-size: $font-size-small
          color: $color-text-dd
          no-wrap()
      .play-icon
        float: right
        margin-right: .1rem
        display: inline-block
        line-height: .5rem
        font-size: $font-size-large-x
    .loading-conteiner
      position: absolute
      top: 50%
      left: 50%
      transform: translateX(-50%)
</style>
