import {
  Author
} from './message';
import Message from './message';

export default class MessageFactory {
  constructor() {
    this.messages = []
    this.id = 0
  }

  getUserMessage(text) {
    return this.createMessage(Author.USER, text);
  }

  getBotMessage(text) {
    return this.createMessage(Author.BOT, text);
  }

  createMessage(author, text) {
    const msg = new Message(this.id++, author, text);
    this.messages.unshift(msg);
    return msg;
  }
}
