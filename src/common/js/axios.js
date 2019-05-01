import originAxios from 'axios'
export default function axios(url, param) {
  url += (url.indexOf('?') === -1 ? '?' : '&') + hashData(param)
  return originAxios.get(url)
}
function hashData(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}