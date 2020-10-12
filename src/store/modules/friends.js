import axios from 'axios'

export default {
  state: {
    searchedUser: [],
    friends: [],
    listFriend: [],
    room: ''
  },
  mutations: {
    setSearchedUser(state, payload) {
      state.searchedUser = payload
    },
    setFriends(state, payload) {
      state.friends = payload
    },
    setListFriend(state, payload) {
      state.listFriend = payload
    }
  },
  actions: {
    searchUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/users/search?email=${payload}`)
          .then(response => {
            context.commit('setSearchedUser', response.data.data[0])
            resolve(response.data.data[0])
          })
          .catch(error => {
            reject(error.response.data.message)
          })
      })
    },
    addFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/friend/add`, payload)
          .then(response => {
            context.commit('setFriends', response.data)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getListFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/friend/list/${payload}`)
          .then(response => {
            context.commit('setListFriend', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            console.log(error.response.message)
          })
      })
    },
    createRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/room/create`, payload)
          .then(response => {
            context.commit('setRoom', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getSearchedUser(state) {
      return state.searchedUser
    },
    getListFriends(state) {
      return state.listFriend
    }
  }
}
