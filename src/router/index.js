import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import('components/home/Home').then((Home) => {
    resolve(Home)
  })
}

const Rank = (resolve) => {
  import('components/rank/Rank').then((Rank) => {
    resolve(Rank)
  })
}

const Singer = (resolve) => {
  import('components/singer/Singer').then((Singer) => {
    resolve(Singer)
  })
}

const SongListSquare = (resolve) => {
  import('components/song-list-square/Song-list-square').then((SongListSquare) => {
    resolve(SongListSquare)
  })
}

const Playlist = (resolve) => {
  import('components/playlist/Playlist').then((Playlist) => {
    resolve(Playlist)
  })
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
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
