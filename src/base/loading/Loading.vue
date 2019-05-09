<template>
  <div class="loading">
    <div class="loader">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.loader
  position: relative
  width: 40px
  height: 40px
  margin: 0 auto

.loader > div
  -webkit-animation-fill-mode: both
  animation-fill-mode: both
  position: absolute
  left: 0px
  top: 0px
  border: 2px solid #3D9FD0
  border-bottom-color: transparent
  border-top-color: transparent
  border-radius: 100%
  height: 35px
  width: 35px
  -webkit-animation: rotate 1s 0s ease-in-out infinite
  animation: rotate 1s 0s ease-in-out infinite

.loader > div:last-child
  display: inline-block
  top: 10px
  left: 10px
  width: 15px
  height: 15px
  -webkit-animation-duration: 0.5s
  animation-duration: 0.5s
  border-color: #3D9FD0 transparent #3D9FD0 transparent
  -webkit-animation-direction: reverse
  animation-direction: reverse

@-webkit-keyframes rotate
  0%
    -webkit-transform: rotate(0deg)
    transform: rotate(0deg)

  50%
    -webkit-transform: rotate(180deg)
    transform: rotate(180deg)

  100%
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)

@keyframes rotate
  0%
    -webkit-transform: rotate(0deg)
    transform: rotate(0deg)

  50%
    -webkit-transform: rotate(180deg)
    transform: rotate(180deg)

  100%
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)
</style>
