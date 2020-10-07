import axios from 'axios'
import router from '../../router'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state, payload) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/users/login', payload)
          .then(response => {
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response.data.message)
          })
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/users/register', payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.message)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      sessionStorage.clear()
      context.commit('delUser')
      router.push('/login')
    },
    interceptorRequest(context) {
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          console.log(error.response)
          if (error.response.status === 403) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature'
            ) {
              localStorage.removeItem('token')
              sessionStorage.clear()
              context.commit('delUser')
              router.push('/login')
              alert(
                'Maaf token anda salah dan anda tidak bisa melanjutkan di halaman ini !'
              )
            } else if (error.response.data.msg === 'jwt expired') {
              localStorage.removeItem('token')
              sessionStorage.clear()
              context.commit('delUser')
              router.push('/login')
              alert('Maaf token session anda telah habis !')
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    setUser(state) {
      return state.user
    },
    getUserId(state) {
      return state.user.user_id
    }
  }
}
