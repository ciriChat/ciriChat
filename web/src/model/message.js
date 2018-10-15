export const Author = {
  USER: "USER",
  BOT: "BOT"
}

export default class Message {
  constructor(id, author, text) {
    this.id = id;
    this.author = author;
    this.text = text;
  }
}
