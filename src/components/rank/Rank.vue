<template>
  <transition name="col-fade">
    <div id="rank">
      <div class="head">
        <router-link to="/" tag="span" class="back-icon iconfont">&#xe602;</router-link><h2 class="title">未知榜单</h2>
      </div>
      <scroll class="content-wrapper">
        <div class="rank-container recommend-rank">
          <div class="rank-title">推荐榜</div>
          <div class="rank-item-wrap">
            <div class="rank-item"
              v-for="item of recommendRank"
              :key="item.id"
              @click="rankItemClick(item)"
              >
              <img class="rank-img" v-lazy="item.picUrl + '?param=200y200'">
              <div class="item-song-wrap">
                <p class="item-song" v-for="(track,index) of item.lessTrack" :key="index">{{ track }}</p>
              </div>
            </div>
          </div>
          <div class="rank-title" v-show="this.recommendRank.length">个性榜</div>
          <div class="rank-item-wrap indivi-rank">
            <div class="indivi-rank-item"
            v-for="item of indiviRank"
            :key="item.id"
            @click="rankItemClick(item)"
            >
              <img class="rank-img" v-lazy="item.picUrl + '?param=100y100'">
              <p class="rank-name">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </scroll>
      <div class="loading-container" v-show="!this.recommendRank.length">
        <loading></loading>
      </div>
      <transition name="playlist">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script>
import {getRankList} from 'api/rank'
import {createSongList} from 'common/js/packData'
import Loading from 'base/loading/Loading'
import Scroll from 'base/scroll/Scroll'
import {mapMutations} from 'vuex'

export default {
  name: 'Rank',
  components: {
    Loading,
    Scroll
  },
  data() {
    return {
      rankData: [],
      recommendRank: [],
      indiviRank: []
    }
  },
  methods: {
    ...mapMutations({
      setSongList : 'SET_SONGLIST'
    }),
    _getRankList() {
      let recommendIdx = [0, 1, 2, 3, 4]
      let indiviIdx = [17, 8, 10, 7, 6, 21, 15, 18, 22, 5, 9, 19]
      this.mapRequet(recommendIdx, true)
      this.mapRequet(indiviIdx)
    },
    mapRequet(arr, chosen) {
      let newData = []
      let resData = []
      let count = 0
      arr.map((item, index) => {
        getRankList(item).then(res => {
          if (res.status === 200 && res.statusText === 'OK') {
            console.log(res.data)
            
            resData.push(res.data)
            // console.log(res)
            count++
            if (count === arr.length) {
              console.log(resData)
              resData.forEach(item => {
                console.log(item)
                newData.push(createSongList(item.playlist))
                console.log(newData)
              })
              console.log(newData)
              // console.log(newData)
              for (let i = 0; i < 5; i++) {
                let item = newData[i]
                let lessTrack = []
                for (let i = 0; i < 3; i++) {
                  lessTrack.push(item.tracks[i].name + ' - ' + item.tracks[i].ar[0].name)
                }
                item.lessTrack = lessTrack
                // console.log(item)
              }
              count = 0
              chosen ? this.recommendRank = newData : this.indiviRank = newData
              console.log(this.recommendRank)
              console.log(this.indiviRank)
              // console.log(newData)
            }
          }
        })
      })
    },
    rankItemClick(rankList) {
      this.$router.push({
        path: `/rank/${rankList.id}`
      })
      this.setSongList(rankList)
    }
  },
  created() {
    this._getRankList()
  },
  mounted() {
    console.log('mounted')
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/styles/variable'
  @import '~common/styles/mixin'
  .col-fade-enter-active, .col-fade-leave-active
    transition: all .5s
  .col-fade-enter, .col-fade-leave-to
    transform: translateY(100%)
    opacity: 0
  #rank
    position: relative
    height: 100%
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
    .content-wrapper
      position: absolute
      width: 100%
      top: .5rem
      bottom: 0
      overflow: hidden
    .rank-title
      margin-left: .2rem
      line-height: .5rem
    .rank-item
      overflow: hidden
      height: .9rem
      margin: 0 .1rem .2rem
      .rank-img
        float: left
        width: .9rem
        border-radius: .1rem
      .item-song-wrap
        height: .9rem
        width: 62%
        margin-left: 1.05rem
        line-height: .3rem
        .item-song
          font-size: $font-size-small
          no-wrap()
    .indivi-rank
      overflow: hidden
      display: flex
      flex-wrap: wrap
      justify-content: space-around
      margin: .1rem
      .indivi-rank-item
        width: 30%
        margin: 0 0 .1rem
        .rank-img
          width: .9rem
          border-radius: .1rem
        .rank-name
          padding: .05rem 0
          line-height: .2rem
          font-size: $font-size-medium
          no-wrap-two()
  .loading-container
      position: fixed
      left: 50%
      top: 30%
      transform: translateX(-50%)
  .playlist-enter-active
    transition: all .5s
  .playlist-leave-active
    transition: all .2s
  .playlist-enter, .playlist-leave-to
    transform: translateY(100%)
    opacity: 0
</style>
