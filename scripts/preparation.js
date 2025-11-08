const choiceContainers = $('.choice-container');
const choiceTexts = $('.choice-text');
const progressBarFull = $("#progressBarFull");
const questionNumberText = $("#question-number");

let questions = [
  {
    question: 'How many questions are expected in quiz?',
    answerChoices: ['5', '6 - 10', '11 - 15', '16 - 20'],
    processAnswer: function(selectedChoice) {
      const selectedAnswerText = $(selectedChoice).text();
      let amount = selectedAnswerText === "6 - 10" ? Math.floor(Math.random() * 5 + 6) :
             selectedAnswerText === "11 - 15" ? Math.floor(Math.random() * 5 + 11) :
             selectedAnswerText === "16 - 20" ? Math.floor(Math.random() * 5 + 16) :
             selectedAnswerText;
      $(selectedChoice).text(amount);
      return amount;
    }
  },
  {
    question: 'Select category',
    answerChoices: ['any category', 'random category'],
    processAnswer: function(selectedChoice) {
      const selectedAnswerText = $(selectedChoice).text();
      if (selectedAnswerText === "any category") {
        return "";
      }
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      $(selectedChoice).text(randomCategory.name);
      return randomCategory.id;
    }
  },
  {
    question: 'Select Difficulty',
    answerChoices: ['any difficulty', 'easy', 'medium', 'hard'],
    processAnswer: function(selectedChoice) {
      const selectedAnswerText = $(selectedChoice).text();
      return selectedAnswerText === "any difficulty" ? "" : selectedAnswerText;
    }
  },
  {
    question: 'Select Type',
    answerChoices: ['any type', 'multiple', 'boolean'],
    processAnswer: function(selectedChoice) {
      const selectedAnswerText = $(selectedChoice).text();
      return selectedAnswerText === "any type" ? "" : selectedAnswerText;
    }
  }
];
let questionCounter = -1;
let acceptingAnswers = false;
let categories = [];
let currentQuestion = {};

$.ajax({
  method: 'GET',
  url: 'https://opentdb.com/api_category.php',
  dataType: "json"
})
.done(function(response) {
  categories = response.trivia_categories;
  getNewQuestion();
})
.fail(function(err) {
  console.error(err);
});

for (let choice of choiceTexts) {
  $(choice).click(function (event) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = event.target;
    currentQuestion.processAnswer(selectedChoice);
    const classToApply = "correct";
    $(selectedChoice.parentElement).addClass(classToApply);
    setTimeout(function() {
      $(selectedChoice.parentElement).removeClass(classToApply);
      getNewQuestion();
    }, 1000);
  });
}

function getNewQuestion() {
  questionCounter++;
  if (questionCounter >= questions.length) {
    return window.location.assign('menu.html');
  }
  progressBarFull.css({'width': `${((questionCounter + 1) / questions.length) * 100}%`});
  questionNumberText.text(`${questionCounter + 1}`)
  currentQuestion = questions[questionCounter];
  $('#question').text(currentQuestion.question);
  for (let index = 0; index < choiceContainers.length; index++) {
    if (index < currentQuestion.answerChoices.length) {
      choiceContainers.eq(index).find(".choice-text").text(currentQuestion.answerChoices[index]);
      choiceContainers.eq(index).css({ 'visibility': 'visible' });
    } else {
      choiceContainers.eq(index).css({ 'visibility': 'hidden' });
    }
  }
  acceptingAnswers = true;
}