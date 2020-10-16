<template>
  <b-row>
    <b-col cols="11">
      <b-form-input
        ref="inputMsg"
        v-model="message"
        @keyup.enter="handleMessage"
        placeholder="Type your message..."
      ></b-form-input>
    </b-col>
    <b-col cols="1">
      <b-button @click="handleMessage">
        <b-img :src="require('../../assets/icon/send.png')" />
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'InputMessage',
  data() {
    return {
      socket: io(process.env.VUE_APP_URL),
      message: ''
    }
  },
  methods: {
    handleMessage() {
      this.$emit('sendMessage', { msg: this.message, dom: this.$refs.inputMsg })
      this.message = ''
      this.$refs.inputMsg.focus()
    }
  },
  watch: {
    message(value) {
      value ? this.socket.emit('typing', {
        user_id: this.user.user_id,
        user_name: this.user.user_name,
        room_id: this.roomId,
        status_typing: true
      }) : this.socket.emit('typing', {
        user_id: this.user.user_id,
        user_name: this.user.user_name,
        room_id: this.roomId,
        status_typing: false
      })
    }
  },
  computed: {
    ...mapGetters({ roomId: 'getRoomId', user: 'setUser' })
  }
}
</script>

<style scoped>
.input-c input {
  margin: 20px auto;
  background-color: #fafafa;
  border-radius: 15px;
}

.input-c button {
  margin: 20px auto;
  background: #7e98df;
  border: none;
  border-radius: 15px;
}

.input-c button:hover {
  background: #6987da;
}

.input-c button:active,
.input-c button:focus {
  background: #5277db !important;
}

@media screen and (max-width: 425px){
  .col-11 {
    max-width: 350px;
  }
}

@media screen and (max-width: 375px){
  .col-11 {
    max-width: 310px;
  }
}

@media screen and (max-width: 320px){
  .col-11 {
    max-width: 245px;
  }
}
</style>
