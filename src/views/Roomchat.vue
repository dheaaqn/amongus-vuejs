<template>
  <b-container fluid class="home">
    <b-row>
      <b-col md="12">
        <Chat />
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.home {
  height: 100vh;
  overflow: hidden;
}

.col-md-12 {
    padding: 0;
}
</style>

<script>
import Chat from '../components/_base/ChatMobile'

export default {
  name: 'Roomchat',
  components: {
    Chat
  }
}
</script>
