import axios from 'axios'

export default {
  state: {
    profile: {}
  },
  mutations: {
    setUserProfile(state, payload) {
      state.profile = payload
    }
  },
  actions: {
    getUserProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/users/${payload}`)
          .then(response => {
            context.commit('setUserProfile', response.data.data[0])
            resolve(response.data.data[0])
          })
          .catch(error => {
            reject(error.response.data.message)
          })
      })
    },
    patchUserProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/update/profile/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            context.commit('setUserProfile', response.data.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchLocation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/update/location/${payload.user_id}`,
            payload.user_data
          )
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchProfilePict(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_URL}/users/update/image/${payload.user_id}`, payload.user_data).then(response => {
          resolve(response.data.data)
        }).catch(error => {
          reject(error.response.data.message)
        })
      })
    },
    deleteProfilePict(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_URL}/users/delete/image/${payload.user_id}`).then(response => {
          resolve(response.data.data)
        }).catch(error => {
          reject(error.response.data.message)
        })
      })
    }
  },
  getters: {
    getProfile(state) {
      return state.profile
    }
  }
}
