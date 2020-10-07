<template>
  <b-container fluid class="home">
    <b-row>
      <b-col md="3" class="content-left">
        <Drawer />
      </b-col>
      <b-col md="9" class="content-right">
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

.content-left {
  padding: 1rem;
  border-right: 1px solid #e5e5e5;
}

.content-right {
  padding: 0;
}
</style>

<script>
import Drawer from '../components/_base/Drawer'
import Chat from '../components/_base/Chat'

export default {
  name: 'Home',
  components: {
    Chat,
    Drawer
  }
}
</script>
