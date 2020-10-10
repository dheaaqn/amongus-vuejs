<template>
  <div>
    <div class="none" v-if="!isSelected">
      <p>Please select a chat to start messaging</p>
    </div>
    <b-container class="room" v-else>
      <div class="room-header">
        <b-row class="room-header-row">
          <b-col cols="1" class="rooms-pict" align-self="center">
            <b-img
              :src="'http://127.0.0.1:3000/' + room.user_image"
              style="width: 64px; height: 64px"
            />
          </b-col>
          <b-col cols="10" align-self="center">
            <p class="room-name">{{ room.user_name }}</p>
            <p class="room-status">online</p>
          </b-col>
          <b-col cols="1" align-self="center">
            <b-img :src="require('../../assets/icon/profile-menu.png')" />
          </b-col>
        </b-row>
      </div>
      <div id="chat-c">
        <b-container v-for="(message, index) in messages" :key="index">
          <b-row v-if="userId === message.msg_sender_id" align-h="end">
            <div class="receiver">
              {{ message.msg_body }}
            </div>
          </b-row>
          <b-row v-else align-h="start">
            <div class="sender">
              {{ message.msg_body }}
            </div>
          </b-row>
        </b-container>
      </div>
      <b-container class="input-c">
        <InputMessage @sendMessage="handleSendMessage" />
      </b-container>
    </b-container>
  </div>
</template>

<script>
import io from 'socket.io-client'
import InputMessage from './InputMessage'

import { mapGetters } from 'vuex'

export default {
  name: 'Chat',
  data() {
    return {
      socket: io('http://localhost:3000'),
      isSelected: true,
      messages: []
    }
  },
  components: {
    InputMessage
  },
  methods: {
    handleSendMessage(data) {
      const dataMessage = {
        msg_body: data.msg,
        msg_sender_id: this.room.sender_id,
        msg_receiver_id: this.room.receiver_id,
        room_id: this.room.room_id
      }
      this.socket.emit('sendMessage', dataMessage, (data) => {
        this.messages.push(data)
      })
    }
  },
  computed: {
    ...mapGetters({ userId: 'getUserId', room: 'getRoom' })
  },
  mounted() {
    this.socket.emit('privateMessage', this.room.room_id)

    this.socket.on('chatMessage', (data) => {
      this.messages.push(data)
    })
  }
}
</script>

<style scoped>
.room {
  padding: 0;
}

.room-header {
  height: 98px;
}

.room-header-row {
  padding: 1rem;
}

.room-name {
  font-size: 18px;
  line-height: 21px;
  letter-spacing: -0.165px;
  color: #232323;
  margin: 0 auto;
}

.room-status {
  font-size: 15px;
  line-height: 18px;
  letter-spacing: -0.165px;
  color: #7e98df;
  margin: 0 auto;
}

#chat-c {
  background-color: #eeeeee;
  padding: 1rem;
  min-height: 70vh;
  max-height: 70vh;
  overflow-y: auto;
}

.sender,
.receiver {
  font-size: 15px;
  line-height: 185.17%;
  padding: 10px 20px;
  margin: 8px;
  max-width: 290px;
}

.sender {
  border-radius: 35px 35px 35px 10px;
  background: #7e98df;
  color: #ffffff;
}

.receiver {
  border-radius: 35px 35px 10px 35px;
  background: #ffffff;
  color: #232323;
}

.none {
  height: 100vh;
  background: #fafafafa;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
