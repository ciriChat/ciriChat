<template>
  <div id="app">
    <div id="introduction">
      Cześć, jestem Ciri...
    </div>
    <div id="main-container">
      <message-input @newMessage="newMessageAction"/>
      <message v-for="msg in messageFactory.messages" :key="msg.id" :message="msg"/>
    </div>
  </div>
</template>

<script>
import MessageInput from './components/MessageInput.vue';
import Message from './components/Message.vue';
import responseService from './service/responseService.js';
import MessageFactory from './model/messageFactory.js';

export default {
  name: 'app',
  components: {
    MessageInput,
    Message
  },
  data () {
    return {
      messageFactory: new MessageFactory()
    }
  },
  methods: {
    newMessageAction (messageText) {
      this.messageFactory.getUserMessage(messageText);
      responseService.getAnswer(messageText).then(res => setTimeout(() => this.messageFactory.getBotMessage(res.data), 300));
    }
  }
}
</script>

<style>
#app {
  margin: auto;
  max-width: 500px;
  font-family: 'Montserrat', sans-serif;
}

#main-container {
  width: 100%;
}

#introduction {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
