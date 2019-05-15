<template>
  <div class="progress-bar" ref="pro" @click="progressClick">
    <div class="current-bar" ref="cur">
      <div class="btn" @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    widthPercent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    widthPercent() {
      if (!this.progressTouch.init) {
        this.$refs.cur.style['width'] = this.widthPercent + '%'
      }
    }
  },
  methods: {
    progressClick(e) {
      this.progressTouch.widthNum = e.offsetX
      this.setWidth()
    },
    progressTouchStart(e) {
      this.progressTouch.init = true
      this.progressTouch.statrX = e.touches[0].pageX
    },
    progressTouchMove(e) {
      if (this.progressTouch.init === false) { return }
      let deltaX = e.touches[0].pageX - this.progressTouch.statrX
      this.progressTouch.widthNum = Math.min(Math.max(0, deltaX + this.progressTouch.statrX - this.$refs.pro.offsetLeft), this.$refs.pro.offsetWidth)
      this.$refs.cur.style['width'] = this.progressTouch.widthNum + 'px'
    },
    progressTouchEnd(e) {
      this.progressTouch.init = false
      this.setWidth()
    },
    setWidth() {
      let percentW = (this.progressTouch.widthNum / this.$refs.pro.offsetWidth) * 100
      this.$emit('setPercentW', percentW)
    }
  },
  created() {
    this.progressTouch = {}
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
  .progress-bar
    width: 100%
    height: .02rem
    background: $color-text-ddd
    .current-bar
      position: relative
      width: 0
      height: .02rem
      background: $color-text-d
      .btn
        position: absolute
        top: -.03rem
        right: -.04rem
        width: .08rem
        height: .08rem
        border-radius: 50%
        background: $color-theme
</style>
