const express = require('express');
const path = require('path');
const cors = require('cors');
const answerer = require('./answerer.js');

const app = express();
app.use(cors());

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});


app.post('/question', function (req, res) { 
  let question = req.body.question;
  console.log(`Received question: '${question}'`)
  // body is {question: "some question"}
  answerer.getAnswer(question) 
  .then(function (response) {
    console.log(`Received response with code: ${response.status}`)
    
    let bestIndex = response.data.best_index;
    let bestAnswer = response.data.results[bestIndex]; // object: {answer: "something", score: 0}
    console.log(`Best index: ${best_index}, best answer: ${bestAnswer.answer}`);
    let answer = { 
      question: question,
      answer: bestAnswer.answer
    };
    res.status(200).send(answer);
  })
  .catch(function (error) {
    console.log(`Error: ${error}`);
  });
});