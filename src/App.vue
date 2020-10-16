<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'App',
  data() {
    return {
      socket: io(process.env.VUE_APP_URL)
    }
  },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse']),
    makeToast(msg, title, variant) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  },
  mounted() {
    this.socket.on('showNotification', (data) => {
      this.makeToast(`${data.msg_body}`, 'PING', 'info')
      console.log(data)
    })
  }
}
</script>

<style></style>
