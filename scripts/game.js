let choiceContainers = $('.choice-container');
let choiceTexts = $('.choice-text');


let questions = [
  {
    question: 'Question 1',
    answerChoices: ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
    answerIndex: 1,
  },
  {
    question: 'Question 2',
    answerChoices: ['True', 'False'],
    answerIndex: 0,
  },
  {
    question: 'Question 3',
    answerChoices: ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
    answerIndex: 3,
  }
];

let questionCounter = -1;
let acceptingAnswers = false;


for (let choice of choiceTexts) {
  $(choice).click(function(event) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    let selectedAnswerIndex = $(event.target).attr("id");
    console.log(selectedAnswerIndex);
    getNewQuestion();

  });
}


getNewQuestion();


function getNewQuestion() {
  questionCounter++;
  if (questionCounter >= questions.length) {
    return window.location.assign('menu.html');
  }
  let currentQuestion = questions[questionCounter];
  $('#question').text(currentQuestion.question);
  $('#question').text(currentQuestion.question)
  for (let index = 0; index < choiceContainers.length; index++) {
    if (index < currentQuestion.answerChoices.length) {
      choiceContainers.eq(index).find(".choice-text").text(currentQuestion.answerChoices[index]);
      choiceContainers.eq(index).css({'visibility': 'visible'});
    } else {
      choiceContainers.eq(index).css({'visibility': 'hidden'});
    }
  }
  acceptingAnswers = true;

}