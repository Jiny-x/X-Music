<template>
  <div class="banner">
    <swiper clsss="swiper-container" :options="swiperOption">
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
    width: .2rem
    border-radius: .04rem
    opacity: 0.8
    background: $color-theme
  .banner
    position: relative
    width: 100%
    height: 0
    padding-bottom: 37.18%
    .swiper-container
      margin: 0 .1rem
      border-radius: .12rem
    .slide
      position: relative
      padding-bottom: 37.18%
      img
        position: absolute
        width: 100%
</style>
