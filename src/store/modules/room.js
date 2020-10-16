import axios from 'axios'

export default {
  state: {
    listRoom: {},
    roomId: '',
    room: {},
    messages: [],
    isSelected: false
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
    },
    setMessages(state, payload) {
      state.messages = payload
    },
    pushMessages(state, payload) {
      state.messages.push(payload)
    },
    setSelectedRoom(state, payload) {
      state.isSelected = payload
    }
  },
  actions: {
    getListRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/room/list/${payload}`)
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
          .get(`${process.env.VUE_APP_URL}/room/byid?room_id=${payload.room_id}&sender_id=${payload.sender_id}`)
          .then(response => {
            context.commit('setRoom', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getMessageByRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/message/${payload}`)
          .then(response => {
            context.commit('setMessages', response.data.data)
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
    },
    getMessage(state) {
      return state.messages
    },
    getIsSelected(state) {
      return state.isSelected
    }
  }
}
