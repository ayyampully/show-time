const getters = {
  /**
   * Returns movies collection
   * @param {VuexStore} state 
   * @returns movies collection
   */
  getMovies(state) {
    return state.filteredMovies
  },
  /**
   * Simply assigning medium size image from array
   * getting bigger size image for small screen as the tile will be bigger
   * @param {VuexStore} state
   * @returns image url appended with size
   */
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