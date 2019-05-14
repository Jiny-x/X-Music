import axios from 'common/js/axios'
export function getRecommend () {
  const url = '/personalized'
  let param = {
    limit: 9
  }
  return axios(url, param)
}