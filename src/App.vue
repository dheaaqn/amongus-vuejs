<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    this.socket.emit('userJoin', this.userId)
    this.socket.on('showNotification', (data) => {
      this.makeToast(`${data.msg_body}`, 'PING', 'info')
    })
  },
  computed: {
    ...mapGetters({ userId: 'getUserId' })
  }
}
</script>

<style></style>
