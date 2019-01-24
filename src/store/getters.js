const getters = {
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
export default getters