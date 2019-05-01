import axios from 'common/js/axios'
export function getRecommend () {
  const url = '/api/personalized'
  let param = {
    limit: 6
  }
  return axios(url, param)
}