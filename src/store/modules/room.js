import axios from 'axios'

export default {
  state: {
    listRoom: {},
    roomId: '',
    room: {}
  },
  mutations: {
    setListRoom(state, payload) {
      state.listRoom = payload
    },
    setRoom(state, payload) {
      state.room = payload
    },
    setRoomId(state, payload) {
      state.roomId = payload
      console.log(state.roomId)
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
    },
    getRoomById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:3000/room/byid?room_id=${payload.room_id}&sender_id=${payload.sender_id}`)
          .then(response => {
            context.commit('setRoom', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    getAllRoom(state) {
      return state.listRoom
    },
    getRoom(state) {
      return state.room
    },
    getRoomId(state) {
      return state.roomId
    }
  }
}
