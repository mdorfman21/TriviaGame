(function() {
  //Create empty question array for a carousel and initialize the count for index
  var questionsArray = [];
  var count = 0;
  //Question count to increment and write it to the DOM
  var questionCount = 1;

  //initialize the timer and the interval variable
  var timer = 30;
  var countdownInterval;

  //initialize wrong and right scores
  var wrong = 0;
  var correct = 0;

  //create each question object
  var questionOne = {
    question: "The question goes here (one)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Answer 4",
    correctAnswer: function() {
      return this.answerFour;
    }
  };

  var questionTwo = {
    question: "The question goes here (two)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Answer 4",
    correctAnswer: function() {
      return this.answerTwo;
    }
  };

  var questionThree = {
    question: "The question goes here (three)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Answer 4",
    correctAnswer: function() {
      return this.answerFour;
    }
  };

  var questionFour = {
    question: "The question goes here (four)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Answer 4",
    correctAnswer: function() {
      return this.answerFour;
    }
  };
  //push the questions into the array
  questionsArray.push(questionOne);
  questionsArray.push(questionTwo);
  questionsArray.push(questionThree);
  questionsArray.push(questionFour);

  //pass the array index into this function
  function revealQuestion(object) {
    timer = 30;
    clearTimer();
    countdown();
    $("#question-number").text("Question Number " + questionCount + "!");
    $("#correct").text("Correct Answers: " + correct);
    $("#wrong").text("Wrong Answers: " + wrong);
    $("#timer").text("Time Left: " + timer);
    $("#question").text(object.question);
    $("#answer-one").text(object.answerOne);
    $("#answer-two").text(object.answerTwo);
    $("#answer-three").text(object.answerThree);
    $("#answer-four").text(object.answerFour);
    questionCount = questionCount + 1;
    count = count + 1;
  }

  //countdown function
  function startTheTimer() {
    timer = timer - 1;
    $("#timer").text("Time Left: " + timer);
    if (timer == 0) {
      nextQuestion();
    }
  }

  //countdown timer by 1 second
  function countdown() {
    countdownInterval = setInterval(startTheTimer, 1000);
  }

  //create the next question function
  function nextQuestion() {
    revealQuestion(questionsArray[count]);
  }

  //clear the timer
  function clearTimer() {
    clearInterval(countdownInterval);
  }

  //function to start the game at the first question
  function firstQuestion() {
    questionCount = 1;
    count = 0;
    correct = 0;
    wrong = 0;
    revealQuestion(questionsArray[0]);
  }

  //function to check if it's the correct answer
  function checkAnswer(target) {
    if (target == this.correctAnswer) {
      correct = correct + 1;
      console.log("winner");
      nextQuestion();
    } else {
      wrong = wrong + 1;
      console.log("loser");
      nextQuestion();
    }
  }

  $("#start").on("click", firstQuestion);
  $(".answer").on("click", checkAnswer);
})();
