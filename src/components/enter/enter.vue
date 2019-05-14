<template>
  <div class="enter" v-show="enterShow">
    <div class="enter-text" :class="{'fade-enter': fadeEnter, 'fade-leave': fadeLeave}">
      <p class="text">未&nbsp来</p>
      <p class="text">可&nbsp期</p>
    </div>
    <p class="myname">-Jinyong</p>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      enterShow: true,
      fadeEnter: false,
      fadeLeave: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.fadeEnter = true
      setTimeout(() => {
        this.fadeLeave = true
        setTimeout(() => {
          this.enterShow = false
          this.$router.push({
            path: '/home'
          })
        }, 500)
      }, 800)
    }, 100);
  }
}
</script>

<style lang="stylus" rel="stylesheet" scoped>
  .enter
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #000000
    z-index: 100
    .enter-text
      position: fixed
      top: 50%
      left: 50%
      width: 140px
      height: 160px
      opacity: 0
      margin: -80px 0 0 -70px
      transform: scale(0)
      transition: all .4s
      &.fade-enter
        transform: scale(1)
        opacity: 1
      &.fade-leave
        transform: scale(5)
        opacity: 0
      .text
        line-height: 80px
        color: #3D9FD0
        font-size: 60px
    .myname
      position: absolute
      bottom: .1rem
      right: .1rem
      color: rgba(61,159,208,0.6)
      font-size: 12px
</style>

