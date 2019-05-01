import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/Home'
import Rank from 'components/rank/Rank'
import Search from 'components/search/Search'
import Singer from 'components/singer/Singer'
import SongList from 'components/song-list/Song-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/song-list',
      name: 'Song-list',
      component: SongList
    }
  ]
})
