let currentQuestionIndex = 0;
let questions = [];

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
    const answer = document.getElementById('answer').value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answer === currentQuestion.answer.toLowerCase()) {
        // Correct answer
        alert('Correct! Moving to next question.');
        currentQuestionIndex++;
        document.getElementById('answer').value = ''; // Clear input
        
        if (currentQuestionIndex >= questions.length) {
            alert('Game Over! You completed all questions!');
            window.location.href = 'index.html'; // Redirect to homepage
            return;
        }
    } else {
        alert('Wrong answer! Try again.');
    }
    showCurrentHint();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', loadQuestions);