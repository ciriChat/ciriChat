<template>
<div class="input-line">
  <input id="message-input" v-model="message" @keypress="onKeyPress"/>
</div>
</template>

<script>
export default {
  name: 'message-input',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onKeyPress (keyEvent) {
      if (keyEvent.key === 'Enter') this.sendMessage();
    },
    sendMessage () {
      this.$emit('newMessage', this.message);
      this.message = '';
    }
  }
}
</script>

<style>
#message-input {
  width: 100%;
  text-align: right;
  padding: 10px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-color: #446600;
  font-family: 'Montserrat', sans-serif;
}
</style>
