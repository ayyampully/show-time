import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import DataService from '../service/DataService'

Vue.use(Vuex)
let moviesCopy = []
export default new Vuex.Store(
  {
    state: {
      filteredMovies: [],
      genres: {},
      imageUrl: '',
      availbleSizes: []
    },
    mutations: {
      updateMovies(state, movies) {
        state.filteredMovies = movies
      },
      updateGenres(state, genres) {
        state.genres = genres
      },
      updateUniqueGenreIds(state, uniqueGenreIds) {
        state.uniqueGenreIds = uniqueGenreIds
      },
      updateImageConfig(state, images) {
        state.imageUrl = images.base_url
        state.availbleSizes = images.poster_sizes
      }
    },
    actions: {
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
    },
    getters: {
      getMovies(state) {
        return state.filteredMovies
      },
      getImageUrl(state) {
        let imageSize = state.availbleSizes[3]
        if (window.innerWidth <= 600) {
          imageSize = state.availbleSizes[4]
        }
        if (!imageSize) imageSize = state.availbleSizes[1]
        return state.imageUrl + imageSize
      },
      getGenreList(state) {
        return state.genres
      }
    }
  }
)