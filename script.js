let correctAnswersList = ["c", "a", "a", "b", "b", "c", "b", "c", "c", "c"];
let students = JSON.parse(localStorage.getItem("students")) || [];
let currentStudent = localStorage.getItem("currentStudent");

//Function to save students and currentStudent to localStorage
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("currentStudent", currentStudent);
}

// Print some message in a container (div, p)
function printMessage(message, infoTextId) {
  let infoText = document.getElementById(infoTextId);
  if (infoText) {
    infoText.innerHTML = message;
  }
}

// Go to Ranking.html
function goToPage(pageId) {
  window.location.href = pageId;
}

// Displays a welcome message with the user's name
function registerStudent(nameId, infoTextId) {
  let nameUser = document.getElementById(nameId).value;
  let errorMessageElement = document.querySelector('[data-cy="welcome-message-error"]');
  let successMessageElement = document.querySelector('[data-cy="welcome-message-ok"]');
  let welcomeMessageElement = document.getElementById(infoTextId);
  let form = document. getElementById('welcomeForm');

  // Manually trigger validation
  if (form.checkValidity() === false) {
    form.classList.add('was-validated');
    errorMessageElement.style.display = 'block';
    successMessageElement.style.display = 'none';
    welcomeMessageElement.textContent = '';
  } else {
    // Ocultar mensaje de error y mostrar el mensaje de bienvenida
    errorMessageElement.style.display = 'none';
    successMessageElement.style.display = 'block';
    let newStudent = {
      name: nameUser,
      score: 0,
    };
    students.push(newStudent);
    currentStudent = students.length - 1;
    // Save to localStorage
    saveToLocalStorage();

    let message = "Hi " + nameUser + ", welcome to the ISTQB online test, try your best!";

    printMessage(message, infoTextId);
    setTimeout(() => {
      goToPage("test.html"); // Redirect after 3 seconds
    }, 3000); // 3000 miliseconds = 3 seconds
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
    if (form) {
      form.reset();
    }
  }
  infoText.textContent = "";

  if (currentStudent !== null) {
    let studentName = students[currentStudent]?.name || "Student";
    let message = "<i style='font-size: smaller'>Hi <b>" + 
                  students[currentStudent].name +
                  "</b>, you can start your test now</i>";
    printMessage(message, "studentRegistered");
  }
}

// Update score of the current student
function updateStudent(newScore) {
  if (currentStudent !== null && students[currentStudent]) {
    students[currentStudent].score = newScore;
    //Save to localStorage
    saveToLocalStorage();
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
  } else {
    // No answer selected
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
  message += "The final score obtained is " + totalScore + " points";
  printMessage(message, responseAnswer);
}

// Sort students by score in descending order
function sortStudentsByScore(students) {
  return students.sort((a, b) => b.score - a.score);
}

// Displays a list of all students taking the test along with their score
// in order from hightest to lowest score
function displayRanking() {
  let rankingBody = document.getElementById("rankingBody");

  if (rankingBody) {
    if (students.length) {
      let sortedStudents = sortStudentsByScore(students);
      
      // Clear exinging rows
      rankingBody.innerHTML = "";

      // Inject new rows with the sorted students
      sortedStudents.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td>
                         <td>${student.name}</td>
                         <td>${student.score}</td>`;
        rankingBody.appendChild(row);
      });
    } else {
        rankingBody.innerHTML = "";
        let noStudents = document.createElement("p");
        noStudents.style.textAlign = "center";
        noStudents.style.marginTop = "20px";
        noStudents.innerHTML = "<i>No student has done the test</i>";
        rankingBody.appendChild(noStudents);
    }
  }
}
