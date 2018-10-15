const axios = require('axios');
const answerApiUrl = "http://35.178.11.80/";//  /?question=

export function getAnswer(question) {

  let answer = axios.post(answerApiUrl, {
    question: question
  })
  .then(function (response) {
    let bestIndex = response.best_index;
    let bestAnswer = response.results[bestIndex]; // object: {answer: "something", score: 0}
    console.log(`Best index: ${best_index}, best answer: ${bestAnswer.answer}`);
    return best_answer;
  })
  .catch(function (error) {
    console.log(`Error: ${error}`);
  });
  console.log(`Question: ${question}, answer: ${answer}`);
  return answer.answer;
}

