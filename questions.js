let currentQuestionIndex = 0;
let questions = [];
let score = 0;

function getName() {
    document.getElementById('username').style.display = "flex";
    document.getElementById('overlay').style.display = "block";
    document.getElementById('question').style.display = "none";

    const name = document.getElementById('name');

    document.querySelector('button[type="button"]').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    document.addEventListener('keypress', function() {
        if (name.value != "") {
            document.querySelector('button[type="button"]').innerHTML = "Enter";
        } else {
            document.querySelector('button[type="button"]').innerHTML = "Skip";
        }
    })
}


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

    console.log(`User answer: ${answer}`);
    console.log(`Correct answer: ${currentQuestion.answer.toLowerCase()}`);


    if (answer === currentQuestion.answer.toLowerCase()) {
        score++;
        scoreCard.innerHTML = `Score: ${score}`;

        if (currentQuestionIndex >= questions.length - 1) {
            alert('Correct! Congratulations on finishing the game!');
            getName();
        } else {
            alert('Correct! Next question!');
            currentQuestionIndex++;
            document.getElementById('answer').value = '';
            showCurrentHint();            
        }
    } else {
        if (score > 0) {
        score--;
        }
        scoreCard.innerHTML = `Score: ${score}`;
        alert('Wrong answer! Try again!');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', loadQuestions);