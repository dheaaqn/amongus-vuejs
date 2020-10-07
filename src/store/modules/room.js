import axios from 'axios'

export default {
  state: {
    listRoom: {}
  },
  mutations: {
    setListRoom(state, payload) {
      state.listRoom = payload
    }
  },
  actions: {
    getListRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:3000/room/list/${payload}`)
          .then(response => {
            context.commit('setListRoom', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getAllRoom(state) {
      return state.listRoom
    }
  }
}
