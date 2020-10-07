import axios from 'axios'

export default {
  state: {
    roomId: 1,
    msg: []
  },
  mutations: {
    setMessage(state, payload) {
      state.msg = payload
    }
  },
  actions: {
    getPrivateMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:3000/message/${context.state.roomId}`)
          .then(response => {
            context.commit('setMessage', response.data.data)
          })
          .catch(error => {
            reject(error.response.data.message)
          })
      })
    }
  },
  getters: {
    getMessage(state) {
      return state.msg
    }
  }
}
