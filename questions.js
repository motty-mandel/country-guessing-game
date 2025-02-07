let currentQuestionIndex = 0;
let questions = [];
let score = 0;
const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const empty = document.getElementById('empty');

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
    const roundsLength = parseInt(localStorage.getItem('rounds'));

    if (currentQuestionIndex === roundsLength) {
        return getName();
    }

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const hintElement = document.getElementById('hint');
        hintElement.textContent = `Which country is this: ${currentQuestion.hint}?`;
    }

}

// Function to check the answer and handle next hint/question
function checkAnswer() {

    let scoreCard = document.getElementById('score-card');
    const answer = document.getElementById('answer').value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === "") {
        correct.style.display = 'none';
        incorrect.style.display = 'none';
        empty.style.display = 'block'
    } else if (answer === currentQuestion.answer.toLowerCase()) {
        score += 5;
        scoreCard.innerHTML = `Score: ${score}`;

        if (currentQuestionIndex >= questions.length - 1) {
            getName();
        } else {
            incorrect.style.display = 'none';
            correct.style.display = 'block';
            currentQuestionIndex++;
            document.getElementById('answer').value = '';
            showCurrentHint();
        }
    } else {
        correct.style.display = 'none';
        incorrect.style.display = 'block';
        document.getElementById('answer').value = '';
        if (score > 2) {
            score -= 2;
            scoreCard.innerHTML = `Score: ${score}`;
        }
    }
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