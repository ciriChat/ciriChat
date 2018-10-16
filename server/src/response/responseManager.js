const axios = require('axios');
const responseApiUrl = 'http://35.178.111.80/?question=';

class ResponseManager {
  constructor() {}

  getResponse(ques) {
    let url = responseApiUrl + ques;
    return axios.get(url);
  }
}

module.exports = new ResponseManager();
