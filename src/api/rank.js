import axios from 'common/js/axios'

export function getRankList(idx) {
  let url = 'api/top/list'
  let param = {
    idx: idx
  }
  return axios(url, param)
}