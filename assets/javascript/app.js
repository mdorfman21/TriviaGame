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
  var unanswered = 0;

  //create each question object
  var questionOne = {
    question: "The question goes here (one)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Correct Answer",
    correctAnswer: "Correct Answer"
  };

  var questionTwo = {
    question: "The question goes here (two)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Answer 4",
    correctAnswer: "Answer 4"
  };

  var questionThree = {
    question: "The question goes here (three)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Answer 4",
    correctAnswer: "Answer 4"
  };

  var questionFour = {
    question: "The question goes here (four)",
    answerOne: "Answer 1",
    answerTwo: "Answer 2",
    answerThree: "Answer 3",
    answerFour: "Answer 4",
    correctAnswer: "Answer 4"
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
    $("#unanswered").text("Unanswered: " + unanswered);
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
    var winner = false;
    timer = timer - 1;
    $("#timer").text("Time Left: " + timer);
    if (timer == 0) {
      unanswered = unanswered + 1;
      $("#unanswered").text("Unanswered: " + unanswered);
      clearTimer();
      revealAnswer(winner, questionsArray[count - 1]);
      setTimeout(nextQuestion, 2000);
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
  function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;

    console.log("SANITY CHECK", selectedAnswer);
    if (selectedAnswer == questionsArray[count - 1].correctAnswer) {
      var winner = true;
      clearTimer();
      correct = correct + 1;
      $("#correct").text("Correct Answers: " + correct);
      console.log(questionsArray[count - 1].correctAnswer);
      console.log("winner");
      revealAnswer(winner, questionsArray[count - 1]);
      setTimeout(nextQuestion, 2000);
    } else {
      var winner = false;
      clearTimer();
      wrong = wrong + 1;
      $("#wrong").text("Wrong Answers: " + wrong);
      console.log("TARGET", event);
      console.log(questionsArray[count - 1].correctAnswer);
      console.log(count - 1);
      console.log("loser");
      revealAnswer(winner, questionsArray[count - 1]);
      setTimeout(nextQuestion, 2000);
    }
  }

  //function to reaveal the answer
  function revealAnswer(answer, object) {
    $("#question").empty();
    $("#answer-one").empty();
    $("#answer-two").empty();
    $("#answer-three").empty();
    $("#answer-four").empty();

    if (answer == true) {
      $("#question").text("CORRECT!");
    } else {
      $("#question").text("INCORRECT!");
      $("#answer-one").text("The correct answer is: " + object.correctAnswer);
      console.log(object);
      console.log(object.correctAnswer);
    }
  }

  //create a hover for the answers
  $(".answer").hover(
    function() {
      $(this).addClass("hover");
    },
    function() {
      $(this).removeClass("hover");
    }
  );

  //create if statement for gameover
  if (count > questionsArray.length + 1) {
    gameOver();
  }

  //create gameover function
  function gameOver() {
    $("#question").empty();
    $("#answer-one").empty();
    $("#answer-two").empty();
    $("#answer-three").empty();
    $("#answer-four").empty();
  }

  //start the game
  $("#start").on("click", firstQuestion);
  $(".answer").on("click", checkAnswer);
})();
