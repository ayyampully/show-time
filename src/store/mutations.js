const mutations = {
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
}
export default mutations
