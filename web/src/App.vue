<template>
  <div id="app">
    <div id="introduction">
      Hi, I'm Ciri. Ask me a question.
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
      console.log(`Sending post to server with question: '${messageText}'`);
      responseService.getResponse(messageText)
      .then(res => this.messageFactory.getBotMessage(res.data))
      .catch(error => console.log(`Error getting response from backend: '${error}'`));
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
