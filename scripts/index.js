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

  $('#restart').on('click', event=> {
    restartQuiz();
  });
  
  console.log("click to start works");
});

function displayQuestions() {
  //for (i=0; i <STORE.length; i ++) {
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
      $('.js-quiz').hide();
      $('.js-feedback').show();
      renderResults();
      restartQuiz();
    };
  };
//};

function renderQuestion() {
  $('#js-questionsAnswers').html(displayQuestions());
  console.log("display questions works");
};

function userSelectedAnswerChoice() {
    let selected = $('input:checked');
    let answer= selected.val();
    let correctAnswer = `${STORE[questionNumber].answer}`;
    $('#quiz').attr("hidden", true);

    if(answer===correctAnswer) {
      $('#feedbackAnswer').removeClass("incorrect").addClass("correct");
      $('#feedbackAnswer > h2').html("Whoop!");
      $('#feedbackAnswer > span').html(`${STORE[questionNumber].feedback}`);
      updateScore();
    }
    else{
      $('#feedbackAnswer').removeClass("correct").addClass("incorrect");
      $('#feedbackAnswer > h2').html("Uh-oh!");
      $('#feedbackAnswer > span').html(`The correct answer is ${STORE[questionNumber].answer} <div>${STORE[questionNumber].feedback}</div>`);
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
  if (score > 6) {
    $('.js-feedback').html(`
    <div class= "results"><h3>Gig 'em, Aggie! You got ${score} out of 10 right!</h3>
    <button id= "restart">Restart Quiz!</button>
    </div>`);
  }
  else {
    $('.js-feedback').html(`<div class="results"><h3>Oh no! You must not be a former student.</h3>
    <span>You got ${score} out of 10 right. Want to try again?</span>
    <button id="restart">Restart Quiz!</button>
    </div>`);
  };
};

function restartQuiz () {
  startQuiz();
};
