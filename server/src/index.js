const express = require('express');
const path = require('path');
const cors = require('cors');
const answerer = require('answerer');

const app = express();
app.use(cors());

app.listen(app.get('port'), () => console.log("Node app is running at localhost:" + app.get('port')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/question', function (request, response) {
  let answer = answerer.getAnswer(request.question);
  console.log(`Received answer from api: ${answer}`);
  response.status(200).send(answer);
});