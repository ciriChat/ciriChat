const axios = require('axios');

const seq2seqChatbotEnglishUrl = process.env.SEQ2SEQ_CHATBOT_ENGLISH_URL;
const seq2SeqKnowledgeModelEnglishUrl = process.env.SEQ2SEQ_KNOWLEDGE_MODEL_ENGLISH_URL;
const seq2SeqKnowledgeModelPolishUrl = process.env.SEQ2SEQ_KNOWLEDGE_MODEL_POLISH_URL;
const retrievalModelPolishUrl = process.env.RETRIEVAL_MODEL_POLISH_URL;

const checkPolishLanguageUrl = `${retrievalModelPolishUrl}/language/check/polish`;
const retrievalResponsePolishUrl = `${retrievalModelPolishUrl}/chat`;

class ResponseManager {
  constructor() {
    console.log(`English seq2seq knowledge model url: '${seq2SeqKnowledgeModelEnglishUrl}'`);
    console.log(`English seq2seq chatbot url: '${seq2seqChatbotEnglishUrl}'`);
    console.log(`Polish seq2seq knowledge model url: '${seq2SeqKnowledgeModelPolishUrl}'`);
    console.log(`Check polish language url: '${checkPolishLanguageUrl}'`);
    console.log(`Polish retrieval model url: '${retrievalModelPolishUrl}'`);
  }

  checkPolishLanguage(msg) {
    return axios.put(checkPolishLanguageUrl, {'message': msg})
  }

  getResponseFromRetrievalPolishModel(msg) {
    return axios.put(retrievalResponsePolishUrl, {'message': msg})
  }

  getResponseFromSeq2SeqPolishModel(question) {
    return axios.post(seq2SeqKnowledgeModelPolishUrl, {'question': question});
  }
 
  getResponseFromSeq2SeqEnglishModel(question) {
    let url = seq2SeqKnowledgeModelEnglishUrl + question;
    return axios.get(url);
  }

  getResponseFromChatbot(question) {
    return axios.post(seq2seqChatbotEnglishUrl, {'question': question});
  }

}

module.exports = new ResponseManager();
