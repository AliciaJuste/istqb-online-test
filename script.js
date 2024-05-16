document.write("Hello World");

//Function for print some message in a container (div, p)
function printMessage(message, idContainer) {
    let container = document.getElementById(idContainer);
    container.textContent = message;
}

//Function for cleaning all the answers of a question
function clearAnswers(formId) {
  let form = document.getElementById(formId);
  form.reset();

  let radioButtons = form.querySelectorAll('input[type=radio]');
  radioButtons.forEach(function(radio) {
    radio.checked = false;
  });
}

function welcomeMessage(containerId, nameId) {
    let nameUser = document.getElementById(nameId).value;
    let message = "Hi " + nameUser + ", welcome to the ISTQB online test, try your best!"
    printMessage(message, containerId);
}

function seeAnswer(containerId, correctAnswer) {
  let message = "The correct answer is option " + correctAnswer;
  printMessage(message, containerId)
}