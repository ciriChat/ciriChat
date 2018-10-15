import axios from 'axios';

class ResponseService {
  constructor() {
    this.host = 'https://cirichat.herokuapp.com';
  }

  getAnswer(question) {
    return axios.post(this.host + '/', {question: question});
  }
}

export default new ResponseService();
