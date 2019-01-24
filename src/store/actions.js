import _ from 'lodash'
import DataService from '../service/DataService'
let moviesCopy = []

const actions = {
  /**
   * Will fetch data and do sorting based on popularity.
   * creates a copy to do filtering and update store
   * @param {VuexSore} store 
   */
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
  /**
   * Gets image configurations and update store
   * @param {VuexSore} store 
   */
  async getImageConfig(store) {
    const { data } = await DataService.getImageConfig()
    const { images } = data
    store.commit('updateImageConfig', images)
  },
  /**
   * create uniqueGenres as a object with count
   * fetch genere list and create mappedObj with genre name 
   * @param {VuexStore} store 
   */
  async getGenreList(store) {
    let uniqueGenres = {};
    store.state.filteredMovies.forEach(movie => {
      movie.genre_ids.forEach(genre => {
        if (uniqueGenres[genre]) {
          uniqueGenres[genre].count += 1
        } else {
          uniqueGenres[genre] = {
            id: genre,
            count: 1
          }
        }
      });
    });
    const { data } = await DataService.getGenreList()
    const { genres } = data
    let mappedObj = {}
    for (let key in uniqueGenres) {
      const { id, count } = uniqueGenres[key]
      const { name } = _.find(genres, { id });
      mappedObj[`id_${id}`] = {
        id,
        count,
        name
      }
    }
    store.commit('updateGenres', mappedObj)
  },
  /**
   * Works as a getter by doing filtering on the copied movies list.
   * doing AND filtering by assiging moviesToFilter to itself
   * commits the result to store to update list
   * @param {VuexStore} store 
   * @param {Object} filters 
   */
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