import axios from 'axios'
export function getBanner () {
  const url = '/banner'
  console.log(url)
  return axios(url)
}
