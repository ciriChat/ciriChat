import axios from 'axios';

class ResponseService {
  constructor() {
    this.host = 'http://cirichat.herokuapp.com';
  }

  getResponse(ques) {
    return axios.post(this.host + '/answer', {"question": ques});
  }
}

export default new ResponseService();
