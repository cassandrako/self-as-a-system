let successfulLifts = localStorage.getItem('successfulLifts');
let unsuccessfulLifts = localStorage.getItem('unsuccessfulLifts');
let totalScore = localStorage.getItem('totalScore');

let quizAttempts = localStorage.getItem('quizAttempts'); // Let's say this is for Puzzle 2
let wordleGuesses = localStorage.getItem('wordleGuesses'); // Let's say this is for Puzzle 4

document.getElementById('successful-lifts-display').textContent = successfulLifts;
document.getElementById('unsuccessful-lifts-display').textContent = unsuccessfulLifts;
document.getElementById('total-score-display').textContent = totalScore;

document.getElementById('quiz-attempts-display').textContent = quizAttempts;
document.getElementById('wordle-guesses-display').textContent = wordleGuesses;

function goHome() {
    window.location.href = "index.html";
}
