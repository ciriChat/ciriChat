const express = require('express');
const responseManager = require('./response/responseManager.js');
const body_parser = require('body-parser');
const path = require('path');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(body_parser.json());

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/answer', function (request, response) {
  let question = request.body.question;
  console.log(`Received question: '${question}'`);

  responseManager.checkPolishLanguage(question)
  .then(res => {
      if(res.data.polish) {
        processPolishRequest(question, response);
      } else {
        processEnglishRequest(question, response);
      }
  })
  .catch(error => {
    console.log(`Error while checking polish language: ${error}`)
    response.status(500).send()
  })
})

function processPolishRequest(question, response) {
  console.log(`Process polish message: '${question}'`);
  if (isQuestion(message)) {
    responseManager.getResponseFromSeq2SeqPolishModel(question)
    .then(res => {
      const resp = res.data;
      const results = res.results;
      console.log(`Received responses with average score: ${resp.avg_score}`);
      const best_answer = results[0];
      response.status(200).send(best_answer);
    }).error(err => {
      console.log(`Error: '${err}'`);
    });
  } else {
    responseManager.getResponseFromRetrievalPolishModel(question)
    .then(res => {
      const answer = res.data.message;
      console.log(`Answer from retrieval model ${answer}`);
      response.status(200).send(answer);
    }).error(err => {
      console.log(`Error: '${err}'`);
    });
  }
}
  

function processEnglishRequest(question, response) {
  console.log(`Process english message: '${question}'`);
  responseManager.getResponseFromSeq2SeqEnglishModel(question)
  .then(modelAnswer => {
    let ans = modelAnswer.data.answer;
    console.log(`Received answer from model: ${ans}`);
    if (ans === "None") {
      responseManager.getResponseFromChatbot(question)
      .then(chatbotAnswer => {
        let answerToSend = chatbotAnswer.data.best_answer;
        console.log(`Received best answer from chatbot: ${answerToSend}`);
        response.status(200).send(answerToSend);
      })
      .catch(error => console.log(`Error while getting response from chatbot: ${error}`))
    } else {
      response.status(200).send(ans);
    }
  })
  .catch(error => console.log(`Error while getting response from model: ${error}`));
}

function isQuestion(message) {
  return message[message.length - 1] === '?';
}

app.listen(PORT, function () {
  console.log("Server is running at port:" + PORT);
});
