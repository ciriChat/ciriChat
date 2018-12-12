const axios = require('axios');

const responseApiUrl = process.env.RESPONSE_API_URL;
const knowledgeModelUrl = process.env.KNOWLEDGE_MODEL_URL;
const retrievalModelUrl = 'http://18.188.102.196'

const checkPolishLanguageUrl = `${retrievalModelUrl}/language/check/polish`
const retrievalMsgUrl = `${retrievalModelUrl}/chat`

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

  checkPolishLanguage(msg) {
    return axios.put(checkPolishLanguageUrl, {'message': msg})
  }

  getResponseFromRetrievalModel(msg) {
    return axios.put(retrievalMsgUrl, {'message': msg})
  }

}

module.exports = new ResponseManager();
