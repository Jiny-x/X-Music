<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player v-if="playerShow"></player>
  </div>
</template>

<script>
import Player from 'components/player/Player'

export default {
  name: 'App',
  components: {
    Player
  },
  data() {
    return {
      playerShow: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.playerShow = true
    }, 1500)
  }
}
</script>

<style lang="stylus">
  #app
    position: relative
    width: 100%
    height: 100%
</style>
