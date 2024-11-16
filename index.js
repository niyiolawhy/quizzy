import questions from "./questions.js";
import { startTimer, stopTimer } from "./timer.js";

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const quizScreen = document.getElementById("quizScreen");
const questionDisplay = document.getElementById("question");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const resultScreen = document.getElementById("resultScreen");
const exitBtn = document.getElementById("exitBtn");
const btnContainer = document.getElementById("buttonContainer");
const answers = document.getElementsByName("answer");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");
const star = document.getElementById("star");

let questionIndex = 0;
let score = 0;

function updateInterface() {
  const currentQuestion = questions[questionIndex];
  option1.textContent = currentQuestion.options[0];
  option2.textContent = currentQuestion.options[1];
  option3.textContent = currentQuestion.options[2];
  option4.textContent = currentQuestion.options[3];
  questionDisplay.textContent =
    questionIndex + 1 + "." + "  " + currentQuestion.question;
  if (questionIndex < questions.length - 1) {
    nextButton.textContent = "Next";
  }
  if (questionIndex === questions.length - 1) {
    nextButton.textContent = "Submit";
  }
  if (questionIndex === 0) {
    prevButton.style.display = "none";
    btnContainer.style.justifyContent = "flex-end";
  } else {
    prevButton.style.display = "block";
    btnContainer.style.justifyContent = "space-between";
  }
  //preset checked answer
  answers.forEach((input, index) => {
    input.checked =
      questions[questionIndex].options[index] ===
      questions[questionIndex].chosenAnswer;
  });
}

function startQuiz() {
    startTimer(1*60)
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  questions.forEach((question) => {
    question.chosenAnswer = null;
  });
  questionIndex = 0;
  updateInterface();
}

function saveAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    questions[questionIndex].chosenAnswer =
      selectedOption.nextElementSibling.textContent.trim();
  }
}

export function updateResultScreen(){
    resultScreen.style.display = "flex";
    quizScreen.style.display = "none";
}

export function nextQuestion() {
  saveAnswer(); // Save the current answer
  if (questionIndex === questions.length - 1) {
   updateResultScreen()
    stopTimer()
    markQuiz();
    return;
  }
  questionIndex++;
  updateInterface();
}
function prevQuestion() {
  saveAnswer(); // Save the current answer
  if (questionIndex === 0) {
    return;
  }
  questionIndex--;
  updateInterface();
}

function exitQuiz() {
  resultScreen.style.display = "none";
  startScreen.style.display = "flex";
}

export function markQuiz() {
  questions.forEach((question) => {
    const answerIsCorrect = question.correctOption === question.chosenAnswer;
    if (answerIsCorrect) {
      score++;
    }
  });
  scoreDisplay.textContent = score;
  totalDisplay.textContent = questions.length;
  if (score === questions.length) {
    star.textContent = "Congratulations you ROCk!";
  } else {
    star.textContent =
      "Great job! You can always try again to improve your score.";
  }
}

startButton.onclick = startQuiz;
nextButton.onclick = nextQuestion;
prevButton.onclick = prevQuestion;
exitBtn.onclick = exitQuiz;
