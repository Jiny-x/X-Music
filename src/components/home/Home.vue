<template>
  <transition name="home" mode="out-in">
    <div id="home">
      <home-header></home-header>
      <scroll class="content-wrapper" :data="bannerData" ref="scroll">
        <div class="content" ref="list">
          <banner @imgReady="imgReady" :bannerData="bannerData"></banner>
          <navigation></navigation>
          <recommend :recommendSongs="recommendSongs"></recommend>
          <new-song :newSong="newSong" v-show="this.recommendSongs.length"></new-song>
        </div>
      </scroll>
      <transition name="playlist">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
import {getBanner} from 'api/banner'
import {getRecommend} from 'api/recommend'
import {getRecommendNewSong} from 'api/newSong'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import HomeHeader from './Header'
import Banner from './Banner'
import Navigation from './Navigation'
import Recommend from './Recommend'
import NewSong from './NewSong'
import {createSongList, SongData, proceSinger} from 'common/js/packData'
import {listMixin} from 'common/js/mixin'

export default {
  mixins: [listMixin],
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
          const data = res.data.result
          let newData = []
          data.forEach(item => {
            newData.push(createSongList(item))
          })
          this.recommendSongs = newData
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
        resultData.push(new SongData({
          name: item.album.name,
          id: item.id,
          singer: proceSinger(item.album.artists),
          picUrl: item.album.picUrl,
          album: item.album.name,
          duration: item.duration
        })
        )
      })
      return resultData
    },
    imgReady() {
      if (!this.checkLoad) {
        this.$refs.scroll.refresh()
        this.checkLoad = true
      }
    },
    list(playList) {
      const bottom = playList.length > 0 ? '.5rem' : ''
      this.$refs.list.style['padding-bottom'] = bottom
      this.$refs.scroll.refresh()
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
  #id
    position: relative
  .content-wrapper
    position: absolute
    width: 100%
    top: .5rem
    bottom: 0
    overflow: hidden
  .home-enter-active, .home-leave-active
    transition: all .5s
  .home-enter, .home-leave-to
    opacity: 0
  .playlist-enter-active
    transition: all .5s
  .playlist-leave-active
    transition: all .2s
  .playlist-enter, .playlist-leave-to
    transform: translateY(100%)
    opacity: 0
</style>
