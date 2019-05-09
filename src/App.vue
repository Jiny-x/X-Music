<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <mini-player></mini-player>
  </div>
</template>

<script>
import MiniPlayer from 'components/mini-player/MiniPlayer'

export default {
  name: 'App',
  components: {
    MiniPlayer
  }
}
</script>

<style lang="stylus">
  #app
    position: relative
    width: 100%
    height: 100%
</style>
