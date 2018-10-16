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
  // console.log(`Received question: '${request.body.question}'`);
  responseManager.getResponse(request.body.question)
  .then(answer => {
    // console.log(`Received answer from cloud: ${answer.data}`);
    response.status(200).send(answer.data.best_answer);
  })
  .catch(error => console.log(`Error while getting response from cloud: ${error}`));
});

app.listen(PORT, function () {
  console.log("Node app is running at localhost:" + PORT);
});