let canPress = false;
let successfulLifts = 0;
let totalScore = 0;

let currentSet = 1;
let currentRep = 0;
const maxSets = 2;
const maxReps = 10;

let pressNowDuration = getRandomTime();
let pressNowDelay = 2000; 


function getRandomTime() {
    return Math.floor(Math.random() * (3000 - 500 + 1)) + 500;
}


function startGame() {
    const feedback = document.getElementById('feedback');
    
    if (currentRep === maxReps) {
        currentRep = 0;
        currentSet++;
        
        if (currentSet > maxSets) {
            endGame();
            return;
        }
        
        pressNowDuration -= 100;
    }

    feedback.textContent = 'Get ready...';

    setTimeout(() => {
        feedback.textContent = 'Press Now!';
        canPress = true;
        
        setTimeout(() => {
            canPress = false;
            feedback.textContent = '';
            currentRep++;
            startGame();
        }, pressNowDuration);
    }, pressNowDelay);
}

function attemptLift() {
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('current-score-display');
    const dumbbell = document.getElementById('dumbbell');
    const repDisplay = document.getElementById('rep-display');
    const setDisplay = document.getElementById('set-display');

    if (canPress) {
        successfulLifts++;
        totalScore += 10;
        feedback.textContent = 'Good lift! +10 points';
        feedback.style.color = 'green';
        dumbbell.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            dumbbell.style.transform = 'translateY(0)';
        }, 1000);
    } else {
        totalScore += 2;
        feedback.textContent = 'Oops! Bad timing. +2 points';
        feedback.style.color = 'red';
    }

    scoreDisplay.textContent = totalScore;
    repDisplay.textContent = currentRep;
    setDisplay.textContent = currentSet;
}

function endGame() {
    const feedback = document.getElementById('feedback');
    feedback.textContent = 'Workout complete, onto the next task...';
    localStorage.setItem('successfulLifts', successfulLifts);
    localStorage.setItem('unsuccessfulLifts', unsuccessfulLifts);
    localStorage.setItem('totalScore', totalScore);

    setTimeout(() => {
        window.location.href = "puzzle4.html"; 
    }, 3000); 
}

startGame();
