export class SongListData {
  constructor({name, id, picUrl, updateTime = null, tracks}) {
    this.name = name
    this.picUrl = picUrl
    this.id = id
    this.updateTime = updateTime
    this.tracks = tracks
  }
}
export function ceratSongList(playlists) { // 包装歌单数据
  return new SongListData({
    name: playlists.name,
    picUrl: playlists.coverImgUrl,
    id: playlists.id,
    updateTime: playlists.updateTime,
    tracks: playlists.tracks
  })
}

export class SongData {
  constructor({name, id, singer, songUrl, picUrl, album, duration}) {
    this.name = name
    this.id = id
    this.singer = singer
    this.songUrl = songUrl
    this.picUrl = picUrl
    this.album = album
    this.duration = duration
  }
}

export function createSong(songList) { // 包装歌曲数据
  return new SongData({
    name: songList.name,
    id: songList.id,
    singer: proceSinger(songList.ar),
    picUrl: songList.al.picUrl,
    songUrl: songList.url,
    album: songList.al.name,
    duration: songList.dt
  })
}
function proceSinger(singer) {
  let arr = []
  if (!singer) return ''
  singer.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}