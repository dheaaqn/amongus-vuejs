<template>
  <b-container fluid class="home">
    <b-row>
      <b-col md="3" class="content-left-web">
        <Drawer />
      </b-col>
      <b-col md="12" class="content-left-mobile">
        <DrawerMobile />
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

.content-left-web {
  padding: 1rem;
  border-right: 1px solid #e5e5e5;
}

.content-left-mobile {
  display: none;
}

.content-right {
  padding: 0;
}

@media screen and (max-width: 425px){
  .content-left-web {
    display: none;
  }

  .content-left-mobile {
    display: block;
  }
}
</style>

<script>
import Drawer from '../components/_base/Drawer'
import DrawerMobile from '../components/_base/DrawerMobile'
import Chat from '../components/_base/Chat'

export default {
  name: 'Home',
  components: {
    Chat,
    Drawer,
    DrawerMobile
  }
}
</script>
