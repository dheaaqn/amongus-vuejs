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
export default {
  name: 'InputMessage',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    handleMessage() {
      this.$emit('sendMessage', { msg: this.message, dom: this.$refs.inputMsg })
      this.message = ''
      this.$refs.inputMsg.focus()
    }
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
</style>
