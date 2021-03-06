import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import Auth from './modules/auth'
import Friend from './modules/friends'
import Profile from './modules/profile'
import Room from './modules/room'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Friend,
    Profile,
    Room
  },
  plugins: [
    createPersistedState({
      path: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
