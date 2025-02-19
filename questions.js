let questions = [];
let score = 0;
let currentQuestion;
let roundsLength = parseInt(localStorage.getItem('rounds'));

const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const empty = document.getElementById('empty');
const help = document.getElementById('help');
const countdownClock = document.getElementById('countdownClock');


// Function to fetch and load the questions
async function loadQuestions() {

    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        showCurrentHint();

        // Add click event listener to the submit button
        document.querySelector('button[type="submit"]').addEventListener('click', checkAnswer);

        // Add enter key listener to the input field
        document.getElementById('answer').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                checkAnswer();
            }
        });
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

// Function to display the current hint
function showCurrentHint() {
    countdownClock.innerHTML = `wrong answers: ${roundsLength}`;

    if (questions.length === 0) {
        getName();
        return;
    }

    currentQuestion = questions[questions.length * Math.random() | 0];
    const hintElement = document.getElementById('hint');
    hintElement.innerHTML = `Which country is this:<br> ${currentQuestion.hint}?`;

}

// Function to check the answer and handle next hint/question
function checkAnswer() {

    let scoreCard = document.getElementById('score-card');
    const answer = document.getElementById('answer').value.trim().toLowerCase();

    if (answer === "") {
        correct.style.display = 'none';
        incorrect.style.display = 'none';
        empty.style.display = 'block'
    } else if (answer === currentQuestion.answer.toLowerCase()) {
        score += 5;
        scoreCard.innerHTML = `Score: ${score}`;
        empty.style.display = 'none';
        incorrect.style.display = 'none';
        correct.style.display = 'block';
        
        // Remove the current question from the array
        const index = questions.indexOf(currentQuestion);
        if (index > -1) {
            questions.splice(index, 1);
        }

        document.getElementById('answer').value = '';
        showCurrentHint();
    } else {
        if (roundsLength === 1) {
            getName();
        } else {
            roundsLength -= 1;
            countdownClock.innerHTML = `wrong answers:  ${roundsLength}`;
        }

        empty.style.display = 'none';
        correct.style.display = 'none';
        incorrect.style.display = 'block';
        help.style.display = 'block';
        document.getElementById('answer').value = '';
        if (score > 2) {
            score -= 2;
            scoreCard.innerHTML = `Score: ${score}`;
        }
    }
}

// Function to reveal the answer
function reveal() {
    help.innerHTML = `${currentQuestion.answer}`;
}

// Function to  get the name of the user and store it along with their score
function getName() {
    document.getElementById('username').style.display = "flex";
    document.getElementById('overlay').style.display = "block";
    document.getElementById('question').style.display = "none";

    const name = document.getElementById('name');

    document.getElementById('enterName').addEventListener('click', function () {

        if (name.value === "") {
            alert('Please enter in a name!');
            return;
        } else {
            const storedData = JSON.parse(localStorage.getItem('userData')) || [];

            storedData.push(`${name.value}: ${score}`);

            localStorage.setItem('userData', JSON.stringify(storedData));

            window.location.href = 'index.html';
        }
    });

    document.getElementById('skipName').addEventListener('click', function () {
        window.location.href = 'index.html';
    })
}





// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', loadQuestions);