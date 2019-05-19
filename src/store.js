import Vue from 'vue'
import Vuex from 'vuex'
import { Data } from './api/api'
import { _get } from './lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null
  },
  mutations: {
    setTableUsers (state, { response }) {
      const table = _get(response, 'body')

      if (table) state.users = table
    }
  },
  actions: {
    async getTableUsers ({ commit }) {
      let response = await Data.getTableUsers()

      commit('setTableUsers', { response })
    }
  }
})