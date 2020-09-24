<template>
  <b-container fluid class="home">
    <b-row>
      <b-col md="3" class="content-left">
        <b-row class="brand">
          <b-col md="10">
            <h1>Telegram</h1>
          </b-col>
          <b-col md="2" style="padding: 0">
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
              right
            >
              <template v-slot:button-content class="btn-menu">
                <!-- &#x1f50d; -->
                <b-img :src="require('../assets/icon/burger-menu.png')"></b-img>
              </template>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
              <b-dropdown-item href="#">Contacts</b-dropdown-item>
              <b-dropdown-item href="#">Calls</b-dropdown-item>
              <b-dropdown-item href="#">Save messages</b-dropdown-item>
              <b-dropdown-item href="#">Invite friends</b-dropdown-item>
              <b-dropdown-item href="#">Telegram FAQ</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>

        <b-row class="searchadd">
          <b-col md="10">
            <b-form-input placeholder="Type your message"></b-form-input>
          </b-col>
          <b-col md="2" align-self="center">
            <b-img :src="require('../assets/icon/plus.png')"></b-img>
          </b-col>
        </b-row>

        <b-row class="sortby">
          <!-- <b-col> All </b-col>
          <b-col> Important </b-col>
          <b-col> Unread </b-col> -->
        </b-row>

        <b-row class="chatlist">
          <b-col style="padding: 0">
            <b-list-group flush>
              <b-list-group-item class="d-flex align-items-center">
                <b-avatar
                  variant="info"
                  rounded
                  src="https://placekitten.com/300/300"
                  class="mr-3"
                ></b-avatar>
                <b-row>
                  <b-col class="name text-left" md="8">Name</b-col>
                  <b-col class="text-right" md="4" align-self="center"
                    >15.20</b-col
                  >
                  <b-col class="message text-left" md="8">messages</b-col>
                  <b-col class="text-right" md="4"
                    ><b-badge pill>9</b-badge></b-col
                  >
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="9" class="content-right"> </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.content-left {
  height: 100vh;
  padding: 2rem 1rem;
}

.content-right {
  background: #fafafa;
  padding: 2rem 1rem;
}

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

.searchadd .form-control {
  border: transparent;
  background-color: #fafafa;
  border-radius: 15px;
  padding: 1rem 2rem;
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

@media screen and (max-width: 768px) {
  .brand h1 {
    font-size: 24px;
  }

  .brand img {
    width: 18px;
    height: 18px;
  }
}
</style>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>
