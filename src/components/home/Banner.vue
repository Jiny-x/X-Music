<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide class="slide" v-for="(item, index) of bannerData" :key="index">
        <img @load="loadImg" :src="item.imageUrl">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
      }
    }
  },
  props: {
    bannerData: Array
  },
  methods: {
    loadImg() {
      this.$emit('imgReady')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable.styl'
  .banner >>>.swiper-pagination-bullet-active
    background: $color-theme
  .banner
    width: 100%
    .slide
      position: relative
      width: 100%
      padding-bottom: 31.87%
      img
        position: absolute
        width: 100%
        height: 100%
</style>
