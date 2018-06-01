let questionNumber = 0;
let score= 0;

$(document).ready(function() {
  $('.startPage').show();

  $('#quizStart').on('click', event => {
    $('.startPage').hide();
    $('#js-questionsAnswers').show(startQuiz());
    $('.questionNumber').text(1);
  });

  $('#nextQuestion').on('click', event => {  
      event.preventDefault();
      userSelectedAnswerChoice();   
  });

  $('#continue').on('click', event => {
    event.preventDefault();
    continueFromFeedbackToNextQuestion();
  });

  //this click event will restart the quiz app
  $('#restart').on('click', event=> {
    event.preventDefault();
    location.reload();
  });
  
  console.log("click to start works");
});

function displayQuestions() {
    if (questionNumber < STORE.length) {
      $('#question').html(`${STORE[questionNumber].question}`);
      $('#js-questionsAnswers  > fieldset').html(`<div class="box">
        <input type= "radio" name="answerOption" value = "${STORE[questionNumber].answers[0]}" required></input>
        <label class= "answerChoice">
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        </div>
        <div class="box">
        <input type= "radio" name="answerOption" value = "${STORE[questionNumber].answers[1]}" required></input>
        <label class= "answerChoice">
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        </div>
        <div class= "box">
        <input type= "radio" name="answerOption" value = "${STORE[questionNumber].answers[2]}" required></input>
        <label class= "answerChoice">
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        </div>
        <div class="box">
        <input type= "radio" name="answerOption" value = "${STORE[questionNumber].answers[3]}" required></input>
        <label class= "answerChoice">
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        </div>`
        );
    }
    else {
      $('#quiz').attr("hidden", true);
      $('#feedbackSection').attr("hidden", true);
      $('#results').attr("hidden",false);
      $('.questionNumber').text(10);
      renderResults();
      restartQuiz();
    };
  };

function renderQuestion() {
  $('#js-questionsAnswers').html(displayQuestions());
  console.log("display questions works");
};

function userSelectedAnswerChoice() {
    let selected = $('input:checked');
    let answer= selected.val();
    let correctAnswer = `${STORE[questionNumber].answer}`;
    $('#quiz').attr("hidden", true);
    $('#results').attr("hidden", true);

    if(answer===correctAnswer) {
      $('#feedbackAnswer').removeClass("incorrect").addClass("correct");
      $('#feedbackAnswer > h2').html("Whoop!");
      $('#feedbackAnswer > span').html(`${STORE[questionNumber].feedback}`);
      updateScore();
    }
    else{
      $('#feedbackAnswer').removeClass("correct").addClass("incorrect");
      $('#feedbackAnswer > h2').html("Uh-oh!");
      $('#feedbackAnswer > span').html(`The correct answer is ${STORE[questionNumber].answer}! <div>${STORE[questionNumber].feedback}</div>`);
    };
    
    $('#feedbackSection').attr("hidden", false);

     console.log("click event is successful");
};

function updateScore(){
  score ++;
  $('.score').text(score);
};

function changeQuestionNumber(){
  questionNumber ++;
  $('.questionNumber').text(questionNumber +1);
};

function continueFromFeedbackToNextQuestion(){
  changeQuestionNumber();
  renderQuestion();
  $('#quiz').attr("hidden", false);
  $('#feedbackSection').attr("hidden", true);
};

function startQuiz() {
  renderQuestion();
  $('#quiz').attr("hidden", false);
};

function renderResults(){
  $('#quiz').attr("hidden", true);
  $('#feedbackSection').attr("hidden", true);

  if (score > 6) {
    $('#finalComment').removeClass("wrong").addClass("right");
    $('#finalComment > h2').html(`Gig 'em, Aggie! You got ${score} out of 10 right!`);

  }
  else {
    $('#finalComment').removeClass("right").addClass("wrong");
    $('#finalComment > h2').html("Oh no! You must not be a former student.");
    $('#finalComment > span').html(`You got ${score} out of 10 right. Want to try again?`);
  };

  $('#results').attr("hidden", false);

};

function restartQuiz () {
  startQuiz();
};
