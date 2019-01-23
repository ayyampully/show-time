import API from './API'

const API_KEY = 'd7f4f60a1d9f39b3cba4a3ca239c05a5'
export default {
  getMovies() {
    return API().get(`/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
  },
  getImageConfig() {
    return API().get(`/configuration?api_key=${API_KEY}`)
  },
  getGenreList() {
    return API().get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
  }
}