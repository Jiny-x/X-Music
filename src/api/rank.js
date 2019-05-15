import axios from 'common/js/axios'

export function getRankList() {
  let url = '/toplist'
  // let param = {
  //   idx: idx
  // }
  return axios(url)
}