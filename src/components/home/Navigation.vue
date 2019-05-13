<template>
  <div class="navigation border-bottom">
    <div class="nav-icon-wrap iconfont">
      <router-link tag="div" to="/song-list-square" class="nav-icon iconfont">&#xe61b;</router-link>
      <h3>歌单</h3>
    </div>
    <router-link tag="div" to="/rank" class="nav-icon-wrap iconfont">
      <div class="nav-icon iconfont">&#xe648;</div>
      <h3>排行榜</h3>
    </router-link>
    <!-- <router-link to="/singer" tag="div" class="nav-icon-wrap iconfont">
      <div class="nav-icon iconfont">&#xe933;</div>
      <h3>歌手</h3>
    </router-link> -->
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable.styl'
  .navigation
    display: flex
    justify-content: space-around
    align-items: center
    width: 100%
    margin-top: .2rem
    padding-bottom: .1rem
    text-align: center
    .nav-icon
      display: inline-block
      width: .32rem
      height: .33rem
      line-height: .32rem
      border: 1px solid $color-theme
      border-radius: 50%
    h3
      padding: .1rem 0
      font-size: $font-size-medium
</style>
