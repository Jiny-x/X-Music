import axios from 'common/js/axios'

export function getRecommendNewSong () {
  const url = '/api/personalized/newsong'
  return axios(url)
}