const axios = require('axios');
const https = require('https');

const responseApiUrl = 'https://35.178.111.80/question';

class ResponseManager {
  constructor() {}

  getResponse(ques) {
    let requestBody = {question: ques};
    return axios.post(responseApiUrl, requestBody, {
        httpsAgent: new https.Agent({rejectUnauthorized: false})
    });
  }
}

module.exports = new ResponseManager();
