const axios = require('axios');

const seq2seqChatbotEnglishUrl = process.env.SEQ2SEQ_CHATBOT_ENGLISH_URL;
const seq2SeqKnowledgeModelEnglishUrl = process.env.SEQ2SEQ_KNOWLEDGE_MODEL_ENGLISH_URL;
const seq2SeqKnowledgeModelPolishUrl = process.env.SEQ2SEQ_KNOWLEDGE_MODEL_POLISH_URL;
const retrievalModelPolishUrl = process.env.RETRIEVAL_MODEL_POLISH_URL;

const checkPolishLanguageUrl = `${retrievalModelPolishUrl}/language/check/polish`;
const retrievalResponsePolishUrl = `${retrievalModelPolishUrl}/chat`;

class ResponseManager {
  constructor() {}

  checkPolishLanguage(msg) {
    return axios.put(checkPolishLanguageUrl, {'message': msg})
  }

  getResponseFromRetrievalPolishModel(msg) {
    return axios.put(retrievalResponsePolishUrl, {'message': msg})
  }

  getResponseFromSeq2SeqPolishModel(question) {
    let url = seq2SeqKnowledgeModelPolishUrl + question;
    return axios.get(url);
  }
 
  getResponseFromSeq2SeqEnglishModel(question) {
    let url = seq2SeqKnowledgeModelEnglishUrl + question;
    return axios.get(url);
  }

  getResponseFromChatbot(question) {
    let url = seq2seqChatbotEnglishUrl + question;
    return axios.get(url);
  }

}

module.exports = new ResponseManager();
