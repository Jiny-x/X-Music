import axios from 'common/js/axios'

export function getSongList(cat, limit = 18, updateTime, offset) {
  let url = offset ? 'api/top/playlist?cat=' + cat + '&limit=' + limit + '&offset=' + offset : 'api/top/playlist?cat=' + cat + '&limit=' + limit
  console.log(url)
  return axios(url)
}
export function getHighQuality (cat = '全部', limit = 18, updateTime) {
  let url = updateTime ? 'api/top/playlist/highquality?cat=' + cat + '&limit=' + limit + '&before=' + updateTime : 'api/top/playlist/highquality' + '?limit=' + limit
  console.log(url)
  return axios(url)
}
export function getCatList() {
  let url = 'api/playlist/catlist'
  return axios(url)
}