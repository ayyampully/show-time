import { mount } from '@vue/test-utils'
import Movie from '../../src/components/Movie.vue'

describe('Movie', () => {
  const title = 'Bumblebee'
  const id_1 = 'Action'
  const id_2 = 'Adventure'
  const vote_average = 7.6
  const wrapper = mount(Movie, {
    propsData: {
      movie: {
        title,
        original_title: title,
        genre_ids: [1, 2],
        poster_path: '',
        vote_average
      },
      genreList: {
        id_1,
        id_2
      },
      baseUrl: ''
    }
  })
  it('should have correct title', () => {
    expect(wrapper.html()).toContain(`<h4 title="${title}">${title}</h4>`)
  })
  it('should have correct genres', () => {
    const genres = wrapper.findAll('.genres span')
    expect(genres.at(0).text()).toBe(id_1)
    expect(genres.at(1).text()).toBe(id_2)
  })
  it('should have correct rating', () => {
    const rating = wrapper.find('span.rating').text()
    expect(parseFloat(rating)).toBe(vote_average)
  })

})
