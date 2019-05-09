
export function getsingerMes (artists, album) {
  return artists[0].name + ' - ' + album
}

export class ObjData {
  constructor(name, picUrl, singerMes, id, url) {
    this.name = name
    this.picUrl = picUrl
    this.singerMes = singerMes
    this.id = id
    this.songUrl = url
  }
}
function proceSinger(singer) {
  let arr = []
  if (!singer) return ''
  singer.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}