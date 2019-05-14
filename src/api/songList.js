import axios from 'common/js/axios'

export function getSongList(cat, limit = 18, updateTime, offset) {
  let url = offset ? '/top/playlist?cat=' + cat + '&limit=' + limit + '&offset=' + offset : '/top/playlist?cat=' + cat + '&limit=' + limit
  console.log(url)
  return axios(url)
}
export function getHighQuality (limit = 18, updateTime, cat = '全部') {
  let url = updateTime ? '/top/playlist/highquality?cat=' + cat + '&limit=' + limit + '&before=' + updateTime : '/top/playlist/highquality' + '?limit=' + limit
  console.log(url)
  return axios(url)
  // return axios(url)
}
export function getSongListDetail(id) {
  let url = '/playlist/detail?id=' + id
  return axios(url)
}
export function getSongUrl(id) {
  let url = '/song/url?id=' + id
  return axios(url)
}