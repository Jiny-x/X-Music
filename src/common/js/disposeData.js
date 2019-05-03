
export function getsingerMes (artists, album) {
  return artists[0].name + ' - ' + album
}

export function disposeData(resultData, name, picUrl, singerMes, id, updateTime = null) {
  let newData = []
  resultData.forEach(item => {
    newData.push(new ObjData(item[name], item[picUrl], item[singerMes], item[id], item[updateTime]))
  })
  return newData
}

export class ObjData {
  constructor(name, picUrl, singerMes, id, updateTime) {
    this.name = name
    this.picUrl = picUrl
    this.singerMes = singerMes
    this.id = id
    this.updateTime = updateTime
  }
}