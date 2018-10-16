<template>
<div class="message-box bot-message" v-if="message.author == Author.BOT">
  {{message.text}}
</div>
<div class="message-box user-message" v-else-if="message.author == Author.USER">
  {{message.text}}
</div>
</template>

<script>
import { Author } from '../model/message.js';

export default {
  name: 'message',
  data () {
    return {
      Author
    }
  },
  props: [
    'message'
  ],
  methods: {
  }
}
</script>

<style>
.message-box {
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  display: inline-block;
  clear: both;
}

.bot-message {
  background-color: #ddff99;
  color: #000000;
  float: left;
}

.user-message {
  background-color: #446600;
  color: #ffffff;
  float: right;
}
</style>
