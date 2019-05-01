export class DisposeSongData {
  constructor(songName, picUrl, singerMes, id) {
    this.songName = songName
    this.picUrl = picUrl
    this.singerMes = singerMes
    this.id = id
  }
}

export function getsingerMes (artists, album) {
  return artists[0].name + ' - ' + album
}