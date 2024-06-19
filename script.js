let correctAnswersList = ["c", "a", "a", "b", "b", "c", "b", "c", "c", "c"];
let students = [];

let currentStudent = null;

// Function for print some message in a container (div, p)
function printMessage(message, infoTextId) {
  let infoText = document.getElementById(infoTextId);
  infoText.textContent = message;
}

// Displays a welcome message with the user's name
function studentRegister(nameId, infoTextId) {
  let nameUser = document.getElementById(nameId).value;
  if (nameUser !== "") {
    let newStudent = {
      name: nameUser,
      score: 0
    };
    students.push(newStudent);
    currentStudent = students.length - 1;

    let message = "Hi " + nameUser + ", welcome to the ISTQB online test, try your best!";

    printMessage(message, infoTextId);
    resetTest();
  }
}

// Displays the correct answer for the question selected
function seeAnswer(questionNumber) {
  let correctAnswer = correctAnswersList[questionNumber - 1];
  let message = "The correct answer is option " + correctAnswer;

  printMessage(message, "responseAnswer" + questionNumber);
}

// Checks if the answer was correct or not and returns its puntuation. 
// Also can display or not a message with the correction and score
function correctAnswer(questionNumber, displayMessage) {
  let selectedAnswerElement = document.querySelector(`input[name="question${questionNumber}"]:checked`);
  let correctAnswer = correctAnswersList[questionNumber - 1];
  let scoreAnswer = 0;
  let message = "";

  if (selectedAnswerElement) {
    let selectedAnswer = selectedAnswerElement.value;

    if (selectedAnswer === correctAnswer) {
      scoreAnswer = 2;
      message = "The answer is correct! You have 2 points.";
    } else {
      scoreAnswer = -1;
      message = "The answer is not correct. You have -1 points.";
    }
  } else { // No answer selected
    scoreAnswer = 0;
    message = "No answer selected. You have 0 points.";
  }
  if (displayMessage) {
    printMessage(message, "responseAnswer" + questionNumber);
  } else {
    return scoreAnswer;
  }
}

// Calculates the Final Score = the sum score of all answers
function finalScore(responseAnswer) {
  let listLength = correctAnswersList.length;
  let totalScore = 0;
  let message = "";

  for (let i = 0; i < listLength; i++) {
    totalScore += correctAnswer(i + 1, false);
  }
  // If final score is negative it should fixed to 0
  if (totalScore < 0) {
    totalScore = 0;
  }

  updateStudent(totalScore);
  message += "\nThe final score obtained is " + totalScore + " points";
  printMessage(message, responseAnswer);

}

// Update score of the current student
function updateStudent(newScore) {
  if (currentStudent !== null) {
    students[currentStudent].score = newScore;
  }
}

// Reset test (10 questions)
function resetTest() {
  let question = "";
  let form = "";
  let infoText = document.getElementById("responseFinalScore");

  for (let i = 1; i <= 10; i++) {
    question = "question" + i + "form";
    form = document.getElementById(question);
    form.reset();
  }
  infoText.textContent = "";
}

// Sort students by score in descending order
function sortStudentsByScore(students) {
  return students.sort((a, b) => b.score - a.score);
}


// Displays a list of all students taking the test along with their score 
// in order from hightest to lowest score
function displayRanking() {
  let rankingBody = document.getElementById('rankingBody');
  let sortedStudents = sortStudentsByScore(students);

  // Clear exinging rows
  rankingBody.innerHTML = "";

  // Inject new rows with the sorted students
  sortedStudents.forEach((student, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.score}</td>
    `;
    rankingBody.appendChild(row);
  });

}