import axios from 'axios'
export function getBanner () {
  const url = '/api/banner'
  return axios(url)
}
