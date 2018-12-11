const axios = require('axios');
const responseApiUrl = process.env.RESPONSE_API_URL || "https://35.195.184.216/question?question=";

export function getAnswer(question) {
  let url = responseApiUrl + question;
  console.log(`Sending get request to url ${url}`);
  return axios.get(question);
}
