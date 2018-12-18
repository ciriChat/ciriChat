import axios from 'axios';

class ResponseService {
  constructor() {
    this.host = 'https://cirichat.herokuapp.com';
  }

  getResponse(message) {
    return axios.post(this.host + '/response', {message: message});
  }
}

export default new ResponseService();
