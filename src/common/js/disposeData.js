
export function getsingerMes (artists, album) {
  return artists[0].name + ' - ' + album
}

export function disposeData(resultData, name, picUrl, singerMes, id, updateTime, tracks) {
  let newData = []
  if (Array.isArray(resultData)) {
    resultData.forEach(item => {
      newData.push(new ObjData(item[name], item[picUrl], item[singerMes], item[id], item[updateTime], item[tracks]))
    })
  } else {
    newData.push(new ObjData(name, picUrl, singerMes, id, updateTime))
  }
  return newData
}

export class ObjData {
  constructor(name, picUrl, singerMes = null, id, updateTime = null, tracks = null) {
    this.name = name
    this.picUrl = picUrl
    this.singerMes = singerMes
    this.id = id
    this.updateTime = updateTime
    this.tracks = tracks
  }
}