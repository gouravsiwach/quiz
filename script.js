const questionContainer = document.querySelector(".question-container");
const optionsContainer = document.getElementById("options");
const resultContainer = document.querySelector(".result-container");
const resultText = document.getElementById("result-text");
const questionText = document.getElementById("question-text");

let currentQuestionIndex = 0;
let score = 0;

// Load and display questions from JSON file
function loadQuestions() {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      const question = data[currentQuestionIndex];
      if (question) {
        displayQuestion(question);
      } else {
        showResult();
      }
    });
}

// Display a single question
function displayQuestion(question) {
  questionText.textContent = question.question;
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.textContent = option;
    optionElement.addEventListener("click", () =>
      checkAnswer(option, question)
    );
    optionsContainer.appendChild(optionElement);
  });
}

// Check the user's answer
function checkAnswer(selectedAnswer, question) {
  if (selectedAnswer === question.answer) {
    score++;
  }

  currentQuestionIndex++;
  loadQuestions();
}

// Show the result
function showResult() {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  resultText.textContent = `Your Score: ${score}`;
}

// Start the quiz
loadQuestions();
