import axios from 'common/js/axios'

export function getSongUrl(id) {
  let url = 'api/song/url?id=' + id
  console.log(url)
  return axios(url)
}
export function getSongLyric(id) {
  let url = 'api/lyric?id=' + id
  return axios(url)
}