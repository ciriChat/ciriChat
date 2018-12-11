const axios = require('axios');

const responseApiUrl = process.env.RESPONSE_API_URL || 'http://35.195.184.216/question?question=';

class ResponseManager {
  constructor() {}

  getResponse(question) {
    let url = responseApiUrl + question;
    return axios.get(url);
  }
}

module.exports = new ResponseManager();
