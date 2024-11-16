import { markQuiz,updateResultScreen } from "./index.js";

let countdown;

// Function to format time in HH:MM:SS
function formatTime(seconds) {
  // const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
// return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

// Update the timer display every second
const timerElement = document.getElementById("timer");
export function startTimer(timeLeft) {
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      // timerElement.textContent = "00:00:00"; // Timer ends
      timerElement.textContent = "00:00"; // Timer ends
      markQuiz();
      updateResultScreen()
    } else {
      timerElement.textContent = formatTime(timeLeft);
      timeLeft--; // Decrease time by 1 second
    }
  }, 1000);
}

export function stopTimer(){
    clearInterval(countdown);
    timerElement.textContent = "01:00";
}