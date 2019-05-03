<template>
  <div class="recommend">
    <div class="recommend-head">热门推荐</div>
    <div class="recommend-songs">
      <div class="recommend-songs-wrap" v-for="item of recommendSongs" :key="item.id">
        <div class="recommend-icon-wrap">
          <img :src="item.picUrl">
        </div>
        <h3>{{item.name}}</h3>
      </div>
      <div class="loading-conteiner" v-show="!recommendSongs.length">
        <loading></loading>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/Loading'

export default {
  name: 'Recommend',
  components: {
    Loading
  },
  props: {
    recommendSongs: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable.styl'
  @import '~common/styles/mixin.styl'
  .recommend-head
    padding: .18rem .1rem
    font-weight: bold
  .recommend-songs
    position: relative
    display: flex
    justify-content : space-around
    flex-wrap: wrap
    margin: 0 .05rem
    font-size: 0
    .recommend-songs-wrap
      box-sizing: border-box
      width: 30%
      margin: 0 1% .1rem
      .recommend-icon-wrap
        position: relative;
        width: 100%;
        padding-top: 100%;
        border-radius: .05rem;
        overflow: hidden;
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
      h3
        width: 100%
        line-height: .18rem
        margin: .08rem 0
        font-size: $font-size-medium
        no-wrap-two()
  .loading-conteiner
    position: absolute
    top: 50%
    left: 50%
    transform: translateX(-50%)
</style>
