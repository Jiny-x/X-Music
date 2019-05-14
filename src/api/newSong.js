import axios from 'common/js/axios'

export function getRecommendNewSong () {
  const url = '/personalized/newsong'
  return axios(url)
}