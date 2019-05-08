<template>
  <div id="home">
    <home-header></home-header>
    <scroll class="content-wrapper" :data="bannerData" ref="scroll">
      <div class="content">
        <banner @imgReady="imgReady" :bannerData="bannerData"></banner>
        <navigation></navigation>
        <recommend :recommendSongs="recommendSongs"></recommend>
        <new-song :newSong="newSong" v-show="this.recommendSongs.length"></new-song>
      </div>
    </scroll>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import {getBanner} from 'api/banner'
import {getRecommend} from 'api/recommend'
import {getRecommendNewSong} from 'api/newSong'
import {ObjData, getsingerMes} from 'common/js/disposeData'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import HomeHeader from './Header'
import Banner from './Banner'
import Navigation from './Navigation'
import Recommend from './Recommend'
import NewSong from './NewSong'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    Banner,
    Navigation,
    Recommend,
    NewSong,
    Scroll,
    Loading
  },
  data() {
    return {
      bannerData: [],
      recommendSongs: [],
      newSong: []
    }
  },
  methods: {
    _getBanner() {
      getBanner().then((res) => {
        if (res.status === 200) {
          const data = res.data
          this.bannerData = data.banners
        }
      })
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          const data = res.data
          this.recommendSongs = data.result
        }
      })
    },
    _newSong() {
      getRecommendNewSong().then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          this.newSong = this.songData(res.data.result)
        }
      })
    },
    songData(originData) {
      let resultData = []
      originData.forEach(item => {
        item = item.song
        let singerMes = getsingerMes(item.album.artists, item.album.name)
        resultData.push(new ObjData(item.album.name, item.album.picUrl, singerMes, item.id))
      })
      return resultData
    },
    imgReady() {
      if (!this.checkLoad) {
        this.$refs.scroll.refresh()
        this.checkLoad = true
      }
    }
  },
  created() {
    this._getBanner()
    this._getRecommend()
    this._newSong()
  }
}
</script>

<style lang="stylus">
  .content-wrapper
    position: absolute
    width: 100%
    top: .5rem
    bottom: 0
    overflow: hidden
</style>
