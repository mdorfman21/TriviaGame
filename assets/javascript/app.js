(function() {
  //I can't get the audio to play when the document loads
  $("audio#soundtrack")[0].play();
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
    question: "Who composes the soundtrack to Inception?",
    answerOne: "John Williams",
    answerTwo: "Hans Zimmer",
    answerThree: "Danny Elfman",
    answerFour: "Howard Shore",
    correctAnswer: "Hans Zimmer"
  };

  var questionTwo = {
    question: "Who did Cobb perform inception on first?",
    answerOne: "Mal",
    answerTwo: "Ariadne",
    answerThree: "Arthur",
    answerFour: "Saito",
    correctAnswer: "Mal"
  };

  var questionThree = {
    question: "Besides reality, how many levels of dreams are there?",
    answerOne: "6",
    answerTwo: "3",
    answerThree: "4",
    answerFour: "10",
    correctAnswer: "4"
  };

  var questionFour = {
    question: "Why can Cobb never return to the United States?",
    answerOne: "He robbed a liquor store",
    answerTwo: "He stole a plane",
    answerThree: "He robbed a bank",
    answerFour: "The police think he killed his wife",
    correctAnswer: "The police think he killed his wife"
  };

  var questionFive = {
    question: "Who does Cobb go into limbo to save?",
    answerOne: "Ariadne",
    answerTwo: "Saito",
    answerThree: "Yusuf",
    answerFour: "Eames",
    correctAnswer: "Saito"
  };

  var questionSix = {
    question: "How does Cobb know he is not in a dream?",
    answerOne: "He spins his top",
    answerTwo: "He pinches himself",
    answerThree: "Eames tells him",
    answerFour: "Mal throws him to the ground",
    correctAnswer: "He spins his top"
  };

  var questionSeven = {
    question: "Why does Saito employ Cobb and his associates?",
    answerOne: "He wants Cobb to be able to go home",
    answerTwo: "He wants to know what his own dreams mean",
    answerThree: "To get Mr. Fischer to dissolve his father's company",
    answerFour: "Saito wants to make millions with inception",
    correctAnswer: "To get Mr. Fischer to dissolve his father's company"
  };
  //push the questions into the array
  questionsArray.push(questionOne);
  questionsArray.push(questionTwo);
  questionsArray.push(questionThree);
  questionsArray.push(questionFour);
  questionsArray.push(questionFive);
  questionsArray.push(questionSix);
  questionsArray.push(questionSeven);

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
      setTimeout(nextQuestion, 2500);
    }
  }

  //countdown timer by 1 second
  function countdown() {
    countdownInterval = setInterval(startTheTimer, 1000);
  }

  //create the next question function
  function nextQuestion() {
    if (count == questionsArray.length) {
      gameOver();
    } else {
      revealQuestion(questionsArray[count]);
    }
  }

  //clear the timer
  function clearTimer() {
    clearInterval(countdownInterval);
  }

  //function to start the game at the first question
  function firstQuestion() {
    $("#correct").text("Correct Answers: " + correct);
    $("#wrong").text("Wrong Answers: " + wrong);
    $("#unanswered").text("Unanswered: " + unanswered);
    $("#timer").text("Time Left: " + timer);
    $(".answer").on("click", checkAnswer);
    createHover();
    questionCount = 1;
    count = 0;
    correct = 0;
    wrong = 0;
    unanswered = 0;
    revealQuestion(questionsArray[0]);
  }

  //function to check if it's the correct answer
  function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;

    console.log("SANITY CHECK", selectedAnswer);
    if (selectedAnswer == questionsArray[count - 1].correctAnswer) {
      $("audio#inception")[0].play();
      var winner = true;
      clearTimer();
      correct = correct + 1;
      $("#correct").text("Correct Answers: " + correct);
      console.log(questionsArray[count - 1].correctAnswer);
      console.log("winner");
      revealAnswer(winner, questionsArray[count - 1]);

      setTimeout(nextQuestion, 2500);
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
      setTimeout(nextQuestion, 2500);
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
  function createHover() {
    $(".answer").hover(
      function() {
        $(this).addClass("hover");
      },
      function() {
        $(this).removeClass("hover");
      }
    );
  }

  //create if statement for gameover

  //create gameover function
  function gameOver() {
    $("#question").empty();
    $("#answer-one").empty();
    $("#answer-two").empty();
    $("#answer-three").empty();
    $("#answer-four").empty();
    $(".answer").off();
    $("#question").text("Game Over, Press the Start button to restart");
    $(".right-answers").text(
      "Percentage Correct: " +
        Math.round((correct / questionsArray.length) * 100) +
        "%"
    );
    $(".wrong-answers").text(
      "Percentage Incorrect: " +
        Math.round((wrong / questionsArray.length) * 100) +
        "%"
    );
    $(".unanswered").text(
      "Percentage Unanswered: " +
        Math.round((unanswered / questionsArray.length) * 100) +
        "%"
    );
  }

  //start the game
  $("#start").on("click", firstQuestion);
})();
