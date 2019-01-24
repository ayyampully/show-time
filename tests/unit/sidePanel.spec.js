import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SidePanel from '../../src/components/SidePanel.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Configurations BIT', () => {
  const id_1 = 'Action'
  const id_2 = 'Adventure'
  const id_3 = 'Comedy'
  let getters = {
    getGenreList: () => {
      return {
        id_1,
        id_2,
        id_3
      }
    },
  }

  let store = new Vuex.Store({
    getters
  })
  const wrapper = shallowMount(SidePanel, { store, localVue })

  it('should have a default value 3 for rating', () => { 
    let rating = wrapper.find('p.selected')
    expect(rating.text()).toBe('Rating: 3 - 10')
  })

  it('should change the rating value', () => {
    wrapper.setData({ rating: 6 })
    let rating = wrapper.find('p.selected')
    expect(rating.text()).toBe('Rating: 6 - 10')
  })

  it('should have all genres rendered properly', () => {
    let genres = wrapper.findAll('.genre label')
    expect(genres.at(0).text()).toBe(id_1)
    expect(genres.at(1).text()).toBe(id_2)
    expect(genres.at(2).text()).toBe(id_3)
  })
})