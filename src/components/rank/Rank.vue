<template>
  <div id="rank">
    <div class="head">
      <span @click="$router.back(-1)" class="back-icon iconfont">&#xe602;</span><h2 class="title">未知榜单</h2>
    </div>
    <div class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/Loading'

export default {
  name: 'Rank',
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
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
    .title
      display: inline-block
      width: 100%
      text-align: center
      font-size: $font-size-large
      line-height: .5rem
      vertical-align: middle
  .loading-container
    position: absolute
    left: 50%
    top: 30%
    transform: translateX(-50%)
</style>
