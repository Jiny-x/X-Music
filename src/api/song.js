import axios from 'common/js/axios'

export function getSongUrl(id) {
  let url = 'api/song/url?id=' + id
  console.log(url)
  return axios(url)
}