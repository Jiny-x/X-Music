import axios from 'common/js/axios'

export function getSongList(cat, limit = 18, updateTime, offset) {
  let url = offset ? 'api/top/playlist?cat=' + cat + '&limit=' + limit + '&offset=' + offset : 'api/top/playlist?cat=' + cat + '&limit=' + limit
  console.log(url)
  return axios(url)
}
export function getHighQuality (limit = 18, updateTime, cat = '全部') {
  let url = updateTime ? 'api/top/playlist/highquality?cat=' + cat + '&limit=' + limit + '&before=' + updateTime : 'api/top/playlist/highquality' + '?limit=' + limit
  console.log(url)
  return axios(url)
  // return axios(url)
}
export function getSongListDetail(id) {
  let url = 'api/playlist/detail?id=' + id
  return axios(url)
}
export function getSongUrl(id) {
  let url = 'api/song/url?id=' + id
  return axios(url)
}