let correctAnswersList = ["b", "a", "a", "b", "b", "a", "b", "d", "d", "c"];

//Function for print some message in a container (div, p)
function printMessage(message, idContainer) {
    let container = document.getElementById(idContainer);
    container.textContent = message;
}

//Displays a welcome message with the user's name
function welcomeMessage(containerId, nameId) {
    let nameUser = document.getElementById(nameId).value;
    let message = "Hi " + nameUser + ", welcome to the ISTQB online test, try your best!"

    printMessage(message, containerId);
}

//Displays the correct answer for the question selected
function seeAnswer(questionNumber) {
  let correctAnswer = correctAnswersList[questionNumber-1]
  let message = "The correct answer is option " + correctAnswer;

  printMessage(message, "responseAnswer" + questionNumber);
}

//Displays if the answer was correct or not
function correctAnswer(questionNumber) {
  let selectedAnswerElement = document.querySelector(`input[name="question${questionNumber}"]:checked`);
  let correctAnswer = correctAnswersList[questionNumber-1];
  let message = "";

  if (selectedAnswerElement) {
    let selectedAnswer = selectedAnswerElement.value;
    
    if (selectedAnswer === correctAnswer) {
      message = "The answer is correct!";
    } else {
      message= "The answer is not correct."
    }
  } else {
    message = "No answer selected";
  }

  printMessage(message, "responseAnswer" + questionNumber);
}

