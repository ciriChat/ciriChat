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
  let message = request.body.question;
  console.log(`Received message: '${message}'`);

  responseManager.checkPolishLanguage(message)
  .then(res => {
      if(res.data.polish) {
        processPolishRequest(message, response);
      } else {
        processEnglishRequest(message, response);
      }
  })
  .catch(error => {
    console.log(`Error while checking polish language: ${error}`);
    response.status(500).send()
  })
})

function processPolishRequest(message, response) {
  console.log(`Process polish message: '${message}'`);
  if (isQuestion(message)) {
    console.log(`Processing polish question: '${message}'`);
    responseManager.getResponseFromSeq2SeqPolishModel(message)
    .then(res => {
      const resp = res.data;
      const results = resp.results;
      console.log(`Received responses with average score: ${resp.avg_score}`);
      const best_answer = results[0].answer;
      response.status(200).send(best_answer);
    }).catch(err => {
      console.log(`Error: '${err}'`);
    });
  } else {
    console.log(`Processing polish statement: '${message}'`);
    responseManager.getResponseFromRetrievalPolishModel(message)
    .then(res => {
      const answer = res.data.message;
      console.log(`Answer from retrieval model ${answer}`);
      response.status(200).send(answer);
    }).catch(err => {
      console.log(`Error: '${err}'`);
    });
  }
}
  

function processEnglishRequest(message, response) {
  console.log(`Process english message: '${message}'`);
  responseManager.getResponseFromSeq2SeqEnglishModel(message)
  .then(modelAnswer => {
    let ans = modelAnswer.data.answer;
    console.log(`Received answer from model: ${ans}`);
    if (ans === "None") {
      responseManager.getResponseFromChatbot(message)
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
