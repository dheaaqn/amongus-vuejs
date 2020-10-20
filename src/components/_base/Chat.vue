<template>
  <div>
    <div class="none" v-if="!isSelected">
      <p>Please select a chat to start messaging</p>
    </div>
    <b-container class="room" v-else>
      <div class="room-header">
        <b-row class="room-header-row">
          <b-col cols="1" class="rooms-pict" align-self="center">
            <b-img :src="url + '/' + room.user_image" />
          </b-col>
          <b-col cols="10" align-self="center">
            <p class="room-name">{{ room.user_name }}</p>
            <p class="room-status" v-if="typing">
              {{ typing }} is typing message...
            </p>
            <p class="room-status" v-else>Online</p>
          </b-col>
          <b-col cols="1" align-self="center">
            <b-button
              style="border: transparent; background: transparent"
              @click="clearChat"
            >
              <b-img :src="require('../../assets/icon/profile-menu.png')" />
            </b-button>
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

  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Chat',
    data() {
      return {
        socket: io(process.env.VUE_APP_URL),
        typing: false,
        url: process.env.VUE_APP_URL
      }
    },
    components: {
      InputMessage
    },
    methods: {
      ...mapMutations(['pushMessages', 'setMessages']),
      handleSendMessage(data) {
        const dataMessage = {
          msg_body: data.msg,
          msg_sender_id: this.room.sender_id,
          msg_receiver_id: this.room.receiver_id,
          room_id: this.room.room_id
        }
        this.socket.emit('sendMessage', dataMessage, (data) => {
          this.pushMessages(data)
        })
        this.socket.emit('sendNotification', dataMessage)
      },
      makeToast(msg, title, variant) {
        this.$bvToast.toast(msg, {
          title: title,
          variant: variant,
          solid: true
        })
      },
      clearChat() {
        this.setMessages('')
        this.makeToast('Clear history chat', 'Clear chat', 'warning')
      }
    },
    computed: {
      ...mapGetters({
        userId: 'getUserId',
        room: 'getRoom',
        messages: 'getMessage',
        isSelected: 'getIsSelected'
      })
    },
    mounted() {
      this.socket.emit('joinRoom', this.room.room_id)
      this.socket.on('typingMessage', (data) => {
        if (data.user_id !== this.userId) {
          if (data.status_typing) {
            this.typing = data.user_name
          } else {
            this.typing = false
          }
        }
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

  .room-header-row .rooms-pict img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
  }

  .room-header .col-10 {
    padding-left: 30px;
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
