import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/Home'
import Rank from 'components/rank/Rank'
import Search from 'components/search/Search'
import Singer from 'components/singer/Singer'
import SongListSquare from 'components/song-list-square/Song-list-square'
import Playlist from 'components/playlist/Playlist'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: 'personalized/:id',
        component: Playlist
      }]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children: [{
        path: ':id',
        component: Playlist
      }]
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
      path: '/song-list-square',
      name: 'Song-list-square',
      component: SongListSquare,
      children: [{
        path: ':id',
        component: Playlist
      }]
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist
    }
  ]
})
