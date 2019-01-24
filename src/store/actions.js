import _ from 'lodash'
import DataService from '../service/DataService'
let moviesCopy = []

const actions = {
  async getMovies(store) {
    const { data } = await DataService.getMovies()
    const { results } = data
    results.sort((a, b) => {
      if (a.popularity < b.popularity) {
        return 1
      } else if (a.popularity > b.popularity) {
        return -1
      }
      return 0;
    })
    moviesCopy = results.slice()
    store.commit('updateMovies', results)
  },
  async getImageConfig(store) {
    const { data } = await DataService.getImageConfig()
    const { images } = data
    store.commit('updateImageConfig', images)
  },
  async getGenreList(store) {
    let uniqueGenres = new Set();
    store.state.filteredMovies.forEach(movie => {
      movie.genre_ids.forEach(genre => {
        uniqueGenres.add(genre);
      });
    });
    const { data } = await DataService.getGenreList()
    const { genres } = data
    let mappedObj = {}
    uniqueGenres.forEach(id => {
      const { name } = _.find(genres, { id });
      mappedObj[`id_${id}`] = name
    })
    store.commit('updateGenres', mappedObj)
  },
  filterMovies(store, filters) {
    const { rating, genres } = filters
    let moviesToFilter = moviesCopy.slice()
    moviesToFilter = moviesToFilter.filter(movie => movie.vote_average >= rating)
    genres.forEach(key => {
      moviesToFilter = moviesToFilter.filter(movie => movie.genre_ids.includes(key))
    })
    store.commit('updateMovies', moviesToFilter)
  }
}

export default actions