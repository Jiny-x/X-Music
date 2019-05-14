import axios from 'common/js/axios'

export function getSongUrl(id) {
  if (!id) { return }
  let url = '/song/url?id=' + id
  return axios(url)
}
export function getSongLyric(id) {
  if (!id) { return }
  let url = '/lyric?id=' + id
  return axios(url)
}