const axios = require('axios');

const responseApiUrl = process.env.RESPONSE_API_URL;
const knowledgeModelUrl = process.env.KNOWLEDGE_MODEL_URL;

class ResponseManager {
  constructor() {}

  getResponse(question) {
    let url = responseApiUrl + question;
    return axios.get(url);
  }

  getResponseFromModel(question) {
    let url = knowledgeModelUrl + question;
    return axios.get(url);
  }
}

module.exports = new ResponseManager();
