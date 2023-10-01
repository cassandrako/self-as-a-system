let colorValues = ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(135,206,235,1)', 'rgba(255,255,0,0.5)', 'rgba(255,165,0,0.5)', 'rgba(148,0,211,0.5)'];
let colorNames = ['red', 'green', 'sky blue', 'yellow', 'orange', 'purple'];
let characters = ['A', 'B', 'C', '1', '2', '3'];

let generatedSequence = [];
let currentQuestion;

function generateRandomSequence() {
    let availableColors = colorNames.slice();  
    let availableColorValues = colorValues.slice();  
    
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * availableColors.length);
        let colorValue = availableColorValues.splice(randomIndex, 1)[0];  
        let colorName = availableColors.splice(randomIndex, 1)[0];  

        let character = characters[Math.floor(Math.random() * characters.length)];
        let item = { colorValue: colorValue, colorName: colorName, character: character };
        generatedSequence.push(item);
    }
}
function displaySequence() {
    const display = document.querySelector('.sequence-display');
    generatedSequence.forEach(item => {
        let div = document.createElement('div');
        div.style.backgroundColor = item.colorValue;
        div.textContent = item.character;
        display.appendChild(div);
    });
    setTimeout(() => {
        display.innerHTML = '';
        poseQuestion();
    }, 4000); 
}

function poseQuestion() {
    const questionElem = document.getElementById('question');
    const randomIndex = Math.floor(Math.random() * generatedSequence.length);
    currentQuestion = generatedSequence[randomIndex];
    questionElem.textContent = `What was the shape/letter/number for the ${currentQuestion.colorName} color?`;
}

function checkAnswer() {
    const userInput = document.getElementById('answer').value.toUpperCase();
    const feedback = document.getElementById('feedback');

    if (userInput === currentQuestion.character) {
        feedback.textContent = "Correct! Well done!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Wrong! The correct answer was ${currentQuestion.character}.`;
        feedback.style.color = "red";
    }
}

generateRandomSequence();
displaySequence();
