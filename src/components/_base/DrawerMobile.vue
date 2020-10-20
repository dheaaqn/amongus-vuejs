<template>
  <b-container style="padding: 0">
    <b-row>
      <b-col md="12">
        <b-alert
          show
          v-if="isSuccess"
          variant="success"
          dismissible
          @dismissed="closeAlert"
          >{{ this.errMsg }}!</b-alert
        >
      </b-col>
    </b-row>
    <b-row class="brand">
      <b-col md="10">
        <h1>Among Us</h1>
      </b-col>
      <b-col md="2" style="padding: 0">
        <b-dropdown
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          right
        >
          <template v-slot:button-content class="btn-menu">
            <b-img :src="require('../../assets/icon/burger-menu.png')"></b-img>
          </template>
          <b-dropdown-item to="/profile">Settings</b-dropdown-item>
          <b-dropdown-item to="/contact">Contacts</b-dropdown-item>
          <b-dropdown-item v-b-modal.modal-search-friend
            >Invite friends</b-dropdown-item
          >
          <b-dropdown-item href="#">Telegram FAQ</b-dropdown-item>
        </b-dropdown>

        <b-modal id="modal-search-friend" hide-header hide-footer>
          <b-row>
            <b-col cols="12">
              <b-alert
                show
                v-if="isError"
                variant="danger"
                dismissible
                @dismissed="closeAlert"
                >{{ this.errMsg }}!</b-alert
              >
            </b-col>
            <b-col cols="12">
              <h3>Add Friend</h3>
            </b-col>
            <b-col cols="12">
              <b-form-input
                placeholder="Search user here..."
                v-model="keyword"
                @keyup.enter="searchFriend()"
              ></b-form-input>
            </b-col>
            <b-col v-show="searched" align-self="center">
              <b-card
                tag="article"
                style="max-width: 15rem; margin: 10px auto"
                class="mb-2 text-center"
              >
                <b-img
                  :src="url + '/' + user.user_image"
                  style="
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 30px;
                  "
                ></b-img>
                <b-card-text> {{ user.user_name }} </b-card-text>
                <b-card-text> {{ user.user_email }} </b-card-text>
                <b-card-text> {{ user.user_phone }} </b-card-text>

                <b-button
                  v-show="add"
                  size="sm"
                  variant="primary"
                  @click="addToFriend"
                  >Add to Friend</b-button
                >
              </b-card>
            </b-col>
          </b-row>
        </b-modal>
      </b-col>
    </b-row>

    <b-row class="searchadd">
      <b-col md="9">
        <b-form-input placeholder="Type your message"></b-form-input>
      </b-col>
      <b-col md="3" align-self="center">
        <b-button>
          <b-img :src="require('../../assets/icon/plus.png')"></b-img>
        </b-button>
      </b-col>
    </b-row>

    <b-row class="chatlist">
      <b-col style="padding: 0">
        <b-list-group flush>
          <b-list-group-item
            class="d-flex align-items-center"
            v-for="(item, index) in room"
            :key="index"
            @click="selectingRoom(item)"
          >
            <b-img
              :src="'http://127.0.0.1:3000/' + item.user_image"
              rounded
              style="width: 40px; height: 40px"
              class="mr-3"
            ></b-img>
            <b-row>
              <b-col class="name text-left" md="8">{{ item.user_name }}</b-col>
              <b-col class="text-right" md="4" align-self="center">15.20</b-col>
              <b-col class="message text-left" md="8">{{
                item.user_msg
              }}</b-col>
              <b-col class="text-right" md="4">badge</b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import io from 'socket.io-client'

  export default {
    name: 'Drawer',
    data() {
      return {
        keyword: '',
        isError: false,
        searched: false,
        errMsg: '',
        isSuccess: false,
        add: false,
        socket: io(process.env.VUE_APP_URL),
        url: process.env.VUE_APP_URL
      }
    },
    created() {
      this.getListFriend(this.userId)
      this.getListRoom(this.userId)
      this.socket.on('chatMessage', (data) => {
        this.pushMessages(data)
      })
    },
    methods: {
      ...mapActions([
        'searchUser',
        'addFriend',
        'getListFriend',
        'getListRoom',
        'getRoomById',
        'getMessageByRoom'
      ]),
      ...mapMutations(['setRoomId', 'pushMessages', 'setSelectedRoom']),
      searchFriend() {
        this.searchUser(this.keyword)
          .then((response) => {
            this.searched = true
            if (this.user.user_id === this.userId) {
              this.add = false
            } else {
              this.add = true
            }
          })
          .catch((error) => {
            this.searched = false
            this.isError = true
            this.errMsg = error
          })
      },
      closeAlert() {
        this.isError = false
      },
      addToFriend() {
        const setData = {
          user_id: this.userId,
          friends_id: this.user.user_id
        }
        this.addFriend(setData)
          .then((response) => {
            this.makeToast(
              'Congrats! Say hi to your new friend',
              'Success',
              'success'
            )
            this.$bvModal.hide('modal-search-friend')
          })
          .catch(() => {
            this.makeToast('Cannot add friend', 'Error', 'danger')
          })
      },
      selectingRoom(data) {
        this.setSelectedRoom(true)
        const setData = {
          room_id: data.room_id,
          sender_id: this.userId
        }
        this.getRoomById(setData)
        this.$router.push('/roomchat')
        this.getMessageByRoom(data.room_id)
        this.socket.emit('joinRoom', data.room_id)
      },
      makeToast(msg, title, variant) {
        this.$bvToast.toast(msg, {
          title: title,
          variant: variant,
          solid: true
        })
      }
    },
    computed: {
      ...mapGetters({
        user: 'getSearchedUser',
        userId: 'getUserId',
        room: 'getAllRoom'
      })
    }
  }
</script>

<style scoped>
  .brand {
    margin-bottom: 2rem;
  }

  .brand h1 {
    font-weight: 500;
    font-size: 28px;
    color: #7e98df;
  }

  .brand img {
    width: 22px;
    height: 22px;
  }

  .searchadd {
    margin-bottom: 1rem;
  }

  .searchadd img {
    width: 22px;
    height: 22px;
  }

  .searchadd .btn-secondary {
    border: transparent;
    background-color: transparent;
  }

  .searchadd .form-control {
    border: transparent;
    background-color: #fafafa;
    border-radius: 15px;
    padding: 1rem 2rem;
  }

  .chatlist {
    height: 75vh;
    overflow: auto;
  }

  .chatlist .name {
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.165px;
    color: #232323;
  }

  .chatlist .message {
    font-size: 14px;
    letter-spacing: -0.165px;
    color: #7e98df;
  }

  .chatlist .col-md-4 {
    font-size: 14px;
    letter-spacing: -0.165px;
    color: #848484;
  }

  .chatlist .badge-secondary {
    background-color: #7e98df;
  }

  .list-group-item {
    border: transparent;
  }

  @media screen and (max-width: 425px) {
    .brand {
      margin-top: 2em;
    }

    .brand .col-md-10 {
      max-width: 360px;
    }

    .brand .col-md-2 {
      max-width: 48px;
    }

    .searchadd .col-md-9 {
      max-width: 348px;
    }

    .searchadd .col-md-3 {
      max-width: 48px;
    }

    .list-group-item {
      padding: 12px 30px;
    }

    .list-group-item .row {
      width: 100%;
    }

    .list-group-item .col-md-8 {
      width: 279px;
    }

    .list-group-item .col-md-4 {
      width: 60px;
    }
  }

  @media screen and (max-width: 375px) {
    .brand {
      margin-top: 1em;
    }

    .brand .col-md-10 {
      max-width: 320px;
    }

    .brand .col-md-2 {
      max-width: 48px;
    }

    .searchadd .col-md-9 {
      max-width: 300px;
    }

    .searchadd .col-md-3 {
      max-width: 48px;
    }

    .list-group-item {
      padding: 12px 25px;
    }

    .list-group-item .row {
      width: 100%;
    }

    .list-group-item .col-md-8 {
      width: 230px;
    }

    .list-group-item .col-md-4 {
      width: 60px;
    }
  }

  @media screen and (max-width: 320px) {
    .brand .col-md-10 {
      max-width: 272px;
    }

    .brand .col-md-2 {
      max-width: 48px;
    }

    .searchadd .col-md-9 {
      max-width: 258px;
    }

    .searchadd .col-md-3 {
      max-width: 48px;
    }

    .list-group-item .row {
      width: 100%;
    }

    .list-group-item .col-md-8 {
      width: 184px;
    }

    .list-group-item .col-md-4 {
      width: 60px;
    }
  }
</style>
