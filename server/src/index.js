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

  responseManager.getResponseFromModel(question)
  .then(modelAnswer => {
    let ans = modelAnswer.data.answer;
    console.log(`Received answer from model: ${ans}`);
    if (ans === "None") {
      responseManager.getResponse(question)
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
});

app.listen(PORT, function () {
  console.log("Server is running at port:" + PORT);
});