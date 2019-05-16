<template>
  <transition name="col-fade">
    <div id="rank">
      <div class="head">
        <router-link to="/" tag="span" class="back-icon iconfont">&#xe602;</router-link><h2 class="title">未知榜单</h2>
      </div>
      <scroll class="content-wrapper" ref="scroll" :data="rankData">
        <div class="rank-container recommend-rank" ref="ranklist">
          <div class="rank-title" v-show="!loadingShow">推荐榜</div>
          <div class="rank-item-wrap" v-show="!loadingShow">
            <div class="rank-item"
              v-for="item of recommendRank"
              :key="item.id"
              @click="rankItemClick(item)"
              >
              <img class="rank-img" v-lazy="item.picUrl + '?param=200y200'">
              <div class="item-song-wrap">
                <p class="item-song" v-for="track of item.tracks" :key="track.id">{{ track.name + ' - ' + track.singer }}</p>
              </div>
            </div>
          </div>
          <div class="rank-title" v-show="!loadingShow">个性榜</div>
          <div class="rank-item-wrap indivi-rank" v-show="!loadingShow">
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
      <div class="loading-container" v-show="loadingShow">
        <loading></loading>
      </div>
      <transition name="playlist">
        <router-view></router-view>
      </transition>
    </div>
  </transition>
</template>

<script type="text/javascript">
import {getRankList} from 'api/rank'
import {createSongList, createSong} from 'common/js/packData'
import {getSongListDetail} from 'api/songList'
import Loading from 'base/loading/Loading'
import Scroll from 'base/scroll/Scroll'
import {mapMutations} from 'vuex'
import {listMixin} from 'common/js/mixin'

export default {
  mixins: [listMixin],
  name: 'Rank',
  components: {
    Loading,
    Scroll
  },
  data() {
    return {
      rankData: [],
      recommendRank: [],
      indiviRank: [],
      loadingShow: true
    }
  },
  methods: {
    ...mapMutations({
      setSongList: 'SET_SONGLIST'
    }),
    _getRankList() {
      getRankList().then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          let resList = res.data.list
          resList.forEach((item) => {
            let resListData = createSongList(item)
            this.rankData.push(resListData)
          })
          this.recommendRank = this.rankData.slice(0, 5)
          this.indiviRank = this.rankData.slice(5, 23)
          this.recommendRankTrack(this.recommendRank)
        }
      })
    },
    recommendRankTrack(td) {
      let count = 0
      td.forEach((item) => {
        getSongListDetail(item.id).then(res => {
          let originTracks = res.data.playlist.tracks.slice(0, 3)
          let recomendData = []
          originTracks.forEach(song => {
            let tracksData = createSong(song)
            recomendData.push(tracksData)
          })
          item.tracks = recomendData
          count++
          console.log(count)
          if (count >= 5) {
            console.log(count)
            this.loadingShow = false
          }
        })
      })
    },
    rankItemClick(rankList) {
      this.$router.push({
        path: `/rank/${rankList.id}`
      })
      this.setSongList(rankList)
    },
    list(playList) {
      const bottom = playList.length > 0 ? '.5rem' : ''
      this.$refs.ranklist.style['padding-bottom'] = bottom
      this.$refs.scroll.refresh()
    }
  },
  created() {
    this._getRankList()
  }
}
</script>

<style lang="stylus" rel="stylesheet" scoped>
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
