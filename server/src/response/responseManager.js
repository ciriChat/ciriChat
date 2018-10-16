const axios = require('axios');
const responseApiUrl = 'https://35.178.111.80/question';

class ResponseManager {
  constructor() {}

  getResponse(ques) {
    let requestBody = {question: ques};
    return axios.post(responseApiUrl, requestBody);
  }
}

module.exports = new ResponseManager();
