<template>
  <div id="singer">
    <div class="head">
      <span @click="$router.back(-1)" class="back-icon iconfont">&#xe602;</span><h2 class="title">歌手</h2>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Singer'
}
</script>

<style lang="stylus" rel="stylesheet" scoped>
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
</style>
