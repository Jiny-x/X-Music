import axios from 'common/js/axios'

export function getRankList(idx) {
  let url = '/top/list'
  let param = {
    idx: idx
  }
  return axios(url, param)
}