let colorValues = ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(135,206,235,1)', 'rgba(255,255,0,0.5)', 'rgba(255,165,0,0.5)', 'rgba(148,0,211,0.5)'];
let colorNames = ['red', 'green', 'sky blue', 'yellow', 'orange', 'purple'];
let characters = ['A', 'B', 'C', '1', '2', '3'];

let allSequences = [];
let currentRound = 0;
let userAnswers = [];

let quizAttempts = 0;
let successfulQuizzes = 0;

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        const alertDiv = document.querySelector('.alert');
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            alertDiv.style.display = 'none';
            displayNextSequence();
        }, 1000);  
    }, 5000);  
});

function generateRandomSequence() {
    let sequence = [];
    let availableColors = colorNames.slice(); 
    let availableColorValues = colorValues.slice(); 

    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * availableColors.length);
        let colorValue = availableColorValues.splice(randomIndex, 1)[0];
        let colorName = availableColors.splice(randomIndex, 1)[0];
        let character = characters[Math.floor(Math.random() * characters.length)];
        sequence.push({ colorValue: colorValue, colorName: colorName, character: character });
    }
    return sequence;
}

function displayNextSequence() {
    if (currentRound < 4) {
        const newSequence = generateRandomSequence();
        allSequences.push(newSequence);
        const display = document.querySelector('.sequence-display');
        newSequence.forEach(item => {
            let div = document.createElement('div');
            div.style.backgroundColor = item.colorValue;
            div.textContent = item.character;
            display.appendChild(div);
        });
        setTimeout(() => {
            display.innerHTML = '';
            poseQuestion();
        }, 4000);
    } else {
        finalChallenge();
    }
}

function poseQuestion() {
    const questionElem = document.getElementById('question');
    currentQuestion = allSequences[currentRound];
    questionElem.textContent = `What was the letter/number for the ${currentQuestion[0].colorName} color?`;
}

function checkAnswer() {
    quizAttempts++;

    const userInput = document.getElementById('answer').value.toUpperCase();
    const feedback = document.getElementById('feedback');

    if (userInput === currentQuestion[0].character) {
        userAnswers.push(userInput);
        feedback.textContent = "Correct! Remember this answer.";
        feedback.style.color = "green";
        document.getElementById('answer').value = '';
        setTimeout(() => {
            feedback.textContent = '';
            currentRound++;
            displayNextSequence();
        }, 2000);
    } else {
        feedback.textContent = "Wrong! You failed your pop quiz. Try Again.";
        feedback.style.color = "red";
    }
}

function finalChallenge() {
    const questionElem = document.getElementById('question');
    questionElem.textContent = "I hope you remembered all your answers... Please write them in sequence (no spaces):";
    const answerElem = document.getElementById('answer');
    answerElem.setAttribute('maxlength', '4'); 
    answerElem.onchange = checkFinalSequence;   
}

function checkFinalSequence() {
    quizAttempts++;
    const userInput = document.getElementById('answer').value.toUpperCase();
    const feedback = document.getElementById('feedback');

    if (userInput === userAnswers.join('')) {
        successfulQuizzes++;
        feedback.textContent = "Congratulations! You passed the quiz! Onto the next puzzle...";
        feedback.style.color = "green";
        localStorage.setItem('quizAttempts', quizAttempts);
        localStorage.setItem('successfulQuizzes', successfulQuizzes);
        setTimeout(() => {
            window.location.href = "puzzle3.html";
        }, 2000); 
    } else {
        feedback.textContent = "Sorry, that's not correct!";
        feedback.style.color = "red";
    }
}

function resetGame() {
    allSequences = [];
    userAnswers = [];
    currentRound = 0;
    const display = document.querySelector('.sequence-display');
    const feedback = document.getElementById('feedback');
    const questionElem = document.getElementById('question');
    const answerElem = document.getElementById('answer');

    display.innerHTML = '';
    feedback.textContent = '';
    questionElem.textContent = '';
    answerElem.value = '';

    displayNextSequence();
}

displayNextSequence();
