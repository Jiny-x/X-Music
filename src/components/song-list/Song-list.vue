<template>
  <div id="song-list">
    <div class="head">
      <router-link to="/" tag="span" class="back-icon iconfont">&#xe602;</router-link><h2 class="title">歌单广场</h2>
    </div>
    <div class="nav-bar border-bottom">
      <a class="nav-item" :class="{'nav-item-active': 0 == activeNum}" @click="_getSongList('精品'), changeActive(0)">精品</a>
      <a class="nav-item" :class="{'nav-item-active': 1 == activeNum}" @click="_getSongList('欧美'), changeActive(1)">欧美</a>
      <a class="nav-item" :class="{'nav-item-active': 2 == activeNum}" @click="_getSongList('电子'), changeActive(2)">电子</a>
      <a class="nav-item" :class="{'nav-item-active': 3 == activeNum}" @click="_getSongList('流行'), changeActive(3)">流行</a>
      <a class="nav-item" :class="{'nav-item-active': 4 == activeNum}" @click="_getSongList('华语'), changeActive(4)">华语</a>
      <a class="nav-item" :class="{'nav-item-active': 5 == activeNum}" @click="_getSongList('舞曲'), changeActive(5)">舞曲</a>
    </div>
    <scroll class="content-wrapper" ref="scroll" 
      :data="songList"
      :pullup="pullup"
      :bounce="bounce"
       @scrollToEnd="loadData"
       >
      <div class="song-list-container">
        <div class="song-list-wrap" v-for="(item,index) of songList"  ref="listItem">
          <div class="song-list-img-wrap">
            <img v-lazy="item.picUrl + '?param=120y120'">
          </div>
          <h3>{{item.name}}</h3>
        </div>
        <div class="loading-container-end" v-show="!loadingShow">
          <loading></loading>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="loadingShow">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import {getSongList, getHighQuality} from 'api/songList'
import {disposeData} from 'common/js/disposeData'
import Loading from 'base/loading/Loading'

export default {
  name: 'SongList',
  components: {
    Loading,
    Scroll
  },
  data () {
    return {
      songList: [],
      activeNum: 0,
      loadingShow: false,
      cat: '',
      offset: 18,
      pullup: true,
      bounce: {
        bottom: false
      }
    }
  },
  methods: {
    // 获取歌单列表
    _getSongList(cat, limit, updateTime, offset, load) {
      this.cat = cat
      if (!load) this.loadingShow = true
      if (!updateTime) this.songList = []
      if (cat === '精品') {
        //获取精品歌单，访问的url不同
        getHighQuality('全部', limit, updateTime).then(res => {
          if (!updateTime) {
            this.songList = disposeData(res.data.playlists, 'name', 'coverImgUrl', null, 'id', 'updateTime')//数据处理
          } else {
            this.songList = this.songList.concat(disposeData(res.data.playlists, 'name', 'coverImgUrl', null, 'id', 'updateTime'))//数据处理
          }
          this.loadingShow = false
        })
      } else {
        getSongList(cat, limit, updateTime, offset).then(res => {
          if (!offset) {
            this.offset = 12
            this.songList = disposeData(res.data.playlists, 'name', 'coverImgUrl', null, 'id', 'updateTime')//数据处理
          } else {
            this.songList = this.songList.concat(disposeData(res.data.playlists, 'name', 'coverImgUrl', null, 'id', 'updateTime'))//数据处理
          }
          this.loadingShow = false
        })
      }
    },
    changeActive(num) {
      this.activeNum = num
    },

    //获取瀑布流数据 
    waterFall(load) {
      let flag = true
      // let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      // let scrollTop = window.pageYOffset || document.documentElement.scrollTop
      // if (scrollTop + clientHeight >= document.body.offsetHeight) {
        let len = this.songList.length -1
        if (flag) {
          flag = false
          this._getSongList(this.cat, 18, this.songList[len].updateTime, this.offset, load)
          this.offset += 18
          flag = true
        }
      // }
    },
    loadData() {
      this.waterFall(true)
    }
  },
  created() {
    this._getSongList('精品', 12)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
  .head
    position: relative
    width: 100%
    height: .5rem
    .back-icon
      position: absolute
      top: 50%
      left: .1rem
      transform: translateY(-50%)
      font-size: $font-size-large
      font-weight: bold
      vertical-align: middle
    .title
      display: inline-block
      width: 100%
      text-align: center
      font-size: $font-size-large
      line-height: .5rem
      vertical-align: middle
  .nav-bar
    display: flex
    justify-content: space-around
    padding: 0 .1rem
    .nav-item
      display: inline-block
      padding: .1rem 0
      font-size: $font-size-medium
      color: $color-text-d
    .nav-item-active
      color: $color-text
      border-bottom: .02rem solid $color-text
  .content-wrapper
    position: absolute
    width: 100%
    top: .86rem
    bottom: 0
    overflow: hidden
    .song-list-container
      position: relative
      display: flex
      justify-content : space-around
      flex-wrap: wrap
      margin: 0 .05rem
      font-size: 0
      .song-list-wrap
        box-sizing: border-box
        width: 30%
        margin: .1rem 1% 0
        .song-list-img-wrap
          position: relative;
          width: 100%;
          padding-top: 100%;
          border-radius: .05rem;
          overflow: hidden;
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
        h3
          width: 100%
          line-height: .18rem
          margin: .08rem 0
          font-size: $font-size-medium
          no-wrap-two()
    .loading-container-end
      margin: .05rem auto
  .loading-container
    position: fixed
    left: 50%
    top: 40%
    transform: translateX(-50%)

</style>
